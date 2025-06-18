'use client'

import Image from 'next/image';
import { Film } from '@/app/lib/definitions';

interface CardProps extends Film {
  onClick: (film: Film) => void;
}

export function Card(props: CardProps) {
  const { onClick, ...film } = props;

  return (
    <div className='card' onClick={() => onClick(film)}>
      <Image src={film.img} width={250} height={250} alt={film.title} />
      <div className='card-description'>
        <div className='card-title'>{film.title}</div>
        <div className='card-year'>{film.year}</div>
        <div className='card-duration'>{film.duration}</div>
        <div className='card-tags'>
          {film.tags.map((tag, i) => (
            <span className='card-tag' data-tag={tag} key={i}>{tag}</span>
          ))}
        </div>
        <div className='card-rating'>{film.ratingOverall}</div>
      </div>
    </div>
  );
}
