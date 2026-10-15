export type Project = {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  details: string[];
  size: number; // relative bubble size
  x: number; // % position within cluster
  y: number;
  tint: string; // css var color token
  images?: string[];
  demoUrl?: string;
  githubUrl?: string;
};

export const frontendProjects: Project[] = [
  {
    id: "swiftcred",
    name: "SwiftCred",
    tagline: "Credit Card Portfolio Dashboard",
    stack: ["ReactJS", "TypeScript", "ShadcnUI", "Tailwind CSS", "Bun"],
    details: [
      "An interactive credit card portfolio dashboard tracking sign-up bonuses, fee calendars, active cards, 5/24 status, and lifetime rewards.",
      "Built on React + TypeScript with ShadcnUI primitives, dark/light mode toggling, and a Bun-powered toolchain.",
      "Real-time Chase 5/24 rule calculations, drop date projections, and upcoming fee alert notifications."
    ],
    size: 1.15,
    x: 50,
    y: 46,
    tint: "var(--periwinkle)",
    images: [
      "/Websites/SwiftCred_dark.webp",
      "/Websites/SwiftCred_light.webp"
    ],
    githubUrl: "https://github.com/d-daphne/swiftcred"
  },
  {
    id: "ddpg-bookclub",
    name: "DDPG BookClub",
    tagline: "Computer Programming Club Portal",
    stack: ["Tailwind CSS", "JSP", "Java Servlet"],
    details: [
      "Academic programming club portal built with Java Web Technologies for section management, member directories, and assignment tracking.",
      "Server-rendered JSP views styled with a custom responsive Tailwind CSS design system.",
      "Team profile cards highlighting role allocation (Mastermind & Driver) and project submission metadata."
    ],
    size: 1.0,
    x: 20,
    y: 32,
    tint: "var(--petal)",
    images: [
      "/Websites/DDPG Programming Club.webp"
    ],
    githubUrl: "https://github.com/d-daphne/ddpg-club"
  },
  {
    id: "copilot-agent",
    name: "Copilot BI Agent",
    tagline: "AI SQL Schema Generation Base",
    stack: ["GitHub Copilot", "SQL", "Prompt Engineering"],
    details: [
      "Built at D2L as a specialized AI Copilot agent acting as a centralized LMS schema knowledge base.",
      "Automates SQL query generation, cutting manual script writing effort by 65% for the analytics team.",
      "Enforces data governance and standardizes joins across AWS QuickSight & SQL backends."
    ],
    size: 0.9,
    x: 80,
    y: 32,
    tint: "var(--orchid)",
    githubUrl: "https://github.com/d-daphne"
  },
  {
    id: "municipal-powerbi",
    name: "Municipal BI Gateway",
    tagline: "Power BI & Work Order Analytics",
    stack: ["Power BI", "SQL Server", "Star Schema", "DAX"],
    details: [
      "Enterprise Power BI dashboards tracking municipal work orders and asset management for Region of Waterloo.",
      "Optimized SQL extraction queries reducing refresh latency and maintaining enterprise gateway health.",
      "Surfaced critical service patterns for senior leadership and Project Managers."
    ],
    size: 0.85,
    x: 24,
    y: 65,
    tint: "var(--lilac)",
    githubUrl: "https://github.com/d-daphne"
  },
  {
    id: "domo-quicksight-migration",
    name: "AWS QuickSight Migration",
    tagline: "Zero-Downtime Data Pipeline",
    stack: ["AWS QuickSight", "Domo", "SQL Data Validation"],
    details: [
      "Large-scale enterprise reporting migration from Domo to AWS QuickSight with 100% data integrity.",
      "Authored complex SQL validation scripts comparing cross-platform metric outputs.",
      "Visualized learner engagement, assessment scores, and tool adoption metrics."
    ],
    size: 0.85,
    x: 76,
    y: 65,
    tint: "var(--blossom)",
    githubUrl: "https://github.com/d-daphne"
  }
];

