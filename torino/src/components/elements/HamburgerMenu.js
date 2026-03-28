import React from "react";

function HamburgerMenu({ isOpen, onToggle }) {
  return (
    <div className="md:hidden">
      <button
        onClick={onToggle}
        type="button"
        className={`${isOpen ? "open" : ""} z-40 block hamburger md:hidden focus:outline-none`}
      >
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </button>
    </div>
  );
}

export default HamburgerMenu;
