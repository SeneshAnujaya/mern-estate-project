import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  

  useEffect(() => {
    if(file) {
      setUploadError(null);
      setUploadProgress(0);
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/upload`;
    const uploadPreset = "real-state-profile-upload";

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(url, formDataUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted)
        }
      });
      
      setFormData((prev) => ({
        ...prev,
        avatar: response.data.secure_url
      }))
     
      
    } catch (error) {
      console.log('Error uploading file to Cloudinary: ',error);
      setUploadError('Failed to upload image. Please try again!')
      setUploadProgress(0);
    }
  }


  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <div className="mt-3 text-center">
          {uploadProgress > 0 && uploadProgress < 100 ? (<p>{`Uploading ${uploadProgress}%`}</p>) : uploadProgress === 100 ? (<p className="text-green-700">Image successfully uploaded!</p>) : ('')}
          {uploadError && <p className="text-red-700">{uploadError}</p>}
        </div>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
