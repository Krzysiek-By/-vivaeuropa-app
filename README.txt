VivaEuropa v0.90.66-R1-LOGIN-CLEANUP

Zmiany:
- dolny pasek nawigacyjny: fixed do viewportu, auto-hide przy scroll w dół, powrót przy scroll w górę / zatrzymaniu;
- przycisk Konto erstellen dla gościa prowadzi do istniejącego VE-002 (wybór Privatperson / Unternehmen), bez tworzenia nowego ekranu.

VivaEuropa v0.90.64-R1-SCHNELLHILFE-PLACEHOLDER
Datum: 2026-09-17

- Schnellhilfe → Polizei no longer loads nearby police stations.
- Polizei quick help now opens a compact emergency card with Europa-Notruf 112.
- Normal Polizei category/search remains available separately and keeps the existing police-station search logic.
- WC, hospital quick help, guest ads and all other functions are unchanged.

VivaEuropa v0.90.62-R1-BRANDED-GUEST-ADS
Test ads: VE-002 Thermomix, guest results Mercedes-Benz; guest-only; no ranking influence.

VivaEuropa v0.90.61-R1-VE002-GUEST-AD
- VE-002: one discreet test advertisement slot for non-logged-in guests only.
- Registered/logged-in users remain ad-free.
- Existing guest search-results advertisement remains separate and unchanged.
- No changes to ranking, WC, Polizei or hospital search logic in this update.

VivaEuropa v0.90.60-R1-HOSPITAL-DYNAMIC-QUICKHELP
Datum: 2026-09-17

ÄNDERUNGEN v0.90.58
- Schnellhilfe auf Startseite: Polizei, Feuerwehr, Notarzt, Krankenhaus.
- WC aus Schnellhilfe entfernt.
- Neuer Block Schnellzugriff: WC, Ladestation, Apotheke, Tankstelle.
- Schnellzugriff ist als Standardbelegung vorbereitet; spätere Anpassung nur für angemeldete Nutzer/Firmen vorgesehen.
- Feuerwehr und Notarzt erhalten eigene VivaEuropa-Schnellhilfe-Icons.
- Krankenhaus-Schnellhilfe startet die vorhandene Krankenhaus-Suche.
- WC-Schnellzugriff nutzt weiterhin die schnelle OSM/Overpass-WC-Suche.

VivaEuropa v0.90.57-R1-WC-COMMUNITY-PROTOTYPE

FULL SNAPSHOT / CURRENT TEST BUILD
Base: v0.90.53-R1-WC-POLICE-FULL-SNAPSHOT

CHANGES IN v0.90.54-R1:
- Fixes police endpoint reliability after live test returned "Polizeidienststellen konnten gerade nicht geladen werden".
- Police Overpass requests now use the same proven sequential fallback pattern as the working WC endpoint.
- Replaced nwr shorthand with explicit node/way/relation clauses for broader Overpass compatibility.
- Keeps the ordinary public police-station filter and exclusion of specialist/administrative police units.
- No UI/layout changes outside the police data endpoint.

PREVIOUS CHANGE NOTES FOLLOW:

VivaEuropa v0.90.53-R1-WC-POLICE-FULL-SNAPSHOT

FULL SNAPSHOT / CURRENT TEST BUILD
Base: v0.90.49-R1-CLIENT-ACCESS-ARCHITECTURE

CHANGES IN v0.90.53-R1:
- Full project snapshot verified against v0.90.49 base: no base files missing.
- Includes WC prototype via /api/toilets.js (OpenStreetMap/Overpass).
- Includes Polizei prototype via /api/police.js.
- Polizei results are filtered toward normal public police stations / first-contact locations; specialist units are excluded where identifiable.
- WC and Polizei cards use distance-based results and external route handoff instead of an internal map.
- Route chooser supports Google Maps or Apple Maps and walking or driving.
- Polizei card uses EU emergency number 112 for emergency calling.
- Internal VE-003 map remains intentionally disabled.

PREVIOUS CHANGE NOTES FOLLOW:

VivaEuropa v0.90.51-R1-WC-POLICE-ROUTE-CHOOSER

Zmiany względem v0.90.50:
- Quick Icon „Polizei” pobiera najbliższe publiczne posterunki/komisariaty z OpenStreetMap przez /api/police.js.
- Karty policji pokazują odległość i przycisk „Route anzeigen”.
- „Route anzeigen” pozwala wybrać Google Maps albo Apple Maps oraz tryb „Zu Fuß” lub „Auto”.
- Ten sam wybór mapy działa teraz również dla WC.
- Przycisk „Notruf 112” uruchamia połączenie tel:112. 112 działa w całej UE i łączy z odpowiednią służbą alarmową; używać tylko w nagłych przypadkach.

VivaEuropa v0.90.50-R1-WC-ROUTE-PROTOTYPE

VivaEuropa v0.90.49-R1-CLIENT-ACCESS-ARCHITECTURE

FULL CLEAN SNAPSHOT
Base: v0.90.48-R1-GUEST-PLUS-WOW-V1

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


CHANGES IN v0.90.46-R1:
- Completed a full German-language audit of all user-facing dynamic views.
- Replaced remaining hardcoded Polish text in registered-user, company, admin, location, refresh, guest and module flows with German.
- Preserved internal translation dictionaries, technical category keys and code comments because they are not displayed and are needed for future multilingual support.
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

