import PropTypes from 'prop-types';
import './style.scss';

const Textfield = ({ type="text", label, id, placeholder, onChange,  errorMsg, startIcon, endIcon, ...props }) => {

  return (
    <div className="textfield-main">
      {label && (
        <div className="login-input-label">
          <label htmlFor="email">{label}</label>
          <span className={`input-label ${errorMsg ? "" : "hidden"}`}>{errorMsg || ""}</span>
        </div>
      )}
      <div className="textfield-rounded">
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          onChange={onChange}
          {...props}
        />
        <div className="textfield-start-icon">
          {startIcon}
        </div>
        <div className="textfield-end-icon">
          {endIcon}
        </div>
      </div>
    </div>
  )
}

export default Textfield

Textfield.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  errorMsg: PropTypes.string,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
}
