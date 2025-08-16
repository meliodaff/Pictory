import axios from "axios";
import { useRef, useState } from "react";

const useHandleFileChange = (
  setPreview: (url: string) => void,
  setShowLoadingMessage: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileRef.current?.click(); // simulate file click
    console.log(fileRef);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log(file);

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG and JPG images are allowed.");
      e.target.value = ""; // clear the input
      return;
    }

    // file is valid
    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);

    const formData = new FormData();

    formData.append("image", file);

    setLoading(true);
    const timer = setTimeout(() => {
      setShowLoadingMessage(true);
    }, 5000);
    try {
      const response = await axios.post(
        "/api/",
        // "http://13.213.34.139:3000",
        // "https://api-pictory.onrender.com",
        // "http://localhost:3000",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setResponse(response.data.message);
    } catch (error) {
      setResponse("Server error, Contact the author to fix it");
      console.log(error);
    }
    console.log(timer);
    setLoading(false);
    clearTimeout(timer);
    setShowLoadingMessage(false);

    console.log("Selected file:", file.name);
  };

  return { handleFileChange, response, loading, openFileDialog, fileRef };
};

export default useHandleFileChange;
