/**
 * ==============================================================================
 * PORTFOLIO DATA STORE (ข้อมูลกลางสำหรับเว็บไซต์ Portfolio ของคุณสราวุธ)
 * อัปเดตข้อมูลจริงตามประวัติ ความสนใจ ทักษะ ซอฟต์แวร์ และช่องทางการติดต่อ
 * ==============================================================================
 */

export const personalData = {
  name: "สราวุธ วิเศษพล",
  englishName: "Sarawut Wisetphon",
  title: "Web Developer & UI/UX Designer | Content Creator",
  statusBadge: "Just Do It",
  availability: "Full-Time / Freelance / Internship",
  email: "ark44228@gmail.com",
  phone: "0953371342",
  location: "Bangkok, Thailand (พร้อมทำงาน Onsite / Hybrid / Remote)",
  github: "https://github.com/SarawutEz",
  instagram: "https://www.instagram.com/sarawut_wsth/",
  facebook: "https://web.facebook.com/sarawut.wisetphon",
  resumeUrl: "#resume",
  shortBio: "ทำไปเรื่อยชอบการลงมือทำเเละการได้เรียนรู้หรือพบเจอสิ่งใหม่ๆ",
  longBio: [
    "ชื่อเบียร์ครับ อายุ 20 ปี ชอบในการคิดสร้างสรรค์เเละการออกเเบบมีความชื่นชอบในการเรียนรู้เเละการหาอะไรทำใหม่ ๆ ชอบในการเล่นเกมเเละการทำให้สิ่งที่สามารถเห็นผลลัพธ์ได้อย่างชัดเจน พร้อมเปิดรับทุกความท้าทายเพื่อพัฒนาตัวเอง",
    "นอกจากทักษะด้านการเขียนโค้ดและดีไซน์แล้ว ผมยังมีความชื่นชอบและเชี่ยวชาญด้านงานมัลติมีเดีย และการตัดต่อวิดีโอสร้าง Content รวมถึงมีความสนใจอย่างยิ่งในเทคโนโลยีปัญญาประดิษฐ์ (AI) เพื่อนำมาประยุกต์ใช้ยกระดับการทำงานในชีวิตประจำวัน"
  ],
  stats: [
    { label: "โปรเจกต์และผลงาน", value: "3+", icon: "FolderGit2" },
    { label: "กิจกรรม & Workshop", value: "5+", icon: "Trophy" },
    { label: "เครื่องมือและซอฟต์แวร์", value: "10+", icon: "Code2" },
    { label: "ความมุ่งมั่นทุ่มเท", value: "100%", icon: "Sparkles" }
  ]
};

export const interestsData = [
  {
    id: 1,
    title: "การพัฒนาเว็บไซต์ และ Web Technology ใหม่ๆ",
    description: "ติดตามเทรนด์และเครื่องมือการทำเว็บสมัยใหม่ เพื่อสร้างเว็บไซต์ที่รวดเร็ว ลื่นไหล และตอบสนองได้ทุกหน้าจอ",
    icon: "Globe"
  },
  {
    id: 2,
    title: "การออกแบบ UI/UX ที่เน้นผู้ใช้งานเป็นศูนย์กลาง (User-Centric)",
    description: "ใส่ใจในรายละเอียดของการวาง Layout, Typography, การจัดลำดับสายตา และ Interaction เพื่อประสบการณ์ที่ดีที่สุด",
    icon: "Palette"
  },
  {
    id: 3,
    title: "การถ่ายภาพ และการตัดต่อวิดีโอสร้าง Content",
    description: "บอกเล่าเรื่องราวผ่านมุมมองภาพถ่ายและการตัดต่อวิดีโอที่น่าดึงดูด สร้างสรรค์คอนเทนต์ที่มีคุณภาพ",
    icon: "Video"
  },
  {
    id: 4,
    title: "เทคโนโลยีปัญญาประดิษฐ์ (AI) ในชีวิตประจำวัน",
    description: "ศึกษาและประยุกต์ใช้เครื่องมือ AI ในการเพิ่มประสิทธิภาพการทำงาน ทั้งงานโค้ด งานดีไซน์ และงานคอนเทนต์",
    icon: "Sparkles"
  }
];

