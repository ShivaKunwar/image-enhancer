import axios from "axios";

// const API_Key="wxjcphu82pxgry20k";
const API_Key="wxf1doo1qf7zxdxyz";

const Base_URL="https://techhk.aoscdn.com"

export const getImageApi = async (file)=>{
    try {
        const task_id= await uploadImg(file);
        console.log("Task Id found",task_id)


        const fetchEnhancedData=await poolEnhancedImage(task_id)
        console.log("fetchEnhaced data found", fetchEnhancedData)

        return fetchEnhancedData;


    } catch (error) {
        console.log("error calling Api", error)
    }
}


const uploadImg= async (file)=>{
    const formData= new FormData();
    formData.append("image_file",file);

   const {data} =  await axios.post(
        `${Base_URL}/api/tasks/visual/scale`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-API-KEY": API_Key,
            }
        }
    );

    console.log("data found successfully", data)
    return data.data.task_id;
    // return data?.data?.task_id;
}

const fetchEnhanced=async (task_id)=>{
          
   const {data} =  await axios.get(
        `${Base_URL}/api/tasks/visual/scale/${task_id}`,
       
        {
            headers: {
                "X-API-KEY": API_Key,
            }
        }
    );
    return data.data;
}



const poolEnhancedImage=async (task_id, retries=0)=>{
 const result= await fetchEnhanced(task_id);

 if(result.state === 4){
  console.log("Processing...");
 


  if(retries >=20){
    throw new Error("Max retries reached .. Try again later..")
 }

 await new Promise((resolve)=>{
  setTimeout(resolve, 2000)
 })



 return poolEnhancedImage(task_id, retries+1)
}
return result;

}


// {status: 200, message: 'success', data: {…}}
// data
// : 
// task_id
// : 
// "f51dce24-f92c-4e55-86c3-7665bda37a2e"
// [[Prototype]]
// : 
// Object
// message
// : w
// "success"
// status
// : 
// 200
// [[Prototype]]
// : 
// Object





// import axios from "axios";

// const API_Key = "wxjcphu82pxgry20k";
// const Base_URL = "https://techhk.aoscdn.com";

// // Upload image and get task_id
// const uploadImg = async (file) => {
//   const formData = new FormData();
//   formData.append("image_file", file);

//   const { data } = await axios.post(
//     `${Base_URL}/api/tasks/visual/scale`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         "X-API-KEY": API_Key,
//       },
//     }
//   );

//   return data.data.task_id;
// };

// // Check once if enhanced image is ready
// export const getEnhancedImageOnce = async (task_id) => {
//   const { data } = await axios.get(
//     `${Base_URL}/api/tasks/visual/scale/${task_id}`,
//     {
//       headers: {
//         "X-API-KEY": API_Key,
//       },
//     }
//   );

//   if (data.data.status === 4) {
//     return data.image;
//   } else {
//     throw new Error("Image not ready yet. Try again in a few seconds.");
//   }
// };

// // Main function to upload and get enhanced image
// export const getImageApi = async (file) => {
//   try {
//     const task_id = await uploadImg(file);
//     console.log("Task ID:", task_id);

//     // Wait 8 seconds before checking
//     await new Promise((resolve) => setTimeout(resolve, 8000));

//     const imageUrl = await getEnhancedImageOnce(task_id);
//     console.log("Enhanced Image URL:", imageUrl);

//     return {imageUrl,task_id};
//   } catch (error) {
//     console.log("API Error:", error);
//   }
// };
