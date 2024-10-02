import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    hola: "hola mundo",
  });
}

export async function POST(request: Request) {
  return NextResponse.json({
    hola: "hola mundo",
    method: "post",
  });
}
