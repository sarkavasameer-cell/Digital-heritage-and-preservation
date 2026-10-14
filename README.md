# Roots & Stories — Heritage Portal

A digital heritage preservation portal focused on Moodbidri and Mangaluru, Karnataka. The static site includes sourced heritage records, locally stored attributed photographs, search and filters, historical stories, a map, and a community-contribution demo.

## View the site

After enabling GitHub Pages in **Settings → Pages → Build and deployment** with **Deploy from a branch**, branch **main**, and folder **/(root)**, the site should be available at:

https://sarkavasameer-cell.github.io/Digital-heritage-and-preservation/

Publishing can take a few minutes after configuration.

## Run locally

1. Download or clone this repository.
2. From its root folder, run: python -m http.server 8000
3. Visit http://localhost:8000.

A local HTTP server is recommended; do not open the HTML file directly.

## Project files

- index.html — page structure.
- style.css and heritage.css — responsive styles.
- heritage-data.js — structured heritage records, image provenance, and references.
- script.js — search, filters, sorting, stories, map, gallery, and contribution form.
- images/ — local photographs and the identified archival photograph.
- [IMAGE-AUDIT.md](./IMAGE-AUDIT.md) — sources, attributions, licenses, and verification notes.
- Roots-Stories-Heritage-Portal.zip — downloadable project bundle.

## Important limitations

The contribution form stores submissions only in the current browser and does not upload or moderate them. The interactive map requires internet access. Places without verified image or coordinate evidence are shown with a placeholder or without a pin rather than an unrelated photo or guessed location. See [README.txt](./README.txt) for detailed run, evidence, and functionality notes.
