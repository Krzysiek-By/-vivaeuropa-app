VivaEuropa v0.90.45-R1-PLACEHOLDER-STYLE

FULL CLEAN SNAPSHOT
Base: v0.90.32-R1-PREMIUM-ICONS-COMPLETE

STATUS:
- Project cleaned and verified after repository cleanup.
- No functional app changes intended.
- Current index.html application logic preserved.
- VE-001 background image ve001-de-bg.jpg preserved.
- GPS / guest radius logic preserved.
- Account 001 unlimited-photo behavior preserved.
- IndexedDB photo storage/migration preserved.
- Company save flow preserved.
- 18 main category icons preserved.
- 9 quick icons preserved.
- API, legal folder, manifest and category MASTER files preserved.

CLEANUP COMPLETED:
- Removed obsolete demo-*.jpg files.
- Removed old demo fallback references from index.html.
- Removed obsolete taxi-category-icon.png.
- Removed old Polish duplicate category icon files.
- Removed old individual category icons:
  bakery.png
  bicycle.png
  hairdresser.png
  ice-cream.png
  pharmacy.png
  restaurant.png
  shoemaker.png
  taxi.png
- Removed wrongly nested assets/category-icons/quick-icons/ folder.
- Removed duplicate legal DOCX/PDF files from repository root.
- Canonical legal documents remain in legal/.
- 17-sport.png and 18-transport.png are active current category icons and are preserved.

CURRENT ROOT:
- api/
- assets/
- legal/
- README.txt
- VivaEuropa-KATEGORIE-MASTER-v1.json
- VivaEuropa-KATEGORIE-MASTER-v1.txt
- apple-touch-icon.png
- icon-192.png
- icon-512.png
- index.html
- manifest.webmanifest
- ve001-de-bg.jpg
- vivaeuropa-logo-full.png

ASSETS / CATEGORY ICONS:
- 01-automotive.png
- 02-business.png
- 03-culture.png
- 04-education.png
- 05-leisure.png
- 06-public.png
- 07-finance.png
- 08-food-drink.png
- 09-government.png
- 10-health-wellness.png
- 11-housing.png
- 12-lodging.png
- 13-nature.png
- 14-religion.png
- 15-services.png
- 16-shopping.png
- 17-sport.png
- 18-transport.png

ASSETS / QUICK ICONS:
- city-hall.png
- ev-charging.png
- gas-station.png
- hospital.png
- pharmacy.png
- police.png
- roadside-assistance.png
- taxi.png
- wc.png

LOGIN ROUTE FIX:
- From the account registration screen, the link "Du hast bereits ein Konto? Anmelden" now returns to VE-002 account-type selection.
- This prevents a company account from being sent into the Nutzer login flow by mistake.
- Direct company login from VE-002 remains unchanged.

CHANGES IN v0.90.35-R1:
- Added a visible Abmelden button in the top-right area of VE-006 for company accounts.
- Reduced excessive vertical spacing before the legal footer on VE-002 and VE-003/home results.
- No other functional changes.


CHANGES IN v0.90.36-R1:
- Reduced the excessive empty gap before the legal footer on VE-002 and VE-003 by removing the forced viewport minimum height only on those two active views.
- Prevented the brief Polish-text flash during refresh in DE-only mode by keeping the page hidden until the German translation pass has completed.
- No other functional changes.


CHANGES IN v0.90.37-R1:
- Fixed the root cause of the excessive legal-footer gap across views.
- Removed the forced viewport minimum height from the main app content after VE-001.
- Normalized bottom spacing of panels, company cards, guest results and the VE-002 welcome wrapper.
- Legal footer now follows page content with a small consistent gap while retaining bottom clearance for mobile navigation.
- The German-only refresh paint guard from v0.90.36 remains unchanged.
- No other functional changes.


CHANGES IN v0.90.38-R1:
- Fixed the legal-footer spacing at the structural level.
- Root cause: the legal footer lived outside <main>, while the active app view/main could reserve viewport height, creating a large empty gap that margin tweaks could not reliably remove.
- The single legal footer is now moved into the currently active view, directly after that view's content.
- Footer spacing is now small and consistent across VE-002, VE-003 and the other app views, with mobile bottom-navigation clearance preserved.
- No other functional changes.


CHANGES IN v0.90.39-R1:
- Fixed the actual CSS cascade problem that kept overriding the previous footer-spacing fixes.
- Older legal-footer rules later in the stylesheet used the same selector with !important, so earlier fixes were being overwritten.
- Added one definitive footer rule at the very end of the stylesheet, where it wins the cascade.
- The content block directly before the footer now has its bottom margin/padding removed, so the footer follows the page content closely on all active views.
- Mobile bottom-navigation clearance is preserved.
- No other functional changes.


CHANGES IN v0.90.40-R1:
- Fixed the actual missing JavaScript helper for legal-footer placement.
- setView() already called placeLegalFooterInActiveView(), but the helper function itself was absent, so the footer was never moved into the active view.
- The helper now moves the single legal footer directly after the content of the active view; existing footer spacing rules can finally take effect.
- No other functional changes.


CHANGES IN v0.90.41-R1:
- VE-002 footer spacing from v0.90.40 is preserved.
- Added a separate definitive fix for VE-003, whose results section has its own layout and bottom spacing.
- VE-003 results wrapper can no longer reserve extra bottom height/padding before the legal footer.
- Footer helper now also clears the bottom margin/padding/min-height of the content block directly before the footer on every active view.
- Checked all app views: VE-002 welcome, VE-003 home/results, VE-004 company, VE-005 account, VE-006 admin, VE-007 editor, VE-008 reset/new-password and module/legal view.
- No other functional changes.


CHANGES IN v0.90.42-R1:
- Added a clear 14 px gap between the two yellow guest-mode notices on VE-003.
- Replaced local/personal-looking placeholder examples with neutral German examples (München, Berlin, generic company/contact data).
- Made placeholder and helper text very light gray while keeping it clearly readable on the dark background.
- No other functional changes.


CHANGES IN v0.90.43-R1:
- Audited all actual input/textarea placeholders across the full app.
- Removed remaining Polish-style placeholder examples such as "np." and Polish-domain examples from rendered/dynamic placeholders.
- Replaced them with neutral German examples such as München, Berlin, Musterfirma, beispiel.de and generic German register/tax examples.
- Global light-gray placeholder styling from v0.90.42 is preserved.
- No functional logic changes.


CHANGES IN v0.90.44-R1:
- Increased placeholder visibility globally across the entire app.
- Placeholder text is now a clearly visible light gray (#cbd5e1), fully opaque and semibold.
- Entered user text remains visually distinct from placeholders.
- No functional logic changes.


CHANGES IN v0.90.45-R1:
- Adjusted placeholder appearance globally to match the approved reference.
- Placeholders are now light gray, clearly visible, but regular-weight and visually lighter than real entered values.
- No functional logic changes.

IMPORTANT:
Every future update must be created from the latest confirmed FULL snapshot.

Before creating a new ZIP:
1. Compare the complete file/folder inventory with the latest confirmed full snapshot.
2. Do not remove api/, legal/, manifest.webmanifest, category MASTER files, PWA icons, VE-001 background or active assets unless explicitly verified.
3. Change only what was requested.
4. Create a complete ZIP snapshot.
5. Verify the ZIP inventory after creation.
6. Test the live Vercel deployment before promoting the new ZIP as the safe rollback base.

This README is the reference inventory for v0.90.36-R1 after the footer-spacing and DE-only refresh-language fixes.
