import './style.scss';

const MyButton = ({ primary=false, text="" }) => {
  return (
    <button className={`my-button ${primary ? "primary" : ""}`}>
      {text}
    </button>
  )
}

export default MyButton