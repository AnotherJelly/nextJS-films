import { Film } from '@/app/lib/definitions';

export async function getFilms(): Promise<Film[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/films`, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Ошибка запроса: ${res.status}`);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.warn("Ответ не является массивом");
      return [];
    }

    return data as Film[];
  } catch (error) {
    console.error("Ошибка загрузки фильмов:", error);
    return [];
  }
}

export async function getFilmById(id: string): Promise<Film | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/film/${id}`, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Ошибка запроса: ${res.status}`);
      return null;
    }

    const data = await res.json();

    return data as Film;
  } catch (error) {
    console.error('Ошибка загрузки фильма:', error);
    return null;
  }
}