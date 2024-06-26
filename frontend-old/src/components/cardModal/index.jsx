import './style.scss'
import { useState } from 'react'
import PropTypes from 'prop-types';

import { CloseOutlined } from "@ant-design/icons"
import MyButton from '../myButton';

import { useSelector, useDispatch } from 'react-redux';
import { setVisible } from '../../redux/reducers/cardModalReducer';

const CardModal = ({ position, closable=true, bgClosable=true, title, content, footer=true, emailValidate, handleForgotPass, onConfirm }) => {
  const dispatch = useDispatch();
  const visible = useSelector(state => state.cardModal.visible);

  const [userMail, setUserMail] = useState("");
  const [checkUserMail, setCheckUserMail] = useState(false);

  const handleCloseModal = () => {
    dispatch(setVisible(false));
  }

  return (
    <div className={`modal-component ${visible ? "" : "hidden"}`}>
      <div className="modal-background" onClick={bgClosable && handleCloseModal}>
      </div>

      <div className={`modal-container`}>
        <span className="modal-header">
          <h2>{title}</h2>
          {closable && <CloseOutlined onClick={handleCloseModal}/>}
        </span>
        {/* <div className="card-detail">
          {content ? content : "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
        </div> */}
        {title === "Forgot password" && (
          <>
            <div className="input-label" style={{ display: "flex", justifyContent: "flex-end", width: "100%"}}>
              <span className={`input-label ${checkUserMail ? "" : "hidden"}`}>{emailValidate(userMail)}</span>
            </div> 
            <input
              type="email"
              placeholder="Email"
              id="email-forgot"
              onChange={(e) => {
                setUserMail(e.target.value)
                setCheckUserMail(false)
              }}
            />
          </>
        )}

        {footer && (
          <div className="modal-footer">
            <MyButton
              text="Cancel"
              onClick={() => dispatch(setVisible(false))}
            />
            <MyButton
              text="Confirm"
              primary={true}
              onClick={() => {
                setCheckUserMail(true)
                // handleForgotPass
              }}
            />
          </div>
        )}
      </div>

    </div>
  )
}

export default CardModal

CardModal.propTypes = {
  position: PropTypes.array,
  closable: PropTypes.bool,
  bgClosable: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  footer: PropTypes.bool,
  emailValidate: PropTypes.func,
  handleForgotPass: PropTypes.func,
  onConfirm: PropTypes.func,
}
