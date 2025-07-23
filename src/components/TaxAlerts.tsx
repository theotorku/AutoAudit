import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Info, Bell } from 'lucide-react';

interface TaxAlert {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'info' | 'critical';
  date: string;
}

export const TaxAlerts = () => {
  const alerts: TaxAlert[] = [
    {
      id: '1',
      title: 'New Meal Deduction Rules',
      description: 'Business meals are now 100% deductible through 2023. Update your meal expense categories.',
      type: 'info',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Quarterly Tax Due Soon',
      description: 'Q4 estimated taxes are due January 15th. Ensure you have sufficient deductible expenses documented.',
      type: 'warning',
      date: '2024-01-10'
    },
    {
      id: '3',
      title: 'Mileage Rate Updated',
      description: 'IRS standard mileage rate increased to $0.67 per mile for 2024.',
      type: 'info',
      date: '2024-01-05'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'default';
      case 'info':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          Tax Rule Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-3 bg-secondary/20 rounded-lg border border-secondary">
            <div className="flex items-start gap-2">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <Badge variant={getAlertColor(alert.type) as any} className="text-xs">
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {alert.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(alert.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};