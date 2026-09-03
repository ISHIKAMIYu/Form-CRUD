import React from "react";

export interface Member {
  id: number;
  name: string;
  role: string;
  image?: string;
  imageUrl?: string;
}

export interface Band {
  id: number;
  name: string;
  genre: string;
  image?: string;
  imageUrl?: string;
  members?: Member[];
}

interface CourseCardProps {
  band?: Band; // ปรับให้รับค่าแบบ optional ป้องกัน undefined
  course?: any; // รองรับกรณีถูกเรียกใช้ในหน้า courses
}

export default function CourseCard({ band, course }: CourseCardProps) {
  // ดึงข้อมูลรูปภาพ (รองรับทั้งชื่อ image และ imageUrl)
  const bandData = band || course;
  if (!bandData) return null; // ป้องกัน Error ถ้าไม่มีข้อมูลส่งมา

  const mainImage = bandData.image || bandData.imageUrl;

  return (
    <div className="courseCard">
      {/* 1. แสดงรูปหลัก */}
      {mainImage && (
        <div style={{ position: "relative", width: "100%", height: "200px", borderRadius: "12px", overflow: "hidden", marginBottom: "1rem" }}>
          <img
            src={mainImage}
            alt={bandData.name || "Image"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      <h2>{bandData.name}</h2>
      {bandData.genre && (
        <p style={{ color: "var(--primary-color, #a855f7)", fontWeight: "bold", marginBottom: "1rem" }}>
          {bandData.genre}
        </p>
      )}

      {/* 2. แสดงสมาชิกในวง (ถ้ามี) */}
      {bandData.members && bandData.members.length > 0 && (
        <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "1rem" }}>
          <h3 style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: "0.75rem" }}>สมาชิกในวง</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {bandData.members.map((member: Member) => {
              const memberImg = member.image || member.imageUrl;
              return (
                <div key={member.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {memberImg ? (
                    <img
                      src={memberImg}
                      alt={member.name}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid rgba(255, 255, 255, 0.1)"
                      }}
                    />
                  ) : (
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#334155" }} />
                  )}
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#f8fafc" }}>{member.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{member.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}