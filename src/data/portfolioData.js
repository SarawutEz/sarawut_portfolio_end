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
  resumeUrl: "https://canva.link/sarwut-resume-cv",
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
    "Time Management (การบริหารเวลาและความรับผิดชอบ)",
  ]
};

export const projectsData = [
  {
    id: 1,
    title: "Web ReMedia",
    category: "Web Media",
    description: "เว็บไซต์ในการดูคะเเนนของภาพยนตร์รายการโทรทัศน์เเละซีรีส์จากทั่วโลก",
    fullDescription: "เว็บไซต์ในการดูคะเเนนของภาพยนตร์ รายการโทรทัศน์เเละซีรีส์พร้อมทั้งมีเรื่อย่อให้อ่านเเละมีกลุ่มชุมชนได้พูดคุยเเรกเปลี่ยนความคิด",
    image: "/images/remedia.png",
    images: [
      "/images/remedia.png",
    ],
    videos: [
      // ตัวอย่าง: { type: "file", src: "/videos/demo.mp4", title: "วิดีโอตัวอย่าง" }
      // ตัวอย่าง: { type: "youtube", src: "https://www.youtube.com/embed/VIDEO_ID", title: "YouTube Demo" }
    ],
    tags: ["React", "Tailwind CSS", "UI/UX Design", "Vite", "Responsive Design"],
    liveUrl: "https://remediamt.netlify.app/",
    githubUrl: "https://github.com/SarawutEz/ReMedia.git",
    featured: true,
    highlights: [
      "ออกแบบด้วยแนวคิด User-Centric อ่านง่าย สบายตา",
      "ระบบ Theme Switcher รองรับ Dark / Light Mode",
      "ระบบค้นหารองรับชื่อหลากหลายภาษา",
    ]
  },
  {
    id: 2,
    title: "Pixel Heealth Buddy",
    category: "Application",
    description: "แอปพลิเคชันดูเเลสุขภาพ",
    fullDescription: "เเอปเพื่อสุขภาพที่ใช้ตัวละคร Pixel เป็นตัวเเทนของผู้ใช้สามารถสเเกนแคลอรี่จากรูปภาพอาหารโดยการใช้ Google Giminig Api เเละยังสามารถบันทึกการดื่มน้ำการเดินในเเต่ละวันพร้อมการเก็บประวัติดูย้อนหลัง",
    image: "/images/Pixel_Heealth_Buddy.png",
    images: [
      "/images/Pixel_Heealth_Buddy.png",
    ],
    videos: [
      { type: "tiktok", src: "https://www.tiktok.com/@luciano.o_o/video/7614775454737681684", title: "Pixel Health Buddy - TikTok Demo" }
    ],
    tags: ["Flutter", "Dart", "Firebase", "Ai"],
    liveUrl: "https://drive.google.com/file/d/1nXVvG_BvieF6N2uIfoKAWOcoGg5Qf7Fu/view?usp=drive_link",
    githubUrl: "https://github.com/SarawutEz",
    featured: true,
    highlights: [
      "ตัวละคร Pixel เเทนตัวผู้ใช้",
      "Ai คำนวนสารอาหารเเละแคลอรี่ภาพรูปถ่าย",
      "การบันทึกการดื่ม",
      "การดูประวัติย้อนหลังการกิน การดื่ม การเดิน"
    ]
  },
];

/**
 * ==============================================================================
 * VIDEO PROJECTS DATA (ข้อมูลผลงานวิดีโอ - หัวข้อรอง)
 * ใช้ง่ายมาก! ใส่แค่ title กับ videoUrl ก็ใช้งานได้ทันที (ระบบแปลงให้ทั้งหมดอัตโนมัติ)
 * ==============================================================================
 */
export const videoProjectsData = [
  {
    title: "บรรยากาศห้อง Mac",
    videoUrl: "https://www.tiktok.com/@techniccom_chan/video/7702272287713545492",
    //image: "/images/Pixel_Heealth_Buddy.png",
    description: "วิดีโอภาพบรรยากาศห้องเรียนของเเผนกเทคนิคคอมวิทยาลัยเทคนิคจันทบุรี",
    tags: ["TikTok", "CapCut", "Canva", "Cameraman"]
  },
  {
    title: "Computer101 คอมทำงานอย่างไร?",
    videoUrl: "https://www.tiktok.com/@techniccom_chan/video/7704870917767187732",
    description: "วิดีโออธิบายหลักการทำงานของคอมพิวเตอร์",
    tags: ["TikTok", "CapCut", "Canva"]
  },
  {
    title: "khaleed อาบังขายถั่ว",
    videoUrl: "https://www.tiktok.com/@luciano.o_o/video/7614775454737681684",
    description: "ผลงานการตัดต่อวิดีโอจากช่องของผม @luciano.o_o",
    tags: ["TikTok", "CapCut", "Canva"]
  },
  {
    title: "Lazaruz Anime Underrate ที่อยากเเนะนำ",
    videoUrl: "https://www.tiktok.com/@luciano.o_o/video/7641601630353362194",
    description: "ผลงานการตัดต่อวิดีโอจากช่องของผม @luciano.o_o",
    tags: ["TikTok", "CapCut", "Canva"]
  },
];

