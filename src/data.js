// All club details live here. Replace these placeholders with the real ones.

export const club = {
  name: 'Engineering Club',
  year: '2026–27',
  email: 'engineeringclub@school.edu',
  meets: 'Tue + Thu',
  time: '3:30–5 PM',
  location: 'Rm 214 / Shop',
  dues: '$0',
  drawingNo: 'EC-2026-27',
}

export const nav = [
  { id: 'what', label: 'What we do' },
  { id: 'projects', label: 'Projects' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'join', label: 'Join' },
  { id: 'contact', label: 'Contact' },
]

export const tools = [
  'Arduino', 'Fusion 360', 'Soldering', 'Laser cutter', 'KiCad',
  '3D printing', 'Python', 'Raspberry Pi', 'Onshape', 'Mecanum drive',
]

export const disciplines = [
  {
    name: 'Robotics',
    text: 'Drivetrains, arms, sensors and autonomous code. Our competition bot lives here.',
    icon: 'robot',
  },
  {
    name: 'Electronics',
    text: 'Soldering, microcontrollers, PCB layout in KiCad, and a lot of debugging with a multimeter.',
    icon: 'chip',
  },
  {
    name: 'CAD + Fab',
    text: 'Fusion 360 and Onshape modeling, 3D printing, laser cutting, and hand tools in the shop.',
    icon: 'house',
  },
  {
    name: 'Design challenges',
    text: 'Bridge builds, egg drops and timed build-offs. Small teams, tight constraints, fast iteration.',
    icon: 'graph',
  },
]

export const projects = [
  {
    area: 'Robotics',
    status: 'In progress',
    active: true,
    title: 'Competition robot',
    text: 'A 4-motor mecanum-drive robot with a lift for the spring regional. Subteams handle chassis, intake, wiring and autonomous routines.',
    progress: { label: 'Build progress', value: '60%', p: 0.6 },
    specs: [
      { value: 457, label: 'Frame, mm' },
      { value: '12 V', label: 'System' },
      { value: 9, label: 'Members' },
    ],
  },
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
    status: 'Starts Nov 13',
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

export const weekly = [
  { day: 'Tuesday', time: '3:30–5:00 PM · Room 214', text: 'General meeting, skill workshops and project stand-ups.' },
  { day: 'Thursday', time: '3:30–5:00 PM · Shop', text: 'Open build time. Tools and printers available.' },
  { day: 'Saturday', time: '10 AM–1 PM · Shop', text: 'Robotics team only, during build season.' },
]

export const events = [
  { date: '2026-10-28', title: 'Intro to soldering', note: 'Build a blinking LED badge to take home. Kits provided.', kind: 'Workshop' },
  { date: '2026-11-04', title: 'CAD crash course: Onshape', note: "Bring a laptop. We'll model a phone stand and print the best ones.", kind: 'Workshop' },
  { date: '2026-11-13', title: 'Balsa bridge build-off', note: 'Teams of three. Testing and results at the end of the session.', kind: 'Competition' },
  { date: '2026-11-18', title: 'Guest talk: a day as a mechanical engineer', note: 'Q&A with a local engineer about school, internships and the job.', kind: 'Talk' },
  { date: '2026-12-09', title: 'End-of-semester demo day', note: 'Every project team shows what they built. Friends and family welcome.', kind: 'Showcase' },
]

export const steps = [
  { title: 'Show up', text: "Come to any Tuesday meeting in Room 214. You don't need to sign up first or know anything about engineering." },
  { title: 'Pick a project', text: 'Try a workshop, sit in with a project team, and join whichever one you like. Switching later is fine.' },
  { title: 'Get shop-certified', text: 'A 30-minute safety walkthrough unlocks the 3D printers, laser cutter and power tools.' },
]

export const faq = [
  { q: 'Do I need any experience?', a: 'No. Most members started with zero experience. Workshops cover the basics, and older members pair up with new ones on projects.' },
  { q: 'Does it cost anything?', a: 'No dues. The club covers parts and materials for club projects. For personal projects, you only pay for materials you take home.' },
  { q: 'Can I come only some weeks?', a: "Yes. Come when you can. Project teams do ask for a heads-up if you'll miss a build session close to a deadline." },
  { q: "I'm not planning to study engineering. Can I still join?", a: 'Yes. We have members heading into art, medicine, business and computer science. Building things is useful whatever you do next.' },
]

export const whereabouts = [
  { k: 'Meetings', v: 'Tue + Thu, 3:30–5:00 PM' },
  { k: 'Room', v: '214, Science building' },
  { k: 'Shop', v: 'Basement, behind the auto lab' },
  { k: 'Advisor', v: 'Physics department' },
]
