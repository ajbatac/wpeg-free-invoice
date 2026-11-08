import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.get("/changelog/rss", async (c) => {
    const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>WPEG.app: Free Invoice Generator - Changelog</title>
  <link>https://invoice.wpeg.app/changelog</link>
  <description>The latest updates, improvements, and fixes for WPEG.app.</description>
  <language>en-us</language>
  <lastBuildDate>Sun, 08 Nov 2026 00:00:00 GMT</lastBuildDate>
  <atom:link href="https://invoice.wpeg.app/changelog/rss" rel="self" type="application/rss+xml" />

  <item>
    <title>v1.2.0 - Mobile Experience, Layout &amp; Quick Tax Presets</title>
    <link>https://invoice.wpeg.app/changelog</link>
    <guid isPermaLink="false">v1.2.0-2026-11-08</guid>
    <pubDate>Sun, 08 Nov 2026 00:00:00 GMT</pubDate>
    <description><![CDATA[
      <ul>
        <li><strong>Mobile &amp; Tablet Live Preview:</strong> You can now toggle smoothly between editing your invoice details and viewing the live PDF preview right on your phone or tablet before downloading.</li>
        <li><strong>Enhanced Line Items Layout:</strong> Item rows now adapt cleanly on smaller screens with spacious touch buttons, making it effortless to add descriptions, quantities, and rates on any device.</li>
        <li><strong>One-Click Tax Presets:</strong> Added convenient quick-select buttons for Manitoba sales tax (12% GST+PST), 5% GST only, and tax-exempt transactions.</li>
        <li><strong>Company Logo Upload &amp; Management:</strong> Easily upload, review, and remove your business logo with instant preview feedback.</li>
        <li><strong>Timezone-Accurate Dates:</strong> Improved date handling so that invoice issue dates and due dates always reflect your exact local calendar day accurately.</li>
        <li><strong>Refined Template Previews:</strong> Improved visual alignment, template indicators, and full-screen preview modal across all 10 invoice styles.</li>
      </ul>
    ]]></description>
  </item>

  <item>
    <title>v1.1.0 - Domain &amp; Brand Migration</title>
    <link>https://invoice.wpeg.app/changelog</link>
    <guid isPermaLink="false">v1.1.0-2026-02-21</guid>
    <pubDate>Sat, 21 Feb 2026 00:00:00 GMT</pubDate>
    <description><![CDATA[
      <ul>
        <li><strong>New Domain Release:</strong> We have officially moved to WPEG.app. This change reflects our growth and commitment to providing a modern application experience.</li>
        <li><strong>Visual Refinement:</strong> Updated all branding across the site and inside the PDF invoices to the new .app identity.</li>
        <li><strong>Enhanced Social Previews:</strong> Improved how invoices look when shared on social media and messaging apps with updated preview images.</li>
        <li><strong>Consistency Updates:</strong> Standardized footer notices across all 10 invoice templates to ensure your business always looks professional.</li>
      </ul>
    ]]></description>
  </item>

  <item>
    <title>v1.0.0 - Initial Launch</title>
    <link>https://invoice.wpeg.app/changelog</link>
    <guid isPermaLink="false">v1.0.0-initial</guid>
    <pubDate>Mon, 01 Jan 2026 00:00:00 GMT</pubDate>
    <description>The first public version of WPEG: Free Invoice Generator. Featuring 10 professional templates, instant PDF downloads, and complete data privacy through local storage.</description>
  </item>

</channel>
</rss>`;

    return c.text(rssContent, 200, {
        "Content-Type": "application/xml",
    });
});

export default app;
