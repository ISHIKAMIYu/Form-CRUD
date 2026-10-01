"use client";

import { useEffect, useState } from "react";

type Game = {
  id: number;
  name: string;
  platform: string;
  hours: number;
  status: string;
};

const initialGames: Game[] = [
  { id: 1, name: "ROV", platform: "Mobile", hours: 200, status: "กำลังเล่น" },
  { id: 2, name: "Free Fire", platform: "Mobile", hours: 150, status: "กำลังเล่น" },
  { id: 3, name: "Minecraft", platform: "PC / Mobile", hours: 300, status: "กำลังเล่น" },
  { id: 4, name: "Genshin Impact", platform: "PC / Mobile", hours: 250, status: "กำลังเล่น" },
  { id: 5, name: "Valorant", platform: "PC", hours: 180, status: "เล่นจบแล้ว" },
];

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [form, setForm] = useState({ name: "", platform: "", hours: "", status: "ยังไม่เริ่ม" });
  const [editingId, setEditingId] = useState<number | null>(null);

  // โหลดและบันทึกข้อมูล localStorage
  useEffect(() => {
    const saved = localStorage.getItem("games");
    if (saved) setGames(JSON.parse(saved));
    else {
      setGames(initialGames);
      localStorage.setItem("games", JSON.stringify(initialGames));
    }
  }, []);

  useEffect(() => {
    if (games.length > 0) localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  // จัดการฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.platform || !form.hours) return alert("กรุณากรอกข้อมูลให้ครบ");

    if (editingId) {
      setGames(games.map(g => g.id === editingId ? { ...g, ...form, hours: Number(form.hours) } : g));
      setEditingId(null);
    } else {
      setGames([...games, { id: Date.now(), ...form, hours: Number(form.hours) }]);
    }
    clearForm();
  };

  const handleEdit = (game: Game) => {
    setEditingId(game.id);
    setForm({ name: game.name, platform: game.platform, hours: String(game.hours), status: game.status });
  };

  const handleDelete = (id: number) => {
    if (confirm("ต้องการลบเกมนี้หรือไม่?")) setGames(games.filter(g => g.id !== id));
  };

  const clearForm = () => {
    setForm({ name: "", platform: "", hours: "", status: "ยังไม่เริ่ม" });
    setEditingId(null);
  };

  return (
    <main className="container">
      <h1>🎮 ระบบบันทึกเกม (Game Tracker)</h1>

      {/* ฟอร์มเพิ่ม/แก้ไข */}
      <form onSubmit={handleSubmit} className="form-card">
        <h3>{editingId ? "✏️ แก้ไขรายการเกม" : "➕ เพิ่มเกมใหม่"}</h3>
        
        <input name="name" placeholder="ชื่อเกม" value={form.name} onChange={handleChange} />
        <input name="platform" placeholder="แพลตฟอร์ม (เช่น PC, Mobile)" value={form.platform} onChange={handleChange} />
        <input name="hours" type="number" placeholder="ชั่วโมงที่เล่น" value={form.hours} onChange={handleChange} />
        
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
          <option value="กำลังเล่น">กำลังเล่น</option>
          <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
        </select>

        <div className="btn-group">
          <button type="submit" className="btn-primary">{editingId ? "อัปเดต" : "เพิ่มข้อมูล"}</button>
          {editingId && <button type="button" onClick={clearForm} className="btn-secondary">ยกเลิก</button>}
        </div>
      </form>

      {/* รายการเกม */}
      <div className="list">
        {games.map((g) => (
          <div key={g.id} className="card">
            <div className="card-info">
              <h4>{g.name}</h4>
              <p>{g.platform} • {g.hours} ชม. • <span className={`status status-${g.status}`}>{g.status}</span></p>
            </div>
            <div className="btn-group">
              <button onClick={() => handleEdit(g)} className="btn-edit">แก้ไข</button>
              <button onClick={() => handleDelete(g.id)} className="btn-delete">ลบ</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container { 
          max-width: 520px; 
          margin: 40px auto; 
          padding: 0 16px; 
          font-family: system-ui, -apple-system, sans-serif;
          color: #f1f5f9;
        }
        h1 { 
          font-size: 22px; 
          text-align: center; 
          margin-bottom: 24px; 
          font-weight: 700;
          color: #ffffff;
        }
        .form-card { 
          background: #1e293b; 
          padding: 20px; 
          border-radius: 12px; 
          border: 1px solid #334155; 
          margin-bottom: 24px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }
        .form-card h3 { 
          margin-top: 0; 
          margin-bottom: 16px;
          font-size: 16px; 
          color: #38bdf8;
          font-weight: 600;
        }
        input, select { 
          width: 100%; 
          padding: 10px 12px; 
          margin-bottom: 12px; 
          background: #0f172a;
          color: #f8fafc;
          border: 1px solid #334155; 
          border-radius: 8px; 
          box-sizing: border-box; 
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        input::placeholder {
          color: #64748b;
        }
        input:focus, select:focus {
          border-color: #38bdf8;
        }
        select option {
          background: #0f172a;
          color: #f8fafc;
        }
        .btn-group { 
          display: flex; 
          gap: 8px; 
        }
        button { 
          padding: 9px 14px; 
          border: none; 
          border-radius: 8px; 
          cursor: pointer; 
          font-weight: 600; 
          font-size: 14px;
          transition: all 0.2s;
        }
        button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .btn-primary { 
          background: #2563eb; 
          color: white; 
          flex: 1; 
        }
        .btn-secondary { 
          background: #475569; 
          color: white; 
        }
        .btn-edit { 
          background: #d97706; 
          color: white; 
        }
        .btn-delete { 
          background: #dc2626; 
          color: white; 
        }
        .list { 
          display: flex; 
          flex-direction: column; 
          gap: 12px; 
        }
        .card { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          padding: 14px 16px; 
          border: 1px solid #334155; 
          border-radius: 10px; 
          background: #1e293b; 
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
        }
        .card-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .card h4 { 
          margin: 0; 
          font-size: 16px; 
          color: #f8fafc;
        }
        .card p { 
          margin: 0; 
          font-size: 13px; 
          color: #94a3b8; 
        }
        .status { 
          font-weight: 600; 
          padding: 2px 6px;
          border-radius: 4px;
        }
        .status-กำลังเล่น { color: #4ade80; }
        .status-เล่นจบแล้ว { color: #fbbf24; }
        .status-ยังไม่เริ่ม { color: #94a3b8; }
      `}</style>
    </main>
  );
}