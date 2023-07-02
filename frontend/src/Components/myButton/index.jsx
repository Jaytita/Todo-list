import './style.scss';

import { useDispatch } from 'react-redux';
import { setVisible } from '../../redux/reducers/cardModalReducer';

const MyButton = ({ primary=false, text="" }) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setVisible(false));
  }
  return (
    <button
      className={`my-button ${primary ? "primary" : ""}`}
      onClick={text === "Cancel" && handleCloseModal}
    >
      {text}
    </button>
  )
}

export default MyButton