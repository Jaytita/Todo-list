import './style.scss';
import PropTypes from 'prop-types';

const MyButton = ({ primary=false, text="", onClick, ...props }) => {

  return (
    <button
      className={`my-button ${primary ? "primary" : ""}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  )
}

export default MyButton

MyButton.propTypes = {
  primary: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
}
