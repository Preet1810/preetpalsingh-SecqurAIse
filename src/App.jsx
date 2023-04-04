import React, { useEffect, useState } from 'react'
import { db } from './firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import './App.css'
const App=() => {
  const [users, setUsers]=useState([])
  const usersCollectionRef=collection(db, "User")

  useEffect(() => {
    const getUsers=async () => {
      const data=await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };
    getUsers()
  }, [])

  const maleCount=users.reduce((count, item) => {
    if (item.Gender==="Male") {
      return count+1;
    } else {
      return count
    }
  }, 0);

  const femaleCount=users.reduce((count, item) => {
    if (item.Gender==="Female") {
      return count+1;
    } else {
      return count
    }
  }, 0);


  return (
    <div className="container">
      <Navbar male={maleCount} female={femaleCount} />
      <Sidebar />

    </div>
  )
}

export default App