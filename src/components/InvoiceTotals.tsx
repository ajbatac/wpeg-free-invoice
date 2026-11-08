import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/invoice-utils';
import { Percent } from 'lucide-react';

interface InvoiceTotalsProps {
  subtotal: number;
  taxRate: number;
  setTaxRate: (rate: number) => void;
  taxAmount: number;
  total: number;
}

export default function InvoiceTotals({ subtotal, taxRate, setTaxRate, taxAmount, total }: InvoiceTotalsProps) {
  const taxPresets = [
    { label: 'MB GST+PST (12%)', rate: 12 },
    { label: 'GST Only (5%)', rate: 5 },
    { label: 'No Tax (0%)', rate: 0 },
  ];

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
        <CardTitle className="text-lg font-semibold text-slate-800">Invoice Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-5 space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-sm py-1">
          <span className="text-slate-600 font-medium">Subtotal</span>
          <span className="font-semibold text-slate-800 tabular-nums text-base">{formatCurrency(subtotal)}</span>
        </div>

        {/* Tax Rate & Controls */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <Label htmlFor="tax-rate" className="text-slate-600 font-medium">
                Tax Rate (%):
              </Label>
              <div className="relative w-20">
                <Input
                  id="tax-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="h-8 text-right pr-6 font-medium tabular-nums"
                />
                <Percent className="h-3 w-3 absolute right-2 top-2.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <span className="font-semibold text-slate-800 tabular-nums text-base">{formatCurrency(taxAmount)}</span>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {taxPresets.map((preset) => (
              <button
                key={preset.rate}
                type="button"
                onClick={() => setTaxRate(preset.rate)}
                className={`text-[11px] font-medium px-2 py-0.5 rounded-md border transition-all ${
                  taxRate === preset.rate
                    ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grand Total */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-base font-bold text-slate-900">Total Amount</span>
            <span className="text-2xl font-extrabold text-blue-600 tabular-nums tracking-tight">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
