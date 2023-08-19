interface SlidingBoxProps {
  isSelected: boolean;
  handleSelectChoice: () => void;
}

const SlidingBox: React.FC<SlidingBoxProps> = ({ isSelected, handleSelectChoice }) => {

  return (
    <div className="relative flex flex-row justify-between items-center px-1 py-2 w-full h-full bg-transparent text-center border-2 border-white rounded-full transition-all duration-1000">
    <div
      className={`w-full hover:cursor-pointer ${isSelected ? "text-black duration-700" : ""}`}
      onClick={handleSelectChoice}
    >
      <p>Login</p>
    </div>
    <div
      className={`w-full hover:cursor-pointer ${isSelected ? "" : "text-black duration-700"}`}
      onClick={handleSelectChoice}
    >
      <p>Register</p>
    </div>
    <div className={`absolute bg-white w-[calc(50%-0.25em)] h-4/5 rounded-full transition-all duration-700 z-[-1] ${isSelected ? "" : "translate-x-full transition-all duration-700"}`}>
    </div>
  </div>
  )
}

export default SlidingBox