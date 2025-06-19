"use client";
import { createFilm, State } from '@/app/lib/actions';
import { useActionState, useState } from "react";

export function AddFilmForm({ onClose }: { onClose: () => void }) {
  const initialState: State = { message: undefined, errors: {} };
  const [state, formAction] = useActionState(createFilm, initialState);

  const [status, setStatus] = useState<string>("");

  return (
    <form action={formAction} className=""  aria-describedby="form-error">
      <h2 className="">Add New Film</h2>

      <FormInput 
        name={"img"}
        type={"text"}
        placeholder={"Image URL"}
        errorId={"img-error"}
        errorText={state.errors?.img}
      />
      <FormInput 
        name={"title"}
        type={"text"}
        placeholder={"Title"}
        errorId={"title-error"}
        errorText={state.errors?.title}
      />
      <FormInput 
        name={"year"}
        type={"number"}
        placeholder={"Year"}
        errorId={"year-error"}
        errorText={state.errors?.year}
      />
      <FormInput 
        name={"duration"}
        type={"text"}
        placeholder={"Duration (e.g., 2h 10m)"}
        errorId={"duration-error"}
        errorText={state.errors?.duration}
      />
      <FormInput 
        name={"tags"}
        type={"text"}
        placeholder={"Tags (comma-separated)"}
        errorId={"tags-error"}
        errorText={state.errors?.tags}
      />
      <FormInput 
        name={"ratingOverall"}
        type={"text"}
        placeholder={"Rating (e.g., 8.4)"}
        errorId={"ratingOverall-error"}
        errorText={state.errors?.ratingOverall}
      />
      <FormInput 
        name={"director"}
        type={"text"}
        placeholder={"Director"}
        errorId={"director-error"}
        errorText={state.errors?.director}
      />
      <FormInput 
        name={"tagline"}
        type={"text"}
        placeholder={"Tagline"}
        errorId={"tagline-error"}
        errorText={state.errors?.tagline}
      />
      <FormInput 
        name={"imdb"}
        type={"text"}
        placeholder={"IMDb Link"}
        errorId={"imdb-error"}
        errorText={state.errors?.imdb}
      />
      <FormInput 
        name={"poster"}
        type={"text"}
        placeholder={"Poster URL"}
        errorId={"poster-error"}
        errorText={state.errors?.poster}
      />

      <select name="status" className="" defaultValue="" aria-describedby="status-error" onChange={(e) => setStatus(e.target.value)}>
        <option value="Plan to Watch">Plan to Watch</option>
        <option value="Dropped">Dropped</option>
        <option value="On-Hold">On-Hold</option>
        <option value="Completed">Completed</option>
        <option value="Watching">Watching</option>
      </select>
      <ErrorBlock id={"status-error"} text={state.errors?.status}/>

      {status === "Completed" && (
        <>
          <select name="ratingMy" className="" defaultValue="" aria-describedby="ratingMy-error" >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <ErrorBlock id={"ratingMy-error"} text={state.errors?.ratingMy}/>

          <FormInput 
            name={"date"}
            type={"date"}
            placeholder={""}
            errorId={"date-error"}
            errorText={state.errors?.date}
          />
        </>
      )}

      <FormTextarea 
        name={"description"}
        placeholder={"Enter description"}
        errorId={"description-error"}
        errorText={state.errors?.description}
      />
      
      <FormTextarea 
        name={"plot"}
        placeholder={"Enter plot"}
        errorId={"plot-error"}
        errorText={state.errors?.plot}
      />      

      <ErrorBlock id={"form-error"} text={state.message}/>

      <div className="">
        <button type="button" onClick={onClose} className="" >
          Cancel
        </button>
        <button type="submit" className="" >
          Add Film
        </button>
      </div>
    </form>
  );
}

function FormInput ({ name, type, placeholder, errorId, errorText }: {
  name: string, type: string, placeholder: string, errorId: string, errorText: string | undefined
}) {
  return (
    <>
      <input name={name} type={type} placeholder={placeholder} className="" aria-describedby={errorId} />
      <ErrorBlock id={errorId} text={errorText}/>
    </>
  );
}

function FormTextarea ({ name, placeholder, errorId, errorText }: {
  name: string, placeholder: string, errorId: string, errorText: string | undefined
}) {
  return (
    <>
      <textarea name={name} placeholder={placeholder} className="" aria-describedby={errorId} rows={3} />
      <ErrorBlock id={errorId} text={errorText}/>
    </>
  );
}

function ErrorBlock ({ id, text }: { id: string; text: string | undefined; }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {text && (
        <p className="">
            {text}
        </p>
      )}
    </div>
  );
}