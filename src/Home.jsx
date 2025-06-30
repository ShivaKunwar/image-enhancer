// src/components/Home.jsx
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import ImagePreview from './ImagePreview';
import { getImageApi } from './getImageApi';

const Home = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhanceImage, setEnhanceImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const showImageHandler = async (file) => {
    setUploadImage(URL.createObjectURL(file));
    setLoading(true);
    try {
      const imageUrl = await getImageApi(file);
      setEnhanceImage(imageUrl);
    } catch (error) {
      console.log("Error found", error);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!enhanceImage) return;

    const link = document.createElement('a');
    link.href = enhanceImage.image; // if enhanceImage = { image: "https://..." }
    link.download = 'enhanced-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <h1>Image Enhancer using AI</h1>
      <ImageUpload showImageHandler={showImageHandler} />

      {/* Loader */}
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Enhancing image... please wait</p>
        </div>
      )}

     
      <ImagePreview
        uploadImage={uploadImage}
        enhanceImage={enhanceImage?.image}
      />

    
      {!loading && enhanceImage && (
        <button onClick={handleDownload}>Download Image</button>
      )}
    </div>
  );
};

export default Home;