export const activitiesData = [
  {
    id: 1,
    title: "อบรม link Certified Network Cabling for Engineering",
    category: "Learning / Workshop",
    date: "5 มิถุนายน 2026",
    role: "ผู้เข้าร่วมอบรมเชิงปฏิบัติการ",
    organization: "LINK American Cabling",
    description: "ได้เรียนรู้เกี่ยวกับระบบเครือข่ายอินเตอร์เน็ตต่าง ๆ การออกเเบบระบบได้เรียนอุปกรณ์ต่าง ๆ ได้ปฏิบัติการเข้าหัวเเลน",
    image: "/images/Sarwut_avatra.png",
    badge: "Network",
    tags: ["Network"]
  },
  {
    id: 2,
    title: "อบรมเชิงปฏิบัติการ iOS App Development with Swift and Xcode",
    category: "Learning / Workshop",
    date: "17 มิถุนายน 2026",
    role: "ผู้เข้าร่วมอบรมเชิงปฏิบัติการ",
    organization: "Certified Trainer App Development with Swift",
    description: "ได้เรียนรู้เกี่ยวกับการใช้ระบบปฏิบัติการ macOS การใช้งานเเละดูเเลรักษาเครื่อง iMac การใช้งานโปรเเกรม Xcode ได้เรียนรู้เกี่ยวกับการสร้างแอปพลิเคชัน iOS ผ่าน Xcode การสร้างแอปพลิเคชันพิ้นฐาน เเละการสร้างแอปพลิเคชัน AR ที่ผสานวัตถุเสมือน 3 มิติ",
    image: "/images/IOS.jpg",
    badge: "iOS Development",
    tags: ["iOS", "Swift", "Xcode"]
  },
  {
    id: 3,
    title: "เข้าร่วมงานการจัดประเมินสมรรถนะด้านการใช้ปัญญาประดิษฐ์",
    category: "Learning / Exam",
    date: "17 มิถุนายน 2026",
    role: "Participant & Networking",
    organization: "สถาบันคุณวุฒิวิชาชีพ (องค์การมหาชน)",
    description: "เข้าร่วมการจัดประเมินสมรรถนะด้านการใช้ปัญญาประดิษฐ์  (AI Literacy) ระดับที่ 1 สถาบันคุณวุฒิวิชาชีพตามโครงการพัฒนาทักษะและสมรรถนะวิชาชีพกำลังคน (Reskill-Upskill-Newskill) “AI Literacy for Future Skills: ยกระดับสมรรถนะ AI สู่กำลังคนยุคดิจิทัล",
    image: "/images/ai.jpg",
    badge: "AI Literacy",
    tags: ["AI", "Literacy", "Conference"]
  },
];

export const galleryData = [
  {
    id: 1,
    title: "นิทรรศการประกวดโครงงาน",
    category: ["Presentation", "Workshop"],
    date: "3 กันยายน 2026",
    image: "/images/pEnd.jpg",
    caption: "บรรยากาศความประทับใจร่วมนิทรรศการประกวดโครงงานและการนำเสนอผลงานต่อคณะกรรมการและผู้เข้าร่วมงาน"
  },
  {
    id: 2,
    title: "การนำเสนอเชิงสร้างสรรค์",
    category: ["Presentation", "Workshop"],
    date: "17 กรกฎาคม 2026",
    image: "/images/pCen.jpg",
    caption: "บรรยากาศในงานเทคนิคการนำเสนอเชิงสร้างสรรค์ ได้ฝึกค้นหาตัวตนผ่านตัวละครที่ชื่นชอบ ฝึกการนำเสนอขายสินค้าแบบทีม และร่วม Workshop เพื่อพัฒนาทักษะการสื่อสารอย่างสร้างสรรค์"
  },
  {
    id: 3,
    title: "อบรมเชิงปฏิบัติการ IOS App Development with Swift and Xcode",
    category: ["Learning", "Workshop"],
    date: "17 มิถุนายน 2026",
    image: "/images/IOS.jpg",
    caption: "บรรยากาศอบรมเชิงปฏิบัติการ iOS App Development with Swift and Xcode"
  },
  {
    id: 4,
    title: "อบรม link Certified Network Cabling for Engineering",
    category: ["Learning", "Workshop"],
    date: "พฤษภาคม 2024",
    image: "/images/Sarwut_avatra.png",
    caption: "บรรยากาศอบรม link Certified Network Cabling for Engineering"
  },
];

