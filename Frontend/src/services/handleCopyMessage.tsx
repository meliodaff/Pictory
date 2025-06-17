import { useState } from "react";

const useHandleCopyMessage = () => {
  const [response, setResponse] = useState<any>("");

  const handleCopyMessage = async (text: string) => {
    try {
      const response = await navigator.clipboard.writeText(text);
      setResponse(response);
    } catch (error) {
      setResponse(error);
    }
  };

  return { response, handleCopyMessage };
};

export default useHandleCopyMessage;
