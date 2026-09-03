import React from "react";

export interface Course {
  id?: number;
  courseCode?: string;
  title?: string;
  name?: string;
  credits?: number;
  status?: string;
  image?: string;
  imageUrl?: string;
}

export interface Member {
  id: number;
  name: string;
  role: string;
  imageUrl?: string;
  image?: string;
}

export interface Band {
  id: number;
  name: string;
  genre: string;
  imageUrl?: string;
  image?: string;
  members?: Member[];
}

interface CourseCardProps {
  course?: Course;
  band?: Band;
}

export default function CourseCard({ course, band }: CourseCardProps) {
  // กรณีที่ 1: ถ้าเป็นข้อมูลวงดนตรี (Band)
  if (band) {
    const bandImg = band.imageUrl || band.image;
    return (
      <div className="courseCard" style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.5rem", backgroundColor: "#fff" }}>
        {bandImg && (
          <div style={{ width: "100%", height: "200px", borderRadius: "8px", overflow: "hidden", marginBottom: "1rem" }}>
            <img src={bandImg} alt={band.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{band.name}</h2>
        <p style={{ color: "#a855f7", fontWeight: "600", margin: "0.5rem 0" }}>{band.genre}</p>
        
        {band.members && band.members.length > 0 && (
          <div style={{ marginTop: "1rem", borderTop: "1px solid #e2e8f0", paddingTop: "0.75rem" }}>
            <h3 style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.5rem" }}>สมาชิกในวง</h3>
            {band.members.map((m) => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <img src={m.imageUrl || m.image} alt={m.name} style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "600" }}>{m.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // กรณีที่ 2: ถ้าเป็นข้อมูลรายวิชา (Course)
  if (course) {
    return (
      <div className="courseCard" style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.5rem", backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#0f172a", marginBottom: "0.5rem" }}>
          {course.title || course.name}
        </h2>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          รหัสวิชา: {course.courseCode || course.id}
        </p>
        <p style={{ color: "#334155", fontSize: "0.9rem", marginBottom: "1rem" }}>
          {course.credits} หน่วยกิต
        </p>
        <span style={{ 
          display: "inline-block", 
          fontSize: "0.85rem", 
          fontWeight: "500",
          color: course.status === "ปิดลงทะเบียน" ? "#ef4444" : "#10b981" 
        }}>
          {course.status || "เปิดลงทะเบียน"}
        </span>
      </div>
    );
  }

  return null;
}