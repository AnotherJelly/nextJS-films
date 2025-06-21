import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET() {
  const films = await sql`SELECT * FROM films`;
  return NextResponse.json(films);
}