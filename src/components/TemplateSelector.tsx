
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { InvoiceTemplate } from '@/shared/types';

interface TemplateSelectorProps {
  template: InvoiceTemplate;
  setTemplate: (template: InvoiceTemplate) => void;
}

export default function TemplateSelector({ template, setTemplate }: TemplateSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              template === 'classic' 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setTemplate('classic')}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-md mb-3 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-3 bg-gray-300 rounded mb-2 mx-auto"></div>
                <div className="w-8 h-2 bg-gray-200 rounded mb-4 mx-auto"></div>
                <div className="space-y-1">
                  <div className="w-16 h-1 bg-gray-300 rounded mx-auto"></div>
                  <div className="w-12 h-1 bg-gray-200 rounded mx-auto"></div>
                  <div className="w-14 h-1 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-sm">Classic</h3>
            <p className="text-xs text-muted-foreground">Traditional, clean design</p>
          </div>

          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              template === 'modern' 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setTemplate('modern')}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-purple-50 rounded-md mb-3 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-2 mx-auto"></div>
                <div className="w-8 h-2 bg-blue-200 rounded mb-4 mx-auto"></div>
                <div className="space-y-2">
                  <div className="w-16 h-2 bg-blue-100 rounded mx-auto"></div>
                  <div className="w-12 h-2 bg-purple-100 rounded mx-auto"></div>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-sm">Modern</h3>
            <p className="text-xs text-muted-foreground">Sleek, minimalist style</p>
          </div>

          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              template === 'professional' 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setTemplate('professional')}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-slate-50 to-slate-100 rounded-md mb-3 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-2 bg-slate-800 rounded mb-2 mx-auto"></div>
                <div className="w-8 h-1 bg-slate-400 rounded mb-4 mx-auto"></div>
                <div className="space-y-1">
                  <div className="w-16 h-1 bg-slate-400 rounded mx-auto"></div>
                  <div className="w-12 h-1 bg-slate-300 rounded mx-auto"></div>
                  <div className="w-14 h-1 bg-slate-300 rounded mx-auto"></div>
                </div>
                <div className="w-10 h-2 bg-slate-800 rounded mt-2 mx-auto"></div>
              </div>
            </div>
            <h3 className="font-semibold text-sm">Professional</h3>
            <p className="text-xs text-muted-foreground">Formal business style</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