export const skillsData = {
  webAndDesign: [
    { name: "UI/UX Design" },
    { name: "Web Design" },
    { name: "Responsive Layout" },
    { name: "HTML5 / Modern CSS" },
    { name: "JavaScript / React" },
    { name: "User Interface Prototyping" }
  ],
  multimediaAndCreative: [
    { name: "Video Editor (การตัดต่อวิดีโอ)" },
    { name: "Graphic Editor (การแต่งกราฟิก)" },
    { name: "Photography (การถ่ายภาพ)" },
    { name: "Content Creation" },
    { name: "Visual Storytelling" }
  ],
  softwareAndTools: [
    { name: "VS Code", category: "Development" },
    { name: "Git / GitHub", category: "Version Control" },
    { name: "Adobe Photoshop", category: "Graphic Design" },
    { name: "Adobe Premiere Pro", category: "Video Editing" },
    { name: "Canva", category: "Design & Presentation" },
    { name: "Capcut", category: "Short-form Video" },
    { name: "Microsoft Office", category: "Productivity" }
  ],
  softSkills: [
    "Problem Solving (การแก้ปัญหา)",
    "Logical Thinking (การคิดเชิงตรรกะ)",
    "Teamwork (การทำงานร่วมกันเป็นทีม)",
    "Communication (การสื่อสารที่มีประสิทธิภาพ)",
    "Creativity & Adaptability (ความคิดสร้างสรรค์และการปรับตัว)",
    "Time Management (การบริหารเวลาและความรับผิดชอบ)"
  ]
};

