import React from "react";

interface Page {
  name: string;
}

const Navbar = ({ name }: Page) => {
  return (
    <nav className="navbar navbar-dark bg-body-tertiary p-4 navbar-expand-lg px-5">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <div className="row">
            <div className="col">
              <img
                src="assets/media/vault-logo.png"
                alt=""
                className="d-inline-block align-text-top navbar-logo"
              />
            </div>
            <div
              className="col navbar-text"
              style={{ display: "flex", alignItems: "center" }}
            >
              Vault Multi Media
            </div>
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-content"
          aria-controls="navbar-content"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse my-4 my-lg-0"
          id="navbar-content"
        >
          <div className="navbar-nav ms-lg-auto mb-2 mb-lg-0 row justify-content-end">
            <div className="nav-item col">
              <a
                className={
                  "nav-link " + (name == "home" ? "nav-link-active" : "")
                }
                aria-current="page"
                href="/"
              >
                Home page
              </a>
            </div>
            <div className="nav-item col">
              <a
                className={
                  "nav-link " + (name == "mp3" ? "nav-link-active" : "")
                }
                href="/mp3fetch"
              >
                MP3 Downloader
              </a>
            </div>
            <div className="nav-item col">
              <a
                className={
                  "nav-link " + (name == "mp4" ? "nav-link-active" : "")
                }
                href="/mp4fetch"
              >
                MP4 Downloader
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
