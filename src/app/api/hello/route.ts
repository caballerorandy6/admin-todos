//rag te crea la funcion para la ruta

import { NextResponse } from "next/server";

//GET
export async function GET() {
  return NextResponse.json({ hello: "world", method: "GET" });
}

//POST
export async function POST() {
  return NextResponse.json({ hello: "world", method: "POST" });
}
