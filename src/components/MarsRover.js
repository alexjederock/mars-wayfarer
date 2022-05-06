import React, { useState } from "react"
import Axios from "axios"
import SearchPage from './SearchPage'
import './MarsRover.css'


export default function MarsRover() {

  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null)


  async function search(searchValue) {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await Axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${searchValue}&api_key=${process.env.REACT_APP_NASA_KEY}`)
      console.log(res.data)
      let photoData = res.data.photos
      setPhotos(photoData)
      setLoading(false)
    } catch (err) {
      setErrorMessage(err.Error);
      setLoading(false);
    }
  }

  return (
    <div className="rover-container">
      <h1>Search by page; 1-30</h1>
      <SearchPage search={search} />
      <div className="img-container">
        <div className="photo-return-page">
          {loading && !errorMessage ? (
            <span>loading...</span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            photos.map((photo) => (
              <img className="img" key={`${photo.id}`} alt="space" src={`${photo.img_src}`} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
