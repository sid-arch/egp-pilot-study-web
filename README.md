# Euler's Golden Pie Pilot Study — V2

V2 is a complete UI redesign with the V1 content structure retained.

## V2 changes
- Completely rebuilt cinematic navy/gold interface
- Removed podium / winners / Hall of Champions
- Added Participant Recognition with descriptive honors
- Full-screen opening and closing sequences
- Editorial study-process layout
- Redesigned seven-day video archive
- Dedicated 50-digit finale
- Cinematic Awards Ceremony video
- Mosaic award-photo gallery
- Redesigned Sid + Avanthika profiles
- Responsive mobile navigation
- Scroll reveals and subtle pointer lighting

## Content control
Edit `data/site-data.js`.

### YouTube
Paste only each video's YouTube ID. Empty values show a clean "Video coming soon" state.

### Recognitions
Replace the sample participant names, titles, and descriptions in `recognitions`.

### Award photos
Put photos in `assets/images/awards/`, then list their relative paths in `awardsPhotos`.

### Team
Replace `assets/images/team/sid.jpg` and `avanthika.jpg`, then edit the bios/roles in `site-data.js`.

### Logo
Replace the placeholder `official_logo.png` with the actual official EGP logo using the exact same filename.

## GitHub Pages
All links are relative, so this can be deployed as its own Pages repository or later placed under the official site's `/pilot-study/` directory.
