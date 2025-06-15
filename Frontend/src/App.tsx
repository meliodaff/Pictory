import { useState } from "react";
import Header from "./components/Header";
import useHandleFileChange from "./services/handleFileChange";

function App() {
  const [imagePreview, setImagePreview] = useState<string>("");
  const { handleFileChange, response, loading } =
    useHandleFileChange(setImagePreview);
  // this function validates the user input, only images are allowed

  return (
    <>
      <Header />
      <main>
        <section className="first-section">
          <div className="first-section-container">
            <h2>Generate Story!</h2>
            <div className="file-container">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <div className="generated-columns">
                {imagePreview && (
                  <>
                    <img className="image-preview" src={imagePreview} />
                    <div className="story-container">
                      {loading ? "Loading..." : response}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
