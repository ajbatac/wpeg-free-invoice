
import { Save, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InvoiceActionsProps {
  onSave: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function InvoiceActions({ onSave, onGenerate, isGenerating }: InvoiceActionsProps) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={onSave}>
        <Save className="h-4 w-4 mr-2" />
        Save Locally
      </Button>
      <Button onClick={onGenerate} disabled={isGenerating}>
        <Send className="h-4 w-4 mr-2" />
        {isGenerating ? 'Generating Invoice...' : 'Generate Invoice'}
      </Button>
    </div>
  );
}