export const projectsData = [
  {
    id: 1,
    title: "Creative Portfolio & UI Showcase",
    category: "Full-Stack",
    description: "เว็บไซต์ Portfolio ดีไซน์โมเดิร์นแบบ Glassmorphism พร้อมระบบสลับธีม และการจัดแสดงผลงานแบบ Interactive",
    fullDescription: "โปรเจกต์พัฒนาเว็บแอปพลิเคชัน Portfolio สไตล์ Modern Dark Glassmorphism ผสานโทนสีดำ-ขาว-เหลืองนีออน ออกแบบตามหลัก UI/UX User-Centric รองรับทั้ง Desktop, Tablet และ Mobile เต็มรูปแบบ",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Vanilla CSS", "UI/UX Design", "Vite", "Responsive Design"],
    liveUrl: "https://demo.example.com",
    githubUrl: "https://github.com/SarawutEz",
    featured: true,
    highlights: [
      "ออกแบบด้วยแนวคิด User-Centric อ่านง่าย สบายตา",
      "ระบบ Theme Switcher รองรับ Dark / Light Mode",
      "ระบบ Filter แยกหมวดหมู่ผลงานและ Interactive Lightbox สำหรับดูรูปภาพ",
      "การจัดระเบียบโค้ดแบบ Component-Based ที่นำไปต่อยอดได้ง่าย"
    ]
  },
  {
    id: 2,
    title: "Campus Event & Ticket Hub",
    category: "Full-Stack",
    description: "ระบบลงทะเบียนและจัดการกิจกรรมพร้อม QR Code และหน้าจัดการข้อมูลแบบ Real-time",
    fullDescription: "แพลตฟอร์มศูนย์รวมกิจกรรมและอีเวนต์สำหรับนักศึกษา ช่วยให้อาจารย์และชมรมสามารถสร้างอีเวนต์ จัดการตั๋ว ตรวจสอบรายชื่อผู้ลงทะเบียน และสแกน QR Code เข้างานได้สะดวกรวดเร็ว",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "UI Design", "TypeScript", "MongoDB", "QR Scanner"],
    liveUrl: "https://campus-hub.example.com",
    githubUrl: "https://github.com/SarawutEz",
    featured: true,
    highlights: [
      "ระบบออกบัตร E-Ticket พร้อม QR Code อัตโนมัติ",
      "Dashboard สำหรับ Organizer ดูยอดผู้เข้าร่วมงานแบบสดๆ",
      "ระบบส่งอีเมลยืนยันการลงทะเบียนพร้อมไฟล์ PDF",
      "รองรับการค้นหาและฟิลเตอร์กิจกรรมตามหมวดหมู่และวันที่"
    ]
  },
  {
    id: 3,
    title: "Multimedia & Video Production Showcase",
    category: "Frontend",
    description: "โปรเจกต์รวบรวมผลงานตัดต่อวิดีโอ กราฟิกดีไซน์ และคอนเทนต์มีเดียพร้อม Video Player แบบกำหนดเอง",
    fullDescription: "หน้าแสดงผลงานตัดต่อวิดีโอและกราฟิกที่ผลิตด้วย Premiere Pro, Photoshop, Capcut และ Canva นำเสนอผ่าน Web UI ที่ทันสมัย ลื่นไหล และดึงดูดสายตา",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    tags: ["Premiere Pro", "Photoshop", "Capcut", "Canva", "Video Editing", "Content Creation"],
    liveUrl: "https://media-showcase.example.com",
    githubUrl: "https://github.com/SarawutEz",
    featured: true,
    highlights: [
      "การจัดลำดับการเล่าเรื่อง (Visual Storytelling) อย่างน่าสนใจ",
      "การเกรดสีและปรับแต่งเสียงระดับมืออาชีพ",
      "การออกแบบ Graphic Overlay และ Thumbnail ที่สะดุดตา"
    ]
  },
  {
    id: 4,
    title: "AI Medical Assistant & Symptom Checker",
    category: "Mobile / AI",
    description: "ระบบผู้ช่วยประเมินอาการเบื้องต้นด้วย Generative AI และแนะนำสถานพยาบาลที่ใกล้ที่สุด",
    fullDescription: "โปรเจกต์ที่ผสมผสาน AI API ในการคัดกรองอาการสุขภาพเบื้องต้นผ่านระบบแชตบอตอัจฉริยะ ให้คำแนะนำการดูแลสุขภาพเบื้องต้น พร้อมระบบแนะนำพิกัดโรงพยาบาลและคลินิก",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    tags: ["AI Technology", "UI/UX Design", "React", "Python", "OpenAI API"],
    liveUrl: "https://ai-health.example.com",
    githubUrl: "https://github.com/SarawutEz",
    featured: false,
    highlights: [
      "ประยุกต์ใช้ AI ในการช่วยแก้ปัญหาจริงในชีวิตประจำวัน",
      "ออกแบบ UI แชตบอตที่ใช้งานง่าย เข้าใจง่ายสำหรับทุกวัย",
      "ระบบคำนวณและแสดงผลได้อย่างรวดเร็ว"
    ]
  }
];

export const activitiesData = [
  {
    id: 1,
    title: "รางวัลชนะเลิศอันดับ 1 - National University Hackathon 2024",
    category: "Competition / Hackathon",
    date: "ตุลาคม 2024",
    role: "Web & UI/UX Developer",
    organization: "สมาคมนวัตกรรมและเทคโนโลยีดิจิทัล",
    description: "ร่วมพัฒนาโซลูชันแพลตฟอร์มจัดการขยะรีไซเคิลด้วย AI และ Gamification ภายในเวลา 48 ชั่วโมง โดยทำหน้าที่รับผิดชอบด้านการออกแบบ UI/UX และพัฒนาหน้าเว็บ Frontend",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    badge: "🏆 1st Winner",
    tags: ["Hackathon", "UI/UX Design", "Web Design", "Teamwork"]
  },
  {
    id: 2,
    title: "วิทยากรบรรยาย: Introduction to Modern Web Design & Content Creation",
    category: "Workshop / Speaker",
    date: "กรกฎาคม 2024",
    role: "Keynote Speaker & Mentor",
    organization: "Tech & Media Club",
    description: "จัดกิจกรรมเวิร์กช็อปสอนน้องๆ และผู้สนใจเกี่ยวกับพื้นฐานการออกแบบเว็บไซต์ การตัดต่อวิดีโอคอนเทนต์ และการใช้เครื่องมือ AI ผู้เข้าร่วมกว่า 80+ คน",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    badge: "🎤 Speaker",
    tags: ["Mentorship", "Public Speaking", "UI/UX", "Content Creation"]
  },
  {
    id: 3,
    title: "เข้าร่วมงาน Tech Conference & Creative Summit 2024",
    category: "Conference",
    date: "พฤษภาคม 2024",
    role: "Participant & Networking",
    organization: "Creative Tech Summit",
    description: "เข้าร่วมฟังสัมมนาอัปเดตเทรนด์ AI, Web Technology, Modern UI/UX และแนวทางการสร้างสรรค์ Digital Media ยุคใหม่",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    badge: "🌟 Conference",
    tags: ["AI Trends", "UI/UX", "Web Tech", "Networking"]
  },
  {
    id: 4,
    title: "ประธานชมรมคอมพิวเตอร์และสื่อดิจิทัล (Computer & Media Club)",
    category: "Leadership / Volunteer",
    date: "2023 - 2024",
    role: "Club President",
    organization: "มหาวิทยาลัย",
    description: "นำทีมจัดกิจกรรมแข่งขันออกแบบเว็บ ค่ายตัดต่อสื่อมัลติมีเดีย และดูแลงานสื่อและโปรเจกต์ของชมรม",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    badge: "💼 Leadership",
    tags: ["Team Management", "Event Planning", "Media Production"]
  }
];