v0.90.47 – GUEST PLUS PROMO TEST
- VE-003 guest notice replaced with a premium-style VivaEuropa Plus promo block.
- Test price displayed as 2 € / Monat.
- Added inline CTA buttons in guest search results area.
- Added guest promo reminder modal, limited to at most once every 2 days for guest users.
- CTA currently routes to account/register flow as placeholder for later subscription/payment implementation.

VivaEuropa v0.90.47-R2 – STARTUP HOTFIX
- Fixed a JavaScript syntax error inherited from the DE text audit in the laterRoadmap module.
- The broken line is restored as a valid intro property.
- Guest Plus promo from v0.90.47-R1 is preserved unchanged.
- No other functional changes.

v0.90.48-R1 – GUEST PLUS WOW VARIANT 1
- Based on confirmed v0.90.47-R2 startup-hotfix base.
- Only the guest Plus promo visual presentation was redesigned to match approved Variant 1.
- Existing 2-day guest reminder logic and registration CTA flow are preserved.
- Uses existing ve001-de-bg.jpg; no new asset files added.

v0.90.49 – CLIENT ACCESS ARCHITECTURE
- Added a central 3-level private-client access model: GUEST / FREE / PLUS.
- New private-user features should use the central access matrix instead of ad-hoc guestMode checks.
- GUEST and FREE: core search, GPS/manual location, distance, open/closed status, address/hours, phone, website, maps/navigation, basic filters, up to 10 search results and radius up to 10 km.
- FREE: up to 10 favorites. GUEST: favorites require a free account.
- PLUS: prepared gates for unlimited results/radius/favorites, full contact channels, saved places, user modes, discounts, AI search/day plan/review summary, comparisons, backup plan, translated messaging/e-mail, smart contact templates, AI call assistance and saving important answers.
- Non-paying users continue seeing the existing VivaEuropa Plus WOW promotion; the reminder remains limited to once every 2 days.
- Existing GPS and company/admin logic preserved; company/admin accounts bypass private-user limits.
- Payment is not connected yet. Registered private users default to FREE; future billing can switch the plan centrally with setClientSubscriptionPlan('plus').


UPDATE v0.90.50:
- VE-003: wewnetrzna mapa Leaflet/OSM zostala wylaczona i usunieta z interfejsu.
- VE-003: dodano prosty blok informacyjny o odleglosci i nawigacji zewnetrznej.
- WC: Quick Icon pobiera publiczne toalety z OpenStreetMap/Overpass wedlug aktualnego GPS/promienia.
- WC: specjalne karty miejsca z odlegloscia, godzinami/oplata/dostepnoscia gdy dane sa dostepne.
- WC: Route anzeigen otwiera Apple Maps na urzadzeniach Apple, Google Maps na pozostalych; tryb pieszy.
- Zrodlo WC ma atrybucje OpenStreetMap/ODbL. Publiczny Overpass jest rozwiazaniem testowym; produkcyjnie nalezy przejsc na wlasny import/hostowane zrodlo.


--- v0.90.52-R1-POLICE-STATIONS-FILTER-FIX ---
- Police search hardened with parallel Overpass fallback endpoints.
- Results restricted to ordinary public-facing police stations; obvious Bundespolizei, criminal police, headquarters and specialist units are excluded.
- VE-003 heading changed to Polizeidienststellen in deiner Nähe.

Update v0.90.55:
- WC i Polizei: lokalny cache 15 min + awaryjne dane do 60 min
- krótsze timeouty endpointów i dłuższy cache HTTP
- kompaktowe karty punktów, szczególnie na telefonie

Update v0.90.56:
- stały blok Schnellhilfe na stronie głównej: WC, Polizei, Feuerwehr, Notarzt
- Feuerwehr i Notarzt: prosta karta alarmowa z 112, bez mapy/remizy
- WC i Polizei przeniesione z ogólnego rzędu kategorii do Schnellhilfe

Update v0.90.57:
- WC: przycisk potwierdzenia istniejącej toalety
- WC: przycisk zgłoszenia nowej toalety na podstawie aktualnego GPS
- testowe zgłoszenia są zapisywane lokalnie; centralna baza wymaga osobnego backendu/tabeli

UPDATE v0.90.59
- WC: jedno dynamiczne wyszukiwanie do maks. 5 km; priorytet wyników do 1 km.
- WC: przy braku wyników do 5 km pojawia się wyraźne „Neue Toilette melden”.
- WC: „Neue Toilette melden” pozostaje dostępne także wtedy, gdy wyniki istnieją.
- Gast: przykładowa, wyraźnie oznaczona testowa reklama wyłącznie na stronie wyników; bez wpływu na ranking.
- Zalogowani użytkownicy nie widzą testowej reklamy zewnętrznej.

=== v0.90.60 ===
- Schnellhilfe > Krankenhaus uses dedicated nearby hospital search.
- Dynamic radius: 10 km -> 25 km -> 50 km; stops at first radius with results.
- This logic applies only to Schnellhilfe Krankenhaus, not the normal hospital category.
- Added api/hospitals.js.
