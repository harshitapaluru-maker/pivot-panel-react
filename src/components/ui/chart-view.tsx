import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataRecord } from "@/data/mockData";

interface ChartViewProps {
  data: DataRecord[];
}

export function ChartView({ data }: ChartViewProps) {
  // Prepare data for module distribution chart
  const moduleData = data.reduce((acc, record) => {
    const existing = acc.find(item => item.module === record.module);
    if (existing) {
      existing.amount += record.amount;
      existing.count += 1;
    } else {
      acc.push({
        module: record.module,
        amount: record.amount,
        count: 1,
      });
    }
    return acc;
  }, [] as Array<{ module: string; amount: number; count: number }>);

  // Prepare data for status distribution
  const statusData = data.reduce((acc, record) => {
    const existing = acc.find(item => item.status === record.status);
    if (existing) {
      existing.amount += record.amount;
      existing.count += 1;
    } else {
      acc.push({
        status: record.status,
        amount: record.amount,
        count: 1,
      });
    }
    return acc;
  }, [] as Array<{ status: string; amount: number; count: number }>);

  // Prepare monthly trend data
  const monthlyData = data.reduce((acc, record) => {
    const month = new Date(record.invoice_date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.amount += record.amount;
      existing.count += 1;
    } else {
      acc.push({
        month,
        amount: record.amount,
        count: 1,
      });
    }
    return acc;
  }, [] as Array<{ month: string; amount: number; count: number }>)
  .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-popover-foreground font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-popover-foreground">
              <span className="font-medium">{entry.dataKey}:</span>{' '}
              {entry.dataKey === 'amount' 
                ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(entry.value)
                : entry.value
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Amount by Module</CardTitle>
            <CardDescription>Total transaction amounts by business module</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={moduleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="module" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="amount" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amount by Status</CardTitle>
            <CardDescription>Transaction amounts grouped by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="status" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="amount" 
                  fill="hsl(var(--info))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Trend</CardTitle>
          <CardDescription>Transaction amounts and volume over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                yAxisId="amount"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                yAxisId="count"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                yAxisId="amount"
                type="monotone" 
                dataKey="amount" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="count"
                type="monotone" 
                dataKey="count" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}