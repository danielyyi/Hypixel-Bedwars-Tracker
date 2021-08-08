import { useState, useEffect } from "react";
import "./App.css";

function Tabs({ res }) {

  
  useEffect(() => {
      if (res.success == true) {
        console.log("calling assign data")
          assignData(res)
      }
      else{
        console.log("res hasnt changed yet")
      }
 
},[res])
  
const [state, setState] = useState({
  One: [0,0,0,0,0,0,0,0,0,0,0],
  Two: [0,0,0,0,0,0,0,0,0,0,0],
  Three: [0,0,0,0,0,0,0,0,0,0,0],
  Four: [0,0,0,0,0,0,0,0,0,0,0]
}, []);

function updateState(stats) {
  console.log("Updating State....")
  setState({
      ...state,
      One: stats.one_statsArray,
      Two: stats.two_statsArray,
      Three: stats.three_statsArray,
      Four: stats.four_statsArray
  }, [])
}



  const assignData = (res) => {
    const gamemodesArray = ["wins", "losses", "kills", "deaths", "beds_broken", "beds_lost", "final_kills", "final_deaths", "games_played", "winRate", "kd", "winstreak"]
    const one_statsArray = []
    const two_statsArray = []
    const three_statsArray = []
    const four_statsArray = []
    try {
      for (let i = 0; i < gamemodesArray.length; i++) {
        if (i === 9) {
          one_statsArray[i] = Math.round(100 * (res.player.stats.Bedwars[`eight_one_${gamemodesArray[0]}_bedwars`]) / (res.player.stats.Bedwars[`eight_one_${gamemodesArray[8]}_bedwars`])) / 100
          two_statsArray[i] = Math.round(100 * (res.player.stats.Bedwars[`eight_two_${gamemodesArray[0]}_bedwars`]) / (res.player.stats.Bedwars[`eight_two_${gamemodesArray[8]}_bedwars`])) / 100
          three_statsArray[i] = Math.round(100 * (res.player.stats.Bedwars[`four_three_${gamemodesArray[0]}_bedwars`]) / (res.player.stats.Bedwars[`four_three_${gamemodesArray[8]}_bedwars`])) / 100
          four_statsArray[i] = Math.round(100 * (res.player.stats.Bedwars[`four_four_${gamemodesArray[0]}_bedwars`]) / (res.player.stats.Bedwars[`four_four_${gamemodesArray[8]}_bedwars`])) / 100
        } 
        else if (i === 10) {
          one_statsArray[i] = Math.round(100 * (res.player.stats.Bedwars[`eight_one_${gamemodesArray[2]}_bedwars`]) / (res.player.stats.Bedwars[`eight_one_${gamemodesArray[3]}_bedwars`])) / 100
          two_statsArray[i] = Math.round(100 * (res.player.stats.Bedwars[`eight_two_${gamemodesArray[2]}_bedwars`]) / (res.player.stats.Bedwars[`eight_two_${gamemodesArray[3]}_bedwars`])) / 100
          three_statsArray[i] = Math.round(100 * (res.player.stats.Bedwars[`four_three_${gamemodesArray[2]}_bedwars`]) / (res.player.stats.Bedwars[`four_three_${gamemodesArray[3]}_bedwars`])) / 100
          four_statsArray[i] = Math.round(100 * (res.player.stats.Bedwars[`four_four_${gamemodesArray[2]}_bedwars`]) / (res.player.stats.Bedwars[`four_four_${gamemodesArray[3]}_bedwars`])) / 100
        }
        else if (i === 11) {
          one_statsArray[i] = res.player.stats.Bedwars[`eight_one_${gamemodesArray[i]}`]
          two_statsArray[i] = res.player.stats.Bedwars[`eight_two_${gamemodesArray[i]}`]
          three_statsArray[i] = res.player.stats.Bedwars[`four_three_${gamemodesArray[i]}`]
          four_statsArray[i] = res.player.stats.Bedwars[`four_four_${gamemodesArray[i]}`]
        }
        else {
          one_statsArray[i] = res.player.stats.Bedwars[`eight_one_${gamemodesArray[i]}_bedwars`]
          two_statsArray[i] = res.player.stats.Bedwars[`eight_two_${gamemodesArray[i]}_bedwars`]
          three_statsArray[i] = res.player.stats.Bedwars[`four_three_${gamemodesArray[i]}_bedwars`]
          four_statsArray[i] = res.player.stats.Bedwars[`four_four_${gamemodesArray[i]}_bedwars`]
        }
      }
    } catch (e) {
      console.log(e)
    }
    console.log("calling Update")
    const stats = { one_statsArray, two_statsArray, three_statsArray, four_statsArray}
    updateState(stats)

  }



  //handles which tabs panel is currently shown
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  //----------------------------------------------------
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
                    <li><div className="stat-card-header">Wins</div><div className="stat-card-value">{state.One[0]}</div></li>
                    <li><div className="stat-card-header">Kills</div><div className="stat-card-value">{state.One[2]}</div></li>
                    <li><div className="stat-card-header">Beds Broken</div><div className="stat-card-value">{state.One[4]}</div></li>
                    <li><div className="stat-card-header">Final Kills</div><div className="stat-card-value">{state.One[6]}</div></li>
                  </ul>
                </div>
                <div className="stat-card-column">
                  <ul className="stat-card-ul">
                    <li><div className="stat-card-header">Losses</div><div className="stat-card-value">{state.One[1]}</div></li>
                    <li><div className="stat-card-header">Deaths</div><div className="stat-card-value">{state.One[3]}</div></li>
                    <li><div className="stat-card-header">Beds Lost</div><div className="stat-card-value">{state.One[5]}</div></li>
                    <li><div className="stat-card-header">Final Deaths</div><div className="stat-card-value">{state.One[7]}</div></li>
                  </ul>
                </div>
                <div className="stat-card-column">
                  <ul className="stat-card-ul">
                    <li><div className="stat-card-header">Win Rate</div><div className="stat-card-value">{state.One[9]}</div></li>
                    <li><div className="stat-card-header">KD</div><div className="stat-card-value">{state.One[10]}</div></li>
                    <li><div className="stat-card-header">Games Played</div><div className="stat-card-value">{state.One[8]}</div></li>
                    <li><div className="stat-card-header">Winstreak</div><div className="stat-card-value">{state.One[11]}</div></li>
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