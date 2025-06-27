import { useState } from "react";
import Header from "./components/Header";
import useHandleFileChange from "./services/handleFileChange";
import Loading from "./components/Loading";
import useHandleCopyMessage from "./services/handleCopyMessage";

function App() {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showLoadingMessage, setShowLoadingMessage] = useState<boolean>(false);

  // this function validates the user input, only images are allowed
  const { handleFileChange, response, loading, openFileDialog, fileRef } =
    useHandleFileChange(setImagePreview, setShowLoadingMessage);

  const { response: responseForHandleCopyMessage, handleCopyMessage } =
    useHandleCopyMessage();

  const loadingMessage = () => {
    return (
      <p>
        If the waiting time is too long, kindly contact the author. The server
        might be inactive as i am only hosted in a free server
      </p>
    );
  };

  return (
    <>
      <Header />
      <main>
        <section className="first-section" id="first-section">
          <div className="first-section-container">
            <h2>Generate Story!</h2>
            <div className="file-container">
              {/* <FileUploader setImagePreview={setImagePreview} />
               */}
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              <button
                onClick={openFileDialog}
                className={`upload-image-button ${loading && "isDisabled"}`}
                disabled={loading}
              >
                Upload Image
              </button>
              <div className="generated-columns">
                {imagePreview && (
                  <>
                    <img className="image-preview" src={imagePreview} />
                    <div className="story-container">
                      {loading ? (
                        <div className="loading-container">
                          <Loading />
                          {showLoadingMessage && loadingMessage()}
                        </div>
                      ) : (
                        <>
                          {response}
                          {response.trim() !== "Re-upload the image." || response.trim() !== "Server error, Contact the author to fix it" && (
                            <button
                              onClick={() => {
                                handleCopyMessage(response);
                                console.log(responseForHandleCopyMessage);
                                alert("Caption saved in the clipboard");
                              }}
                            >
                              Copy
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="second-section" id="second-section">
          <div className="second-section-container">
            <div className="even-columns">
              <div>
                <h2>Make a caption for it!</h2>
              </div>
              <div>
                <p>
                  Pictory is a fun and user-friendly web app that turns your
                  images into witty, casual captions that sound just like
                  something you'd post yourself. Whether you're sharing a funny
                  moment, a chill selfie, or something totally random, Pictory
                  helps you find the perfect words — lighthearted, a little
                  sarcastic, and always relatable. It's like having a
                  caption-savvy friend in your pocket.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="third-section" id="third-section">
          <div className="third-section-container">
            <h1>Jv Bialen</h1>
            <img src="me.jpg" className="author-photo" />
            <div className="socials-container">
              <a
                href="https://www.linkedin.com/in/jv-bialen-905b8a32b/"
                target="blank"
              >
                <img
                  src="linkedin.png"
                  alt="linkedin logo"
                  className="linkedin-logo"
                />
              </a>
              <a href="https://github.com/meliodaff" target="blank">
                <img
                  src="github.png"
                  alt="github logo"
                  className="github-logo"
                />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
