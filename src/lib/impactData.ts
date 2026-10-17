import {
  Globe2 as Globe2Icon,
  GraduationCap as GraduationCapIcon,
  HeartHandshake as HeartHandshakeIcon,
  Megaphone as MegaphoneIcon,
  MonitorSmartphone as MonitorSmartphoneIcon,
  Trophy as TrophyIcon,
  Users as UsersIcon,
  Wallet as WalletIcon,
  UserPlus as UserPlusIcon,
  type LucideIcon } from
'lucide-react';

export interface AvenueDirector {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface AvenuePillar {
  title: string;
  desc: string;
}

export interface AvenueDetail {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  icon: LucideIcon;
  image: string;
  heroInkImage: string;
  photoFrame?: {
    main: string;
    top: string;
    bottom: string;
  };
  accent: string;
  completedProjects: number;
  directors: number;
  volunteers?: number;
  hours?: number;
  pillars?: AvenuePillar[];
  directorList?: AvenueDirector[];
}

export const AVENUE_DETAILS: AvenueDetail[] = [
  {
    slug: 'club-service',
    number: '01',
    title: 'Club Service',
    description: 'Drives fellowship and smooth internal operations by coordinating meetings, managing administration, and fostering an inclusive club culture.',
    longDescription: 'Club Service holds the human heartbeat of Rotaract UCSC together. From the very first orientation to lifelong alumni bonds, this avenue orchestrates the traditions, fellowship nights, general meetings, and cross-batch connections that ensure no member ever feels like a stranger.',
    tagline: 'The culture engine behind a connected club.',
    icon: UsersIcon,
    image: "/1e74bf3b-bd1e-4979-a2ae-f0d17883d4b4.jpg",
    heroInkImage: "/assets/avenues/club_services.png",
    photoFrame: {
      main: "/assets/avenues/club-service-main.jpg",
      top: "/assets/avenues/club-service-top.jpg",
      bottom: "/assets/avenues/club-service-bottom.jpg",
    },
    accent: 'navy',
    completedProjects: 18,
    directors: 3,
    volunteers: 140,
    hours: 860,
    pillars: [
      { title: 'Fellowship & Traditions', desc: 'Crafting signature gatherings and warm social settings that build authentic camaraderie.' },
      { title: 'Internal Operations', desc: 'Managing club administration, secretarial documentation, and seamless general meetings.' },
      { title: 'Inclusivity & Culture', desc: 'Ensuring every new member finds a supportive home and an encouraging community.' }
    ],
    directorList: [
      { name: 'Nethmi Perera', role: 'Director of Club Service', bio: 'A people-first organiser passionate about cultivating an uplifting environment where everyone belongs.', image: "/275ad849-1b14-4559-a11c-460d2229c27b.jpg" },
      { name: 'Kavindu Silva', role: 'Deputy Director', bio: 'Specialises in turning spontaneous ideas into lively events and unforgettable memories.', image: "/1b5d40fc-f357-4554-bc2e-e1067ca01441.jpg" },
      { name: 'Yasara Fernando', role: 'Assistant Director', bio: 'A detail-oriented planner committed to smooth logistical execution and welcoming new faces.', image: "/bc645315-7c32-48e0-a320-0786b75e4cf2.jpg" }
    ]
  },
  {
    slug: 'community-service',
    number: '02',
    title: 'Community Service',
    description: 'Creates sustainable, long-term change in local communities through impactful environmental and socioeconomic initiatives.',
    longDescription: 'Rooted in empathy and direct grassroots engagement, Community Service addresses pressing societal challenges across Sri Lanka, delivering sustainable healthcare, educational upliftment, and community aid with transparency.',
    tagline: 'Turning local care into collective action.',
    icon: HeartHandshakeIcon,
    image: "/d9bd489e-919e-405e-9ba0-68bc147e9344.jpg",
    heroInkImage: "/assets/avenues/community_services.png",
    accent: 'rose',
    completedProjects: 42,
    directors: 4,
    volunteers: 320,
    hours: 2400,
    pillars: [
      { title: 'Healthcare & Vital Aid', desc: 'Organising district blood donation drives, health screenings, and medical relief.' },
      { title: 'Rural Education Support', desc: 'Supplying libraries, textbooks, and interactive learning tools to remote schools.' },
      { title: 'Sustainable Community Care', desc: 'Developing enduring projects that empower local beneficiaries to flourish independently.' }
    ],
    directorList: [
      { name: 'Shenali De Silva', role: 'Director of Community Service', bio: 'Guiding impactful outreach with a strong focus on sustainable change and grassroots empathy.', image: "/10727d3a-30fb-43e1-8b11-25608a02c3e1.jpg" },
      { name: 'Malsha Jayasinghe', role: 'Deputy Director', bio: 'Passionate about environmental sustainability and coastal conservation efforts.', image: "/18ac27f6-1048-44e9-b289-79bbf976c092.jpg" },
      { name: 'Dilshan Ranasinghe', role: 'Assistant Director', bio: 'Coordinates on-the-ground volunteer mobilization and logistics across island-wide drives.', image: "/2624e831-fea9-4d4a-b67d-bd78fc7b5a12.jpg" }
    ]
  },
  {
    slug: 'international-relations',
    number: '03',
    title: 'International Relations',
    description: 'Promotes global peace and cultural understanding by fostering cross-border collaborations, exchange programs, and international friendships.',
    longDescription: 'International Relations connects Rotaract UCSC to the world. Through twin club agreements, international cultural exchanges, peace forums, and joint global service initiatives across Asia, Europe, and the Americas, we give members a truly borderless perspective on service.',
    tagline: 'A local club with a global point of view.',
    icon: Globe2Icon,
    image: "/67a57244-695d-4354-86ae-42f897a404b4.jpg",
    heroInkImage: "/assets/avenues/international_relations.png",
    accent: 'sky',
    completedProjects: 21,
    directors: 3,
    volunteers: 180,
    hours: 1120,
    pillars: [
      { title: 'Twin Club Agreements', desc: 'Establishing formal partnerships with overseas Rotaract clubs for collaborative service.' },
      { title: 'Global Cultural Exchange', desc: 'Hosting virtual and in-person summits that celebrate diversity and mutual respect.' },
      { title: 'World Peace & Diplomacy', desc: 'Encouraging youth dialogue around international cooperation and global citizenship.' }
    ],
    directorList: [
      { name: 'Savin Fernando', role: 'Director of International Relations', bio: 'Championing cross-cultural dialogue and building strong partnerships that bridge continents.', image: "/42cc44eb-6af7-43f4-b8f5-17bc1fdadf2a.jpg" },
      { name: 'Ishan Fernando', role: 'Deputy Director', bio: 'Oversees international delegate programs and coordinates cross-border twin initiatives.', image: "/818710b8-73ed-4e43-8610-f1e348169730.jpg" },
      { name: 'Dinithi Wickramasinghe', role: 'Assistant Director', bio: 'Focuses on global peace awareness sessions and international newsletter exchanges.', image: "/ca2f0cc3-fe69-4170-85a4-04174d3dcf50.jpg" }
    ]
  },
  {
    slug: 'professional-development',
    number: '04',
    title: 'Professional Development',
    description: 'Enhances members\' career readiness and leadership skills through targeted training, personal branding, and mentorship.',
    longDescription: 'Professional Development bridges academia and industry. By hosting corporate career fairs, mock interview bootcamps, executive leadership workshops, and direct mentorship with industry titans, we empower computing and management students to excel with confidence.',
    tagline: 'Growing capable leaders, together.',
    icon: GraduationCapIcon,
    image: "/7bd60e2b-0f1c-4507-9b7b-43763cc9d0f6.jpg",
    heroInkImage: "/assets/avenues/professional_development.png",
    accent: 'violet',
    completedProjects: 26,
    directors: 3,
    volunteers: 210,
    hours: 1450,
    pillars: [
      { title: 'Industry Readiness & Skills', desc: 'Equipping members with high-demand tech, leadership, and soft skills.' },
      { title: 'Executive Mentorship', desc: 'Connecting undergraduates 1-on-1 with senior tech executives and alumni.' },
      { title: 'Leadership Masterclasses', desc: 'Intensive workshops on public speaking, project governance, and entrepreneurship.' }
    ],
    directorList: [
      { name: 'Tharushi Wickramasinghe', role: 'Director of Professional Development', bio: 'Dedicated to empowering the next generation of tech and business leaders with practical skills.', image: "/7bd60e2b-0f1c-4507-9b7b-43763cc9d0f6.jpg" },
      { name: 'Senura Bandara', role: 'Deputy Director', bio: 'Coordinates corporate liaisons and mock interview sessions with industry partners.', image: "/275ad849-1b14-4559-a11c-460d2229c27b.jpg" },
      { name: 'Hiruni Jayawardena', role: 'Assistant Director', bio: 'Curates hands-on workshops in resume building, LinkedIn branding, and negotiation.', image: "/bc645315-7c32-48e0-a320-0786b75e4cf2.jpg" }
    ]
  },
  {
    slug: 'public-relations',
    number: '05',
    title: 'Public Relations',
    description: 'Elevates the club\'s visibility and credibility by translating acts of service into engaging stories through strategic communication and media.',
    longDescription: 'Public Relations is the creative voice and brand guardian of Rotaract UCSC. Through cinematic photography, compelling copy, multi-channel social media campaigns, and print press coverage, we highlight our members’ dedicated service.',
    tagline: 'Giving every act of service a voice.',
    icon: MegaphoneIcon,
    image: "/6cd30f0e-0ef7-4660-8a0d-f31ff0b33536.jpg",
    heroInkImage: "/assets/avenues/public_relations.png",
    accent: 'fuchsia',
    completedProjects: 29,
    directors: 4,
    volunteers: 195,
    hours: 1300,
    pillars: [
      { title: 'Brand Stewardship', desc: 'Maintaining aesthetic elegance and consistent visual brand identity across all media.' },
      { title: 'Visual & Editorial Storytelling', desc: 'Crafting powerful narratives that turn project metrics into human emotion.' },
      { title: 'Media Relations & Press', desc: 'Securing national news publications and digital partnerships for major club initiatives.' }
    ],
    directorList: [
      { name: 'Kavishka Mendis', role: 'Director of Public Relations', bio: 'Passionate visual designer and communicator turning club energy into compelling stories.', image: "/6cd30f0e-0ef7-4660-8a0d-f31ff0b33536.jpg" },
      { name: 'Chamath Jayasuriya', role: 'Deputy Director', bio: 'Leads digital campaign strategies and content optimization across social channels.', image: "/1a8b2e81-ab80-4068-9634-903244ac7dd9.jpg" },
      { name: 'Anuki Senaratne', role: 'Assistant Director', bio: 'Oversees press releases, media liaisons, and written editorial publications.', image: "/fd840c2c-1ea8-4895-b20f-3e3507f9cca5.jpg" }
    ]
  },
  {
    slug: 'sports-recreation',
    number: '06',
    title: 'Sports & Recreational Activities',
    description: 'Boosts member well-being and teamwork through a diverse mix of competitive sports, e-sports, and relaxing recreational events.',
    longDescription: 'Sports & Recreation brings vibrant physical energy, competitive spirit, and deep camaraderie to the club. From intense cricket encounters and badminton showdowns to university e-sports leagues and wellness hikes, we champion healthy living and team bonding.',
    tagline: 'Shared play. Stronger bonds.',
    icon: TrophyIcon,
    image: "/9ea0281f-b406-40be-843a-2f5feee2eadb.jpg",
    heroInkImage: "/assets/avenues/sports.png",
    accent: 'orange',
    completedProjects: 17,
    directors: 2,
    volunteers: 160,
    hours: 920,
    pillars: [
      { title: 'Inter-Batch Tournaments', desc: 'Organising annual tournaments across cricket, futsal, basketball, and badminton.' },
      { title: 'Wellness & Mindfulness', desc: 'Promoting healthy work-life balance, outdoor trekking, and mental health check-ins.' },
      { title: 'E-Sports & Virtual Gaming', desc: 'Hosting competitive collegiate gaming championships with district-wide participation.' }
    ],
    directorList: [
      { name: 'Ruvindu Perera', role: 'Director of Sports & Recreation', bio: 'Champion athlete bringing competitive passion, fair play, and infectious energy to every fixture.', image: "/9ea0281f-b406-40be-843a-2f5feee2eadb.jpg" },
      { name: 'Janith Silva', role: 'Deputy Director', bio: 'Coordinates tournament logistics, referee panels, and venue bookings.', image: "/30eb46d8-e624-4d01-ac52-df469d4f0514.jpg" },
      { name: 'Akila Perera', role: 'Assistant Director', bio: 'Specialises in managing e-sports livestreams and inter-club sports fixtures.', image: "/15c49e70-0bc5-439e-a10f-5b208e5e4a2a.jpg" }
    ]
  },
  {
    slug: 'finance',
    number: '07',
    title: 'Finance Service',
    description: 'Ensures financial stability and transparency through strategic budgeting, effective fundraising, and securing sponsorships to support club goals.',
    longDescription: 'Finance Service provides the vital financial backbone that transforms ambitious visions into tangible reality. We ensure absolute fiscal integrity, design sustainable revenue channels, build corporate sponsor relationships, and manage budgets with precision.',
    tagline: 'Sustaining purpose with smart stewardship.',
    icon: WalletIcon,
    image: "/3f14fe35-b548-4965-8c3f-3b2cfbb4f675.jpg",
    heroInkImage: "/assets/avenues/finance.png",
    accent: 'amber',
    completedProjects: 15,
    directors: 2,
    volunteers: 110,
    hours: 780,
    pillars: [
      { title: 'Fiscal Transparency & Auditing', desc: 'Maintaining impeccable financial books, transparent ledgers, and formal audits.' },
      { title: 'Corporate Sponsorships', desc: 'Partnering with leading enterprises for sustainable project funding and brand alignment.' },
      { title: 'Creative Fundraising', desc: 'Designing high-yield merchandise, ticketed charity galas, and digital fundraisers.' }
    ],
    directorList: [
      { name: 'Rehan Jayasuriya', role: 'Director of Finance', bio: 'Believes financial clarity and ethical governance create the foundation for lasting trust.', image: "/3f14fe35-b548-4965-8c3f-3b2cfbb4f675.jpg" },
      { name: 'Thisal Gunawardena', role: 'Deputy Director', bio: 'Focuses on corporate pitch proposals and long-term donor relationship management.', image: "/267a9c62-f596-4ef8-8e05-aecb76584af5.jpg" },
      { name: 'Natasha De Silva', role: 'Assistant Director', bio: 'Manages ledger reconciliations, receipt verifications, and project disbursements.', image: "/eff12ed3-803f-4062-b192-f637594f8191.jpg" }
    ]
  },
  {
    slug: 'digital-services',
    number: '08',
    title: 'Digital Services',
    description: 'Manages the club\'s technological infrastructure, including website development and digital tools, to streamline operations and expand digital presence.',
    longDescription: 'Digital Services builds the modern digital infrastructure that powers Rotaract UCSC. Drawing on the premier computing talent of UCSC, we design world-class web applications, automated registration workflows, and cutting-edge tech experiences.',
    tagline: 'Crafting the club’s digital heartbeat.',
    icon: MonitorSmartphoneIcon,
    image: "/275ad849-1b14-4559-a11c-460d2229c27b.jpg",
    heroInkImage: "/assets/avenues/digital_services.png",
    accent: 'cyan',
    completedProjects: 24,
    directors: 3,
    volunteers: 155,
    hours: 1250,
    pillars: [
      { title: 'Web Systems & Engineering', desc: 'Architecting fast, responsive, and secure digital platforms for club activities.' },
      { title: 'UI/UX & Experience Craft', desc: 'Crafting pixel-perfect, accessible, and delightful digital user journeys.' },
      { title: 'Tech Enablement & Automation', desc: 'Building internal tools, bots, and digital registration systems for seamless operations.' }
    ],
    directorList: [
      { name: 'Yasara Fernando', role: 'Director of Digital Services', bio: 'Creative technologist and UI/UX craftsman dedicated to high-performance web products.', image: "/275ad849-1b14-4559-a11c-460d2229c27b.jpg" },
      { name: 'Ayesh Silva', role: 'Deputy Director', bio: 'Full-stack engineer managing cloud infrastructure and API integrations.', image: "/0c4eedc5-dbbd-4c4b-8680-6ceb83e9b26f.jpg" },
      { name: 'Oshada Karunaratne', role: 'Assistant Director', bio: 'Front-end specialist passionate about smooth interactions and accessible component design.', image: "/6f689b9a-3f1b-424f-b0cf-51b80d9aaea3.jpg" }
    ]
  },
  {
    slug: 'membership-development',
    number: '09',
    title: 'Membership Development',
    description: 'Attracts, engages, and mentors members throughout their Rotaract journey, fostering leadership retention and personal growth.',
    longDescription: 'Membership Development is the lifeblood of our club’s longevity. We guide passionate students from their very first inquiry through structured induction, skill assessments, buddy mentorship, and leadership recognition, ensuring every individual thrives.',
    tagline: 'Inspiring journeys from newcomer to changemaker.',
    icon: UserPlusIcon,
    image: "/1a8b2e81-ab80-4068-9634-903244ac7dd9.jpg",
    heroInkImage: "/assets/avenues/membership.png",
    accent: 'emerald',
    completedProjects: 16,
    directors: 3,
    volunteers: 185,
    hours: 1040,
    pillars: [
      { title: 'Recruitment & Onboarding', desc: 'Welcoming enthusiastic recruits and facilitating smooth transition into active committees.' },
      { title: 'Mentorship & Retention', desc: 'Pairing junior members with experienced senior mentors for continuous guidance.' },
      { title: 'Leadership Recognition', desc: 'Celebrating milestone volunteer contributions and preparing future board leaders.' }
    ],
    directorList: [
      { name: 'Minoli Perera', role: 'Director of Membership Development', bio: 'Champion of student empowerment who believes genuine mentorship sparks lifelong leaders.', image: "/1a8b2e81-ab80-4068-9634-903244ac7dd9.jpg" },
      { name: 'Sanjana Abeykoon', role: 'Deputy Director', bio: 'Oversees member engagement surveys, onboarding workshops, and buddy programs.', image: "/18ac27f6-1048-44e9-b289-79bbf976c092.jpg" },
      { name: 'Rashmi Mendis', role: 'Assistant Director', bio: 'Coordinates member records, meeting attendance, and recognition certificates.', image: "/ca2f0cc3-fe69-4170-85a4-04174d3dcf50.jpg" }
    ]
  }
];


export interface ProjectCatalogItem {
  id: string;
  title: string;
  avenue: string;
  date: string;
  description: string;
  image: string;
  status: 'Ongoing' | 'Completed';
  category: string;
  year: string;
  collaboration?: string;
  volunteers: number;
  photos: number;
  likes: number;
  progress?: number;
}

export const PROJECT_CATALOG: ProjectCatalogItem[] = [
{
  id: 'achieve-beyond',
  title: 'Achieve Beyond 3.0',
  avenue: 'Professional Development',
  date: 'May 2026',
  description: 'A signature career readiness and leadership accelerator preparing undergraduates for the corporate world with practical skills and mentoring.',
  image: '/assets/projects/achieve-beyond.jpg',
  status: 'Completed',
  category: 'Professional Skills',
  year: '2026',
  collaboration: 'Rotary Club of Colombo Down Town',
  volunteers: 68,
  photos: 46,
  likes: 165
},
{
  id: 'manudam-viyamana',
  title: 'මනුදම් වියමන 2026',
  avenue: 'Community Service',
  date: 'Jun 2026',
  description: 'A heartfelt community outreach project providing essential aid, nutrition packs, and sustainable support to underserved families.',
  image: '/assets/projects/manudam-viyamana.jpg',
  status: 'Completed',
  category: 'Community Aid',
  year: '2026',
  collaboration: 'Rotaract Club of UCSC',
  volunteers: 84,
  photos: 52,
  likes: 198
},
{
  id: 'book-of-hope',
  title: 'Book of Hope',
  avenue: 'Community Service',
  date: 'Mar 2026',
  description: 'Building a bright, well-stocked children’s library for young readers in an underserved community.',
  image: "/d9bd489e-919e-405e-9ba0-68bc147e9344.jpg",
  status: 'Ongoing',
  category: 'Education',
  year: '2026',
  collaboration: 'Rotaract District 3220',
  volunteers: 76,
  photos: 48,
  likes: 128,
  progress: 68
},

{
  id: 'books-beyond',
  title: 'Books & Beyond',
  avenue: 'International Service',
  date: 'Apr 2026',
  description: 'Delivering school essentials and stories that open doors to brighter learning futures.',
  image: "/67a57244-695d-4354-86ae-42f897a404b4.jpg",
  status: 'Ongoing',
  category: 'Education',
  year: '2026',
  volunteers: 64,
  photos: 32,
  likes: 91,
  progress: 42
},
{
  id: 'member-mosaic',
  title: 'Member Mosaic',
  avenue: 'Club Service',
  date: 'Jan 2026',
  description: 'A signature welcome experience that turned new-member introductions into lasting friendships.',
  image: "/1e74bf3b-bd1e-4979-a2ae-f0d17883d4b4.jpg",
  status: 'Completed',
  category: 'Fellowship',
  year: '2026',
  volunteers: 38,
  photos: 54,
  likes: 174
},
{
  id: 'rhythm-of-us',
  title: 'Rhythm of Us',
  avenue: 'Club Service',
  date: 'Dec 2025',
  description: 'An intimate evening of music, stories and celebration created by and for the club family.',
  image: "/3f14fe35-b548-4965-8c3f-3b2cfbb4f675.jpg",
  status: 'Completed',
  category: 'Fellowship',
  year: '2025',
  volunteers: 29,
  photos: 67,
  likes: 203
},
{
  id: 'future-ready',
  title: 'Future Ready',
  avenue: 'Professional Development',
  date: 'Nov 2025',
  description: 'A hands-on career lab connecting members with mentors, portfolios and practical insight.',
  image: "/7bd60e2b-0f1c-4507-9b7b-43763cc9d0f6.jpg",
  status: 'Completed',
  category: 'Leadership',
  year: '2025',
  collaboration: 'UCSC Alumni Network',
  volunteers: 42,
  photos: 41,
  likes: 159
}];


export const CLUB_DIRECTORS = [
{
  name: 'Nethmi Perera',
  role: 'Director of Club Service',
  bio: 'A people-first organiser who believes the best club culture is built in the small, thoughtful moments.',
  image: "/275ad849-1b14-4559-a11c-460d2229c27b.jpg"
},
{
  name: 'Kavindu Silva',
  role: 'Deputy Director',
  bio: 'Known for turning a spark of an idea into an experience members still talk about weeks later.',
  image: "/1b5d40fc-f357-4554-bc2e-e1067ca01441.jpg"
},
{
  name: 'Yasara Fernando',
  role: 'Assistant Director',
  bio: 'A detail-led creative who makes sure each new face has a clear path into the club family.',
  image: "/bc645315-7c32-48e0-a320-0786b75e4cf2.jpg"
}];


export const CLUB_MILESTONES = [
{ date: 'Aug 2025', title: 'The first welcome circle', text: '92 new and returning members met through a guided club-story experience.' },
{ date: 'Oct 2025', title: 'Fellowship in motion', text: 'The first inter-batch sports night brought six teams and one unforgettable final together.' },
{ date: 'Dec 2025', title: 'Rhythm of Us', text: 'A sold-out year-end celebration became the most photographed club event of the term.' },
{ date: 'Mar 2026', title: 'Member Mosaic', text: 'A new member-led programme gave every committee a place to share its story.' }];