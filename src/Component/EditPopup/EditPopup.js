import React from 'react'
import './EditPopup.css'

const EditPopup = (props) => {
  const { closePopup, getMessage, changeMessage, changeValue } = props

  return (
    <div className="EditPopup">
      <form className="popup" onSubmit={changeValue}>
        <h3 className="popup__title">Edit case</h3>
        <input
          className="popup__inp"
          value={getMessage || ''}
          type="text"
          onChange={(e) => changeMessage(e.target.value)}
        />
        <button className="popup__send">Edit</button>
        <button className="popup__close" onClick={closePopup}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </form>
    </div>
  )
}

export default EditPopup
