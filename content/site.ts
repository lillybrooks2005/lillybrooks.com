/*
  Every word on the site lives here. To change copy, edit this file only —
  no need to open any of the page files.

  Anything in this file that Lilly hasn't confirmed yet is marked TODO.
*/

export const site = {
  name: "Lilly Brooks",
  title: "Lilly Brooks — Music Educator",
  description:
    "Lilly Brooks is a music educator studying choral music education and conducting at Ohio University, with small-town Ohio roots and a background in dance.",
  // Shown in the arched frame on the home page. Width and height are the file's real pixel size.
  headshot: "/lilly-portrait-v2.jpg",
  headshotWidth: 1500,
  headshotHeight: 2250,
  headshotAlt: "Lilly Brooks, smiling, sitting outdoors under autumn trees with her chin resting on her hand",
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  footer: "Made with love while listening to my favorite playlist.",
};

export const home = {
  eyebrow: "Lilly Brooks · Music Educator",
  // `accent` gets the hand-drawn underline. It must appear inside `heading`.
  // No full stop here: the page draws a little flower in its place.
  heading: "Music is connection",
  accent: "connection",
  intro:
    "I'm a music educator with a focus in voice and conducting. I believe in the power of music to connect us to the world, ourselves, and each other.",
  primaryCta: { href: "/about", label: "About me" },
  secondaryCta: { href: "/contact", label: "Get in touch" },
};

export const about = {
  eyebrow: "About",
  heading: "Hi, I'm Lilly.",
  // Each string is its own paragraph
  // Each string is its own paragraph. {marching} and {acda} open a note (see notes below).
  bio: [
    "I'm a music educator from small town Ohio. A town that takes its community and traditions seriously, and I build my classrooms the same way. I believe that music brings people together.",
    "I'm finishing my BM in music education at Ohio University and plan to graduate in spring of 2027 with a choral emphasis and minor in conducting. Outside of the classroom, I am a student leader in the {marching} and {acda} student chapter.",
  ],
  notes: {
    marching: {
      term: "Marching 110",
      text: "Voted the #1 college marching band in 2026 by",
      href: "https://www.ohio.edu/news/2026/08/ohio-university-marching-110-voted-1-college-marching-band-nation-usa-today",
      linkLabel: "USA Today.",
    },
    acda: {
      term: "ACDA",
      text: "American Choral Directors Association, the national community of choral conductors and teachers.",
    },
  },
  // The Google Doc is the source of truth for the resume; the button opens it in a new tab
  resume: {
    href: "https://docs.google.com/document/d/1nAgHE2VFXFdYheZByM2A20QHO2x-rSiIu4ZiZp-8eRQ/edit?usp=sharing",
    label: "Download resume",
  },
  // Photos shown above the CV. Width and height are each file's real pixel size.
  gallery: [
    { src: "/gallery/photo-01.jpg", width: 1600, height: 1200, alt: "Lilly smiling in a classroom, holding a bin of toys" },
    { src: "/gallery/photo-02.jpg", width: 1600, height: 1070, alt: "Lilly singing on stage in a blue floral dress, with a pianist and a violinist" },
    { src: "/gallery/photo-03.jpg", width: 1600, height: 1200, alt: "Lilly and a friend smiling with large brass instruments" },
    { src: "/gallery/photo-04.jpg", width: 1125, height: 1500, alt: "Two graduates wearing Ohio University School of Music stoles" },
    { src: "/gallery/photo-05.jpg", width: 1600, height: 1200, alt: "Lilly with students in maroon and black Marching 110 uniforms" },
    { src: "/gallery/photo-06.jpg", width: 1145, height: 1500, alt: "A group of smiling summer camp students in tutus and face paint" },
    { src: "/gallery/photo-07.jpg", width: 1500, height: 1125, alt: "Marching 110 volunteers at a check-in table" },
    { src: "/gallery/photo-08.jpg", width: 1169, height: 1428, alt: "The Marching 110 in white and black uniforms on a football field" },
    { src: "/gallery/photo-09.jpg", width: 1170, height: 1510, alt: "Lilly with two family members at an event" },
    { src: "/gallery/photo-10.jpg", width: 1170, height: 1547, alt: "Lilly playing her mellophone in the Marching 110" },
    { src: "/gallery/photo-11.jpg", width: 1170, height: 1494, alt: "A group of students and friends posing together in a classroom" },
  ],
  // Not shown on the page; read aloud by screen readers to name the CV section
  cvLabel: "CV",
};

export type CvRole = {
  title: string;
  detail: string;
  dates: string;
  // Optional: rows with a note can be opened
  note?: string;
  // Optional: a phrase from `note` to set in bold
  highlight?: string;
};

export type CvGroup = {
  label: string;
  roles: CvRole[];
};

