"use client";
import { createFilm, State } from '@/app/lib/actions';
import { Film } from '@/app/lib/definitions';
import { useActionState, useState } from "react";

export function FilmForm({ film, onClose }: { film?: Film; onClose: () => void }) {
  const initialState: State = { successMessage: undefined, errorMessage: undefined, errors: {}, result: film ?? {}, };
  const [state, formAction] = useActionState(createFilm, initialState);

  const [status, setStatus] = useState<string>(film?.status ?? "");

  return (
    <form action={formAction} className="form-add"  aria-describedby="form-error">
      <h2>{film ? "Edit Film" : "Add New Film"}</h2>

      <div className='form-content'>
        {film?.id && (
          <input type="hidden" name="id" value={film.id} />
        )}

        <FormInput 
          name={"title"}
          type={"text"}
          placeholder={"Title"}
          defaultValue={state.result?.title}
          label={"Film title"}
          errorId={"title-error"}
          errorText={state.errors?.title}
        />
        <FormInput 
          name={"year"}
          type={"number"}
          placeholder={"Year"}
          defaultValue={state.result?.year?.toString()}
          label={"Film year"}
          errorId={"year-error"}
          errorText={state.errors?.year}
        />
        <FormInput 
          name={"duration"}
          type={"text"}
          placeholder={"e.g., 2h 10m"}
          defaultValue={state.result?.duration}
          label={"Film duration"}
          errorId={"duration-error"}
          errorText={state.errors?.duration}
        />
        <FormInput 
          name={"tags"}
          type={"text"}
          placeholder={"comma-separated"}
          defaultValue={ 
            Array.isArray(state.result?.tags)
              ? state.result.tags.join(", ")
              : state.result?.tags
            }
          label={"Film tags"}
          errorId={"tags-error"}
          errorText={state.errors?.tags}
        />
        <FormInput 
          name={"ratingOverall"}
          type={"text"}
          placeholder={"e.g., 8.4"}
          defaultValue={state.result?.ratingOverall}
          label={"Film rating"}
          errorId={"ratingOverall-error"}
          errorText={state.errors?.ratingOverall}
        />
        <FormInput 
          name={"director"}
          type={"text"}
          placeholder={"Director"}
          defaultValue={state.result?.director}
          label={"Film director"}
          errorId={"director-error"}
          errorText={state.errors?.director}
        />
        <FormInput 
          name={"tagline"}
          type={"text"}
          placeholder={"Tagline"}
          defaultValue={state.result?.tagline}
          label={"Film tagline"}
          errorId={"tagline-error"}
          errorText={state.errors?.tagline}
        />
        <FormInput 
          name={"imdb"}
          type={"text"}
          placeholder={"IMDb Link"}
          defaultValue={state.result?.imdb}
          label={"IMDb Link"}
          errorId={"imdb-error"}
          errorText={state.errors?.imdb}
        />
        <FormInput 
          name={"img"}
          type={"text"}
          placeholder={"Image URL"}
          defaultValue={state.result?.img}
          label={"Image URL"}
          errorId={"img-error"}
          errorText={state.errors?.img}
        />
        <FormInput 
          name={"poster"}
          type={"text"}
          placeholder={"Poster URL"}
          defaultValue={state.result?.poster}
          label={"Poster URL"}
          errorId={"poster-error"}
          errorText={state.errors?.poster}
        />

        <div className='form-group'>
          <label htmlFor="status">My status</label>
          <select id='status' name="status" className="" defaultValue={state.result?.status ?? ""} aria-describedby="status-error" onChange={(e) => setStatus(e.target.value)}>
            <option value="Plan to Watch">Plan to Watch</option>
            <option value="Dropped">Dropped</option>
            <option value="On-Hold">On-Hold</option>
            <option value="Completed">Completed</option>
            <option value="Watching">Watching</option>
          </select>
          <ErrorBlock id={"status-error"} text={state.errors?.status}/>
        </div>

        {status === "Completed" && (
          <>
            <div className='form-group'>
              <label htmlFor="ratingMy">My rating</label>
              <select id='ratingMy' name="ratingMy" className="" defaultValue={state.result?.ratingMy?.toString() ?? ""} aria-describedby="ratingMy-error" >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <ErrorBlock id={"ratingMy-error"} text={state.errors?.ratingMy}/>
            </div>

            <FormInput 
              name={"date"}
              type={"date"}
              placeholder={""}
              defaultValue={formatDate(state.result?.date)}
              label={"Viewing date"}
              errorId={"date-error"}
              errorText={state.errors?.date}
            />
          </>
        )}
      </div>
      <FormTextarea 
        name={"description"}
        placeholder={"Enter description"}
        defaultValue={state.result?.description}
        label={"Film description"}
        errorId={"description-error"}
        errorText={state.errors?.description}
      />
      
      <FormTextarea 
        name={"plot"}
        placeholder={"Enter plot"}
        defaultValue={state.result?.plot}
        label={"Film plot"}
        errorId={"plot-error"}
        errorText={state.errors?.plot}
      />      

      <div className='main-answer'>
        {state.errorMessage && (
          <ErrorBlock id={"form-error"} text={state.errorMessage}/>
        )}
        {state.successMessage && (
          <div id={"form-error"} className='form-success' aria-live="polite" aria-atomic="true">
            <p>{state.successMessage}</p>
          </div>
        )}
      </div>

      <div className="button-group">
        <button type="button" onClick={onClose} className="" >Cancel</button>
        <button type="submit" className="button-blue" >{film ? "Update Film" : "Add Film"}</button>
      </div>
    </form>
  );
}

function FormInput ({ label, errorId, errorText, ...inputProps }: {
  label: string, errorId: string, errorText?: string, name: string, type: string, placeholder: string, defaultValue?: string
}) {
  const inputId = `input-${inputProps.name}`;

  return (
    <div className="form-group">
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} {...inputProps} defaultValue={inputProps.defaultValue ?? ""} className="" aria-describedby={errorId} />
      <ErrorBlock id={errorId} text={errorText}/>
    </div>
  );
}

function FormTextarea ({ label, errorId, errorText, ...inputProps }: {
  label: string, errorId: string, errorText?: string, name: string, placeholder: string, defaultValue?: string
}) {
  const inputId = `textarea-${inputProps.name}`;

  return (
    <div className="form-group">
      <label htmlFor={inputId}>{label}</label>
      <textarea id={inputId} {...inputProps} defaultValue={inputProps.defaultValue ?? ""} className="" aria-describedby={errorId} rows={3} />
      <ErrorBlock id={errorId} text={errorText}/>
    </div>
  );
}

function ErrorBlock ({ id, text }: { id: string; text?: string; }) {
  return (
    <div id={id} className='form-error' aria-live="polite" aria-atomic="true">
      {text && (
        <p className="">
            {text}
        </p>
      )}
    </div>
  );
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";

  if (typeof date === "string") {
    return date.split("T")[0];
  }

  return date.toISOString().split("T")[0];
}