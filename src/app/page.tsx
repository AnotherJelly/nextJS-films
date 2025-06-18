import { Suspense } from "react";
import { getFilms } from "@/app/lib/fetch";
import { FilmList } from "@/app/ui/filmList";
import { SkeletonCards } from "./ui/skeletons";

export default async function Page() {
  const films = await getFilms();

  return (
    <main className="main-page">
      <input type="text" className="search-input" />
      <Suspense fallback={<SkeletonCards />}>
        <FilmList films={films} />
      </Suspense>
    </main>
  );
}