'use server';

export type State = {
  errors?: Record<string, string>;
  message?: string;
};

export async function createFilm(prevState: State, formData: FormData): Promise<State> {
  const img = formData.get("img");
  const title = formData.get("title");
  const year = formData.get("year");
  const duration = formData.get("duration");
  const tags = formData.get("tags");
  const ratingOverall = formData.get("ratingOverall");
  const director = formData.get("director");
  const tagline = formData.get("tagline");
  const imdb = formData.get("imdb");
  const poster = formData.get("poster");
  const status = formData.get("status");
  const ratingMy = formData.get("ratingMy");
  const date = formData.get("date");
  const plot = formData.get("plot");
  const description = formData.get("description");

  const errors: Record<string, string> = {};

  if (!img || typeof img !== "string" || img.trim() === "") {
    errors.img = "Image URL is required";
  } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/.test(img.trim())) {
    errors.img = "Image must be a valid image URL";
  }

  if (!title || typeof title !== "string" || title.trim() === "") {
    errors.title = "Title is required";
  }

  if (!year || typeof year !== "string" || isNaN(Number(year))) {
    errors.year = "Year must be a number";
  }
  
  if (!duration || typeof duration !== "string" || duration.trim() === "") {
    errors.duration = "Duration is required";
  } else if (!/^\d+h\s?\d*m?$/.test(duration.trim())) {
    errors.duration = "Duration must be in format like '2h 10m'";
  }

  if (tags && typeof tags === "string") {
    const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
    if (tagsArray.length === 0) {
      errors.tags = "At least one tag is required";
    }
  } else {
    errors.tags = "Tags must be a comma-separated string";
  }

  if (!ratingOverall || typeof ratingOverall !== "string" || ratingOverall.trim() === "") {
    errors.ratingOverall = "Rating is required";
  } else {
    const ratingNum = Number(ratingOverall);
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 10) {
      errors.ratingOverall = "Rating must be a number between 0 and 10";
    }
  }

  if (!director || typeof director !== "string" || director.trim() === "") {
    errors.director = "Director is required";
  }

  if (!tagline || typeof tagline !== "string" || tagline.trim() === "") {
    errors.tagline = "Tagline is required";
  }

  if (!imdb || typeof imdb !== "string" || imdb.trim() === "") {
    errors.imdb = "IMDb link is required";
  } else if (!/^https:\/\/(www\.)?imdb\.com\/title\/tt\d+/.test(imdb.trim())) {
    errors.imdb = "IMDb link must be valid (e.g., https://www.imdb.com/title/tt1234567)";
  }

  if (!poster || typeof poster !== "string" || poster.trim() === "") {
    errors.poster = "Poster URL is required";
  } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/.test(poster.trim())) {
    errors.poster = "Poster must be a valid image URL";
  }

  const validStatuses = ["Plan to Watch", "Dropped", "On-Hold", "Completed", "Watching"];
  if (!status || typeof status !== "string" || !validStatuses.includes(status)) {
    errors.status = "Invalid status";
  }

  if (status === "Completed") {
    if (!ratingMy || typeof ratingMy !== "string" || isNaN(Number(ratingMy))) {
      errors.ratingMy = "Select a valid rating (1-5)";
    }

    const dateStr = typeof date === "string" ? date : "";
    const parsedDate = new Date(dateStr);
    if (!dateStr || isNaN(parsedDate.getTime())) {
      errors.date = "Enter a valid date";
    }
  }

  if (!plot || typeof plot !== "string" || plot.trim() === "") {
    errors.plot = "Plot is required";
  }

  if (!description || typeof description !== "string" || description.trim() === "") {
    errors.description = "Description is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors: errors,
      message: "Form contains errors",
    };
  }

  // Если всё хорошо, можно сохранить фильм (например, в БД)

  return {
    message: "Film successfully added",
  };
}
