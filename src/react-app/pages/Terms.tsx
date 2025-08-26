import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Terms of Use & Disclaimer
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Important Legal Notice</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                WPEG: Free Invoice is provided "as is" without warranty of any kind. By using this service, 
                you acknowledge and agree to the following terms and disclaimers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Use at Your Own Risk</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This invoice generator tool is provided for convenience and general informational purposes only. 
                Users are solely responsible for:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                <li>Verifying the accuracy of all invoice information before sending to clients</li>
                <li>Ensuring compliance with local, provincial, and federal tax laws and regulations</li>
                <li>Maintaining appropriate business records and documentation</li>
                <li>Following applicable business licensing and registration requirements</li>
                <li>All content, data, and information entered into invoices</li>
                <li>Any consequences arising from the use of generated invoices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">User-Generated Content Disclaimer</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>All invoice content is user-generated.</strong> WPEG provides only the software tools - users 
                create, input, and control all data, information, descriptions, amounts, and content that appears 
                in invoices. WPEG:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                <li>Does not review, verify, approve, or endorse any invoice content</li>
                <li>Has no knowledge of or control over user business transactions</li>
                <li>Cannot verify the accuracy of user-entered business or client information</li>
                <li>Is not responsible for any errors, omissions, or inaccuracies in user-created invoices</li>
                <li>Bears no responsibility for the appropriateness or legality of invoice content</li>
                <li>Assumes no liability for disputes arising from invoice content or transactions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">No Indemnity - Complete User Responsibility</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>WPEG provides no indemnity whatsoever.</strong> Users agree to indemnify, defend, and hold 
                harmless WPEG, its affiliates, officers, directors, employees, and agents from and against any and all:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                <li>Claims, demands, lawsuits, or legal proceedings arising from user-generated invoice content</li>
                <li>Disputes between users and their clients or business partners</li>
                <li>Issues related to payment collection, non-payment, or payment disputes</li>
                <li>Tax compliance issues, audits, or penalties related to user invoices</li>
                <li>Professional licensing or business compliance matters</li>
                <li>Errors in calculations, descriptions, amounts, or other invoice details</li>
                <li>Any damages, losses, costs, or expenses arising from use of this service</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                Users acknowledge they are solely responsible for their business operations, client relationships, 
                and all content they generate using this tool.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">No Professional or Legal Advice</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                WPEG: Free Invoice does not provide legal, tax, accounting, or professional business advice. 
                This tool does not replace consultation with qualified professionals regarding your specific 
                business needs, tax obligations, or legal requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Complete Limitation of Liability</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>To the fullest extent permitted by law, WPEG's liability is completely excluded.</strong> 
                WPEG and its affiliates shall not be liable for any:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                <li>Direct, indirect, incidental, special, punitive, or consequential damages</li>
                <li>Loss of profits, revenue, data, business opportunities, or goodwill</li>
                <li>Errors, omissions, inaccuracies, or mistakes in generated invoices or calculations</li>
                <li>Service interruptions, data loss, system failures, or technical malfunctions</li>
                <li>Issues arising from reliance on user-generated content or invoice information</li>
                <li>Business disputes, client conflicts, or payment collection issues</li>
                <li>Legal, regulatory, or compliance problems arising from invoice use</li>
                <li>Tax assessment issues, penalties, or audit consequences</li>
                <li>Professional liability or business licensing matters</li>
                <li>Any costs, expenses, or losses of any kind whatsoever</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                <strong>Maximum liability limitation:</strong> Even if any liability were to be established, 
                WPEG's maximum aggregate liability shall not exceed $0.00 (zero dollars).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Accuracy Disclaimer</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                While we strive to provide accurate invoice templates and calculations, users must verify 
                all information before use. Tax calculations, if any, are estimates only and may not reflect 
                current tax rates or specific business circumstances. Always consult with a qualified 
                accountant or tax professional for tax-related matters.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Data and Privacy</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Users are responsible for protecting sensitive business and client information. While we 
                implement security measures, no system is completely secure. Users should not include 
                sensitive information beyond what is necessary for basic invoicing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Service Availability</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                WPEG: Free Invoice is provided free of charge with no guarantee of continuous availability. 
                We reserve the right to modify, suspend, or discontinue the service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Governing Law</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These terms are governed by the laws of Manitoba, Canada. Any disputes shall be subject 
                to the exclusive jurisdiction of the courts of Manitoba.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For questions about these terms, please contact WPEG through our 
                <a href="https://portal.wpeg.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  official portal
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Final Acknowledgment</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>BY USING THIS SERVICE, YOU EXPLICITLY ACKNOWLEDGE AND AGREE THAT:</strong>
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                <li>You are using this tool entirely at your own risk</li>
                <li>WPEG bears no responsibility for your invoice content or business operations</li>
                <li>You will not hold WPEG liable for any issues arising from your use of this service</li>
                <li>You understand that all invoice content is your responsibility as the user</li>
                <li>You will seek professional advice for business, legal, and tax matters</li>
                <li>These disclaimers are comprehensive and apply to all aspects of service use</li>
              </ul>
            </section>

            <div className="border-t pt-6 mt-8 bg-red-50 p-4 rounded-lg">
              <p className="text-xs text-red-800 font-semibold text-center mb-2">
                IMPORTANT: READ CAREFULLY BEFORE USING
              </p>
              <p className="text-xs text-red-700 text-center">
                By using WPEG: Free Invoice, you acknowledge that you have read, understood, 
                and agree to be bound by these comprehensive terms, disclaimers, and limitations. 
                You accept full responsibility for all invoice content and waive any claims against WPEG.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
