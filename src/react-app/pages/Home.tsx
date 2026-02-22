import { ArrowRight, FileText, Download, Zap, MapPin, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Seo from '@/components/Seo';

export default function Home() {
  const navigate = useNavigate();

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const features = [
    {
      icon: <Shield className="h-7 w-7" />,
      title: "100% Private & Local",
      description: "Your data stays on your computer. We never see your invoices, and nothing is stored in the cloud."
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: "No Login Required",
      description: "Start invoicing immediately. No accounts to create, no passwords to remember, and no email spam."
    },
    {
      icon: <Download className="h-7 w-7" />,
      title: "Local Processing",
      description: "PDFs are generated right in your browser. Fast, secure, and works even with a spotty connection."
    },
    {
      icon: <FileText className="h-7 w-7" />,
      title: "Professional & Free",
      description: "Beautiful templates that save to your browser's local storage automatically for future editing."
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-5 w-5" />,
      text: "Private: No data ever leaves your device"
    },
    {
      icon: <Star className="h-5 w-5" />,
      text: "Zero Complexity: No login, no cloud, no friction"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      text: "Secure: Fully local browser-based generation"
    }
  ];

  return (
    <>
      <Seo
        title="WPEG: Free Invoice Generator | Create Professional Invoices"
        description="Create professional invoices in minutes. Free forever for Winnipeg small businesses. No subscriptions, no complexity."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>

        {/* Header */}
        <header className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href='/' className="flex items-center space-x-2.5 group transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xl md:text-2xl font-bold tracking-tighter text-slate-900 leading-none">
                    wpeg<span className="text-blue-600">.app</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mt-1 hidden sm:block">
                    Free Invoice
                  </span>
                </div>
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <img src="/wpeg-invoice.png" alt="WPEG Invoice" className="h-16 md:h-20 object-contain rounded-xl shadow-lg hidden sm:block" />
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300"
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </header>

        {/* Winnipeg Badge */}
        <div className="relative z-10 container mx-auto px-6 pt-8">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200/50 rounded-full backdrop-blur-sm">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">FREE for Winnipeg Small Businesses</span>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 container mx-auto px-6 py-16 text-center">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight" style={{ fontFamily: 'Playfair Display' }}>
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Beautiful Invoices for
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Winnipeg Businesses
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Professional invoices with <strong>zero cloud risk</strong>.
                Everything is processed locally on your device. No accounts, no data tracking,
                and no subscription fees. Just pure, private invoicing.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <div className="p-1 bg-blue-100 rounded-full">
                    {benefit.icon}
                  </div>
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="text-lg px-10 py-4 h-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Creating Invoices
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-gray-500 font-medium">
                ✨ 100% Private • Locally Processed • Zero Data Tracking
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display' }}>
                Everything you need to succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Built specifically for Winnipeg small business owners who need professional invoicing
                without the complexity or cost of traditional solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="text-center relative z-10 pb-4">
                    <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Winnipeg Focus Section */}
        <section className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-200/30 to-green-200/30 rounded-full blur-2xl"></div>

              <CardHeader className="text-center pb-8 relative z-10">
                <div className="inline-flex items-center gap-3 mx-auto mb-6 px-6 py-3 bg-green-100 rounded-full">
                  <MapPin className="h-6 w-6 text-green-600" />
                  <span className="text-lg font-semibold text-green-800">Made for Winnipeg</span>
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display' }}>
                  Supporting Local Business Growth
                </CardTitle>
                <CardDescription className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  We believe in supporting our local Winnipeg business community. That's why WPEG: Free Invoice
                  is completely free for small businesses in our city. No hidden fees, no time limits,
                  just professional invoicing tools to help you succeed.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                    <div className="text-sm text-gray-600">Free Forever</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">∞</div>
                    <div className="text-sm text-gray-600">Unlimited Invoices</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">24/7</div>
                    <div className="text-sm text-gray-600">Always Available</div>
                  </div>
                </div>
                <Button
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="text-lg px-10 py-4 h-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started - It's Free!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20"></div>
              <CardHeader className="pb-8 relative z-10">
                <CardTitle className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display' }}>
                  Ready to transform your invoicing?
                </CardTitle>
                <CardDescription className="text-lg text-gray-300 leading-relaxed">
                  Join hundreds of Winnipeg businesses who've simplified their invoicing with WPEG: Free Invoice.
                  Start creating professional invoices in the next 2 minutes.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Button
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="text-lg px-10 py-4 h-auto bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Create Your First Invoice Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-gray-400 mt-4">
                  No credit card • No signup • Start immediately
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 container mx-auto px-6 py-12 border-t border-gray-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col mb-6 md:mb-0">
              <span className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display' }}>
                WPEG.app: Free Invoice Generator
              </span>
              <div className="flex flex-col space-y-1">
                <a href="https://mortgage.wpeg.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Winnipeg Mortgage Calculator</a>
                <a href="https://salary.wpeg.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Winnipeg Salary Calculator</a>
                <a href="https://portal.wpeg.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Useful FREE Tools</a>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <a href='https://ko-fi.com/N4N11N420X' target='_blank' rel="noopener noreferrer">
                  <img className="h-9 w-auto border-0" src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' alt='Buy Me a Coffee at ko-fi.com' />
                </a>
                <a href="https://www.buymeacoffee.com/emailsig" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="h-9 w-auto" />
                </a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600 mb-1">
                © 2026 WPEG.app: Free Invoice. Made with ❤️ in Winnipeg
              </p>
              <p className="text-xs text-gray-500">
                Powered by <a href="https://portal.wpeg.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">WPEG.app</a> • Free forever for Winnipeg small businesses
              </p>
              <p className="text-xs text-gray-400 mt-2">
                <a href="/terms" className="hover:text-gray-600 underline">Terms & Disclaimer</a> • <a href="/changelog" className="hover:text-gray-600 underline">v1.1.0</a> • Use at your own risk
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
