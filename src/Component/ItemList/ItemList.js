import React, { useState } from 'react'
import EditPopup from '../EditPopup/EditPopup'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../Firebase/config'
import Item from '../Item/Item'

import './ItemList.css'

const ItemList = ({ allData, setAllData, getAllMessage }) => {
  const [popup, setPopup] = useState(false)
  const [getMessage, setGetMessage] = useState({ message: '', id: '' })

  const editMessage = async (id) => {
    const docRef = doc(db, 'message', id)
    const docSnap = await getDoc(docRef)
    setGetMessage({ message: docSnap.data().message, id: id })
    setPopup((prev) => !prev)
  }

  const closePopup = (e) => {
    e.preventDefault()
    setPopup((prev) => !prev)
  }

  async function deleteMessage(id) {
    await deleteDoc(doc(db, 'message', id))
    setAllData([])
    getAllMessage()
  }

  const changeMessage = (value) => {
    setGetMessage({ ...getMessage, message: value })
  }

  const changeValue = async (e) => {
    e.preventDefault()
    const itemRef = doc(db, 'message', getMessage.id)
    const docSnap = await getDoc(itemRef)
    await docSnap.data().message

    await updateDoc(itemRef, {
      message: getMessage.message,
    })
    setAllData([])
    getAllMessage()
    setPopup((prev) => !prev)
  }

  return (
    <>
      <ul className="ItemList">
        {allData.map((el) => {
          return (
            <Item
              key={el.id}
              {...el}
              deleteMessage={deleteMessage}
              editMessage={editMessage}
              setAllData={setAllData}
              getAllMessage={getAllMessage}
            />
          )
        })}
      </ul>
      {popup ? (
        <EditPopup
          closePopup={closePopup}
          changeMessage={changeMessage}
          getMessage={getMessage.message}
          changeValue={changeValue}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default ItemList
