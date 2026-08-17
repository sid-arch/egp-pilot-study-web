# Euler's Golden Pie Pilot Study — V1

Static GitHub Pages build.

## Main files
- `index.html` — page structure
- `style.css` — design
- `script.js` — embeds, winners, gallery, animations
- `data/site-data.js` — editable content/data
- `official_logo.png` — replace this placeholder with the real official EGP logo

## Add YouTube videos
Open `data/site-data.js` and paste only the YouTube video ID for each day and the awards ceremony.

Example:
```js
day1: "dQw4w9WgXcQ"
```

Days with an empty string automatically show "Video coming soon".

## Add award photos
1. Put the files in `assets/images/awards/`
2. Add their paths to `awardsPhotos` in `data/site-data.js`

Example:
```js
awardsPhotos: [
  "assets/images/awards/award-01.jpg",
  "assets/images/awards/award-02.jpg"
]
```

## Replace team photos
Replace:
- `assets/images/team/sid.jpg`
- `assets/images/team/avanthika.jpg`

## Publish
Upload the folder contents to the GitHub Pages repo. If this will live at `/pilot-study/`, the relative paths already work.
