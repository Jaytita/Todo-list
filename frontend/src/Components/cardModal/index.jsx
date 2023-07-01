import { useState } from 'react'
import './style.scss'
import { CloseOutlined } from "@ant-design/icons"
import MyButton from '../myButton';

import { useSelector, useDispatch } from 'react-redux';
import { setVisible } from '../../redux/reducers/cardModalReducer';

const CardModal = ({ isVisible=true, closable=true, bgClosable=true, footer=true }) => {
  const dispatch = useDispatch();

  const visible = useSelector(state => state.cardModal.visible);

  const handleCloseModal = () => {
    dispatch(setVisible(false));
  }

  return (
    <div className={`modal-component ${visible ? "" : "hidden"}`}>
      <div className="modal-background" onClick={bgClosable && handleCloseModal}>
      </div>

      <div className="modal-container">
        <span className="modal-header">
          <h2>Modal Title</h2>
          {closable && <CloseOutlined onClick={handleCloseModal}/>}
        </span>
        <p className="card-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

        {footer && (
          <div className="modal-footer">
            <MyButton text="Cancel" />
            <MyButton text="Confirm" primary={true} />
          </div>
        )}
      </div>

    </div>
  )
}

export default CardModal