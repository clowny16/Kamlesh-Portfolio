import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PROJECTS } from "@/lib/site";

export async function GET() {
  try {
    let count = await db.project.count();
    if (count === 0) {
      // First run — seed the selected projects
      await db.project.createMany({ data: PROJECTS });
      count = PROJECTS.length;
    }
    const projects = await db.project.findMany({
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        role: true,
        timeline: true,
        year: true,
        team: true,
        company: true,
        link: true,
        cover: true,
        tags: true,
        description: true,
        sortOrder: true,
      },
    });
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("[api/projects] failed:", err);
    return NextResponse.json({ projects: [] }, { status: 500 });
  }
}
