import { useState } from "react";
import Swal from "sweetalert2";
const useHandleCopyMessage = () => {
  const [response, setResponse] = useState<any>("");

  const handleCopyMessage = async (text: string) => {
    try {
      const response = await navigator.clipboard.writeText(text);
      setResponse(response);
      Swal.fire({
        title: "Copied to clipboard!",
        icon: "success",
        confirmButtonColor: "#a7c1a8",
      });
    } catch (error) {
      setResponse(error);
    }
  };

  return { response, handleCopyMessage };
};

export default useHandleCopyMessage;
