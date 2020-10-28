import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import axios from 'axios';

export default function NasaPhoto() {
	const [photoData, setPhotoData] = useState([]);
	const cameras =  [
		'FHAZ',
		'RHAZ',
		'MAST',
		'CHEMCAM',
		'MAHLI',
		'MARDI',
		'NAVCAM',
		'PANCAM',
		'MINITES'
	];

	async function fetchPhoto(camera) {
		const res = await axios.get('getAllCameras', { 
			params: { 
				cameraName: camera
				}
			}
		);
		setPhotoData(res.data.content.photos);
	}

  useEffect(() => {
    fetchPhoto('FHAZ');
  }, []);

  if (!photoData) return <div />;

  return (
    <>
    <Navigation />
    <div className="nasa-photo">
			<ul>
				{cameras.map((camera, i) => 
					<li key={i} onClick={() => fetchPhoto(camera)}>{camera}</li>
				)}
			</ul>
			<div className="nasa-photo-list">
				{photoData.map(photo => 
					<img key={photo.id} src={photo.img_src}></img>
				)}
			</div>
    </div>
    </>
  );
}