# Engineering Club website

A single-page site for the WHS Engineering Club: the season of meetings (a different field of engineering each time), builds, how to join, FAQ, sponsors and contact info.

Built with React and Vite. Every push to `main` builds the site and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.

Live site: https://whs-engineering-club.github.io/eng-club-website/

## Run it locally

```sh
npm install
npm run dev
```

## Edit the club details

Everything the site says lives in `src/data.js`:

- `club`: email, Instagram, interest form, and the meeting schedule (`club.meetings`).
- `plan`: the season, in order. One activity per meeting, with its field, materials and estimated cost.
- `fields`: one line per field of engineering, shown on the dial.
- `clubNumbers`: the member and STEM-opportunity counts in the numbers band.
- `faq`, `joinSteps`, `opportunities`, `sponsors`, `tiers`.

### When a meeting is cancelled

Meetings are every other Wednesday, but not every one happens. Add the cancelled date to `club.meetings.skip` (as `YYYY-MM-DD`). The activity planned for that day moves to the next meeting and the rest of the season slides back one meeting. Dates on the site update on their own; the two buffer days in `plan` absorb the delay.

## Layout

- `src/App.jsx`: the page, in order, and the black/bone section rhythm.
- `src/components/Intro.jsx`: the opening sequence (skipped for reduced motion or a `#section` link).
- `src/components/Hero.jsx`: the CAD-inspector hero, a gear that draws, shades and turns as you scroll, with callouts that follow its geometry.
- `src/components/FieldsDial.jsx`: the fields of engineering on a dial you can click or drag.
- `src/components/BuildsTrack.jsx`: three season builds on a horizontal track.
- `src/components/Sections.jsx`: nav, countdown, numbers, season list, join, FAQ, sponsors and contact.
- `src/lib/gear.js` and `src/lib/parts.js`: the small 3D renderer and the parts it draws.
- `src/lib/season.js`: pairs the season plan with real meeting dates.
- `src/lib/meetings.js`: works out the every-other-Wednesday meeting dates.
- `src/styles/`: `theme.css` (palette and section tones), `base.css` (layout and components), `dial.css`.

With "reduce motion" turned on in the OS, the intro is skipped and scroll-driven motion is replaced by still states.
