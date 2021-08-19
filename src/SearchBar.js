import React from "react";
import "./App.css";
//handles the search bar
function SearchBar() {
  return (
    <div>
      
      <h2 className="box">Find Stats</h2>
      
      <div className="box">
        
        <form id="SearchForm">
          <input
            type="text"
            id="TextInput"
            placeholder="Minecraft Username..."
            name="profile"
          />
          <button id="enter">Enter</button>
        </form>
        
      </div>
    </div>
  );
}
export default SearchBar;
