# Internal Changelog - WPEG: Free Invoice

## [v1.2.0] - 2026-11-08

### UI/UX Layout, Spacing & Responsive Redesign
- **Design System & Skill Guidance**: Applied `impeccable` and `design-taste-frontend` rules to transform layout rhythm, card hierarchy, input groupings, and mobile usability.
- **Mobile & Tablet Live Preview Switcher**:
  - Path: `src/components/InvoiceForm.tsx`
  - Added segmented view state `const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');`
  - Enabled mobile and tablet users to toggle cleanly between full form editing and full live PDF preview before downloading.
  - Retained sticky dual-column desktop layout on `xl` viewports (`xl:w-5/12 2xl:w-1/2`).
- **Responsive Line Items Architecture**:
  - Path: `src/components/InvoiceForm.tsx`
  - Replaced tight 12-column grid that squashed trash buttons on mobile screens.
  - Implemented card-based line item layout on `< md` screens with full-width description, 3-column quantity/rate/amount sub-grid, and touch-target delete buttons.
  - Implemented desktop 12-column grid (`5 / 2 / 2 / 2 / 1`) with aligned headers and tabular numbers.
- **Invoice Preview Scaling & Centering**:
  - Path: `src/components/InvoicePreview.tsx`
  - Fixed scaling layout: `width: scale < 1 ? 882 * scale : '100%'` with `margin: '0 auto'`, preventing horizontal shift or overflow on small viewports.
  - Added full-screen preview lightbox with backdrop blur and responsive modal sizing.
- **Logo Uploading & Management**:
  - Path: `src/components/InvoiceForm.tsx`
  - Added file dropzone styling with instant logo preview and dedicated `removeLogo` handler (`setBusinessInfo({ ...businessInfo, logo: '' })`).
- **Invoice Totals & Manitoba Tax Presets**:
  - Path: `src/components/InvoiceTotals.tsx`
  - Added quick tax preset chips: `MB GST+PST (12%)`, `GST Only (5%)`, and `No Tax (0%)`.
  - Added percentage adornment icon and tabular-numeral formatting for subtotal, tax amount, and grand total.
- **Template Selector Enhancements**:
  - Path: `src/components/TemplateSelector.tsx`
  - Added active checkmark badge (`<Check className="h-2.5 w-2.5 stroke-[3]" />`) and active ring highlight (`ring-2 ring-blue-500/20`).
  - Added keyboard interaction (`onKeyDown` handling Enter/Space).
- **Dashboard & Invoice List Layout Polish**:
  - Path: `src/components/InvoiceList.tsx`, `src/react-app/pages/Dashboard.tsx`
  - Refined invoice card metadata badges (client name, creation date, due date, status pill, total amount).
  - Improved header navigation bar with back button breadcrumbs and responsive action buttons.

### Runtime Correctness, Edge Cases & Logic Fixes
- **Local Timezone-Safe Date Parsing**:
  - Path: `src/lib/invoice-utils.ts`
  - Lines: `formatDate(dateString: string): string`
  - Extracted year, month, day components from `YYYY-MM-DD` strings to create local `new Date(year, month - 1, day)`, eliminating UTC midnight 1-day off-by-one errors for Western timezones. Added NaN and invalid input fallbacks.
- **Safe Numeric Calculations & NaN Guards**:
  - Path: `src/lib/invoice-utils.ts`
  - Hardened `calculateItemAmount`, `calculateSubtotal`, `calculateTaxAmount`, `calculateTotal`, and `formatCurrency` with explicit `Number(...) || 0` conversions to prevent string concatenation or `NaN` displays.
- **Safe DOM Cleanup in PDF Generation**:
  - Path: `src/lib/pdf-generator.ts`
  - In `generatePDF`, wrapped cleanup in `if (container.parentNode) container.parentNode.removeChild(container);` to prevent unhandled `NotFoundError` DOM exceptions.

### Code Quality, Linting & Architecture (SOLID / DRY)
- **Fast Refresh React Component Separation**:
  - Path: `src/lib/utils.ts`, `src/components/ui/badge.tsx`
  - Moved `badgeVariants` definition to `src/lib/utils.ts` alongside `buttonVariants`, allowing `badge.tsx` to export only React components.
  - Achieved **0 ESLint errors and 0 ESLint warnings** under strict rules.
- **Dependency Pruning & Update**:
  - Path: `package.json`, `package-lock.json`
  - Pruned deprecated stub package `@types/jspdf` as `jspdf` bundles its own type definitions.
  - Synchronized packages via `npm update` and verified full build with `tsc -b && vite build`.
- **Hook Integration**:
  - Added `.github/hooks/impeccable.json` and `.cursor/hooks.json` to enforce post-tool-use code and layout quality audits.

## [v1.1.0] - 2026-02-21

### Major Branding & Domain Migration
- **Objective**: Migrated the primary domain from `wpeg.ca` to `wpeg.app`.
- **Domain Updates**:
    - `index.html`: Updated `og:url` and `twitter:url` to `https://invoice.wpeg.app/`.
    * `src/react-app/pages/Home.tsx` & `Dashboard.tsx`: Updated footer links to `https://portal.wpeg.app`.
    * `src/react-app/pages/Terms.tsx`: Updated official portal link.
    * `public/manifest.webmanifest`: Updated name from `WPEG.ca` to `WPEG.app`.
- **Text Branding**: Systematically updated "WPEG.ca" to "WPEG.app" in UI text and PDF footers.

### SEO & Metadata Enhancements
- **OG Image**: Updated `og:image` and `twitter:image` to point to `/wpeg-invoice-og.png` in `index.html` and `Seo.tsx`.
- **Title Tags**: Added `.app` suffix to page titles for branding consistency.
- **Sitemap**: Updated `sitemap.xml` with new `wpeg.app` URLs.

### Feature Consistency
- **PDF Footer Notices**: Added `Free Invoice by WPEG.app` or `Generated by WPEG.app` to all 10 PDF templates in `src/lib/pdf-generator.ts`.
    - Templates affected: Classic, Modern, Professional, Minimalist, Elegant, CXO, Creative, Brutalist, Pastel, Eco.

### Documentation & Maintenance
- **README.md**: Simplified to a high-level summary for public consumption.
- **Footer**: Updated copyright year to 2026 and initialized versioning (`v1.1.0`).
- **Footer Interaction**: Made the version number clickable, linking to the public `/changelog` page.

## [v1.0.0] - Initial Release
- Initial release of WPEG: Free Invoice Generator.
- Features: 10 templates, local storage persistence, responsive design.
