VivaEuropa v0.90.5 — FULL SNAPSHOT CHECKED
Base: v0.90.4 FULL SNAPSHOT

STATUS:
- Full project snapshot.
- Folder api preserved.
- manifest.webmanifest preserved and verified against the 13.09.2026 copy.
- legal folder preserved with DE draft legal documents.
- all project images/assets preserved.
- current index.html preserved from v0.90.4.

IMPORTANT:
Every future update must be created from the latest FULL SNAPSHOT.
Before creating a new ZIP, compare the complete file/folder inventory with the previous FULL SNAPSHOT.
Do not remove api, manifest.webmanifest, README.txt, legal, images or auxiliary files unless the user explicitly approves it.

CURRENT CORE FILES/FOLDERS:
- index.html
- manifest.webmanifest
- README.txt
- api/ai-company.js
- legal/
- apple-touch-icon.png
- icon-192.png
- icon-512.png
- taxi-category-icon.png
- ve001-de-bg.jpg
- vivaeuropa-logo-full.png
- demo-*.jpg

HISTORICAL NOTE — v0.88.5:
- VE-004 company card German-language cleanup
- Adresse / Öffnungszeiten / Über das Unternehmen / Bewertungen / Favoriten
- Messenger-Dienste separated from Social Media; empty rows hidden
- full phone display with country prefix when available
- Webseite button instead of WWW in DE
- German coupon placeholder and guest-card text
- existing functions and data structures preserved

NOTE:
This README is informational. The application behavior is defined by the current project files.


v0.90.6 — LEGAL IN-APP VIEWER FIX
- Legal documents are now embedded in index.html for reliable viewing.
- Footer links and registration legal links open inside VivaEuropa.
- No critical app flow depends on /legal/*.pdf existing on the deployed server.
- A visible Zurück flow is preserved through the normal module screen.
- Internal legal documents include a Drucken button.
- /legal/ PDF and DOCX files remain in the FULL SNAPSHOT for lawyer review/archive.


v0.90.7 — LEGAL FOOTER BUTTONS FIX
- Bottom legal links changed from anchors to real buttons.
- Explicit touch/click handlers added.
- Footer forced above overlays with z-index and pointer-events.
- Footer legal buttons use brighter visible styling.
- Registration legal links remain unchanged and continue to open in-app documents.


v0.90.8 — VERIFIED LEGAL FOOTER REAL FIX
- Replaced bottom legal anchors with direct buttons using inline openLegalDocument(...) handlers.
- Footer gets explicit position/z-index/pointer-events so transparent views cannot intercept taps.
- Legal footer text forced to bright blue.
- Verified inside the generated ZIP after creation.

VivaEuropa v0.90.23-R1 — Icon Batch 1
- Added first curated category icon pack under assets/category-icons/.
- Mapped icons to bakery, pharmacy/drugstore, hair salon/hair care/barber, ice cream, bicycle/bike sharing, taxi, restaurant categories.
- Shoemaker icon included and reserved for shoe_repair/shoemaker category IDs; current master does not yet contain a dedicated shoemaker ID.
- Existing guest quick category Apotheke and Taxi now use the curated image icons.
- Company profile category chip uses mapped icon when available.

