import Link from "next/link";
import { ArrowLeft, AudioLines, Image as ImageIcon, Layers3, PlaySquare, Type, WandSparkles } from "lucide-react";

const elements = [
  { title: "ข้อความ", detail: "ถ่ายทอดข้อมูล หัวข้อ และเรื่องราวให้ผู้เรียนเข้าใจได้อย่างเป็นลำดับ", icon: Type, number: "01" },
  { title: "ภาพนิ่ง", detail: "ช่วยอธิบายแนวคิดและสร้างความน่าสนใจให้เนื้อหาจดจำได้ง่ายขึ้น", icon: ImageIcon, number: "02" },
  { title: "เสียง", detail: "เพิ่มอารมณ์ บรรยากาศ และทำให้การสื่อสารมีความชัดเจนยิ่งขึ้น", icon: AudioLines, number: "03" },
  { title: "ภาพเคลื่อนไหว", detail: "นำเสนอขั้นตอนหรือแนวคิดที่ซับซ้อนให้เห็นภาพและเข้าใจง่าย", icon: WandSparkles, number: "04" },
  { title: "วิดีโอ", detail: "ผสานภาพ เสียง และการเคลื่อนไหว เพื่อสร้างประสบการณ์การเรียนรู้ที่สมจริง", icon: PlaySquare, number: "05" },
];

export default function MultimediaBasicsPage() {
  return <main className="basics-page"><div className="basics-grid" /><nav className="basics-nav"><Link href="/" className="brand"><span><Layers3 size={17} /></span>MSK<span className="brand-dot">.</span></Link><Link href="/" className="back-link"><ArrowLeft size={17} /> กลับหน้าแรก</Link></nav><section className="basics-hero"><div className="section-label">MULTIMEDIA FUNDAMENTALS — 01</div><h1>ความรู้พื้นฐาน<br />ของ <em>มัลติมีเดีย</em></h1><p>เริ่มต้นเข้าใจเครื่องมือและองค์ประกอบสำคัญ ก่อนก้าวสู่การผลิตสื่อดิจิทัลด้วย AI</p></section><section className="basics-intro"><div className="intro-icon"><Layers3 /></div><div><h2>พื้นฐานที่นักสร้างสื่อต้องรู้</h2><p>หน้าความรู้พื้นฐานมัลติมีเดียจัดทำขึ้นเพื่อให้ผู้ใช้งานมีความรู้ความเข้าใจเกี่ยวกับองค์ประกอบพื้นฐานของสื่อมัลติมีเดีย โดยเนื้อหาครอบคลุมองค์ประกอบของมัลติมีเดีย 5 ด้าน ซึ่งใช้เป็นพื้นฐานก่อนเข้าสู่การผลิตสื่อในส่วนต่อไป</p></div></section><section className="element-section"><div><div className="section-label">THE 5 CORE ELEMENTS</div><h2>องค์ประกอบของ<br /><em>สื่อมัลติมีเดีย</em></h2></div><div className="elements-grid">{elements.map((element) => { const Icon = element.icon; return <article className="element-card" key={element.title}><span>{element.number}</span><div className="element-icon"><Icon /></div><h3>{element.title}</h3><p>{element.detail}</p></article>; })}</div></section><section className="basics-next"><div><span>พร้อมเรียนรู้ต่อหรือยัง?</span><h2>นำองค์ประกอบทั้ง 5 ด้าน<br />ไปสร้างสื่อชิ้นแรกของคุณ</h2></div><Link href="/#courses" className="primary">ไปยังบทเรียน <PlaySquare size={18} /></Link></section></main>;
}
