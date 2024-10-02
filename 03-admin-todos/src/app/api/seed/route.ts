import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany()
  const todos = await prisma.todo.createMany({
    data: [
      { description: "Buy groceries", complete: true },
      { description: "Walk the dog" },
      { description: "Do laundry" },
      { description: "Clean the house" },
      { description: "Cook dinner" },
    ]
  })

  return NextResponse.json({ message: "Seed executed", data: todos });
}