export const resumeData = {
  education: [
    {
      degree: "ประกาศนียบัตรวิชาชีพชั้นสูง สาขาเครือข่ายคอมพิวเตอร์เเละความปลอดภัย",
      englishDegree: "Bachelor of Science in Computer Science / Information Technology",
      institution: "วิทยาลัยเทคนิคจันทบุรี",
      period: " 2025-2026",
      gpa: "GPA: 3.82",
      description: "เน้นการศึกษาด้านการพัฒนาเว็บ, การออกแบบ UI/UX, โครงสร้างข้อมูล, สื่อดิจิทัล และการประยุกต์ใช้เทคโนโลยี AI"
    },
    {
      degree: "ประกาศนียบัตรวิชาชีพ สาขาช่างเทคนิคอมพิวเตอร์",
      englishDegree: "High School Diploma (Science - Mathematics)",
      institution: "วิทยาลัยเทคนิคจันทบุรี",
      period: "2022-2024",
      gpa: "GPA: 3.66",
      description: "ตัวแทนเข้าร่วมกิจกรรมด้านคอมพิวเตอร์ การผลิตสื่อ และกิจกรรมพัฒนาทักษะการคิดเชิงตรรกะ"
    }
  ],
  experience: [
    {
      role: "Intern",
      company: "ITCITY เซ็นทรัล จันทบุรี",
      period: "ตุลาคม 2025 - กุมภาพันธ์ 2026 (4 เดือน)",
      location: "Chanthaburi, Thailand",
      responsibilities: [
        "ประสบการณ์ในการนำเสนอขายสินค้า",
        "ประสบการณ์ในการทำกราฟิกให้ทางร้าน",
        "ประสบการณ์ในการประกอบคอมพิวเตอร์ ",
        "ประสบการณ์ในการพูดคุยเเละดูเเลเเก้ปัญหาให้ลูกค้า"
      ]
    },
  ],
  certifications: [
    {
      id: 1,
      title: "LINK® Certified NETWORK CABLING for Engineering",
      issuer: "On-site training",
      date: "2026",
      credentialUrl: "",
      image: "/images/c_link.jpg",
      description: "ใบประกาศนียบัตรวิชาชีพด้านระบบสายสัญญาณโครงสร้างพื้นฐานที่จัดโดย บริษัท อินเตอร์ลิ้งค์ คอมมิวนิเคชั่น จำกัด (มหาชน) เพื่อพัฒนาทักษะความรู้ความเข้าใจเกี่ยวกับระบบเครือข่ายคอมพิวเตอร์"
    },
    {
      id: 2,
      title: "iOS App Development with Swift and Xcode",
      issuer: "On-site training",
      date: "2026",
      credentialUrl: "",
      image: "images/c_ios.png",
      description: "หลักสูตรอบรมเชิงปฏิบัติการใช้ระบบปฏิบัติการ macOS การใช้งานเเละดูเเลรักษาเครื่อง iMac การใช้งานโปรเเกรม Xcode ได้เรียนรู้เกี่ยวกับการสร้างแอปพลิเคชัน iOS ผ่าน Xcode การสร้างแอปพลิเคชันพิ้นฐาน เเละการสร้างแอปพลิเคชัน AR ที่ผสานวัตถุเสมือน 3 มิติ"
    },
    {
      id: 3,
      title: "ใบรับรองสมรรถนะสนับสนุนการทํางานด้านการใช้ปัญญาประดิษฐ์",
      issuer: "On-site training",
      date: "2026",
      credentialUrl: "",
      image: "images/c_ai.png",
      description: "ใบรับรองสมรรถนะด้านการใช้ปัญญาประดิษฐ์ (AI Literacy) ระดับที่ 1 สถาบันคุณวุฒิวิชาชีพตามโครงการพัฒนาทักษะและสมรรถนะวิชาชีพกำลังคน (Reskill-Upskill-Newskill) “AI Literacy for Future Skills: ยกระดับสมรรถนะ AI สู่กำลังคนยุคดิจิทัล"
    },
  ]
};

export const contactInfo = {
  heading: "มาร่วมสร้างสรรค์สิ่งใหม่ด้วยกัน",
  subheading: "",
  email: "ark44228@gmail.com",
  phone: "0953371342",
  location: "Chanthaburi, Thailand",
  socials: [
    { name: "GitHub", url: "https://github.com/SarawutEz", icon: "Github" },
    { name: "Instagram", url: "https://www.instagram.com/sarawut_wsth/", icon: "Instagram" },
    { name: "Facebook", url: "https://web.facebook.com/sarawut.wisetphon", icon: "Facebook" },
    { name: "Mail", url: "mailto:ark44228@gmail.com", icon: "Mail" }
  ]
};
