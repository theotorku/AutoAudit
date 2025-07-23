import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dashboard } from '@/components/Dashboard';
import { ReceiptScanner } from '@/components/ReceiptScanner';
import { Home, Camera, FileText, Settings } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleReceiptProcessed = (receipt: any) => {
    // In a real app, this would save to a database
    console.log('New expense processed:', receipt);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="pb-20">
          <TabsContent value="dashboard" className="mt-0">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="scan" className="mt-0 p-4">
            <ReceiptScanner onReceiptProcessed={handleReceiptProcessed} />
          </TabsContent>
          
          <TabsContent value="reports" className="mt-0 p-4">
            <div className="max-w-md mx-auto text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Tax Reports</h3>
              <p className="text-muted-foreground">Export-ready reports coming soon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0 p-4">
            <div className="max-w-md mx-auto text-center py-12">
              <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Settings</h3>
              <p className="text-muted-foreground">App settings coming soon</p>
            </div>
          </TabsContent>
        </div>
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <TabsList className="grid w-full grid-cols-4 h-16 rounded-none bg-transparent">
            <TabsTrigger value="dashboard" className="flex-col gap-1 py-2">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger value="scan" className="flex-col gap-1 py-2">
              <Camera className="h-5 w-5" />
              <span className="text-xs">Scan</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex-col gap-1 py-2">
              <FileText className="h-5 w-5" />
              <span className="text-xs">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-col gap-1 py-2">
              <Settings className="h-5 w-5" />
              <span className="text-xs">Settings</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default Index;