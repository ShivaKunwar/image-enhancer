// src/components/ImageUpload.jsx
import React from 'react';

const ImageUpload = ({showImageHandler}) => {
    const showImage = (e)=>{

        const file=e.target.files[0]
        showImageHandler(file)
      
    }
  return (
    <div className="upload-section">
      <h2>Upload Image</h2>
      <input type="file" onChange={showImage} />
    </div>
  );
};

export default ImageUpload;
