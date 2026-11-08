import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { InvoiceTemplate } from '@/shared/types';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  template: InvoiceTemplate;
  setTemplate: (template: InvoiceTemplate) => void;
}

export default function TemplateSelector({ template, setTemplate }: TemplateSelectorProps) {
  const templates: { id: InvoiceTemplate; name: string; renderThumbnail: () => React.ReactNode }[] = [
    {
      id: 'classic',
      name: 'Classic',
      renderThumbnail: () => (
        <div className="aspect-[3/4] bg-gradient-to-br from-slate-50 to-slate-100 rounded-md mb-2 flex items-center justify-center p-2">
          <div className="text-center w-full">
            <div className="w-10 h-2 bg-slate-300 rounded mb-2 mx-auto"></div>
            <div className="w-6 h-1 bg-slate-200 rounded mb-4 mx-auto"></div>
            <div className="space-y-1">
              <div className="w-12 h-1 bg-slate-300 rounded mx-auto"></div>
              <div className="w-10 h-1 bg-slate-200 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'modern',
      name: 'Modern',
      renderThumbnail: () => (
        <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md mb-2 flex items-center justify-center p-2">
          <div className="text-center w-full">
            <div className="w-10 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded mb-2 mx-auto"></div>
            <div className="w-6 h-1 bg-blue-200 rounded mb-4 mx-auto"></div>
            <div className="space-y-1">
              <div className="w-12 h-1 bg-blue-100 rounded mx-auto"></div>
              <div className="w-10 h-1 bg-indigo-100 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'professional',
      name: 'Professional',
      renderThumbnail: () => (
        <div className="aspect-[3/4] bg-slate-50 rounded-md mb-2 flex items-center justify-center p-2">
          <div className="text-center w-full">
            <div className="w-10 h-2 bg-slate-800 rounded mb-2 mx-auto"></div>
            <div className="w-6 h-1 bg-slate-400 rounded mb-3 mx-auto"></div>
            <div className="space-y-1">
              <div className="w-12 h-1 bg-slate-400 rounded mx-auto"></div>
              <div className="w-10 h-1 bg-slate-300 rounded mx-auto"></div>
            </div>
            <div className="w-8 h-1 bg-slate-800 rounded mt-2 mx-auto"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      renderThumbnail: () => (
        <div className="aspect-[3/4] bg-white border border-slate-200 rounded-md mb-2 flex items-center justify-center p-2">
          <div className="w-full px-2 text-left">
            <div className="w-full h-2 bg-slate-900 mb-3 rounded-xs"></div>
            <div className="w-10 h-1 bg-slate-300 mb-2 rounded-xs"></div>
            <div className="w-full h-[2px] bg-slate-100 mb-2 rounded-xs"></div>
            <div className="flex justify-between w-full">
              <div className="w-6 h-1 bg-slate-200 rounded-xs"></div>
              <div className="w-6 h-1 bg-slate-900 rounded-xs"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'elegant',
      name: 'Elegant',
      renderThumbnail: () => (
        <div className="aspect-[3/4] bg-[#faf9f6] border border-[#e8dfce] rounded-md mb-2 flex items-center justify-center p-2">
          <div className="text-center w-full px-1">
            <div className="w-10 h-2 bg-[#bda87f] rounded-xs mb-2 mx-auto"></div>
            <div className="space-y-1 mb-2">
              <div className="w-6 h-1 bg-slate-300 rounded-xs mx-auto"></div>
              <div className="w-8 h-1 bg-slate-300 rounded-xs mx-auto"></div>
            </div>
            <div className="w-full h-px bg-[#e8dfce] mb-1"></div>
            <div className="w-full h-1 bg-slate-200 rounded-xs mx-auto"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'cxo',
      name: 'CXO',
      renderThumbnail: () => (
        <div className="aspect-[3/4] bg-slate-900 border border-slate-800 rounded-md mb-2 flex items-center justify-center relative overflow-hidden p-2">
          <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500/20 blur-xl"></div>
          <div className="text-left w-full px-1 mt-2">
            <div className="w-12 h-2 bg-slate-100 rounded-xs mb-3"></div>
            <div className="w-8 h-1 bg-blue-500/50 rounded-xs mb-1"></div>
            <div className="w-full h-[1px] bg-slate-800 mb-2"></div>
            <div className="w-6 h-1 bg-slate-500 rounded-xs mb-1"></div>
            <div className="w-10 h-1 bg-slate-500 rounded-xs"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'creative',
      name: 'Creative',
      renderThumbnail: () => (
        <div className="aspect-[3/4] bg-yellow-50 border border-yellow-100 rounded-md mb-2 flex items-center justify-center relative shadow-inner p-2">
          <div className="absolute -left-2 top-2 w-4 h-8 bg-pink-400 rounded-r-full opacity-40"></div>
          <div className="absolute right-0 bottom-4 w-6 h-6 bg-blue-400 rounded-l-full opacity-40"></div>
          <div className="text-center w-full px-1 z-10">
            <div className="w-10 h-2.5 bg-indigo-900 rounded-full mb-2.5 mx-auto"></div>
            <div className="w-8 h-1 bg-indigo-400 rounded-xs mx-auto mb-1"></div>
            <div className="w-12 h-1 bg-pink-300 rounded-xs mx-auto mb-2"></div>
            <div className="w-6 h-1.5 bg-indigo-900 rounded-full mx-auto"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'brutalist',
      name: 'Brutalist',
      renderThumbnail: () => (
        <div className="aspect-[3/4] bg-zinc-200 border-2 border-black rounded-none mb-2 flex items-start justify-start p-2 relative shadow-[2px_2px_0px_#000]">
          <div className="text-left w-full h-full flex flex-col justify-between">
            <div>
              <div className="w-full h-2.5 bg-black mb-1"></div>
              <div className="w-3/4 h-2.5 bg-black mb-2"></div>
            </div>
            <div className="border border-black p-1 w-full bg-yellow-300">
              <div className="w-full h-1 bg-black mb-0.5"></div>
              <div className="w-1/2 h-1 bg-black"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'pastel',
      name: 'Pastel',
      renderThumbnail: () => (
        <div className="aspect-[3/4] bg-rose-50 border border-rose-100 rounded-xl mb-2 flex items-center justify-center p-2.5 shadow-xs">
          <div className="w-full h-full border border-dashed border-rose-200 rounded-lg relative p-1 flex flex-col items-center">
            <div className="w-6 h-6 bg-sky-100 rounded-full mb-1.5 shrink-0"></div>
            <div className="w-10 h-1 bg-rose-200 rounded-full mb-1"></div>
            <div className="w-6 h-1 bg-amber-100 rounded-full mb-2"></div>
            <div className="w-full h-1 bg-rose-100 rounded-full mt-auto mb-0.5"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'eco',
      name: 'Eco',
      renderThumbnail: () => (
        <div className="aspect-[3/4] bg-[#f2f7ec] border border-[#d2e3c6] rounded-md mb-2 flex items-center justify-center p-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-3 bg-emerald-700/10"></div>
          <div className="text-left w-full mt-2">
            <div className="w-8 h-2 bg-emerald-800 rounded-xs mb-1"></div>
            <div className="w-6 h-1 bg-emerald-600/50 rounded-xs mb-2"></div>
            <div className="w-full h-px bg-emerald-200 mb-1.5"></div>
            <div className="flex justify-between items-end mb-1">
              <div className="w-5 h-1 bg-emerald-800/40 rounded-xs"></div>
              <div className="w-8 h-1 bg-emerald-800/80 rounded-xs"></div>
            </div>
            <div className="flex justify-between items-end">
              <div className="w-4 h-1 bg-emerald-800/40 rounded-xs"></div>
              <div className="w-6 h-1 bg-emerald-800/80 rounded-xs"></div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-slate-800">Invoice Template</CardTitle>
          <p className="text-xs text-slate-500 mt-0.5">Choose from 10 distinct, professional PDF styles</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
          {template.toUpperCase()}
        </span>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {templates.map((t) => {
            const isSelected = template === t.id;
            return (
              <div
                key={t.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setTemplate(t.id);
                  }
                }}
                className={`relative p-2.5 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/30 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
                onClick={() => setTemplate(t.id)}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xs">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                )}
                {t.renderThumbnail()}
                <h3
                  className={`font-semibold text-xs text-center transition-colors ${
                    isSelected ? 'text-blue-900 font-bold' : 'text-slate-700 group-hover:text-slate-900'
                  }`}
                >
                  {t.name}
                </h3>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
