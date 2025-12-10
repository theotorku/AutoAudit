import { useState } from 'react';
import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Camera as CameraIcon, Upload, Check, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DatabaseService } from '@/services/database.service';

interface ReceiptData {
  vendor: string;
  amount: number;
  date: string;
  category: string;
  deductible: boolean;
  deductibleAmount: number;
}

interface ReceiptScannerProps {
  onReceiptProcessed: (receipt: ReceiptData) => void;
}

export const ReceiptScanner = ({ onReceiptProcessed }: ReceiptScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const taxCategories = [
    { value: 'office-supplies', label: 'Office Supplies', deductible: 100 },
    { value: 'meals-entertainment', label: 'Meals & Entertainment', deductible: 50 },
    { value: 'travel', label: 'Business Travel', deductible: 100 },
    { value: 'equipment', label: 'Equipment', deductible: 100 },
    { value: 'software', label: 'Software & Subscriptions', deductible: 100 },
    { value: 'marketing', label: 'Marketing & Advertising', deductible: 100 },
    { value: 'personal', label: 'Personal (Non-deductible)', deductible: 0 },
  ];

  const scanReceipt = async () => {
    try {
      setIsScanning(true);

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      setScannedImage(image.dataUrl || null);

      // Simulate OCR processing (in real app, this would call an OCR service)
      setTimeout(() => {
        const mockReceiptData: ReceiptData = {
          vendor: 'Coffee Shop Express',
          amount: 24.50,
          date: new Date().toISOString().split('T')[0],
          category: 'meals-entertainment',
          deductible: true,
          deductibleAmount: 12.25, // 50% for meals
        };

        setReceiptData(mockReceiptData);
        setIsEditing(true);
        setIsScanning(false);

        toast({
          title: 'Receipt Scanned Successfully',
          description: 'Review and confirm the extracted details.',
        });
      }, 2000);

    } catch (error) {
      console.error('Error scanning receipt:', error);
      setIsScanning(false);
      toast({
        variant: 'destructive',
        title: 'Scan Failed',
        description: 'Please try again or select from gallery.',
      });
    }
  };

  const updateReceiptData = (field: keyof ReceiptData, value: any) => {
    if (!receiptData) return;

    const updated = { ...receiptData, [field]: value };

    // Recalculate deductible amount when category changes
    if (field === 'category') {
      const category = taxCategories.find(cat => cat.value === value);
      const deductiblePercent = category ? category.deductible : 0;
      updated.deductible = deductiblePercent > 0;
      updated.deductibleAmount = (updated.amount * deductiblePercent) / 100;
    }

    if (field === 'amount') {
      const category = taxCategories.find(cat => cat.value === updated.category);
      const deductiblePercent = category ? category.deductible : 0;
      updated.deductibleAmount = (value * deductiblePercent) / 100;
    }

    setReceiptData(updated);
  };

  const confirmReceipt = async () => {
    if (receiptData) {
      try {
        // Save expense to Supabase
        await DatabaseService.addExpense({
          vendor: receiptData.vendor,
          amount: receiptData.amount,
          date: receiptData.date,
          category: receiptData.category,
          deductible: receiptData.deductible,
          deductible_amount: receiptData.deductibleAmount,
          description: '',
        });

        // Call the callback (though it's no longer needed with real-time updates)
        onReceiptProcessed(receiptData);

        setScannedImage(null);
        setReceiptData(null);
        setIsEditing(false);

        toast({
          title: 'Expense Added',
          description: 'Receipt has been categorized and saved to your account.',
        });
      } catch (error) {
        console.error('Error saving expense:', error);
        toast({
          variant: 'destructive',
          title: 'Save Failed',
          description: 'Failed to save expense. Please try again.',
        });
      }
    }
  };

  if (isEditing && receiptData) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Review Receipt Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scannedImage && (
            <div className="relative">
              <img src={scannedImage} alt="Scanned receipt" className="w-full h-32 object-cover rounded-lg" />
            </div>
          )}

          <div className="space-y-3">
            <div>
              <Label htmlFor="vendor">Vendor</Label>
              <Input
                id="vendor"
                value={receiptData.vendor}
                onChange={(e) => updateReceiptData('vendor', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={receiptData.amount}
                  onChange={(e) => updateReceiptData('amount', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={receiptData.date}
                  onChange={(e) => updateReceiptData('date', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Tax Category</Label>
              <Select value={receiptData.category} onValueChange={(value) => updateReceiptData('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {taxCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{category.label}</span>
                        {category.deductible > 0 && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {category.deductible}% deductible
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {receiptData.deductible && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="h-4 w-4" />
                  <span className="font-medium">Tax Deductible: ${receiptData.deductibleAmount.toFixed(2)}</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  {receiptData.category === 'meals-entertainment'
                    ? 'Business meals are 50% deductible'
                    : 'Fully deductible business expense'}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={confirmReceipt} className="flex-1">
              <Check className="h-4 w-4 mr-2" />
              Save Expense
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CameraIcon className="h-5 w-5" />
          Scan Receipt
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-4">
          <div className="p-8 border-2 border-dashed border-muted rounded-lg">
            <CameraIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {isScanning ? 'Processing receipt...' : 'Take a photo of your receipt to automatically extract expense details'}
            </p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={scanReceipt}
              disabled={isScanning}
              className="w-full"
              size="lg"
            >
              <CameraIcon className="h-5 w-5 mr-2" />
              {isScanning ? 'Scanning...' : 'Scan Receipt'}
            </Button>

            <Button variant="outline" className="w-full" disabled={isScanning}>
              <Upload className="h-4 w-4 mr-2" />
              Upload from Gallery
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Automatically extracts vendor, amount, and date</p>
          <p>• Categorizes expenses for IRS compliance</p>
          <p>• Identifies deductible vs non-deductible items</p>
        </div>
      </CardContent>
    </Card>
  );
};