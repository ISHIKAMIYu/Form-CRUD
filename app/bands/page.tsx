import CourseCard, { Band } from "@/components/CourseCard";

const favoriteBands: Band[] = [
  {
    id: 1,
    name: "TILLY BIRDS",
    genre: "Alternative Rock / Synth Pop",
    image: "/images/bands/TILLY BIRDS.jpg",
    members: [
      {
        id: 101,
        name: "เติร์ด (อนุโรจน์ เกตุเลขา)",
        role: "ร้องนำ",
        image: "/images/bands/อนุโรจน์ เกตุเลขา.jpg",
      },
      {
        id: 102,
        name: "บิลลี่ (ณัฐดนัย ชูชาติ)",
        role: "กีตาร์ / มิวสิคโปรดิวเซอร์",
        image: "/images/bands/ณัฐดนัย ชัยเจริญ).jpg",
      },
      {
        id: 103,
        name: "ไมโล (ธุวานนท์ ตันติวัฒนวรกุล)",
        role: "กลอง",
        image: "/images/bands/ธุวชิต วิไลแฮต.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "THREE MAN DOWN",
    genre: "Pop Rock / Alternative",
    image: "/images/bands/THREE MAN DOWN.jpg",
    members: [
      {
        id: 201,
        name: "กิต (กฤตย์ จีรพัฒนานุวงศ์)",
        role: "ร้องนำ",
        image: "/images/bands/กฤตย์ จีรพัฒนานุวงศ์.jpg",
      },
      {
        id: 202,
        name: "ตูน (พีรพล เอี่ยมจำรัส)",
        role: "กีตาร์",
        image: "/images/bands/พีรพล เอี่ยมจำรัส.jpg",
      },
      {
        id: 203,
        name: "เต (ธนกฤตสองเมือง)",
        role: "กลอง",
        image: "/images/bands/ธนกฤตสองเมือง.jpg",
      },
      {
        id: 204,
        name: "เส็ง (วิศรุต ปฐมสิริกุล)",
        role: "ซินธิไซเซอร์",
        image: "/images/bands/วิศรุต ปฐมสิริไพศาล.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "SLOT MACHINE",
    genre: "Rock / Modern Rock",
    image: "/images/bands/SLOT MACHINE.jpg",
    members: [
      {
        id: 301,
        name: "เฟิด (คาริญญ์ยวัฒ นาทะธีรภาพ)",
        role: "ร้องนำ",
        image: "/images/bands/คาริญญ์ยวัฒ นาทะธีรภาพ.jpg",
      },
      {
        id: 302,
        name: "แก๊ก (อธิราช รัตนกสิกร)",
        role: "เบส",
        image: "/images/bands/อธิราช รัตนกสิกร.jpg",
      },
      {
        id: 303,
        name: "วิทย์ (เจนวิทย์ จันทร์อุไร)",
        role: "กีตาร์",
        image: "/images/bands/เจนวิทย์ จันทร์อุไร.jpg",
      }
    ],
  },
];

export default function BandsPage() {
  return (
    <main className="page">
      <h1>วงดนตรีที่ชื่นชอบ (Favorite Bands)</h1>
      <section className="courseGrid">
        {favoriteBands.map((band) => (
          <CourseCard key={band.id} band={band} />
        ))}
      </section>
    </main>
  );
}