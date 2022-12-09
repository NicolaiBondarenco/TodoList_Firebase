import React, { useEffect, useState, useRef } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../Firebase/config'
import ItemList from '../../Component/ItemList/ItemList'
import './AddCase.css'

const AddCase = () => {
  const [allData, setAllData] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const ref = collection(db, 'message')

  useEffect(() => {
    getAllMessage()
  }, [])

  async function getAllMessage() {
    const querySnapshot = await getDocs(collection(db, 'message'))
    querySnapshot.forEach((doc) => {
      const item = {
        id: doc.id,
        message: doc.data().message,
        important: doc.data().important,
      }
      setAllData((prev) => [...prev, item])
    })
  }

  const handlerMassage = async (e) => {
    e.preventDefault()

    const data = {
      message: inputRef.current.value,
      important: false,
    }

    try {
      addDoc(ref, data)
    } catch (error) {
      console.log(error)
    } finally {
      setInput('')
    }
    setAllData([])
    getAllMessage()
  }

  return (
    <>
      <form className="AddCase" onSubmit={handlerMassage}>
        <label> Add Case </label>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          ref={inputRef}
        />
        <button type="submit">Save</button>
      </form>
      <ItemList
        allData={allData}
        setAllData={setAllData}
        getAllMessage={getAllMessage}
      />
    </>
  )
}

export default AddCase
