import './style.scss';

const MyButton = ({ primary=false, text="", funcProps }) => {

  return (
    <button
      className={`my-button ${primary ? "primary" : ""}`}
      onClick={funcProps}
    >
      {text}
    </button>
  )
}

export default MyButton