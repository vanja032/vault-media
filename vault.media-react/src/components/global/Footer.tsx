import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-center align-items-center p-5 mt-4 footer">
      <div className="col-lg-6 d-flex align-items-center">
        <Link
          href="/"
          className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
        >
          <Image
            src="/assets/media/vault-logo-white.png"
            className="footer-logo"
          />
        </Link>
        <span className="mb-3 mb-md-0 text-body-secondary footer-highlight">
          © 2023 HG Software Group. All rights reserved.
        </span>
      </div>

      <ul className="nav col-lg-6 justify-content-end list-unstyled d-flex">
        <li>
          <Link className="text-body-secondary" href="#">
            <FaFacebookF className="footer-icons" />
          </Link>
        </li>
        <li className="ms-3">
          <Link className="text-body-secondary" href="#">
            <FaInstagram className="footer-icons" />
          </Link>
        </li>
        <li className="ms-3">
          <Link className="text-body-secondary" href="#">
            <FaGithub className="footer-icons" />
          </Link>
        </li>
        <li className="ms-3">
          <Link className="text-body-secondary " href="#">
            <FaLinkedinIn className="footer-icons" />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
