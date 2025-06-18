import { NextResponse } from 'next/server';
import { dataFilms } from "@/app/lib/data";

export async function GET() {
  return NextResponse.json(dataFilms);
}