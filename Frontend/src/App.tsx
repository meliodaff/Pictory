import { useState } from "react";
import Header from "./components/Header";
import useHandleFileChange from "./services/handleFileChange";
import Loading from "./components/Loading";

function App() {
  const [imagePreview, setImagePreview] = useState<string>("");
  const { handleFileChange, response, loading } =
    useHandleFileChange(setImagePreview);
  // this function validates the user input, only images are allowed

  return (
    <>
      <Header />
      <main>
        <section className="first-section" id="first-section">
          <div className="first-section-container">
            <h2>Generate Story!</h2>
            <div className="file-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                placeholder="Place an image"
              />
              <div className="generated-columns">
                {imagePreview && (
                  <>
                    <img className="image-preview" src={imagePreview} />
                    <div className="story-container">
                      {!loading ? (
                        <div className="loading-container">
                          <Loading />
                          <p>
                            If the waiting time is too long, kindly contact the
                            author. The server might be inactive as i am only
                            hosted in a free server
                          </p>
                        </div>
                      ) : (
                        response
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
                  Pictory is a creative web tool that transforms your images
                  into vivid, emotionally-driven short stories. Just upload any
                  picture, and watch as it generates a unique 3–5 sentence
                  narrative inspired by the visual details, mood, and context of
                  the image. Whether you're looking to enhance your content,
                  spark inspiration, or simply have fun, Pictory brings your
                  visuals to life with meaningful storytelling powered by AI.
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
