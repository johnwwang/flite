import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import React from "react";

class ChatSidebar extends React.Component {
  //* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
  //   dropdown = document.getElementsByClassName("dropdown-btn");

  //   for (i = 0, i < dropdown.length, i = i+1) {
  //   dropdown[i].addEventListener("click", function() {
  //       this.classList.toggle("active");
  //       var dropdownContent = this.nextElementSibling;
  //       if (dropdownContent.style.display === "block") {
  //           dropdownContent.style.display = "none";
  //       } else {
  //           dropdownContent.style.display = "block";
  //       }
  //       }
  //     }

  render() {
    return (
      <div class="sidenav">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>
        <button class="dropdown-btn">
          Dropdown
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
        <a href="#contact">Search</a>
      </div>
    );
  }
}
export default ChatSidebar;
