import React, { useRef, useState } from 'react'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'
import { db } from '../../Firebase/config'
import './Item.css'

const Item = (props) => {
  const {
    id,
    message,
    important,
    deleteMessage,
    editMessage,
    setAllData,
    getAllMessage,
  } = props
  const [selectedFile, setSelectedFile] = useState(null)
  const [styleMessage, setStyleMessage] = useState('Item__text')
  const inputRef = useRef(null)
  const pickRef = useRef(null)
  const fileReader = new FileReader()
  const storage = getStorage()

  async function toggleImportant(id) {
    const itemRef = doc(db, 'message', id)
    const docSnap = await getDoc(itemRef)
    const data = await docSnap.data().important

    await updateDoc(itemRef, {
      important: !data,
    })

    setAllData([])
    getAllMessage()

    // const afterUpdate = await getDoc(itemRef)
    // const trueOrFalse = await afterUpdate.data().important
    // if (trueOrFalse) {
    //   setStyleMessage('Item__text-important')
    // } else {
    //   setStyleMessage('Item__text')
    // }
  }

  fileReader.onloadend = () => {
    setSelectedFile(fileReader.result)
  }

  const download = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const storageRef = ref(storage, `files${file.name}`)
    fileReader.readAsDataURL(file)
  }

  return (
    <li className="Item">
      <p className={important ? 'Item__text-important' : 'Item__text'}>
        {message}
      </p>
      <div className="Item__inner">
        <button className="Item__important" onClick={() => toggleImportant(id)}>
          <span className="material-symbols-outlined">priority_high</span>
        </button>
        <button className="Item__delete" onClick={() => deleteMessage(id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
        <button className="Item__edit" onClick={() => editMessage(id)}>
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button className="Item__file" onClick={() => inputRef.current.click()}>
          <span className="material-symbols-outlined">description</span>
        </button>
        <input
          type="file"
          id="getFile"
          style={{ display: 'none' }}
          ref={inputRef}
          multiple
          onChange={download}
        />
      </div>
      {selectedFile ? (
        <div className="Item__img" ref={pickRef}>
          <img src={selectedFile} alt="File" />
        </div>
      ) : (
        ''
      )}
    </li>
  )
}

export default Item
