ROOTS & STORIES — Digital Heritage Preservation Portal
Location focus: Moodbidri and Mangaluru, Dakshina Kannada, Karnataka.

RUN LOCALLY
1. Keep index.html, style.css, heritage.css, heritage-data.js, script.js, and the images folder together.
2. In this folder, run: python -m http.server 8000
3. Open http://localhost:8000
   A local web server is recommended instead of opening index.html as a file.

PROJECT FILES
- index.html: page structure and existing visual design.
- style.css and heritage.css: original responsive styling and heritage-specific components.
- heritage-data.js: structured place, photo attribution, source and archive records.
- script.js: filtering, search, story dialog, gallery, map links and local contribution form.
- images/: locally stored, attributed Commons photographs.
- IMAGE-AUDIT.md: image source, attribution, license and verification report.

FUNCTIONALITY
- Search matches names, local names, locations, categories and historical stories.
- Location and category filters are applied together.
- Photo-availability filters, A–Z/Z–A/location sorting, and Clear filters are provided.
- Search includes historical story terms and source metadata.
- Read story opens an accessible dialog with image, history, significance, legend/oral tradition, map position and references.
- The interactive OpenStreetMap view shows only coordinate-verified pins and follows active filters. Places without verified coordinates still have Google Maps search links.
- Verified current photographs and the identified circa 1866–1868 Saavira Kambada archive photograph appear in the gallery.
- The contribution form collects a specific locality, source link, approximate date, photo attribution and an optional small photograph in this browser only.

EVIDENCE AND LIMITATIONS
- A missing verified site photograph is shown as “Verified photograph not available yet,” with a search link.
- Historical dates and interpretations are included only where linked sources support them; otherwise the record says what still needs verification.
- Legends are separate from documented history. No location-specific legend is asserted unless a traceable source is available.
- One historical image is included because its Digital Commonwealth record identifies the site, approximate date, photographer and “No Copyright - United States” rights statement.
- Contributions are local demo data, not reviewed, uploaded, or shared. This project has no server, authentication, or real moderation workflow.
- Categories with no verified published record are available for community contributions but will correctly show no matching cards until sourced records are added.
- An internet connection is required for external reference links, Google Maps, and Google Fonts. Site photographs are local.
- The interactive map requires internet access to load Leaflet 1.9.4 and OpenStreetMap tiles. Map data © OpenStreetMap contributors, ODbL 1.0; Photon is used for geocoding. Coordinate sources are recorded per place. Places without an exact matched coordinate have no pin until verified.
