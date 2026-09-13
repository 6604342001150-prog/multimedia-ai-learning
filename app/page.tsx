"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, ChevronDown, CirclePlay, CloudDownload, Command, FileText, Film, Instagram, Layers3, Lightbulb, Mail, MapPin, Menu, Moon, Palette, Phone, Search, Sparkles, Sun, Twitter, Users, X, Youtube } from "lucide-react";

type Lesson = { tag: string; category: string; title: string; text: string; steps: string[]; icon: typeof Film; color: string; video: string };

const videoFolder = "/videos/";
const lessons: Lesson[] = [
  { tag: "หมวด 01", category: "ChatGPT เพื่อสร้างเนื้อหา", title: "สร้าง Storyboard ด้วย ChatGPT", text: "เรียนรู้การใช้ ChatGPT เปลี่ยนไอเดียให้เป็น Storyboard และโครงเรื่องที่พร้อมผลิต", steps: ["กำหนดเป้าหมายของเนื้อหา", "เขียน Prompt ให้ชัดเจน", "ปรับผลลัพธ์เป็น Storyboard"], icon: Bot, color: "from-violet-400 to-purple-700", video: "สอนใช้ ChatGPT สร้าง Storyboard ง่าย ๆ ในไม่กี่ขั้นตอน (1).mp4" },
  { tag: "หมวด 02", category: "Canva AI และ CapCut AI", title: "ออกแบบจากไอเดียสู่ผลงานด้วย Canva", text: "ออกแบบกราฟิกสำหรับสื่อดิจิทัลอย่างง่าย พร้อมแนวคิดนำไปปรับใช้กับงานของคุณ", steps: ["รวบรวมไอเดียและเลือกเทมเพลต", "จัดวางภาพ ข้อความ และสี", "ส่งออกผลงานตามแพลตฟอร์ม"], icon: Palette, color: "from-blue-400 to-indigo-700", video: "ออกแบบง่าย ๆ ด้วย Canva  จากไอเดียสู่ผลงาน.mp4" },
  { tag: "หมวด 03", category: "Canva AI และ CapCut AI", title: "สร้างเสียงและตัดต่อวิดีโอด้วย CapCut AI", text: "ใช้ความสามารถของ AI เพื่อช่วยสร้างเสียง ตัดต่อ และทำวิดีโอให้น่าสนใจยิ่งขึ้น", steps: ["นำเข้าคลิปและเลือกอัตราส่วน", "สร้างเสียงหรือคำบรรยายด้วย AI", "ตรวจทานและส่งออกวิดีโอ"], icon: Film, color: "from-fuchsia-400 to-violet-700", video: "การใช้งาน CapCut AI สำหรับการสร้างเสียงและตัดต่อวิดีโอ.mp4" },
];

const tools = [
  ["ChatGPT", "ผู้ช่วยคิด เขียน และวางโครงเนื้อหา", "✦", "from-emerald-400 to-teal-600"],
  ["Canva AI", "ออกแบบกราฟิกและภาพประกอบในไม่กี่คลิก", "C", "from-cyan-400 to-blue-600"],
  ["CapCut AI", "ตัดต่อวิดีโอพร้อมคำบรรยายอัตโนมัติ", "▶", "from-violet-500 to-fuchsia-600"],
];
const faqs = [
  ["เหมาะกับใครบ้าง?", "เหมาะกับนักเรียน นักศึกษา และทุกคนที่อยากเริ่มสร้างคอนเทนต์ดิจิทัล โดยไม่จำเป็นต้องมีพื้นฐานมาก่อน"],
  ["จำเป็นต้องซื้อโปรแกรมหรือไม่?", "ไม่จำเป็น บทเรียนแนะนำการเริ่มต้นกับเครื่องมือเวอร์ชันฟรี และแนวทางเลือกใช้ให้เหมาะกับงาน"],
  ["เรียนผ่านโทรศัพท์มือถือได้ไหม?", "ได้ เว็บไซต์ออกแบบให้ใช้งานได้ทั้งคอมพิวเตอร์ แท็บเล็ต และโทรศัพท์มือถือ"],
];
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55 }} className={className}>{children}</motion.div>; }

