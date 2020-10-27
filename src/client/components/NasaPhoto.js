import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import axios from 'axios';

export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState([]);

  useEffect(() => {
    fetchPhoto();

    async function fetchPhoto() {
			const res = await axios.get('getAllCameras');
			setPhotoData(res.data.content.photos);
    }
  }, []);

  if (!photoData) return <div />;

  return (
    <>
    <Navigation />
    <div className="nasa-photo">
			<h1>Camera: MAST</h1>
			<div>
				{photoData.map(photo => <img src={photo.img_src}></img>)}
			</div>
    </div>
    </>
  );
}