import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { FaFacebook, FaYoutube } from "react-icons/fa6";
import { PiXLogoBold } from "react-icons/pi";
import { AuthContext } from "./Context/AuthContext";

const Footer = () => {
  const { name } = useContext(AuthContext);
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
      <aside>
        {/* The Image will come out of it's bg and it's intentional */}
        <div className="bg-base-200 rounded-full">
          <img src={logo} className="w-30" alt="" />
        </div>
        <p className="font-bold text-2xl">
          Root Rhythm
          <br />
          <span className="text-sm font-semibold">Helping you since 2023</span>
        </p>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved By{" "}
          <a href="https://github.com/ShaharearSabbir" className="text-yellow-500 hover:font-bold" target="_blank">
            {name}
          </a>
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://x.com/Shaharear_" target="_blank">
            <PiXLogoBold size={30} />
          </a>
          <a href="https://www.youtube.com/@oddshaharear3609" target="_blank">
            <FaYoutube size={30}></FaYoutube>
          </a>
          <a href="https://www.facebook.com/odd.otaku" target="_blank">
            <FaFacebook size={30}></FaFacebook>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
