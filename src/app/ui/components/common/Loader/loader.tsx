import React from "react";
import "./style.css";

function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="sun">
        <div className="center"></div>
        <div className="ray r-1"></div>
        <div className="ray r-2"></div>
        <div className="ray r-3"></div>
        <div className="ray r-4"></div>
        <div className="ray r-5"></div>
        <div className="ray r-6"></div>
        <div className="ray r-7"></div>
        <div className="ray r-8"></div>
      </div>
    </div>
  );
}

export default Loader;
