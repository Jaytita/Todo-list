import { ReactNode } from "react";

interface MyButtonProps {
  primary?: boolean;
  text: string;
  fullWidth?: boolean;
  onClick?: () => void;
  startIcon?: ReactNode;
  disabled?: boolean;
}

const MyButton: React.FC<MyButtonProps> = ({ text="", fullWidth, onClick, startIcon, disabled, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded border-white ${fullWidth && "w-full"} ${!disabled ? "hover:brightness-90" : "brightness-50 hover:cursor-not-allowed"}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <div className={`flex justify-center items-center ${startIcon ? "gap-2" : ""}`}>
        {startIcon}
        {text}
      </div>
    </button>
  )
}

export default MyButton
