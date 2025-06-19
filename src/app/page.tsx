import { Suspense } from "react";
import { getFilms } from "@/app/lib/fetch";
import { FilmList } from "@/app/ui/filmList";
import { SkeletonCards } from "./ui/skeletons";
import { SortingPanelMain } from "./ui/sorts";

export default async function Page(props: {searchParams?: Promise<{query?: string; sort?: string}>}) {
  const films = await getFilms();
  const searchParams = await props.searchParams;
  const query = searchParams?.query?.toLowerCase() || '';
  const sort = searchParams?.sort || 'default';

  const filteredFilms = films.filter(film => film.title.toLowerCase().includes(query));

  const sortedFilms = [...filteredFilms].sort((a, b) => {
    switch (sort) {
      case "rating":
        return Number(b.ratingOverall) - Number(a.ratingOverall);
      case "year":
        return b.year - a.year;
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <main className="main-page">
      <SortingPanelMain 
        inputName="query"
        selectName="sort"
      />
      <Suspense fallback={<SkeletonCards />}>
        <FilmList films={sortedFilms} />
      </Suspense>
    </main>
  );
}
