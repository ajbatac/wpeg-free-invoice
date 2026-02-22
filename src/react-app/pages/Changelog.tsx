import { ArrowLeft, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";
import Seo from "@/components/Seo";
import { Badge } from "@/components/ui/badge";

export default function Changelog() {
    const navigate = useNavigate();

    return (
        <>
            <Seo
                title="Changelog | WPEG.app: Free Invoice Generator"
                description="See what's new in WPEG: Free Invoice Generator."
            />
            <div className="min-h-screen bg-slate-50/50">
                <div className="container mx-auto px-4 py-12 max-w-3xl">
                    <div className="flex justify-between items-center mb-10">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/")}
                            className="text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Button>

                        <a href="/changelog/rss" target="_blank" rel="noopener noreferrer">
                            <Badge variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer flex items-center gap-2">
                                <Rss className="h-3 w-3" />
                                Subscribe to this feed
                            </Badge>
                        </a>
                    </div>

                    <header className="mb-16 text-center">
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                            What's New
                        </h1>
                        <p className="text-lg text-slate-600">
                            The latest updates, improvements, and fixes for WPEG.app.
                        </p>
                    </header>

                    <div className="space-y-12">
                        {/* Version 1.1.0 */}
                        <section className="relative pl-8 border-l-2 border-blue-500/20">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm" />
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-2xl font-bold text-slate-900">v1.1.0</h2>
                                <span className="text-sm font-medium text-slate-400">February 21, 2026</span>
                            </div>

                            <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-3">
                                    <CardTitle className="text-base text-slate-800">Domain & Brand Migration</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ul className="space-y-4">
                                        <li className="flex gap-3">
                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                            <p className="text-slate-600 leading-relaxed">
                                                <strong className="text-slate-900">New Domain Release:</strong> We have officially moved to <span className="font-semibold text-blue-600">WPEG.app</span>. This change reflects our growth and commitment to providing a modern application experience.
                                            </p>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                            <p className="text-slate-600 leading-relaxed">
                                                <strong className="text-slate-900">Visual Refinement:</strong> Updated all branding across the site and inside the PDF invoices to the new .app identity.
                                            </p>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                            <p className="text-slate-600 leading-relaxed">
                                                <strong className="text-slate-900">Enhanced Social Previews:</strong> Improved how invoices look when shared on social media and messaging apps with updated preview images.
                                            </p>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                            <p className="text-slate-600 leading-relaxed">
                                                <strong className="text-slate-900">Consistency Updates:</strong> Standardized footer notices across all 10 invoice templates to ensure your business always looks professional.
                                            </p>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Version 1.0.0 */}
                        <section className="relative pl-8 border-l-2 border-slate-200">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm" />
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-2xl font-bold text-slate-700">v1.0.0</h2>
                                <span className="text-sm font-medium text-slate-400">Initial Launch</span>
                            </div>

                            <Card className="border-slate-100 bg-white/50 shadow-none">
                                <CardContent className="pt-6 text-slate-500 leading-relaxed">
                                    The first public version of WPEG: Free Invoice Generator. Featuring 10 professional templates, instant PDF downloads, and complete data privacy through local storage.
                                </CardContent>
                            </Card>
                        </section>
                    </div>

                    <footer className="mt-24 pt-8 border-t border-slate-200 text-center">
                        <p className="text-sm text-slate-400 italic">
                            Thank you for being part of our community. More updates coming soon!
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}