// TODO: confirm the details and add dates with Lilly
export const cv: CvGroup[] = [
  {
    label: "Education",
    roles: [
      {
        title: "Ohio University",
        detail: "Bachelor of Music in Music Education, choral emphasis, minor in conducting · Athens, OH",
        dates: "Expected May 2027",
        note: "Training to lead choirs and teach music in schools, with a minor in conducting: gesture, score study, and running a rehearsal from the podium.", // TODO: confirm with Lilly
        highlight: "lead choirs and teach music in schools",
      },
      {
        title: "Johnstown High School",
        detail: "Johnstown, OH",
        dates: "2019 – 2023",
      },
    ],
  },
  {
    label: "Experience",
    roles: [
      {
        title: "ACMS Summer Music Program Lead Teacher",
        detail: "Athens Community Music School, Ohio University School of Music · Athens, OH",
        dates: "July 2026",
        note: "Led students ages 6 to 12 in singing, dancing, and musical activities. Fostered a positive, energetic, and patient learning environment.",
        highlight: "singing, dancing, and musical activities",
      },
      {
        title: "Smart Start Assistant Teacher",
        detail: "Athens Community Music School, Ohio University School of Music · Athens, OH",
        dates: "Jan 2024 – May 2025",
        note: "Assisted the lead teacher with singing, dancing, and musical activities for children ages 2 to 5.",
        highlight: "children ages 2 to 5",
      },
      {
        title: "Seasonal Teacher",
        detail: "Bright Start Learning Center · Johnstown, OH",
        dates: "May – Aug 2025",
        note: "Designed and delivered lesson plans aligned with state standards for students ages 5 to 12. Managed a wide range of classroom behaviors and created an engaging summer program that blended fun activities with continuous learning.",
        highlight: "lesson plans aligned with state standards",
      },
      {
        title: "Band Camp Technician, Mellophone",
        detail: "Meigs (2024 – 2026), Johnstown (2025 – 2026), and Lakewood (2026) high schools · Ohio",
        dates: "Summers 2024 – 2026",
        note: "Directed music sectionals to refine show repertoire. Coached students during field rehearsals with constructive feedback and motivation. Taught a variety of drill techniques to improve performance precision.",
        highlight: "Directed music sectionals",
      },
    ],
  },
  {
    label: "Leadership",
    roles: [
      {
        title: "ACDA, Secretary",
        detail: "American Choral Directors Association · Ohio University",
        dates: "Feb – Nov 2026",
        note: "Recorded meeting attendance and documented presentations and key discussions. Maintained and updated the organization’s website.",
        highlight: "Recorded meeting attendance",
      },
      {
        title: "Marching 110 Student Leadership, Administrative Assistant",
        detail: "Ohio University",
        dates: "Aug 2025 – May 2027",
        note: "Provide organizational and administrative support to the directors and teaching assistants. Help plan events, including the annual banquet. Coordinate onboarding for new members during training week.",
        highlight: "organizational and administrative support",
      },
    ],
  },
  {
    label: "Ensembles",
    roles: [
      {
        title: "Marching 110, Mellophone",
        detail: "Ohio University · Voted the #1 college marching band by USA Today, 2026",
        dates: "Aug 2023 – May 2027",
      },
      {
        title: "Ohio University Singers, Soprano",
        detail: "Auditioned SATB choir",
        dates: "Jan – Dec 2024",
      },
      {
        title: "Ohio University Choral Union, Soprano",
        detail: "Community SATB choir",
        dates: "Aug 2023 – Dec 2024",
      },
      {
        title: "Bella Voce, Soprano",
        detail: "Community treble choir",
        dates: "Jan – Dec 2026",
      },
      {
        title: "University Band, Euphonium",
        detail: "Community symphonic band",
        dates: "Jan – Feb 2026",
      },
    ],
  },
  {
    label: "Memberships",
    roles: [
      {
        title: "OMEA",
        detail: "Ohio Music Education Association",
        dates: "2024 – Present",
        note: "The state association for music teachers, and my connection to educators and classrooms across Ohio.",
        highlight: "educators and classrooms across Ohio",
      },
      {
        title: "ACDA",
        detail: "American Choral Directors Association",
        dates: "2026 – Present",
        note: "The national community of choral conductors and teachers. It's my foundation for new repertoire and rehearsal ideas.",
        highlight: "choral conductors and teachers",
      },
    ],
  },
  {
    label: "Skills",
    roles: [
      {
        title: "Teaching",
        detail: "Lesson planning, state standards, classroom management, leading sectionals, drill instruction, rehearsing ensembles",
        dates: "",
      },
      {
        title: "Music",
        detail: "Choral conducting, voice, intermediate pianist",
        dates: "",
      },
      {
        title: "Administration",
        detail: "Event planning, onboarding, meeting minutes, website maintenance",
        dates: "",
      },
    ],
  },
];

export const contact = {
  eyebrow: "Contact",
  heading: "Let's make some music.",
  body: "Thank you for stopping by! Whether you have a question, an opportunity, or want to collaborate, I'd love to hear from you.",
  // TODO: Lilly's real details
  email: "ms.brooks.music27@gmail.com",
  details: [
    { label: "Based in", value: "Ohio" },
    { label: "Studying", value: "Music education, conducting" },
  ],
  note: "Ohio University, class of 2027.",
};
