'use client';

import { useState } from "react";
import { Card } from "@/app/ui/card";
import { Modal } from "@/app/ui/modal";
import { FilmDetails } from "@/app/ui/filmDetails";
import { Film } from "@/app/lib/definitions";

export function FilmList({ films }: { films: Film[] }) {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  const handleCardClick = (film: Film) => {
    setSelectedFilm(film);
  };

  const handleClose = () => {
    setSelectedFilm(null);
  };

  return (
    <>
      <div className="card-wrapper">
        {films.map((film) => (
          <Card key={film.id} {...film} onClick={() => handleCardClick(film)} />
        ))}
      </div>

      <Modal open={!!selectedFilm} onClose={handleClose}>
        {selectedFilm && <FilmDetails film={selectedFilm} />}
      </Modal>
    </>
  );
}
