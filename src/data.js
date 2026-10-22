// All club details live here. Replace these placeholders with the real ones.

export const club = {
  name: 'WHS Engineering Club',
  year: '2026–27',
  email: 'westlake.engine@gmail.com',
  instagram: 'https://www.instagram.com/engineeringclub_westlake/',
  dues: '$0',
  // Meetings repeat every `everyDays` days from `firstDate`. Used for the countdown and the
  // list of meeting dates. Add dates to `skip` (YYYY-MM-DD) for breaks and holidays.
  meetings: {
    firstDate: '2026-10-28',
    everyDays: 14,
    hour: 16,
    minute: 30,
    durationMinutes: 30,
    time: '4:30–5:00 PM',
    where: 'The Bat Cave, Library',
    skip: [],
  },
}

export const stats = [
  { value: 3, label: 'Active projects' },
  { value: 2, label: 'Weeks between meetings' },
  { value: 0, prefix: '$', label: 'Dues' },
  { value: 0, label: 'Experience needed' },
]

export const nav = [
  { id: 'what', label: 'What we do' },
  { id: 'projects', label: 'Projects' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'join', label: 'Join' },
  { id: 'sponsors', label: 'Sponsors' },
  { id: 'contact', label: 'Contact' },
]

export const disciplines = [
  {
    name: 'Electronics',
    tags: ['Arduino', 'KiCad', 'Soldering'],
    text: 'Soldering, microcontrollers, PCB layout in KiCad, and a lot of debugging with a multimeter.',
  },
  {
    name: 'CAD + Fab',
    tags: ['Fusion 360', '3D printing', 'Laser cutting'],
    text: 'Fusion 360 and Onshape modeling, 3D printing, laser cutting, and hand tools in the shop.',
  },
  {
    name: 'Design challenges',
    tags: ['Build-offs', 'Egg drops', 'Teams of 3'],
    text: 'Bridge builds, egg drops and timed build-offs. Small teams, tight constraints, fast iteration.',
  },
]

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

export const projects = [
  {
    area: 'Electronics',
    status: 'In progress',
    active: true,
    title: 'Campus weather station',
    text: 'Solar-powered sensor node logging temperature, humidity, pressure and wind speed to a public dashboard every 5 minutes.',
    progress: { label: 'Build progress', value: '75%', p: 0.75 },
    specs: [
      { value: '5 min', label: 'Sample rate' },
      { value: '6 W', label: 'Panel' },
      { value: 5, label: 'Members' },
    ],
  },
  {
    area: 'CAD + Fab',
    status: 'Prototyping',
    title: 'Prosthetic hand',
    text: 'A 3D-printed, tendon-driven hand based on open-source designs, adapted and tested with grip-strength measurements.',
    progress: { label: 'Build progress', value: '35%', p: 0.35 },
    specs: [
      { value: '±0.2 mm', label: 'Tolerance' },
      { value: 'PLA+', label: 'Material' },
      { value: 4, label: 'Members' },
    ],
  },
  {
    area: 'Design challenge',
    status: 'Starts Nov 25',
    title: 'Balsa bridge build-off',
    text: 'Teams of three get 30 sticks of balsa and a glue gun. Highest load-to-weight ratio on the test rig wins.',
    progress: { label: 'Teams signed up', value: '6 of 10', p: 0.6 },
    specs: [
      { value: 30, label: 'Sticks' },
      { value: 300, label: 'Span, mm' },
      { value: 3, label: 'Per team' },
    ],
  },
]

// What's planned at upcoming meetings. Dates should match meeting dates.
export const events = [
  { date: '2026-10-28', title: 'Kickoff + intro to soldering', note: 'Meet the club and build a blinking LED badge to take home. Kits provided.', kind: 'Workshop' },
  { date: '2026-11-11', title: 'CAD crash course: Onshape', note: "Bring a laptop. We'll model a phone stand and print the best ones.", kind: 'Workshop' },
  { date: '2026-11-25', title: 'Balsa bridge build-off', note: 'Teams of three. Testing and results at the end of the meeting.', kind: 'Competition' },
  { date: '2026-12-09', title: 'End-of-semester demo day', note: 'Every project team shows what they built. Friends and family welcome.', kind: 'Showcase' },
]

export const steps = [
  { title: 'Show up', text: "Come to any meeting. We meet every other Wednesday in the Bat Cave in the Library. You don't need to sign up first or know anything about engineering." },
  { title: 'Pick a project', text: 'Try a workshop, sit in with a project team, and join whichever one you like. Switching later is fine.' },
  { title: 'Get shop-certified', text: 'A 30-minute safety walkthrough unlocks the 3D printers, laser cutter and power tools.' },
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
  { name: 'Hitec RCD', tier: 'gold', logo: 'sponsors/hitec-rcd.png', url: 'https://hitecrcd.com/' },
  { name: 'Concierge Health of Austin', tier: 'silver', logo: 'sponsors/concierge-health-of-austin.png', url: 'https://conciergehealthaustin.com' },
]

export const whereabouts = [
  { k: 'Meetings', v: 'Every other Wednesday, 4:30–5:00 PM' },
  { k: 'Room', v: 'The Bat Cave, Library' },
  { k: 'Shop', v: 'Basement, behind the auto lab' },
  { k: 'Advisor', v: 'Physics department' },
]
