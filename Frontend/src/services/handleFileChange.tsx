import axios from "axios";
import { useState } from "react";

const useHandleFileChange = (setPreview: (url: string) => void) => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
    try {
      const response = await axios.post(
        "https://api-pictory.onrender.com",
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
    setLoading(false);
    console.log("Selected file:", file.name);
  };

  return { handleFileChange, response, loading };
};

export default useHandleFileChange;
