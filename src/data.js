// All club details live here. Edit this file to update the site.

export const club = {
  name: 'WHS Engineering Club',
  year: '2026-2027',
  email: 'westlake.engine@gmail.com',
  instagram: 'https://www.instagram.com/engineeringclub_westlake/',
  interestForm: 'https://docs.google.com/forms/d/e/1FAIpQLSfNAgawI2RoI1pt047iI_lOBcG6Skr4tTGyyUl6Sl5corvwCA/viewform',
  dues: '$0',
  // Meetings repeat every `everyDays` days from `firstDate`. Used for the countdown and the
  // list of meeting dates. Add dates to `skip` (YYYY-MM-DD) for breaks and holidays.
  meetings: {
    firstDate: '2026-11-04',
    everyDays: 14,
    hour: 16,
    minute: 30,
    durationMinutes: 30,
    time: '4:30–5:00 PM',
    where: 'The Bat Cave, Library',
    skip: [],
  },
}

// Shown under the disciplines in "What we do". Icons are matched by position in Disciplines.jsx.
export const opportunities = [
  {
    name: 'Competitions',
    tags: ['GARSEF', 'Conrad Challenge', 'And more'],
    text: 'We find competitions for members and help you get into them. Examples include GARSEF and the Conrad Challenge, and we keep an eye out for more that fit what you like to build.',
  },
  {
    name: 'Volunteering',
    tags: ['STEAM Day', 'Elementary schools', 'NHS approved'],
    text: 'NHS-approved STEAM volunteering. Right now that means STEAM Day at elementary schools, with more opportunities added as they come up.',
  },
]

export const faq = [
  { q: 'Do I need any experience?', a: 'No. Most members started with zero experience. Workshops cover the basics, and older members pair up with new ones on projects.' },
  { q: 'Does it cost anything?', a: 'No dues. The club covers parts and materials for club projects. For personal projects, you only pay for materials you take home.' },
  { q: 'Can I come only to some meetings?', a: "Yes. Come when you can. Project teams do ask for a heads-up if you'll miss a meeting close to a deadline." },
  { q: "I'm not planning to study engineering. Can I still join?", a: 'Yes. We have members heading into art, medicine, business and computer science. Building things is useful whatever you do next.' },
]

