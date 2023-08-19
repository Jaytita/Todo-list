interface TextfieldProps {
  type?: string;
  label?: string;
  id: string;
  placeholder: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Textfield: React.FC<TextfieldProps> = ({ type="text", label, id, maxLength, placeholder, onChange,  errorMsg, startIcon, endIcon, ...props }) => {

  return (
    <div className="mb-4 w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <label htmlFor={id}>{label}</label>
          <span className={`text-red-400 max-h-8 transition-all duration-200 ${errorMsg ? "" : "invisible"}`}>{errorMsg || ""}</span>
        </div>
      )}
      <div className="relative flex flex-col w-full">
        <input
          className="px-4 py-2 text-white bg-transparent border-2 border-solid border-white rounded-full focus:outline-0"
          type={type}
          placeholder={placeholder}
          id={id}
          onChange={onChange}
          maxLength={maxLength}
          {...props}
        />
        <div className="absolute top-1.5 left-4">
          {startIcon}
        </div>
        <div className="absolute top-1.5 right-4">
          {endIcon}
        </div>
      </div>
    </div>
  )
}

export default Textfield