export const galleryData = [
  {
    id: 1,
    title: "รับรางวัลการแข่งขัน Hackathon 2024",
    category: "Competitions",
    date: "ตุลาคม 2024",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
    caption: "ภาพถ่ายความประทับใจร่วมกับทีมหลังคว้าชัยชนะในการแข่งขันพัฒนาโซลูชันดิจิทัล 48 ชั่วโมง"
  },
  {
    id: 2,
    title: "บรรยากาศการแชร์ความรู้ในงาน Workshop",
    category: "Workshops",
    date: "กรกฎาคม 2024",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    caption: "การสอนและตอบข้อซักถามในการออกแบบ UI/UX และการตัดต่อวิดีโอให้กับผู้เข้าร่วมเวิร์กช็อป"
  },
  {
    id: 3,
    title: "การทำงานร่วมกันเป็นทีม (Brainstorming & Design Sprint)",
    category: "Teamwork",
    date: "สิงหาคม 2024",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
    caption: "ช่วงเวลาการประชุมวางแผน User Flow, Wireframe และ Design System ร่วมกับทีม"
  },
  {
    id: 4,
    title: "บรรยากาศงาน Tech Summit & Exhibition",
    category: "Events",
    date: "พฤษภาคม 2024",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80",
    caption: "เยี่ยมชมบูธจัดแสดงเทคโนโลยีและพบปะแลกเปลี่ยนความคิดเห็นกับดีไซเนอร์และนักพัฒนา"
  },
  {
    id: 5,
    title: "มุมโต๊ะทำงานและ Creative Workspace",
    category: "Workspace",
    date: "ตลอดปี 2024",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
    caption: "พื้นที่สร้างสรรค์ผลงาน ออกแบบ และตัดต่อวิดีโอคอนเทนต์ประจำวัน"
  },
  {
    id: 6,
    title: "การนำเสนอผลงานโปรเจกต์ Final Presentation",
    category: "Events",
    date: "มีนาคม 2024",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80",
    caption: "การพรีเซนต์ผลงานและแสดง Demo ต่อหน้าคณะกรรมการและอาจารย์ที่ปรึกษา"
  }
];

