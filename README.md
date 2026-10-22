# Engineering Club website

A single-page site for the WHS Engineering Club: what we do, current projects, meeting schedule, how to join, FAQ and contact info.

Built with React and Vite. Every push to `main` builds the site and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.

Live site: https://whs-engineering-club.github.io/eng-club-website/

## Run it locally

```sh
npm install
npm run dev
```

## Edit the club details

All the text lives in `src/data.js`: meeting times, projects, events, FAQ and the contact email. The current details are placeholders, so replace them with the real ones.

## Layout

- `src/components/`: one component per page section
- `src/components/Section.jsx`: shared numbered section layout (pinned heading, drawn rule)
- `src/components/TrussDrawing.jsx`: the technical drawing in the hero that draws itself on load
- `src/lib/meetings.js`: works out the every-other-Wednesday meeting dates from `club.meetings` in `src/data.js` (add holiday dates to `skip`)
- `src/components/NextMeeting.jsx`: live countdown to the next meeting
- `src/lib/hooks.js`: scroll reveal, scroll progress, active section and clock hooks
- `src/styles.css`: all styles, with the color tokens at the top

Sections fade in as they scroll into view. With "reduce motion" turned on in the OS, everything shows without animation.
