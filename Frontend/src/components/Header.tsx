const Header = () => {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="header-columns">
            <h1 className="header-left-section">Pictory</h1>
            <nav className="header-right-section">
              <a href="#first-section">Home</a>
              <a href="#second-section">About</a>
              <a href="#third-section">Author</a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
