import prisma from "@/client";
import { NextResponse } from "next/server";

type ParamsType = {
  params: {
    id: string;
  };
};

export async function GET(_request: Request, { params }: ParamsType) {
  try {
    const task = await prisma.task.findUnique({ where: { id: params.id } });
    if (task) {
      return NextResponse.json({ task, message: "success" });
    }
    return NextResponse.json(
      { message: "Resource not found" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