export const resumeData = {
  education: [
    {
      degree: "ปริญญาตรี วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์ / เทคโนโลยีสารสนเทศ",
      englishDegree: "Bachelor of Science in Computer Science / Information Technology",
      institution: "มหาวิทยาลัยชั้นนำในประเทศไทย (University)",
      period: "2021 - 2025 (คาดว่าจะสำเร็จการศึกษา)",
      gpa: "GPA: 3.65 (เกียรตินิยมอันดับ 2)",
      description: "เน้นการศึกษาด้านการพัฒนาเว็บ, การออกแบบ UI/UX, โครงสร้างข้อมูล, สื่อดิจิทัล และการประยุกต์ใช้เทคโนโลยี AI"
    },
    {
      degree: "มัธยมศึกษาตอนปลาย แผนการเรียนวิทยาศาสตร์ - คณิตศาสตร์",
      englishDegree: "High School Diploma (Science - Mathematics)",
      institution: "โรงเรียนมัธยมศึกษา",
      period: "2015 - 2021",
      gpa: "GPA: 3.80",
      description: "ตัวแทนเข้าร่วมกิจกรรมด้านคอมพิวเตอร์ การผลิตสื่อ และกิจกรรมพัฒนาทักษะการคิดเชิงตรรกะ"
    }
  ],
  experience: [
    {
      role: "Web & UI/UX Developer Intern",
      company: "Digital Media & Tech Studio",
      period: "มิถุนายน 2024 - สิงหาคม 2024 (3 เดือน)",
      location: "Bangkok, Thailand",
      responsibilities: [
        "ร่วมออกแบบ UI/UX และพัฒนาหน้าเว็บไซต์สำหรับลูกค้าธุรกิจและองค์กร",
        "สร้างสรรค์สื่อกราฟิกและตัดต่อวิดีโอโปรโมตสำหรับเผยแพร่บน Social Media",
        "ทดสอบความเข้ากันได้ของระบบ (Cross-browser & Responsive Testing) บนทุกอุปกรณ์",
        "ทำงานร่วมกับทีมผ่านกระบวนการ Agile/Scrum และรับฟัง Feedback จากผู้ใช้งานจริง"
      ]
    },
    {
      role: "Freelance Web Designer & Content Creator",
      company: "Self-Employed",
      period: "2023 - ปัจจุบัน",
      location: "Remote",
      responsibilities: [
        "รับออกแบบและพัฒนาเว็บไซต์ Landing Page ให้กับร้านค้าและบุคคลทั่วไป",
        "รับตัดต่อวิดีโอสั้น (Short-form / Reels / TikTok) และวิดีโอยาวสำหรับ YouTube",
        "ให้คำปรึกษาด้านการจัดวาง Layout เว็บไซต์และการวางกลยุทธ์คอนเทนต์ออนไลน์"
      ]
    }
  ],
  certifications: [
    {
      title: "UI / UX Design Specialization & Principles",
      issuer: "Coursera",
      date: "2024",
      credentialUrl: "https://coursera.org"
    },
    {
      title: "Responsive Web Design Certification",
      issuer: "freeCodeCamp",
      date: "2024",
      credentialUrl: "https://freecodecamp.org"
    },
    {
      title: "Video Editing with Adobe Premiere Pro & Capcut",
      issuer: "Online Academy",
      date: "2023",
      credentialUrl: "https://udemy.com"
    },
    {
      title: "Graphic Design Masterclass - Photoshop & Canva",
      issuer: "Udemy",
      date: "2023",
      credentialUrl: "https://udemy.com"
    }
  ]
};

export const contactInfo = {
  heading: "มาร่วมสร้างสรรค์สิ่งใหม่ด้วยกัน (Let's Connect & Collaborate)",
  subheading: "ไม่ว่าคุณจะมีโปรเจกต์น่าสนใจ โอกาสงาน Full-time / Internship หรืองาน Freelance ด้าน Web, UI/UX หรือ Video Content สามารถส่งข้อความหาผมได้ตลอดเวลาครับ",
  email: "ark44228@gmail.com",
  phone: "0953371342",
  location: "Bangkok, Thailand (พร้อมทำงาน Onsite / Hybrid / Remote)",
  socials: [
    { name: "GitHub", url: "https://github.com/SarawutEz", icon: "Github" },
    { name: "Instagram", url: "https://www.instagram.com/sarawut_wsth/", icon: "Instagram" },
    { name: "Facebook", url: "https://web.facebook.com/sarawut.wisetphon", icon: "Facebook" },
    { name: "Mail", url: "mailto:ark44228@gmail.com", icon: "Mail" }
  ]
};
