import React, { useEffect, useState, useMemo } from 'react';
import {
    ref,
    getDownloadURL,
    listAll,
    getStorage
} from "firebase/storage";


import './Image.css'

const Image=({ user }) => {
    const storage=getStorage();
    const [images, setImages]=useState([]);

    useEffect(() => {
        const listRef=ref(storage, 'Images-secqur/');
        listAll(listRef)
            .then((res) => {
                const newImages=[];
                res.items.forEach((itemRef) => {
                    getDownloadURL(itemRef).then((url) => {
                        const newImage={
                            name: itemRef.name,
                            url: url
                        };
                        newImages.push(newImage);
                        setImages(newImages);
                    }).catch((error) => {
                        console.log(error);
                    });
                });
            }).catch((error) => {
                console.log(error)
            });
    }, []);
    // console.log(images)
    const filteredImages=useMemo(() => {
        if (user&&user.Name) {
            return images.filter(image => image.name===user.Name+'.jpg');
        }
        return [];
    }, [images, user]);
    // console.log(filteredImages);
    return (
        <div>
            {filteredImages.map((image) => (
                <div key={image.url}>
                    <h2>{image.name}</h2>
                    <img src={image.url} alt="firebase-img" />
                </div>
            ))}
        </div>
    );
};

export default Image;
