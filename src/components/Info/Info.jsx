import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc } from 'firebase/firestore'
import { db } from '../../firebase-config'

const Info=({ id }) => {
    // console.log(id)
    const [user, setUser]=useState()
    const usersCollectionRef=collection(db, "User")

    useEffect(() => {
        const getUsers=async () => {
            const data=await getDocs(usersCollectionRef);
            const users=data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const filteredUser=users.find((user) => user.ID===id.ID);
            setUser(filteredUser||null);
        };
        getUsers();
    }, [id]);
    return (
        user? (
            <div style={{ marginLeft: '3rem' }}>
                <h1>{user.ID}</h1>
                <h1>Person Detected</h1>
                <p style={{ fontSize: '2.5rem', fontWeight: '30px' }}>
                    Name: {user.Name}<br />
                    Location: {user.Location}<br />
                    Date: {user.Date}<br />
                    Time: {user.Time}<br /><br />

                    Description:<br />
                    {user.Name} detected at<br />
                    {user.Location} on {user.Date}<br />
                </p>
            </div>
        ):<div>Click a user to see information</div>
    );
};


export default Info