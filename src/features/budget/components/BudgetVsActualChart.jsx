import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import { formatNaira } from "@/lib/currency";

const compact = (value) => (value >= 1_000_000 ? `₦${value / 1_000_000}m` : `₦${value / 1000}k`);

export function BudgetVsActualChart({ data }) {
  return (
    <Card>
      <h2 className="mb-4 font-display text-lg font-bold">Planned vs spent</h2>
      <div style={{ height: Math.max(220, data.length * 56) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
            <CartesianGrid horizontal={false} stroke="#161a3d1a" />
            <XAxis type="number" tickFormatter={compact} tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="category" width={120} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => formatNaira(value)} cursor={{ fill: "#161a3d0d" }} />
            <Legend />
            <Bar dataKey="estimated" name="Planned" fill="#eebb3a" radius={[0, 4, 4, 0]} />
            <Bar dataKey="actual" name="Spent" fill="#252e75" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
