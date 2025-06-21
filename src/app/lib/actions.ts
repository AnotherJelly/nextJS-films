'use server';
import { revalidatePath } from 'next/cache';
import { Film, FilmFormData } from '@/app/lib/definitions';
import sql from '@/app/lib/db';

export type State = {
  errors?: Record<string, string>;
  result?: Record<string, string> | Film;
  errorMessage?: string;
  successMessage?: string;
};

function getData(formData: FormData): FilmFormData {
  return {
    id: formData.get("id") as string | undefined,
    img: formData.get("img") as string | null,
    title: formData.get("title") as string | null,
    year: formData.get("year") as string | null,
    duration: formData.get("duration") as string | null,
    tags: formData.get("tags") as string | null,
    ratingOverall: formData.get("ratingOverall") as string | null,
    director: formData.get("director") as string | null,
    tagline: formData.get("tagline") as string | null,
    imdb: formData.get("imdb") as string | null,
    poster: formData.get("poster") as string | null,
    status: formData.get("status") as string | null,
    ratingMy: formData.get("ratingMy") as string | null,
    date: formData.get("date") as string | null,
    plot: formData.get("plot") as string | null,
    description: formData.get("description") as string | null,
  };
}

function validateData(filmData: FilmFormData): {
  errors: Record<string, string>;
  result: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  const result: Record<string, string> = {};

  if (filmData.id) {
    if (!/^[\w-]{1,64}$/.test(filmData.id)) {
      errors.id = "Invalid film ID";
    } else {
      result.id = filmData.id;
    }
  }

  if (!filmData.img || filmData.img.trim() === "") {
    errors.img = "Image URL is required";
  } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/.test(filmData.img.trim())) {
    errors.img = "Image must be a valid image URL";
  } else {
    result.img = filmData.img;
  }

  if (!filmData.title || filmData.title.trim() === "") {
    errors.title = "Title is required";
  } else {
    result.title = filmData.title;
  }

  if (!filmData.year || isNaN(Number(filmData.year))) {
    errors.year = "Year must be a number";
  } else {
    result.year = filmData.year;
  }
  
  if (!filmData.duration || filmData.duration.trim() === "") {
    errors.duration = "Duration is required";
  } else if (!/^\d+h\s?\d*m?$/.test(filmData.duration.trim())) {
    errors.duration = "Duration must be in format like '2h 10m'";
  } else {
    result.duration = filmData.duration;
  }

  if (filmData.tags) {
    const tagsArray = filmData.tags.split(",").map((t) => t.trim()).filter(Boolean);
    if (tagsArray.length === 0) {
      errors.tags = "At least one tag is required";
    } else {
      result.tags = filmData.tags;
    }
  } else {
    errors.tags = "Tags must be a comma-separated string";
  }

  if (!filmData.ratingOverall || filmData.ratingOverall.trim() === "") {
    errors.ratingOverall = "Rating is required";
  } else {
    const ratingNum = Number(filmData.ratingOverall);
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 10) {
      errors.ratingOverall = "Rating must be a number between 0 and 10";
    } else {
      result.ratingOverall = filmData.ratingOverall;
    }
  }

  if (!filmData.director || filmData.director.trim() === "") {
    errors.director = "Director is required";
  } else {
    result.director = filmData.director;
  }

  if (!filmData.tagline || filmData.tagline.trim() === "") {
    errors.tagline = "Tagline is required";
  } else {
    result.tagline = filmData.tagline;
  }

  if (!filmData.imdb || filmData.imdb.trim() === "") {
    errors.imdb = "IMDb link is required";
  } else if (!/^https:\/\/(www\.)?imdb\.com\/title\/tt\d+/.test(filmData.imdb.trim())) {
    errors.imdb = "IMDb link must be valid (e.g., https://www.imdb.com/title/tt1234567)";
  } else {
    result.imdb = filmData.imdb;
  }

  if (!filmData.poster || filmData.poster.trim() === "") {
    errors.poster = "Poster URL is required";
  } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/.test(filmData.poster.trim())) {
    errors.poster = "Poster must be a valid image URL";
  } else {
    result.poster = filmData.poster;
  }

  const validStatuses = ["Plan to Watch", "Dropped", "On-Hold", "Completed", "Watching"];
  if (!filmData.status || !validStatuses.includes(filmData.status)) {
    errors.status = "Invalid status";
  } else {
    result.status = filmData.status;
  }

  if (filmData.status === "Completed") {
    if (!filmData.ratingMy || isNaN(Number(filmData.ratingMy))) {
      errors.ratingMy = "Select a valid rating (1-5)";
    } else {
      result.ratingMy = filmData.ratingMy;
    }

    const dateStr = filmData.date ?? "";
    const parsedDate = new Date(dateStr);
    if (!dateStr || isNaN(parsedDate.getTime())) {
      errors.date = "Enter a valid date";
    } else {
      result.date = dateStr;
    }
  }

  if (!filmData.plot || filmData.plot.trim() === "") {
    errors.plot = "Plot is required";
  } else {
    result.plot = filmData.plot;
  }

  if (!filmData.description || filmData.description.trim() === "") {
    errors.description = "Description is required";
  } else {
    result.description = filmData.description;
  }

  return {
    errors: errors,
    result: result
  }
}

export async function createFilm(prevState: State, formData: FormData): Promise<State> {
  const filmData = getData(formData);
  const {errors, result} = validateData(filmData);

  if (Object.keys(errors).length > 0) {
    return {
      errors: errors,
      result: result,
      errorMessage: "Form contains errors",
    };
  }

  if (result.id) {
    try {
      await sql`
        UPDATE films SET
          img = ${result.img},
          title = ${result.title},
          year = ${Number(result.year)},
          duration = ${result.duration},
          tags = ${result.tags.split(',').map(tag => tag.trim())},
          "ratingOverall" = ${result.ratingOverall},
          director = ${result.director},
          tagline = ${result.tagline},
          imdb = ${result.imdb},
          poster = ${result.poster},
          status = ${result.status},
          "ratingMy" = ${result.ratingMy ? Number(result.ratingMy) : null},
          date = ${result.date ? new Date(result.date) : null},
          plot = ${result.plot},
          description = ${result.description}
        WHERE id = ${result.id};
      `;
    } catch (e) {
      console.error(e);
      return {
        errorMessage: `Database Error: Failed to Update Film.`,
      };
    }
    revalidatePath('/');
    return { successMessage: "Film updated" };
  } else {
    try {
      await sql`
        INSERT INTO films (
          img, title, year, duration, tags, "ratingOverall", director, tagline,
          imdb, poster, status, "ratingMy", date, plot, description
        ) VALUES (
          ${result.img},
          ${result.title},
          ${Number(result.year)},
          ${result.duration},
          ${result.tags.split(',').map(tag => tag.trim())},
          ${result.ratingOverall},
          ${result.director},
          ${result.tagline},
          ${result.imdb},
          ${result.poster},
          ${result.status},
          ${result.ratingMy ? Number(result.ratingMy) : null},
          ${result.date ? new Date(result.date) : null},
          ${result.plot},
          ${result.description}
        )
        RETURNING id;
      `;
    } catch (e) {
      console.error(e);
      return {
        errorMessage: `Database Error: Failed to Create Film.`,
      };
    }
    revalidatePath('/');
    return { successMessage: "Film successfully added" };
  }
}