export default function Home() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState("");
  const [faq, setFaq] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
    const handle = () => setProgress((window.scrollY / Math.max(1, document.body.scrollHeight - innerHeight)) * 100);
    handle(); addEventListener("scroll", handle); const timer = window.setTimeout(() => setLoading(false), 650);
    return () => { removeEventListener("scroll", handle); clearTimeout(timer); };
  }, [dark]);
  const shownLessons = useMemo(() => lessons.filter((lesson) => `${lesson.title} ${lesson.category} ${lesson.text}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenu(false); };

  return <main>
    <AnimatePresence>{loading && <motion.div className="loading-screen" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}><div className="loader-logo"><Sparkles /> MSK<span>.</span></div><p>กำลังเตรียมพื้นที่สร้างสรรค์</p></motion.div>}</AnimatePresence>
    <div className="progress" style={{ width: `${progress}%` }} />
    <nav className="nav" aria-label="เมนูหลัก">
      <button className="brand" onClick={() => go("home")} aria-label="กลับหน้าแรก"><span><Sparkles size={17} /></span>MSK<span className="brand-dot">.</span></button>
      <div className="nav-links"><button onClick={() => go("about")}>แนะนำเว็บ</button><button onClick={() => go("multimedia")}>มัลติมีเดีย</button><button onClick={() => go("ai")}>AI Tools</button><button onClick={() => go("courses")}>บทเรียน</button><button onClick={() => go("contact")}>ติดต่อ</button></div>
      <div className="nav-actions"><button className="icon-btn" aria-label="เปลี่ยนธีม" onClick={() => setDark(!dark)}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button><button className="start-mini" onClick={() => go("courses")}>เริ่มเรียน <ArrowRight size={16} /></button><button className="mobile-menu icon-btn" aria-label="เปิดเมนู" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div>
    </nav>
    <AnimatePresence>{menu && <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mobile-nav">{[["แนะนำเว็บ", "about"], ["มัลติมีเดีย", "multimedia"], ["AI Tools", "ai"], ["บทเรียน", "courses"], ["ติดต่อ", "contact"]].map(([name, id]) => <button key={id} onClick={() => go(id)}>{name}</button>)}</motion.div>}</AnimatePresence>

    <section id="home" className="hero section"><div className="orb orb-one" /><div className="orb orb-two" /><div className="grid-bg" /><div className="hero-copy"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="eyebrow"><span className="live-dot" /> LEARN · CREATE · EVOLVE</motion.div><motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>ออกแบบและพัฒนา<br /><em>สื่อมัลติมีเดีย</em>ด้วย AI</motion.h1><motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>เว็บไซต์สื่อการเรียนรู้สำหรับผู้เริ่มต้น ที่เปลี่ยนไอเดียให้เป็นผลงานดิจิทัล ด้วยความรู้ด้านมัลติมีเดียและพลังของปัญญาประดิษฐ์</motion.p><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="hero-buttons"><button className="primary" onClick={() => go("courses")}>เริ่มต้นการเรียนรู้ <ArrowRight size={18} /></button><button className="watch" onClick={() => go("about")}><CirclePlay size={23} /> ดูภาพรวมโครงการ</button></motion.div><div className="hero-stats"><div><b>4+</b><span>เครื่องมือ AI</span></div><div><b>3</b><span>คลิปสอนพร้อมดู</span></div><div><b>100%</b><span>เรียนได้ทุกอุปกรณ์</span></div></div></div><motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="hero-art"><div className="art-ring ring-a" /><div className="art-ring ring-b" /><div className="ai-core"><Sparkles size={52} /><span>AI<br />CREATOR</span></div><div className="float-card card-top"><Bot /> <span>Prompt<br /><b>Crafting</b></span></div><div className="float-card card-bottom"><Palette /> <span>Visual<br /><b>Design</b></span></div><div className="float-card card-right"><Film /> <span>Video<br /><b>Editing</b></span></div></motion.div></section>

    <section id="about" className="section intro"><Reveal><div className="section-label">01 — ABOUT THE PROJECT</div><div className="two-col"><div><h2>สร้างโอกาสให้ทุกคน<br />เล่าเรื่องได้อย่าง <em>ทรงพลัง</em></h2></div><div><p className="lead">โครงงานนี้พัฒนาขึ้นเพื่อแก้ปัญหาการเข้าถึงความรู้และเครื่องมือผลิตสื่อที่กระจัดกระจาย โดยรวบรวมพื้นฐานมัลติมีเดียและ AI ไว้ในเส้นทางเรียนรู้เดียวที่เข้าใจง่าย</p><button className="text-link" onClick={() => go("multimedia")}>สำรวจเส้นทางการเรียนรู้ <ArrowRight size={17} /></button></div></div></Reveal><div className="feature-grid">{[[Lightbulb, "เข้าใจง่าย", "เริ่มจากพื้นฐาน พร้อมตัวอย่างที่นำไปใช้ได้ทันที"], [Command, "ใช้ได้จริง", "เวิร์กโฟลว์และคลิปสาธิตสำหรับสร้างคอนเทนต์จริง"], [Users, "เรียนได้ทุกที่", "ออกแบบให้ลื่นไหลในทุกขนาดหน้าจอ"]].map(([Icon, title, text], index) => { const CardIcon = Icon as typeof Lightbulb; return <Reveal key={title as string} className="feature-card"><div className="feature-icon"><CardIcon /></div><h3>{title as string}</h3><p>{text as string}</p><span>0{index + 1}</span></Reveal>; })}</div></section>

    <section id="multimedia" className="section knowledge"><Reveal><div className="section-label">02 — MULTIMEDIA FUNDAMENTALS</div><h2>ทุกสื่อที่ดี เริ่มจาก<br /><em>ความเข้าใจที่ถูกต้อง</em></h2></Reveal><div className="knowledge-wrap"><Reveal className="info-graphic"><div className="orbit-center"><Layers3 /><b>MULTI<br />MEDIA</b></div>{[["ข้อความ", "top"], ["ภาพ", "right"], ["เสียง", "bottom"], ["วิดีโอ", "left"]].map(([name, position]) => <div className={`orbit-item ${position}`} key={name}>{name}</div>)}</Reveal><div className="timeline">{[["01", "วางเป้าหมาย", "กำหนดผู้ชมและสารที่ต้องการสื่อ"], ["02", "ออกแบบไอเดีย", "เรียบเรียงเนื้อหา ภาพ เสียง และการโต้ตอบ"], ["03", "สร้างสรรค์ผลงาน", "เลือกเครื่องมือและผลิตสื่อให้ตอบโจทย์"], ["04", "เผยแพร่และปรับปรุง", "วัดผล รับฟังข้อเสนอแนะ แล้วพัฒนาต่อ"]].map(([number, title, description]) => <Reveal className="time-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></Reveal>)}</div></div></section>

    <section id="ai" className="section ai-section"><Reveal><div className="section-label">03 — AI TOOLKIT</div><div className="ai-heading"><h2>เพื่อนร่วมคิด<br />ในยุค <em>AI</em></h2><p>AI ช่วยลดเวลาในขั้นตอนที่ซ้ำซ้อน ให้คุณได้โฟกัสกับการคิด ออกแบบ และเล่าเรื่องอย่างสร้างสรรค์</p></div></Reveal><div className="tools-grid">{tools.map(([name, text, mark, color]) => <Reveal className="tool-card" key={name}><div className={`tool-mark bg-gradient-to-br ${color}`}>{mark}</div><h3>{name}</h3><p>{text}</p><button aria-label={`ดูข้อมูล ${name}`}><ArrowRight size={19} /></button></Reveal>)}</div><Reveal className="note"><CheckCircle2 /> ใช้ AI อย่างรับผิดชอบ: ตรวจสอบความถูกต้อง อ้างอิงแหล่งที่มา และเติมมุมมองของคุณลงในทุกชิ้นงาน</Reveal></section>

    <section id="courses" className="section courses"><Reveal><div className="section-label">04 — VIDEO LEARNING</div><div className="course-heading"><h2>ดูคลิปจริง<br /><em>แล้วสร้างตามได้ทันที</em></h2><label className="search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาบทเรียน..." aria-label="ค้นหาบทเรียน" /></label></div></Reveal><div className="lesson-grid">{shownLessons.map((lesson) => { const Icon = lesson.icon; return <Reveal className="lesson video-lesson" key={lesson.title}><div className={`lesson-image bg-gradient-to-br ${lesson.color}`}><video controls preload="metadata" aria-label={`วิดีโอ ${lesson.title}`}><source src={`${videoFolder}${lesson.video}`} type="video/mp4" />เบราว์เซอร์ของคุณไม่รองรับวิดีโอ</video><span>{lesson.tag}</span></div><div className="lesson-copy"><div className="lesson-category">{lesson.category}</div><h3>{lesson.title}</h3><p>{lesson.text}</p><ol className="lesson-steps">{lesson.steps.map((step) => <li key={step}>{step}</li>)}</ol><div><span>แบบฝึกหัด: สร้างผลงาน 1 ชิ้น</span><a href={`${videoFolder}${lesson.video}`} download className="lesson-download"><CloudDownload size={16} /> ดาวน์โหลดคลิป</a></div></div></Reveal>; })}</div>{!shownLessons.length && <p className="empty">ไม่พบบทเรียนที่ค้นหา ลองใช้คำอื่นดูนะ</p>}<Reveal className="download"><div><FileText /><span><b>Creative Starter Pack</b><small>ดาวน์โหลดเทมเพลตและแบบฝึกหัดสำหรับผู้เริ่มต้น</small></span></div><button className="primary" onClick={() => alert("ไฟล์ตัวอย่างจะพร้อมให้ดาวน์โหลดเร็ว ๆ นี้")}><CloudDownload size={18} /> ดาวน์โหลดฟรี</button></Reveal></section>

    <section className="section faq-section"><Reveal><div className="section-label">05 — FAQ</div><h2>เริ่มต้นอย่างมั่นใจ<br /><em>เราอยู่ข้างคุณ</em></h2></Reveal><div className="faq-list">{faqs.map(([question, answer], index) => <Reveal className={`faq ${faq === index ? "open" : ""}`} key={question}><button onClick={() => setFaq(faq === index ? null : index)}>{question}<ChevronDown /></button><AnimatePresence>{faq === index && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{answer}</motion.p>}</AnimatePresence></Reveal>)}</div></section>

    <section id="contact" className="section contact"><Reveal className="contact-panel"><div><div className="section-label">06 — GET IN TOUCH</div><h2>พร้อมสร้างสรรค์<br />ไปด้วยกันไหม?</h2><p>มีคำถามหรือข้อเสนอแนะ ติดต่อทีมผู้จัดทำได้ทุกช่องทาง</p><div className="contact-list"><span><Mail /> hello@multimediakit.dev</span><span><Phone /> 02-XXX-XXXX</span><span><MapPin /> Bangkok, Thailand</span></div><div className="map-placeholder"><MapPin /> Google Map Placeholder</div></div><form onSubmit={(event) => { event.preventDefault(); alert("ส่งข้อความเรียบร้อย ขอบคุณที่ติดต่อเรา!"); }}><input required placeholder="ชื่อของคุณ" /><input required type="email" placeholder="อีเมล" /><textarea required placeholder="ข้อความที่ต้องการส่ง" rows={4} /><button className="primary">ส่งข้อความ <ArrowRight size={17} /></button></form></Reveal></section>
    <footer><div className="brand"><span><Sparkles size={17} /></span>MSK<span className="brand-dot">.</span></div><p>การออกแบบและพัฒนาเว็บไซต์สื่อการเรียนรู้ด้านการผลิตสื่อมัลติมีเดียด้วย AI</p><div><Instagram size={18} /><Twitter size={18} /><Youtube size={19} /></div><small>© 2026 Multimedia Starter Kit. Made for curious creators.</small></footer>
    <button className="back-top" aria-label="กลับขึ้นบนสุด" onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
  </main>;
}
