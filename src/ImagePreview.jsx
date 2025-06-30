// src/components/ImagePreview.jsx
import React from 'react';

const ImagePreview = ({uploadImage, enhanceImage}) => {
  return (
    <div className="preview-section">
      <div className="image-box">
        <h3>Uploaded Image</h3>
        
        {uploadImage ? (<img src={uploadImage} alt="" />):
        <div className="image-placeholder">No image uploaded.</div>
        
        }
        
        
      </div>
      <div className="image-box">
        <h3>Enhanced Image</h3>
        {enhanceImage? <img src={enhanceImage} alt="" />:
        <div className="image-placeholder">No enhancement yet.</div>
        
        }
        
      </div>
    </div>
  );
};

export default ImagePreview;

