import CourseCard, { Course } from "@/components/CourseCard";

const coursesData: Course[] = [
  {
    id: 10301231,
    courseCode: "10301231",
    title: "Web Technology",
    credits: 3,
    status: "เปิดลงทะเบียน",
  },
  {
    id: 10301232,
    courseCode: "10301232",
    title: "Database Systems",
    credits: 3,
    status: "ปิดลงทะเบียน",
  },
  {
    id: 10301233,
    courseCode: "10301233",
    title: "Computer Programming",
    credits: 3,
    status: "เปิดลงทะเบียน",
  },
];

export default function CoursesPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        รายวิชาทั้งหมด
      </h1>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {coursesData.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>
    </main>
  );
}