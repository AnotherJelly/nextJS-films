import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const film = await sql`SELECT * FROM films WHERE id = ${id}`;

  if (!film || film.length === 0) {
    return NextResponse.json({ error: 'Film not found' }, { status: 404 });
  }

  return NextResponse.json(film[0]);
}
