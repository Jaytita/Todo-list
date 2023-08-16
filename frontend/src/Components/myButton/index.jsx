import './style.scss';

const MyButton = ({ primary=false, text="", onClick, ...props }) => {

  return (
    <button
      className={`my-button ${primary ? "primary" : ""}`}
      onClick={onClick}
      props={props}
    >
      {text}
    </button>
  )
}

export default MyButton