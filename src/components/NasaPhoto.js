import React, { useState, useEffect } from "react";
import '../App.css'

export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);

  async function fetchPhoto() {

    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}`
      );
      const data = res.json();
      setPhotoData(data);
    } catch (err) {
      console.log(err.Error)
    }
  }
    
  useEffect(() => {
      fetchPhoto();
    }, []);
   
    if (!photoData) return <div />;

    return (
      <div className="image-container">
        {photoData.media_type === "image" ? (
          <img className="photo" src={photoData.url} alt={photoData.title} />
        ) : (
          <iframe
            title="space-video"
            src={photoData.url}
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
            className="photo"
          />
        )}
        <div>
          <h1 className="title">{photoData.title}</h1>
          <h3 className='date'>{photoData.date}</h3>
        </div>
        <p className='explanation'>{photoData.explanation}</p>
      </div>
    )
  }
