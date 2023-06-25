import { useState } from 'react'
import './style.scss'
import { CloseOutlined } from "@ant-design/icons"

const Card = ({ name, dueDate, detail, isCheck=false, isDelete=false }) => {
  const [isDone, setIsDone] = useState(false);

  return (
    <div className={`card-component ${isDone ? "completed" : ""}`}>
      <div className="card-content">
        {isCheck && <input type={'checkbox'} className="card-checkbox" onClick={() => setIsDone(!isDone)} />}
        <div className="card-description">
          <span className={`card-header ${isDone && "completed"}`}>
            <span className="card-name">UI</span>
            <span className="card-due-date">24 Jun</span>
          </span>
          <p className="card-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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

export default Card