
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${template === 'classic'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setTemplate('classic')}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-md mb-2 flex items-center justify-center">
              <div className="text-center w-full">
                <div className="w-10 h-2 bg-gray-300 rounded mb-2 mx-auto"></div>
                <div className="w-6 h-1 bg-gray-200 rounded mb-4 mx-auto"></div>
                <div className="space-y-1">
                  <div className="w-12 h-1 bg-gray-300 rounded mx-auto"></div>
                  <div className="w-10 h-1 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-xs text-center">Classic</h3>
          </div>

          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${template === 'modern'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setTemplate('modern')}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-purple-50 rounded-md mb-2 flex items-center justify-center">
              <div className="text-center w-full">
                <div className="w-10 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-2 mx-auto"></div>
                <div className="w-6 h-1 bg-blue-200 rounded mb-4 mx-auto"></div>
                <div className="space-y-1">
                  <div className="w-12 h-1 bg-blue-100 rounded mx-auto"></div>
                  <div className="w-10 h-1 bg-purple-100 rounded mx-auto"></div>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-xs text-center">Modern</h3>
          </div>

          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${template === 'professional'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setTemplate('professional')}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-slate-50 to-slate-100 rounded-md mb-2 flex items-center justify-center">
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
            <h3 className="font-semibold text-xs text-center">Professional</h3>
          </div>

          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${template === 'minimalist'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setTemplate('minimalist')}
          >
            <div className="aspect-[3/4] bg-white border border-gray-100 rounded-md mb-2 flex items-center justify-center">
              <div className="w-full px-3 text-left">
                <div className="w-full h-2 bg-gray-900 mb-3 rounded-sm"></div>
                <div className="w-10 h-1 bg-gray-300 mb-2 rounded-sm"></div>
                <div className="w-full h-[2px] bg-gray-100 mb-2 rounded-sm"></div>
                <div className="flex justify-between w-full">
                  <div className="w-6 h-1 bg-gray-200 rounded-sm"></div>
                  <div className="w-6 h-1 bg-gray-900 rounded-sm"></div>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-xs text-center">Minimalist</h3>
          </div>

          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${template === 'elegant'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setTemplate('elegant')}
          >
            <div className="aspect-[3/4] bg-[#faf9f6] border border-[#e8dfce] rounded-md mb-2 flex items-center justify-center">
              <div className="text-center w-full px-2">
                <div className="w-10 h-2 bg-[#bda87f] rounded-sm mb-2 mx-auto"></div>
                <div className="space-y-1 mb-2">
                  <div className="w-6 h-1 bg-gray-300 rounded-sm mx-auto"></div>
                  <div className="w-8 h-1 bg-gray-300 rounded-sm mx-auto"></div>
                </div>
                <div className="w-full h-px bg-[#e8dfce] mb-1"></div>
                <div className="w-full h-1 bg-gray-200 rounded-sm mx-auto"></div>
              </div>
            </div>
            <h3 className="font-semibold text-xs text-center">Elegant</h3>
          </div>

          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${template === 'cxo'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setTemplate('cxo')}
          >
            <div className="aspect-[3/4] bg-slate-900 border border-slate-800 rounded-md mb-2 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500/20 blur-xl"></div>
              <div className="text-left w-full px-2 mt-4">
                <div className="w-12 h-2 bg-slate-100 rounded-sm mb-4"></div>
                <div className="w-8 h-1 bg-blue-500/50 rounded-sm mb-1"></div>
                <div className="w-full h-[1px] bg-slate-800 mb-2"></div>
                <div className="w-6 h-1 bg-slate-500 rounded-sm mb-1"></div>
                <div className="w-10 h-1 bg-slate-500 rounded-sm"></div>
              </div>
            </div>
            <h3 className="font-semibold text-xs text-center">CXO</h3>
          </div>

          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${template === 'creative'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setTemplate('creative')}
          >
            <div className="aspect-[3/4] bg-yellow-50 border border-yellow-100 rounded-md mb-2 flex items-center justify-center relative shadow-inner">
              <div className="absolute -left-2 top-2 w-4 h-8 bg-pink-400 rounded-r-full opacity-50"></div>
              <div className="absolute right-0 bottom-4 w-6 h-6 bg-blue-400 rounded-l-full opacity-50"></div>
              <div className="text-center w-full px-2 z-10">
                <div className="w-10 h-3 bg-indigo-900 rounded-full mb-3 mx-auto"></div>
                <div className="w-8 h-1 bg-indigo-400 rounded-sm mx-auto mb-1"></div>
                <div className="w-12 h-1 bg-pink-300 rounded-sm mx-auto mb-2"></div>
                <div className="w-6 h-2 bg-indigo-900 rounded-full mx-auto"></div>
              </div>
            </div>
            <h3 className="font-semibold text-xs text-center">Creative</h3>
          </div>

          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${template === 'brutalist'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setTemplate('brutalist')}
          >
            <div className="aspect-[3/4] bg-zinc-200 border-2 border-black rounded-none mb-2 flex items-start justify-start p-2 relative shadow-[2px_2px_0px_#000]">
              <div className="text-left w-full h-full flex flex-col justify-between">
                <div>
                  <div className="w-full h-3 bg-black mb-1"></div>
                  <div className="w-3/4 h-3 bg-black mb-3"></div>
                </div>
                <div className="border border-black p-1 w-full bg-yellow-300">
                  <div className="w-full h-1 bg-black mb-1"></div>
                  <div className="w-1/2 h-1 bg-black"></div>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-xs text-center">Brutalist</h3>
          </div>

          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${template === 'pastel'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setTemplate('pastel')}
          >
            <div className="aspect-[3/4] bg-rose-50 border border-rose-100 rounded-2xl mb-2 flex items-center justify-center p-3 shadow-sm">
              <div className="w-full h-full border-2 border-dashed border-rose-200 rounded-xl relative p-1 flex flex-col items-center">
                <div className="w-8 h-8 bg-sky-100 rounded-full mb-2 flex-shrink-0"></div>
                <div className="w-10 h-1.5 bg-rose-200 rounded-full mb-1"></div>
                <div className="w-6 h-1.5 bg-amber-100 rounded-full mb-3"></div>
                <div className="w-full h-1 bg-rose-100 rounded-full mt-auto mb-1"></div>
              </div>
            </div>
            <h3 className="font-semibold text-xs text-center">Pastel</h3>
          </div>

          <div
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${template === 'eco'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setTemplate('eco')}
          >
            <div className="aspect-[3/4] bg-[#f2f7ec] border border-[#d2e3c6] rounded-md mb-2 flex items-center justify-center p-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-4 bg-emerald-700/10"></div>
              <div className="text-left w-full mt-3">
                <div className="w-8 h-2 bg-emerald-800 rounded-sm mb-1"></div>
                <div className="w-6 h-1 bg-emerald-600/50 rounded-sm mb-3"></div>

                <div className="w-full h-px bg-emerald-200 mb-2"></div>

                <div className="flex justify-between items-end mb-1">
                  <div className="w-5 h-1 bg-emerald-800/40 rounded-sm"></div>
                  <div className="w-8 h-1 bg-emerald-800/80 rounded-sm"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-4 h-1 bg-emerald-800/40 rounded-sm"></div>
                  <div className="w-6 h-1 bg-emerald-800/80 rounded-sm"></div>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-xs text-center">Eco</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
