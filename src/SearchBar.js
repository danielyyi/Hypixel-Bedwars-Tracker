import React from "react";
import "./App.css";


function SearchBar() {
    return (
        <body>
            <h2 className="box">Find Stats</h2>
                <div className="box">
                    
                    <form id="SearchForm">
                        <input type="text" id="TextInput" placeholder="Minecraft Username..." name="profile" />
                        <button id="enter">Enter</button>
                    </form>
                </div>
        </body>
    );
}
export default SearchBar;
