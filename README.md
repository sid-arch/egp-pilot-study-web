# Euler's Golden Pie Pilot Study — V3

V3 keeps the V2 visual identity and pushes the premium/cinematic direction further.

## V3 changes
- Removed the entire “Before & After” assessment section
- Renumbered subsequent sections
- Increased official logo presence in the navigation
- Condensed the seven Day 1–7 video cards into a two-column desktop archive
- Added richer hover/micro-interactions
- Added subtle scroll parallax to the giant `50` and background `EGP`
- Upgraded the 50-Digit Finale presentation
- Refined Participant Recognition into cinematic award-style reveals
- Upgraded Awards Ceremony into a darker cinema presentation
- Added editorial photo hover behavior
- Added fullscreen award-photo lightbox
- Navbar now subtly changes as the page scrolls
- Stronger gold lighting and section-line animations
- Darker, more dramatic ending
- Preserved responsive/mobile behavior

## Updating content
All variable content remains in `data/site-data.js`.

### YouTube videos
Paste only YouTube video IDs. Empty IDs display “Video coming soon.”

### Participant Recognition
Edit the `recognitions` array. This is intentionally not a winner/podium system.

### Award photos
Place photos in `assets/images/awards/` and list their paths under `awardsPhotos`.

### Team photos
Replace:
- `assets/images/team/sid.jpg`
- `assets/images/team/avanthika.jpg`

### Logo
Replace the placeholder `official_logo.png` with the real official logo, keeping the same filename.
