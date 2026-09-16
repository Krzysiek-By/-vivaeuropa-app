VivaEuropa v0.90.35-R1-SMALL-UI-POLISH

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

IMPORTANT:
Every future update must be created from the latest confirmed FULL snapshot.

Before creating a new ZIP:
1. Compare the complete file/folder inventory with the latest confirmed full snapshot.
2. Do not remove api/, legal/, manifest.webmanifest, category MASTER files, PWA icons, VE-001 background or active assets unless explicitly verified.
3. Change only what was requested.
4. Create a complete ZIP snapshot.
5. Verify the ZIP inventory after creation.
6. Test the live Vercel deployment before promoting the new ZIP as the safe rollback base.

This README is the reference inventory for v0.90.34-R1 after the login-route fix.
