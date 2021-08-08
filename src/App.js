import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router} from "react-router-dom";
import SearchBar from "./SearchBar";
import Nav from "./Nav";
import OverallStats from "./OverallStats";
import Tabs from "./Tabs";


function App() {
  const [data, setData] = useState({empty: true});

  const childToParent = (childdata) => {
    setData(childdata);
  }
  
  return (
    <Router>
      <>
        <Nav />
        <SearchBar />
        <OverallStats childToParent={childToParent}/>
        <Tabs res={data}/>
        </>
    </Router>
  );
}

export default App;
