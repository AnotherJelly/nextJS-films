import type { ChangeEvent } from 'react';

export function Toggle({
  id,
  onChange,
  checked,
}: {
  id: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}) {
  return (
    <div className='toggle'>
      <span>
        <input
          type='checkbox'
          id={id}
          onChange={onChange}
          checked={checked}
        />
        <label htmlFor={id}></label>
      </span>
    </div>
  );
}