export const tiers = [
  {
    id: 'platinum',
    name: 'Platinum',
    price: '$1,000+',
    perks: [
      'Premier logo placement on all club materials',
      'Featured sponsor spotlight on social media',
      'Recognition at club meetings and events',
      'Optional guest speaker slot at a meeting',
      'Framed appreciation certificate',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: '$750',
    perks: [
      'Prominent logo placement on club materials',
      'Recognition at meetings and events',
      'Thank-you post on social media',
      'Framed appreciation certificate',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    price: '$500',
    perks: [
      'Logo on our club trifold and newsletter',
      'Thank-you post on social media',
      'Printed appreciation certificate',
    ],
  },
  {
    id: 'bronze',
    name: 'Bronze',
    price: '$250',
    perks: [
      'Company name on our club trifold and newsletter',
      'Digital appreciation certificate',
    ],
  },
]

// Add a sponsor here and it appears under its tier. `tier` is a tier id above.
// `logo` is optional: a file in /public (e.g. 'sponsors/acme.svg'). Without one, the name is shown.
// `url` is optional and makes the tile a link.
// Example: { name: 'Acme Machining', tier: 'gold', logo: 'sponsors/acme.svg', url: 'https://example.com' }
export const sponsors = [
  { name: 'PCBWay', tier: 'platinum', logo: 'sponsors/pcbway.png', url: 'https://www.pcbway.com/' },
  { name: 'Hitec RCD', tier: 'gold', logo: 'sponsors/hitec-rcd.png', url: 'https://hitecrcd.com/' },
  { name: 'Concierge Health of Austin', tier: 'silver', logo: 'sponsors/concierge-health-of-austin.png', url: 'https://conciergehealthaustin.com' },
  { name: 'NextPCB', tier: 'bronze', url: 'https://www.nextpcb.com/' },
  { name: 'Duet3D', tier: 'bronze', logo: 'sponsors/duet3d.png', url: 'https://www.duet3d.com/' },
  { name: 'OSH Cut', tier: 'bronze', logo: 'sponsors/osh-cut.svg', url: 'https://www.oshcut.com/' },
  { name: 'REV Robotics', tier: 'bronze', logo: 'sponsors/rev-robotics.png', url: 'https://www.revrobotics.com/' },
]

// ---------------------------------------------------------------------------------------------
// The season plan (biweekly, 18 meetings). Meetings are every other Wednesday, but not every
// meeting happens, so activities are an ordered list rather than fixed dates: each meeting that
// actually takes place does the next activity. When a meeting is cancelled, add its date to
// club.meetings.skip above and the rest of the plan slides back one meeting. Buffer days absorb
// the slack.
export const plan = [
  { field: 'Electrical', title: 'Arduino & Circuits 101', text: 'Blink an LED, wire a button and upload your first code.', materials: 'Arduino Uno clones, breadboards, jumper wires, LEDs, resistors', cost: '$8–15 per kit, reusable' },
  { field: 'Electrical', title: 'Snap Circuits: Sound & Light', text: 'Build a working alarm or a light-up gadget.', materials: 'Snap Circuits kit, or DIY LED, buzzer and battery kits', cost: '$25–35 one-time kit' },
  { field: 'Mechanical', title: 'Simple Machines Stations', text: 'Build levers, pulleys and gear trains that lift a weight.', materials: 'Popsicle sticks, string, small pulleys or spools, washers as weights', cost: '$15–25 total' },
  { field: 'Mechanical', title: 'Mousetrap Car Design & Race', text: 'Turn stored energy into motion, then tune it for distance and speed.', materials: 'Mousetraps, old CDs or bottle caps for wheels, skewers, cardboard', cost: '$10–15, mousetraps reusable' },
  { field: 'Mechanical', title: 'Onshape 3D CAD Intro', text: 'Design your own part or bracket in Onshape.', materials: 'Laptops, Onshape free education account', cost: 'Free' },
  { field: 'Civil / Structural', title: 'Popsicle Stick Bridge Build & Load Test', text: 'Teams build a bridge and compete for the most weight held.', materials: 'Popsicle sticks, wood glue or hot glue, books and water bottles as weights', cost: '$20–30 total' },
  { field: 'Civil / Structural', title: 'Marshmallow & Toothpick Tower', text: 'Build the tallest tower, or a geodesic dome.', materials: 'Mini marshmallows, toothpicks', cost: '$10–15' },
  { field: 'Buffer', buffer: true, title: 'Buffer day', text: 'Catch-up day in case a meeting gets missed.' },
  { field: 'Computer', title: 'Intro to Coding: Scratch or Python', text: 'Build a simple game or animation.', materials: 'Laptops or Chromebooks, free Scratch or Python', cost: 'Free' },
  { field: 'Computer', buffer: true, title: 'Finish the coding project', text: 'Finish your game or animation, or use the day to catch up.', materials: 'Laptops or Chromebooks', cost: 'Free' },
  { field: 'Chemical', title: 'Chemical Reactions Lab', text: 'Elephant toothpaste, density towers and pH testing.', materials: 'Hydrogen peroxide, yeast, dish soap, food coloring, household liquids', cost: '$15–20' },
  { field: 'Aerospace', title: 'Paper Airplane Aerodynamics Lab', text: 'Test wing shapes and weight for distance and hang time.', materials: 'Paper, paper clips, tape, stopwatch', cost: 'Free–$5' },
  { field: 'Aerospace', title: 'Bottle Rocket Launch', text: 'Build an air-pressure rocket, launch it and measure its altitude.', materials: 'Recycled 2-liter bottles, cardboard fins, cork and pump launcher', cost: '$10–20 one-time launcher' },
  { field: 'Industrial / Systems', title: 'Rube Goldberg Machine Challenge', text: 'Teams chain simple machines together to do one task.', materials: 'Dominoes, marbles, cardboard tubes, rulers, recycled household items', cost: '$5–10' },
  { field: 'Environmental', title: 'DIY Water Filtration', text: 'Design a filter that cleans dirty water.', materials: 'Plastic bottles, sand, gravel, cotton balls or coffee filters', cost: '$10–15' },
  { field: 'Biomedical', title: 'Prosthetic Hand Build', text: 'A mechanical hand whose fingers move by tension.', materials: 'Straws, string, cardboard, tape', cost: '$8–12' },
  { field: 'Materials Science', title: 'Egg Drop Protection Challenge', text: 'Design packaging that gets an egg through the drop.', materials: 'Straws, cotton balls, cardboard, tape, plastic bags, eggs', cost: '$8–12' },
  { field: 'Naval / Marine', title: 'Aluminum Foil Boat Challenge', text: 'Build a boat that holds the most pennies before it sinks. Season finale and showcase day.', materials: 'Aluminum foil, pennies, a water tub', cost: '$5–10' },
]

// One line per field, in the order the season reaches them. `code` is the field's usual
// abbreviation, used where the full name won't fit (the dial).
export const fields = [
  { name: 'Electrical', code: 'EE', text: 'An Arduino blinking its first LED, then a working alarm or light-up gadget.' },
  { name: 'Mechanical', code: 'ME', text: 'Levers, pulleys and gear trains, a mousetrap-powered car, and your first part in Onshape.' },
  { name: 'Civil / Structural', code: 'CE', text: 'Popsicle-stick bridges loaded until they give, and toothpick towers as tall as they will stand.' },
  { name: 'Computer', code: 'CompE', text: 'Code a game or an animation in Scratch or Python.' },
  { name: 'Chemical', code: 'ChemE', text: 'Elephant toothpaste, density towers and pH testing.' },
  { name: 'Aerospace', code: 'AE', text: 'Paper airplanes tested for distance and hang time, then air-pressure bottle rockets.' },
  { name: 'Industrial / Systems', code: 'ISE', text: 'A Rube Goldberg machine: simple machines chained into one task.' },
  { name: 'Environmental', code: 'EnvE', text: 'A filter that turns dirty water clean.' },
  { name: 'Biomedical', code: 'BME', text: 'A prosthetic hand moved by string tendons.' },
  { name: 'Materials Science', code: 'MSE', text: 'Packaging that keeps an egg intact through the drop.' },
  { name: 'Naval / Marine', code: 'NAME', text: 'Foil boats loaded with pennies until they sink. The season finale.' },
].map((f) => ({ ...f, activities: plan.filter((p) => p.field === f.name && !p.buffer) }))

// Headline numbers for the stats band. Update these as the club grows.
export const clubNumbers = { members: 80, opportunities: 5 }

export const joinSteps = [
  { title: 'Show up', text: `Come to any meeting in ${club.meetings.where}. No sign-up, no experience, no dues.` },
  { title: 'Build with a team', text: 'Every meeting is a hands-on challenge in small teams. Materials are on the club.' },
  { title: 'Come back next time', text: 'Each meeting is a different field of engineering, so missing one is fine. Pick up wherever we are.' },
]

export const cancelFaq = {
  q: 'What happens if a meeting gets cancelled?',
  a: 'Nothing is lost. The plan slides: the next meeting does the activity that was missed, and two buffer days in the season absorb the delay.',
}
