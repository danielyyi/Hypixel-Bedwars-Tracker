import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router} from "react-router-dom";
import SearchBar from "./SearchBar";

import OverallStats from "./OverallStats";
import Tabs from "./Tabs";
import Nav from "./Nav";
import Footer from "./Footer";
import HomeStats from "./HomeStats";


function App() {
//helps pass data from overall stats to tabs
  const [data, setData] = useState({ empty: true });
  const childToParent = (childdata) => {
    setData(childdata);
  };



  return (
    <Router>
      
        <Nav />
        <SearchBar />
        <HomeStats />
        <OverallStats type="module" childToParent={childToParent} />
        <Tabs res={data} />
        <Footer />
  
    </Router>
  );
}

export default App;
