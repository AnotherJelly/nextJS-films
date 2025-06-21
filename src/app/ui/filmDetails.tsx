"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/app/ui/modal';
import { FilmForm } from '@/app/ui/forms';
import { TypingText } from '@/app/ui/animations';
import { Film } from '@/app/lib/definitions';

export function FilmDetails({ film }: { film: Film }) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <FilmForm film={film} onClose={() => setOpenModal(false)} />
      </Modal>
      <div className='film-content'>
        <div className='film-poster'>
          <Image src={film.poster} width={1200} height={350} alt={film.title} className='poster'/>
          <button type='button' className='button-edit' onClick={() => setOpenModal(true)}>Edit</button>
        </div>
        <div className='film-block'>
          <div className='film-header'>
            <Image src={film.img} width={200} height={200} alt={film.title} className='img'/>
            <span className='film-tagline'>&quot;<TypingText value={film.tagline} duration={3000} />&quot;</span>
          </div>
          <h2 className='film-title'>{film.title}</h2>
          <div className='film-element'>
            <div className='film-element-svg'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM7 8H6V6H9V11H10V13H7V8ZM9 5V3H7V5H9Z" />
              </svg>
              info
            </div>
            <div>{film.year} • {film.duration} • {film.ratingOverall}</div>
            <div>imdb <a href={film.imdb} rel='nofollow' target="_blank">{film.title}</a></div>
          </div>
          <div>
            <div className='film-element__subtitle'>
              About
            </div>
            <div className='film-element'>
              <FilmDetailsRow title='Description' value={film.description} hide={false} animate={true}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                  <path d="M15 1H1V3H15V1Z" />
                  <path d="M1 5H3V15H1V5Z" />
                  <path d="M5 13H15V15H5V13Z" />
                  <path d="M15 9H5V11H15V9Z" />
                  <path d="M5 5H15V7H5V5Z" />
                </svg>
              </FilmDetailsRow>
              <FilmDetailsRow title='Tags' value={film.tags.join(', ')} hide={false} animate={true}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                    <path d="M3 1H1V3H3V1Z" />
                    <path d="M3 5H1V7H3V5Z" />
                    <path d="M1 9H3V11H1V9Z" />
                    <path d="M3 13H1V15H3V13Z" />
                    <path d="M15 1H5V3H15V1Z" />
                    <path d="M15 5H5V7H15V5Z" />
                    <path d="M5 9H15V11H5V9Z" />
                    <path d="M15 13H5V15H15V13Z" />
                  </svg>
              </FilmDetailsRow>
              <FilmDetailsRow title='Director' value={film.director} hide={false} animate={true}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                  <path fillRule="evenodd" clipRule="evenodd" d="M8 16L3.54223 12.3383C1.93278 11.0162 1 9.04287 1 6.96005C1 3.11612 4.15607 0 8 0C11.8439 0 15 3.11612 15 6.96005C15 9.04287 14.0672 11.0162 12.4578 12.3383L8 16ZM3 6H5C6.10457 6 7 6.89543 7 8V9L3 7.5V6ZM11 6C9.89543 6 9 6.89543 9 8V9L13 7.5V6H11Z" />
                </svg>
              </FilmDetailsRow>
              <FilmDetailsRow title='Plot' value={film.plot} hide={true} animate={true}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                  <path d="M5 0C3.34315 0 2 1.34315 2 3V13C2 14.6569 3.34315 16 5 16H14V14H4V12H14V0H5Z" />
                </svg>
              </FilmDetailsRow>
            </div>
          </div>
          <div>
            <div className='film-element__subtitle'>
              Result
            </div>
            <div className='film-element'>
              <FilmDetailsRow title='Status' value={film.status} hide={false}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                  <path d="M2 4C2 2.34315 3.34315 1 5 1H11C12.6569 1 14 2.34315 14 4V5C12.1362 5 10.5701 6.27477 10.126 8H5.87398C5.42994 6.27477 3.86384 5 2 5V4Z" />
                  <path d="M12 9C12 7.89543 12.8954 7 14 7C15.1046 7 16 7.89543 16 9C16 10.1046 15.1046 11 14 11V15H2V11C0.895431 11 0 10.1046 0 9C0 7.89543 0.895431 7 2 7C3.10457 7 4 7.89543 4 9V10H12V9Z" />
                </svg>
              </FilmDetailsRow>
              <div className='film-element__row'>
                <span className='film-element-svg'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                    <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" />
                  </svg>
                  Rating
                </span>
                <span style={{ display: 'flex' }}>
                  {film.ratingMy !== null ? (
                    [1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                        fill={i <= (film.ratingMy || 0) ? '#f5c518' : '#ccc'}
                        role="presentation"
                      >
                        <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                      </svg>
                    ))
                  ) : (
                    <span>Empty</span>
                  )}
                </span>
              </div>
              <FilmDetailsRow title='Date' value={film.date ? new Date(film.date).toLocaleDateString() : "Empty"} hide={false}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" >
                  <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM7 3V8.41421L10.2929 11.7071L11.7071 10.2929L9 7.58579V3H7Z" />
                </svg>
              </FilmDetailsRow>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FilmDetailsRow ({ children, title, value, hide, animate = false }: 
  {children: React.ReactNode; title: string; value: string | number; hide: boolean; animate?: boolean;}) {
  
  const [isHidden, setIsHidden] = useState(hide);

  return (
    <div className='film-element__row'>
      <span className='film-element-svg'>
        {children}
        {title}
      </span>
      <span onClick={() => setIsHidden(!isHidden)}>{isHidden ? (
        <span style={{ cursor:"pointer" }}>[...]</span>
      ) : animate ? (
          <TypingText value={value.toString()} duration={3000} />
        ) : (
          value
        )}
      </span>
    </div>
  );
}