interface CircleButtonProps {
  image?: string;
  alt?: string;
}

const CircleButton: React.FC<CircleButtonProps> = ({ image, alt }) => {
  return (
    <div className="flex justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer hover:border-2">
      <img src={image} alt={alt} />
    </div>
  )
}

export default CircleButton
