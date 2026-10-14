# Image and heritage verification audit

Checked on 14 October 2026. The audit covers every record currently published by `heritage-data.js`. Old hard-coded cards and their mismatched images were removed from the page.

## Published heritage records

| Heritage record | Displayed image | Source / creator | Licence or rights | Verification and load result |
|---|---|---|---|---|
| Thousand Pillar Basadi / Saavira Kambada Basadi, Moodbidri | `images/saavira-kambada-basadi.jpg` | [Wikimedia Commons file record](https://commons.wikimedia.org/wiki/File:Saavira_Kambada_Basadi_Enterence.jpg); आर्या जोशी | CC BY-SA 4.0; [licence](https://creativecommons.org/licenses/by-sa/4.0/) | Commons description identifies the 1000-pillared Jain temple at Moodbidri. Image visually inspected and loaded locally. |
| Kadri Manjunatha Temple, Kadri, Mangaluru | `images/kadri-manjunatha-temple.jpg` | [Wikimedia Commons file record](https://commons.wikimedia.org/wiki/File:Kadri_Manjunatha_Temple.jpg); Yakshitha | CC BY-SA 4.0; [licence](https://creativecommons.org/licenses/by-sa/4.0/) | File description identifies Kadri Manjunatha Temple. Temple and flagstaff visible; image visually inspected and loaded locally. |
| St. Aloysius Chapel, Mangaluru | `images/st-aloysius-chapel.jpg` | [Wikimedia Commons file record](https://commons.wikimedia.org/wiki/File:St_Aloysius_chapel,_Mangaluru_Front_view.jpg); Hariprasad Shetty10 | CC BY-SA 4.0; [licence](https://creativecommons.org/licenses/by-sa/4.0/) | File title identifies the Mangaluru chapel; the chapel exterior is visible. Image visually inspected and loaded locally. |
| Chowta Palace, Moodbidri | `images/chowta-palace.jpg` | [Wikimedia Commons file record](https://commons.wikimedia.org/wiki/File:Chowta_palace_Moodbidri.jpg); Darshan Shetty12 | CC BY-SA 4.0; [licence](https://creativecommons.org/licenses/by-sa/4.0/) | Commons title and description identify Chowta Palace, Moodbidri; image depicts the named building. Historical details beyond the image record are explicitly left unasserted. Image visually inspected and loaded locally. |
| Guru Basadi, Moodbidri | `images/guru-basadi.jpg` | [Wikimedia Commons file record](https://commons.wikimedia.org/wiki/File:Koti-Basadi-and-Guru-Basadi-Moodbidri.JPG); Vaikoovery | CC BY 3.0; [licence](https://creativecommons.org/licenses/by/3.0/) | Commons record identifies a paired view of Koti Basadi and Guru Basadi in Moodbidri. The image is labelled as a paired view, not an isolated Guru Basadi photograph. Image visually inspected and loaded locally. |
| Former APMC Market at Ashwathapura, Moodbidri | No image displayed | [Daijiworld local report](https://www.daijiworld.com/news/newsDisplay?newsID=247810); the article includes photos, but reuse permission was not established for this project | Not applicable; no image used | The report identifies the market and describes its history. A placeholder and location search link are displayed instead of reusing an image without verified rights. |

## Historical photograph

| Item | Local file | Source / photographer | Date and rights | Verification and load result |
|---|---|---|---|---|
| Base of a pillar in a Jain temple [i.e. Saavira Kambada Basadi] at Moodbidry, South Canara | `images/saavira-pillar-base-1866-1868.jpg` | [Digital Commonwealth / Boston Public Library record](https://www.digitalcommonwealth.org/search/commonwealth:3f465815c); Ross Thompson (1838–1919) | Circa 1866–1868; record states “No Copyright - United States,” with no known copyright restrictions | The catalogue title, date, photographer, location, and rights statement were checked. The downloaded albumen-print image visually depicts the carved pillar base. Local file opened and inspected. It is labelled archival, not modern. |

The historic image describes the pillar base at the named basadi, but its location metadata also includes Chandranāth Basti. It is therefore presented as an archival image of the temple site, not as a photograph of the entire building.

## Interactive map coordinates

Place pins use these exact OpenStreetMap features returned by the Photon geocoder; coordinates are not inferred from town centroids. © OpenStreetMap contributors, ODbL 1.0.

| Place | Coordinates (latitude, longitude) | Feature source | Pin |
|---|---|---|---|
| Thousand Pillar / Savira Khambada Basadi | 13.0741732, 74.9977182 | [OSM way 158711850 via Photon](https://photon.komoot.io/api/?q=Saavira%20Kambada%20Basadi%2C%20Moodbidri%2C%20India) | Verified |
| Kadri Manjunatha Temple | 12.8858853, 74.8556002 | [OSM way 143861136 via Photon](https://photon.komoot.io/api/?q=Kadri%20Manjunatha%20Temple%2C%20Mangaluru&limit=3) | Verified |
| St. Aloysius Chapel | 12.8737995, 74.8453615 | [OSM node 3960010445 via Photon](https://photon.komoot.io/api/?q=St%20Aloysius%20Chapel%2C%20Mangaluru&limit=3) | Verified |
| Chowta Palace | 13.0716349, 74.9963810 | [OSM way 158711839 via Photon](https://photon.komoot.io/api/?q=Chowta%20Palace%2C%20Moodbidri%2C%20India&limit=3) | Verified |
| Guru Basadi | — | Photon returned only the nearby Savira Khambada Basadi feature for the Guru Basadi query, so that unrelated pin was not reused. | No pin until exact feature can be verified |
| Former APMC Market at Ashwathapura | — | The available local report confirms a market building in Ashwathapura, but the geocoder did not identify an exact feature. | No pin until exact feature can be verified |

## Removed legacy cards

These former cards were removed because their claims and/or image-to-place matches could not be supported to the same standard. They are not shown as published heritage records:

- Kudroli Gokarnanatha Temple
- Gowri Temple
- Nyaya Basadi
- Chola Shetty Basadi
- Putthige Somanatheshwara Temple
- Ammanavara Basadi
- Koti Basadi
- Leppada Basadi
- Hire Basadi
- Badaga Basadi
- Hanuman Temple
- Mooduvenupura Venkatramana Temple
- Moodbidri Jain Matha & Manuscripts
- Historic Jain Memorials at Prantya

The previous Unsplash images, repeated generic Moodbidri temple images, and broken image URL are no longer used. No historical photograph is used as a substitute for a current site photograph.

## Source notes and category coverage

- The Thousand Pillar Basadi, Kadri Manjunatha Temple, and St. Aloysius Chapel facts are linked to the corresponding Karnataka Tourism pages in `heritage-data.js`.
- The Ashwathapura market entry uses a 2014 local news report. That report states the market’s foundation stone was laid in November 2006 and that it opened on 18 October 2007; the record identifies these as reported facts, not an official heritage designation.
- Chowta Palace and Guru Basadi entries avoid unsupported construction dates, patrons, and legends.
- No location-specific oral legend is asserted without a traceable source.
- The published database currently has entries in Architecture, Spiritual heritage, Historic buildings, and Markets. Traditional shops, Festivals, Manuscripts, and Cultural traditions are available as filter/contribution categories, but have no published record yet because a sufficiently verified entry was not found. They correctly return no cards rather than fabricated content.

## Load and interaction checks

- All five current Commons photographs loaded from their local files in the browser.
- The archival image was downloaded from its Digital Commonwealth record and opened locally.
- A deliberate missing-image test produced the expected 404 for the test-only bad path, then replaced the failed card image with the verified-photo placeholder and location search link. No page errors occurred.
- After a simulated broken card image, the photo-availability filter changed to show 4 verified-photo entries and 2 records needing a photo (the broken image and the entry that has no image).
- Browser checks confirmed 5/5 current photos and the archival image loaded; Moodbidri showed 4 matching cards/map links, Mangaluru 2, and Markets 1. The story dialog, archive lightbox, contribution storage/clear flow, and mobile menu were exercised.
- Mobile layout check at 390 px viewport reported no horizontal overflow.
- The interactive map uses Leaflet and OpenStreetMap tiles; only the four matching coordinate-sourced features above receive pins. Records without exact verified coordinates continue to show search links without misleading pins.
- Map verification loaded 9/9 tiles; the initial map showed 4 markers. Filtering Moodbidri showed 2 markers; Mangaluru showed 2. Marker popups and the “Focus interactive map” story action were exercised.
- Photo filtering returned 5 records with a verified image and 1 record needing a photo. A–Z sorting started with Chowta Palace; Clear filters restored the featured order.
- The contribution form rejected a selected image without permission confirmation, then stored the source URL, place/date, photographer, image and permission confirmation in the local demo dashboard. Test data was removed after the check.
- Detail-dialog initial heading focus, Escape-to-close, and focus restoration to the Read Story trigger were verified. Browser checks reported no JavaScript page errors.
- The 390 px mobile layout showed single-column cards and no horizontal document overflow; the mobile navigation opened.
