import { Save, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InvoiceActionsProps {
  onSave: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function InvoiceActions({ onSave, onGenerate, isGenerating }: InvoiceActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Button
        variant="outline"
        onClick={onSave}
        className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs h-9 px-3.5"
      >
        <Save className="h-4 w-4 mr-2 text-slate-500" />
        <span>Save Locally</span>
      </Button>
      <Button
        onClick={onGenerate}
        disabled={isGenerating}
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm h-9 px-4 font-medium"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            <span>Generate Invoice</span>
          </>
        )}
      </Button>
    </div>
  );
}
