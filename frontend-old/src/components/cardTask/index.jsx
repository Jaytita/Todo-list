import { useState } from 'react'
import './style.scss'
import { CloseOutlined } from "@ant-design/icons"
import PropTypes from 'prop-types';

const CardTask = ({ name, dueDate, detail, isCheck=false, isDelete=false }) => {
  const [isDone, setIsDone] = useState(false);

  return (
    <div className={`card-component ${isDone ? "completed" : ""}`}>
      <div className="card-content">
        {isCheck && <input type={'checkbox'} className="card-checkbox" onClick={() => setIsDone(!isDone)} />}
        <div className="card-description">
          <span className={`card-header ${isDone && "completed"}`}>
            <span className="card-name">{name || "UI" }</span>
            <span className="card-due-date">{dueDate || "24 Jun"}</span>
          </span>
          <p className="card-detail">{detail || "Lorem ipsum dolor sit amet consectetur adipisicing elit."}</p>
        </div>
      </div>

      {isDelete && (
        <div className="card-delete">
          <CloseOutlined />
        </div>
      )}
    </div>
  )
}

export default CardTask

CardTask.propTypes = {
  name: PropTypes.string,
  dueDate: PropTypes.string,
  detail: PropTypes.string,
  isCheck: PropTypes.bool,
  isDelete: PropTypes.bool,
}