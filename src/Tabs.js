import { useState } from "react";
import "./App.css";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Specifics
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Graphs
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <div className="stat-cards-holder">
          <div className="stat-card">
            <h3>1v8</h3>
            <div className="stat-card-info">
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                  <li><div className="stat-card-header">Wins</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Kills</div><div className="stat-card-value">321</div></li>
                  <li><div className="stat-card-header">Beds Broken</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Final Kills</div><div className="stat-card-value">123</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Losses</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">Deaths</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Beds Lost</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Final Deaths</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Win Rate</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">KD</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Games Played</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Other Stat</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <h3>2v8</h3>
            <div className="stat-card-info">
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                  <li><div className="stat-card-header">Wins</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Kills</div><div className="stat-card-value">321</div></li>
                  <li><div className="stat-card-header">Beds Broken</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Final Kills</div><div className="stat-card-value">123</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Losses</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">Deaths</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Beds Lost</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Final Deaths</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Win Rate</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">KD</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Games Played</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Other Stat</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <h3>3v4</h3>
            <div className="stat-card-info">
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                  <li><div className="stat-card-header">Wins</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Kills</div><div className="stat-card-value">321</div></li>
                  <li><div className="stat-card-header">Beds Broken</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Final Kills</div><div className="stat-card-value">123</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Losses</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">Deaths</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Beds Lost</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Final Deaths</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Win Rate</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">KD</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Games Played</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Other Stat</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <h3>4v4</h3>
            <div className="stat-card-info">
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                  <li><div className="stat-card-header">Wins</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Kills</div><div className="stat-card-value">321</div></li>
                  <li><div className="stat-card-header">Beds Broken</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Final Kills</div><div className="stat-card-value">123</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Losses</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">Deaths</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Beds Lost</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Final Deaths</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Win Rate</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">KD</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Games Played</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Other Stat</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <h3>4v2</h3>
            <div className="stat-card-info">
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                  <li><div className="stat-card-header">Wins</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Kills</div><div className="stat-card-value">321</div></li>
                  <li><div className="stat-card-header">Beds Broken</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Final Kills</div><div className="stat-card-value">123</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Losses</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">Deaths</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Beds Lost</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Final Deaths</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Win Rate</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">KD</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Games Played</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Other Stat</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <h3>4v4 Rush</h3>
            <div className="stat-card-info">
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                  <li><div className="stat-card-header">Wins</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Kills</div><div className="stat-card-value">321</div></li>
                  <li><div className="stat-card-header">Beds Broken</div><div className="stat-card-value">123</div></li>
                  <li><div className="stat-card-header">Final Kills</div><div className="stat-card-value">123</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Losses</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">Deaths</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Beds Lost</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Final Deaths</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
              <div className="stat-card-column">
                <ul className="stat-card-ul">
                <li><div className="stat-card-header">Win Rate</div><div className="stat-card-value">231</div></li>
                <li><div className="stat-card-header">KD</div><div className="stat-card-value">213</div></li>
                <li><div className="stat-card-header">Games Played</div><div className="stat-card-value">312</div></li>
                <li><div className="stat-card-header">Other Stat</div><div className="stat-card-value">231</div></li>
                </ul>
              </div>
            </div>
          </div>
          </div>
        </div>
        

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Content 2</h2>


        </div>


      </div>
    </div>
  );
}

export default Tabs;