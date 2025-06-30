// src/components/Home.jsx
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import ImagePreview from './ImagePreview';
import { getImageApi } from './getImageApi';

const Home = () => {
    const [uploadImage, setUploadImage]=useState(null);
    const [enhanceImage, setEnhanceImage] = useState(null)
    

const showImageHandler= async (file)=>{
    console.log(URL.createObjectURL(file))
    setUploadImage(URL.createObjectURL(file))
 try {
  const imageUrl=await getImageApi(file);
  setEnhanceImage(imageUrl);
 } catch (error) {
  console.log("error found", error)
 }
}
const handleDownload = () => {
  if (!enhanceImage) return;

  const link = document.createElement('a');
  link.href = enhanceImage.image; // assuming enhanceImage is an object like { image: "https://..." }
  link.download = 'enhanced-image.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (

    <div className="container">
      <h1>Image Enhancer using AI</h1>
      <ImageUpload showImageHandler={showImageHandler} />
      <ImagePreview uploadImage={uploadImage} enhanceImage={enhanceImage?.image} />

      {/* <button>Download Image</button> */}
      {enhanceImage && (
  <button onClick={handleDownload}>Download Image</button>
)}

    </div>
  );
};

export default Home;

