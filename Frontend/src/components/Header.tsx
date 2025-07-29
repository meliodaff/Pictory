import Swal from "sweetalert2";
const Header = () => {
  const handleQRCode = () => {
    Swal.fire({
      imageUrl: "/qrcode.png",
      imageWidth: "400px",
      imageHeight: "400px",
      title: "Thank you!",
      imageAlt: "Gcash QR Code",
      confirmButtonColor: "#a7c1a8",
      backdrop: `
        url("/cat-space.gif")
      `,
    });
  };
  return (
    <>
      <header>
        <div className="header-container">
          <div className="header-columns">
            <h1 className="header-left-section">
              <a href="#first-section">Pictory</a>
            </h1>
            <nav className="header-right-section">
              <a href="#first-section">Home</a>
              <a href="#second-section">About</a>
              <a href="#third-section">Author</a>
              <a href="#" onClick={handleQRCode}>
                Buy me a coffee
              </a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