export type DataRole = {
  id: string;
  org: string;
  role: string;
  period: string;
  location: string;
  blurb: string;
  bullets: string[];
  tools: string[];
};

export const dataRoles: DataRole[] = [
  {
    id: "waterloo",
    org: "Region of Waterloo",
    role: "Business Analyst Co-op",
    period: "Jan 2026 – Aug 2026",
    location: "Kitchener, ON",
    blurb: "Municipal asset & work order analytics",
    bullets: [
      "Authored optimized SQL queries to extract data from municipal databases and engineered robust star schema data models to streamline Power BI multi-source integration.",
      "Developed interactive Power BI dashboards and visualizations to track work order and asset management data, enabling management to identify critical service patterns.",
      "Owned the reporting lifecycle by troubleshooting data refresh failures and gateway issues, ensuring continuous daily delivery and data validation for enterprise dashboards.",
      "Partnered with Project Managers and senior leadership to gather business requirements, translating operational needs into technical briefs and strategic presentations."
    ],
    tools: ["SQL", "Power BI", "Star Schema", "DAX", "Data Gateway"]
  },
  {
    id: "d2l",
    org: "D2L - LMS Software",
    role: "Learning Analyst Co-op",
    period: "May 2025 – Dec 2025",
    location: "Kitchener, ON",
    blurb: "LMS software for online learning and teaching",
    bullets: [
      "Built a custom GitHub Copilot Business agent acting as a centralized schema knowledge base, automating SQL query generation and significantly reducing manual script-writing effort for the analytics team.",
      "Designed and optimized SQL queries and built AWS QuickSight dashboards to visualize learner engagement, assessment performance, and tool adoption metrics.",
      "Spearheaded a large-scale data migration from Domo to AWS QuickSight, writing complex SQL queries and validating data pipelines to ensure 100% data integrity with zero downtime."
    ],
    tools: ["SQL", "AWS QuickSight", "GitHub Copilot", "Domo", "Data Migration"]
  }
];

export const education = [
  {
    school: "Conestoga College",
    program: "Advanced Diploma in Computer Programming and Analysis",
    location: "Waterloo, ON",
    featured: true,
    details: "Enterprise software development, database architecture, Java Web technologies, and systems analysis."
  },
  {
    school: "Seneca Polytechnic",
    program: "Certificate in Project Management & Sustainable Business Management",
    location: "Toronto, ON",
    featured: false,
    details: "Project lifecycle management, Agile execution, stakeholder communication, and business analytics."
  }
];

export const certifications = [
  { code: "PL-300", label: "Power BI Data Analyst Associate", issuer: "Microsoft", year: "2025" },
  { code: "AZ-900", label: "Azure Fundamentals", issuer: "Microsoft", year: "2025" },
  { code: "CAPM", label: "Certified Associate in Project Management", issuer: "PMI", year: "2024" },
  { code: "SQL", label: "Star Schema & Database Design", issuer: "Conestoga", year: "2025" }
];

export const skillGroups = [
  { title: "Data & Programming", items: ["SQL", "Python", "Pandas", "NumPy", "Scikit-Learn", "DAX"] },
  { title: "Business Intelligence", items: ["Power BI", "AWS QuickSight", "Domo", "Power Apps", "Excel"] },
  { title: "Frontend", items: ["ReactJS", "TypeScript", "Tailwind CSS", "ShadcnUI", "JSP", "Flutter"] },
  { title: "Cloud & Tools", items: ["AWS", "Azure", "GitHub Copilot", "Git", "MySQL", "Jira"] }
];

export const contact = {
  name: "Daphne Duong",
  email: "daphne.ngoc@gmail.com",
  linkedin: "https://linkedin.com/in/ddaphne",
  github: "https://github.com/d-daphne",
  summary: "Data & Systems Analyst with a strong foundation in enterprise business intelligence, custom database design, and workflow automation. Proven expertise in leveraging Microsoft Power Platform (Power BI, Power Apps), SQL, and React to transform complex operational data into real-time decision-making tools."
};
