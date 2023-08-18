import { ReactNode } from "react";

interface MyButtonProps {
  primary?: boolean;
  text: string;
  fullWidth?: boolean;
  onClick?: () => void;
  startIcon?: ReactNode;
}

const MyButton: React.FC<MyButtonProps> = ({ text="", fullWidth, onClick, startIcon, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded border-white hover:brightness-90 ${fullWidth && "w-full"}`}
      onClick={onClick}
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
