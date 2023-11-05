import prisma from "@/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const taskList = await prisma.task.findMany();
    return NextResponse.json({ taskList, message: "success" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get tasks " },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const payload: { title: string; description: string } = await request.json();

  if (!payload.title) {
    return NextResponse.json(
      { message: "Title is required", name: "title" },
      { status: 422 }
    );
  }
  if (!payload.description) {
    return NextResponse.json(
      { message: "Description is required", name: "description" },
      { status: 422 }
    );
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: payload.title,
        description: payload.description,
      },
    });
    return NextResponse.json({ task }, { status: 202 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to crate new task" },
      { status: 500 }
    );
  }
}
