import React, { useRef, useCallback } from 'react';
import { FileButtonProps } from 'types/type';

const FileButton = <Multiple extends boolean = false>({
  children,
  onChange,
  accept,
  multiple = false as Multiple,
  name,
  form,
  resetRef,
  disabled = false,
  capture,
  inputProps = {},
  ...others
}: FileButtonProps<Multiple>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = event.target.files;
    if (files) {
      onChange(multiple ? (Array.from(files) as Multiple extends true ? File[] : File) : (files[0] || null) as Multiple extends true ? File[] : File);
    }
  };

  const reset = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  if (resetRef) {
    if (typeof resetRef === 'function') {
      resetRef(reset);
    } else if (typeof resetRef === 'object' && resetRef !== null) {
      resetRef.current = reset;
    }
  }

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        ref={inputRef}
        name={name}
        form={form}
        capture={capture}
        {...inputProps}
      />
      {children({ onClick: handleButtonClick, ...others })}
    </>
  );
};

export default FileButton;