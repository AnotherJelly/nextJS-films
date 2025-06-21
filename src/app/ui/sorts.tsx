"use client";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import { Modal } from '@/app/ui/modal';
import { FilmForm } from '@/app/ui/forms';

export function SortingPanelMain({ inputName, selectName }: { inputName: string; selectName: string; }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleChangeInput = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "") {
      params.delete(inputName);
    } else {
      params.set(`${inputName}`, value);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const handleChangeSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value === "default") {
      params.delete(selectName);
    } else {
      params.set(`${selectName}`, value);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="sorting-panel sorting-block">
      <div className='sorting-block'>
        <InputText 
          placeholder='Search by name'
          onChange={handleChangeInput}
          value={searchParams.get(`${inputName}`)?.toString()}
        />
        <CustomSelect
          options={{
            default: "No sort",
            title: "Alphabet",
            rating: "Rating",
            year: "Year"
          }}
          valueSelect={searchParams.get(`${selectName}`)?.toString() || "default"}
          onChange={handleChangeSelect}
        />
      </div>

      <button type='button' className='button-blue' onClick={() => setOpenModal(true)}>
        Add film
      </button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <FilmForm onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
}

function InputText ({ placeholder, value, onChange }: { placeholder: string; value: string | undefined; onChange: (value: string) => void; }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      defaultValue={value}
    />
  );
}

function CustomSelect({ options, valueSelect, onChange }: {
  options: Record<string, string>; valueSelect: string | undefined; onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const entriesOption = Object.entries(options);
  const selectedLabel = options[valueSelect ?? ""] ?? entriesOption[0]?.[1];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if ( selectRef.current && !selectRef.current.contains(e.target as Node) ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-select" ref={selectRef}>
      <button className="search-select__btn" onClick={() => setIsOpen((prev) => !prev)} >
        <svg width="1.2em" height="1.2em" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.18176 14.0909L6.45449 17.3636L9.72722 14.0909" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M6.45454 4.63637L6.45455 17.3636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M18.8182 7.90909L15.5454 4.63636L12.2727 7.90909" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M15.5454 17.3636L15.5454 4.63637" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        {selectedLabel}
      </button>

      {isOpen && (
        <ul className="search-select__ul" >
          {entriesOption.map(([key, value]) => (
            <li
              key={key}
              className={`search-select__li ${valueSelect === key ? "active" : ""}`}
              onClick={() => {
                onChange(key);
                setIsOpen(false);
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

