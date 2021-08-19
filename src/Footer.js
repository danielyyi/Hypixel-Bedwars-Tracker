import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
//handles the footer
function Footer() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const profile = searchParams.get("profile");
  useEffect(() => {
    if (profile == null) {
      setEmptySpace("500px");
    }
  }, []);
  const [emptySpace, setEmptySpace] = useState("3100px");

  const emptyStyle = {
    height: emptySpace,
  };
  
  return (
    <div>
      <div style={emptyStyle}></div>
      <div className="footer">
        <div className="footer-contact">Not affiliated with Hypixel</div>
        <a
          className="footer-contact"
          href="https://github.com/danielyyi/Hypixel-Bedwars-Tracker"
        >
          <img
            className="github-logo"
            src="https://www.shareicon.net/data/2016/06/20/606964_github_4096x4096.png"
            alt="github logo"
          ></img>
        </a>
        <div className="footer-copyright">2021 © Daniel Yi</div>
      </div>
    </div>
  );
}

export default Footer;
