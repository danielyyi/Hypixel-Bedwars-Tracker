import { useState, useEffect, useLocation } from "react";
import "./App.css";
import { Bar, Pie, Radar, defaults } from "react-chartjs-2";

defaults.color = "#cdcdcd";
defaults.font.family = 'Ubuntu'
defaults.font.size = 12
defaults.plugins.tooltip.intersect = true;
const f = new Intl.NumberFormat('en')


function Tabs({ res }) {
  useEffect(() => {
    if (res.success === true) {
      assignData(res);
    }
  }, [res]);


 

  //compiles data for "# of resources by gamemode" chart
  const [resourcesChartData, setResourcesChartData] = useState({});
  const updateResourcesChartData = (resourcesArray) => {
    setResourcesChartData({
      labels: ["Solos", "Duos", "3v3v3v3", "4v4v4v4"],
      datasets: [
        {
          label: "Iron",
          backgroundColor: "gray",
          data: [
            resourcesArray[0][0],
            resourcesArray[1][0],
            resourcesArray[2][0],
            resourcesArray[3][0],
          ],
        },
        {
          label: "Gold",
          backgroundColor: "yellow",
          data: [
            resourcesArray[0][1],
            resourcesArray[1][1],
            resourcesArray[2][1],
            resourcesArray[3][1],
          ],
        },
        {
          label: "Diamond",
          backgroundColor: "aqua",
          data: [
            resourcesArray[0][2],
            resourcesArray[1][2],
            resourcesArray[2][2],
            resourcesArray[3][2],
          ],
        },
        {
          label: "Emerald",
          backgroundColor: "lime",
          data: [
            resourcesArray[0][3],
            resourcesArray[1][3],
            resourcesArray[2][3],
            resourcesArray[3][3],
          ],
        },
      ],
    });
  };
  //compiles data for "types of kills" chart
  const [killTypesChartData, setKillTypesChartData] = useState({});
  const updateKillTypesChartData = (bedwars) => {
    setKillTypesChartData({
      labels: ["Player Attack", "Void", "Fall"],
      datasets: [
        {
          data: [
            bedwars.entity_attack_kills_bedwars,
            bedwars.void_kills_bedwars,
            bedwars.fall_kills_bedwars,
          ],
          backgroundColor: ["rgb(231, 29, 54)", "rgb(148, 75, 187)", "#065143"],
          hoverOffset: 4,
        },
      ],
    });
  };
  const [deathTypesChartData, setDeathTypesChartData] = useState({});
  const updateDeathTypesChartData = (bedwars) => {
    setDeathTypesChartData({
      labels: ["Player Attack", "Void", "Fall"],
      datasets: [
        {
          data: [
            bedwars.entity_attack_deaths_bedwars,
            bedwars.void_deaths_bedwars,
            bedwars.fall_deaths_bedwars,
          ],
          backgroundColor: ["rgb(231, 29, 54)", "rgb(148, 75, 187)", "#065143"],
          hoverOffset: 4,
        },
      ],
    });
  };
  //compiles data for "stats per gamemode" chart
  const [statsPerGameChartData, setStatsPerGameChartData] = useState({});
  const updateStatsPerGameChartData = (stats) => {
    setStatsPerGameChartData({
      labels: [
        "Beds Broken",
        "Beds Lost",
        "Kills",
        "Deaths",
        "Final Kills",
        "Final Deaths",
      ],
      datasets: [
        {
          label: "Solos",
          data: [
            stats.one_statsArray[4] / stats.one_statsArray[8],
            stats.one_statsArray[5] / stats.one_statsArray[8],
            stats.one_statsArray[2] / stats.one_statsArray[8],
            stats.one_statsArray[3] / stats.one_statsArray[8],
            stats.one_statsArray[6] / stats.one_statsArray[8],
            stats.one_statsArray[7] / stats.one_statsArray[8],
          ],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBorderColor: "white",
        },
        {
          label: "Duos",
          data: [
            stats.two_statsArray[4] / stats.two_statsArray[8],
            stats.two_statsArray[5] / stats.two_statsArray[8],
            stats.two_statsArray[2] / stats.two_statsArray[8],
            stats.two_statsArray[3] / stats.two_statsArray[8],
            stats.two_statsArray[6] / stats.two_statsArray[8],
            stats.two_statsArray[7] / stats.two_statsArray[8],
          ],
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBorderColor: "white",
        },
        {
          label: "3v3v3v3",
          data: [
            stats.three_statsArray[4] / stats.three_statsArray[8],
            stats.three_statsArray[5] / stats.three_statsArray[8],
            stats.three_statsArray[2] / stats.three_statsArray[8],
            stats.three_statsArray[3] / stats.three_statsArray[8],
            stats.three_statsArray[6] / stats.three_statsArray[8],
            stats.three_statsArray[7] / stats.three_statsArray[8],
          ],
          fill: true,
          backgroundColor: "rgba(28, 255, 0, .2)",
          borderColor: "rgb(28, 255, 0)",
          pointBorderColor: "white",
        },
        {
          label: "4v4v4v4",
          data: [
            stats.four_statsArray[4] / stats.four_statsArray[8],
            stats.four_statsArray[5] / stats.four_statsArray[8],
            stats.four_statsArray[2] / stats.four_statsArray[8],
            stats.four_statsArray[3] / stats.four_statsArray[8],
            stats.four_statsArray[6] / stats.four_statsArray[8],
            stats.four_statsArray[7] / stats.four_statsArray[8],
          ],
          fill: true,
          backgroundColor: "rgba(255, 253, 0, .2)",
          borderColor: "rgb(255, 253, 0",
          pointBorderColor: "white",
        },
      ],
    });
  };

  const [ratiosChartData, setRatiosChartData] = useState({});
  const updateRatiosChartData = (stats) => {
    setRatiosChartData({
      labels: ["Solos", "Duos", "3v3v3v3", "4v4v4v4"],
      datasets: [
        {
          label: "Kill/Death Ratio",
          backgroundColor: "#e71d36",
          data: [
            stats.one_statsArray[10],
            stats.two_statsArray[10],
            stats.three_statsArray[10],
            stats.four_statsArray[10],
          ],
        },
        {
          label: "Beds Broken/Beds Lost Ratio",
          backgroundColor: "#2ec4b6",
          data: [
            stats.one_statsArray[4] / stats.one_statsArray[5],
            stats.two_statsArray[4] / stats.two_statsArray[5],
            stats.three_statsArray[4] / stats.three_statsArray[5],
            stats.four_statsArray[4] / stats.four_statsArray[5],
          ],
        },
        {
          label: "FK/FD Ratio",
          backgroundColor: "#ff9f1c",
          data: [
            stats.one_statsArray[11] ,
            stats.two_statsArray[11] ,
            stats.three_statsArray[11] ,
            stats.four_statsArray[11] ,
          ],
        },
      ],
    });
  };

  const [coinsState, setCoinsState] = useState({
    coins: 0,
    experience: 0,
  });
  const updateCoinsState = (coins, xp) => {
    setCoinsState({
      coins: coins,
      experience: xp,
    });
  };
  //used to toggle things from hidden to shown
  const [info, infoShow] = useState(false);
  //compiles data for the 1v8, 2v8, 3v4, 4v4 player cards

  
  const [state, setState] = useState(
    {
      One: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Two: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Three: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Four: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    []
  );
  function updateState(stats) {
    setState(
      {
        ...state,
        One: stats.one_statsArray,
        Two: stats.two_statsArray,
        Three: stats.three_statsArray,
        Four: stats.four_statsArray,
      },
      []
    );
  }

  const statsArray = [
    "wins",
    "losses",
    "kills",
    "deaths",
    "beds_broken",
    "beds_lost",
    "final_kills",
    "final_deaths",
    "games_played",
    "winRate",
    "kd",
    "fkdr",
  ];
  const gamemodesArray = ["eight_one", "eight_two", "four_three", "four_four"];
  const specificStatsArray = [[], [], [], []];

  const assignData = (res) => {
    try {
      for (let k = 0; k < specificStatsArray.length; k++) {
        let currentGamemode = specificStatsArray[k];

        for (let i = 0; i < statsArray.length; i++) {
          if (i === 9) {
            if (
              res.player.stats.Bedwars[
                `${gamemodesArray[k]}_${statsArray[0]}_bedwars`
              ] !== undefined
            ) {
              currentGamemode[i] =
                Math.round(100*(Math.round(
                  (100 *
                    res.player.stats.Bedwars[
                      `${gamemodesArray[k]}_${statsArray[0]}_bedwars`
                    ]) /
                    res.player.stats.Bedwars[
                      `${gamemodesArray[k]}_${statsArray[8]}_bedwars`
                    ]
                ) / 100));
            } else {
              currentGamemode[i] = 0;
            }
          } else if (i === 10) {
            if (
              res.player.stats.Bedwars[
                `${gamemodesArray[k]}_${statsArray[2]}_bedwars`
              ] !== undefined
            ) {
              currentGamemode[i] =
                Math.round(
                  (100 *
                    res.player.stats.Bedwars[
                      `${gamemodesArray[k]}_${statsArray[2]}_bedwars`
                    ]) /
                    res.player.stats.Bedwars[
                      `${gamemodesArray[k]}_${statsArray[3]}_bedwars`
                    ]
                ) / 100;
            } else {
              currentGamemode[i] = 0;
            }
          } 
           else if (i === 11) {
            if (
              res.player.stats.Bedwars[
                `${gamemodesArray[k]}_${statsArray[6]}_bedwars`
              ] !== undefined
            ) {
              currentGamemode[i] =
              Math.round(
                  (100 *
                    res.player.stats.Bedwars[
                      `${gamemodesArray[k]}_${statsArray[6]}_bedwars`
                    ]) /
                    res.player.stats.Bedwars[
                      `${gamemodesArray[k]}_${statsArray[7]}_bedwars`
                    ]
                ) / 100;
            } else {
              currentGamemode[i] = 0;
            }}else {
            if (
              res.player.stats.Bedwars[
                `${gamemodesArray[k]}_${statsArray[i]}_bedwars`
              ] !== undefined
            ) {
              currentGamemode[i] =
              res.player.stats.Bedwars[
                  `${gamemodesArray[k]}_${statsArray[i]}_bedwars`
                ];
            } else {
              currentGamemode[i] = 0;
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    const experience = res.player.stats.Bedwars.Experience;
    const coins = res.player.stats.Bedwars.coins;
    updateCoinsState(coins, experience);
    const one_statsArray = specificStatsArray[0];
    const two_statsArray = specificStatsArray[1];
    const three_statsArray = specificStatsArray[2];
    const four_statsArray = specificStatsArray[3];

    updateKillTypesChartData(res.player.stats.Bedwars);
    updateDeathTypesChartData(res.player.stats.Bedwars);
    const stats = {
      one_statsArray,
      two_statsArray,
      three_statsArray,
      four_statsArray,
    };
    assignResourceChart(res.player.stats.Bedwars);
    updateRatiosChartData(stats);
    updateStatsPerGameChartData(stats);
    updateState(stats);
    infoShow(true);
  };
  const ingotsArray = ["iron", "gold", "diamond", "emerald"];
  const resourcesArray = [[], [], [], []];
  const assignResourceChart = (bedwars) => {
    try {
      for (let k = 0; k < gamemodesArray.length; k++) {
        for (let i = 0; i < ingotsArray.length; i++) {
          if (
            bedwars[
              `${gamemodesArray[k]}_${ingotsArray[i]}_resources_collected_bedwars`
            ] !== undefined
          ) {
            resourcesArray[k][i] =
              bedwars[
                `${gamemodesArray[k]}_${ingotsArray[i]}_resources_collected_bedwars`
              ];
          } else {
            resourcesArray[k][i] = 0;
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    updateResourcesChartData(resourcesArray);
  };

  //handles which tabs panel is currently shown
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  //----------------------------------------------------
  return (
    <div>
      <div className="container">
        {info ? (
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
        ) : null}
        {info ? (
          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              <div className="stat-cards-holder">
                <div className="coins-exp">
                  <div className="coins-exp-item">
                    Coins:{" "}
                    <span style={{ color: "lime" }}>{f.format(coinsState.coins)}</span>
                  </div>
                  <div className="coins-exp-item">
                    Experience:{" "}
                    <span style={{ color: "lime" }}>
                      {f.format(coinsState.experience)}
                    </span>
                  </div>
                </div>
                <div className="stat-card">
                <div className= "stat-card-title">Solos</div>
                  <div className="stat-card-info">
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Wins
                          </div>
                          <div className="stat-card-value">{f.format(state.One[0])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Kills
                          </div>
                          <div className="stat-card-value">{f.format(state.One[2])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Beds Broken
                          </div>
                          <div className="stat-card-value">{f.format(state.One[4])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Final Kills
                          </div>
                          <div className="stat-card-value">{f.format(state.One[6])}</div>
                        </li>
                      </ul>
                    </div>
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Losses
                          </div>
                          <div className="stat-card-value">{f.format(state.One[1])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Deaths
                          </div>
                          <div className="stat-card-value">{f.format(state.One[3])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Beds Lost
                          </div>
                          <div className="stat-card-value">{f.format(state.One[5])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Final Deaths
                          </div>
                          <div className="stat-card-value">{f.format(state.One[7])}</div>
                        </li>
                      </ul>
                    </div>
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div className="stat-card-header">Win Rate</div>
                          <div className="stat-card-value">{state.One[9]}%</div>
                        </li>
                        <li>
                          <div className="stat-card-header">KD</div>
                          <div className="stat-card-value">{state.One[10]}</div>
                        </li>
                        <li>
                          <div className="stat-card-header">FKFD</div>
                          <div className="stat-card-value">{state.One[11]}</div>
                        </li>
                        <li>
                          <div className="stat-card-header">Games Played</div>
                          <div className="stat-card-value">{f.format(state.One[8])}</div>
                        </li>
                        
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                <div className= "stat-card-title">Duos</div>
                  <div className="stat-card-info">
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Wins
                          </div>
                          <div className="stat-card-value">{f.format(state.Two[0])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Kills
                          </div>
                          <div className="stat-card-value">{f.format(state.Two[2])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Beds Broken
                          </div>
                          <div className="stat-card-value">{f.format(state.Two[4])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Final Kills
                          </div>
                          <div className="stat-card-value">{f.format(state.Two[6])}</div>
                        </li>
                      </ul>
                    </div>
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Losses
                          </div>
                          <div className="stat-card-value">{f.format(state.Two[1])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Deaths
                          </div>
                          <div className="stat-card-value">{f.format(state.Two[3])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Beds Lost
                          </div>
                          <div className="stat-card-value">{f.format(state.Two[5])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Final Deaths
                          </div>
                          <div className="stat-card-value">{f.format(state.Two[7])}</div>
                        </li>
                      </ul>
                    </div>
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div className="stat-card-header">Win Rate</div>
                          <div className="stat-card-value">{state.Two[9]}%</div>
                        </li>
                        <li>
                          <div className="stat-card-header">KD</div>
                          <div className="stat-card-value">{state.Two[10]}</div>
                        </li>
                        <li>
                          <div className="stat-card-header">FKFD</div>
                          <div className="stat-card-value">{state.Two[11]}</div>
                        </li>
                        <li>
                          <div className="stat-card-header">Games Played</div>
                          <div className="stat-card-value">{f.format(state.Two[8])}</div>
                        </li>
                        
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                <div className= "stat-card-title">3v3v3v3</div>
                  <div className="stat-card-info">
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Wins
                          </div>
                          <div className="stat-card-value">
                            {f.format(state.Three[0])}
                          </div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Kills
                          </div>
                          <div className="stat-card-value">
                            {f.format(state.Three[2])}
                          </div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Beds Broken
                          </div>
                          <div className="stat-card-value">
                            {f.format(state.Three[4])}
                          </div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Final Kills
                          </div>
                          <div className="stat-card-value">
                            {f.format(state.Three[6])}
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Losses
                          </div>
                          <div className="stat-card-value">
                            {f.format(state.Three[1])}
                          </div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Deaths
                          </div>
                          <div className="stat-card-value">
                            {f.format(state.Three[3])}
                          </div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Beds Lost
                          </div>
                          <div className="stat-card-value">
                            {f.format(state.Three[5])}
                          </div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Final Deaths
                          </div>
                          <div className="stat-card-value">
                            {f.format(state.Three[7])}
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div className="stat-card-header">Win Rate</div>
                          <div className="stat-card-value">
                            {state.Three[9]}%
                          </div>
                        </li>
                        <li>
                          <div className="stat-card-header">KD</div>
                          <div className="stat-card-value">
                            {state.Three[10]}
                          </div>
                        </li>
                        <li>
                          <div className="stat-card-header">FKFD</div>
                          <div className="stat-card-value">
                            {state.Three[11]}
                          </div>
                        </li>
                        <li>
                          <div className="stat-card-header">Games Played</div>
                          <div className="stat-card-value">
                            {f.format(state.Three[8])}
                          </div>
                        </li>
                       
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className= "stat-card-title">4v4v4v4</div>
                  <div className="stat-card-info">
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Wins
                          </div>
                          <div className="stat-card-value">{f.format(state.Four[0])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Kills
                          </div>
                          <div className="stat-card-value">{f.format(state.Four[2])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Beds Broken
                          </div>
                          <div className="stat-card-value">{f.format(state.Four[4])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "lime" }}
                          >
                            Final Kills
                          </div>
                          <div className="stat-card-value">{f.format(state.Four[6])}</div>
                        </li>
                      </ul>
                    </div>
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Losses
                          </div>
                          <div className="stat-card-value">{f.format(state.Four[1])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Deaths
                          </div>
                          <div className="stat-card-value">{f.format(state.Four[3])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Beds Lost
                          </div>
                          <div className="stat-card-value">{f.format(state.Four[5])}</div>
                        </li>
                        <li>
                          <div
                            className="stat-card-header"
                            style={{ color: "red" }}
                          >
                            Final Deaths
                          </div>
                          <div className="stat-card-value">{f.format(state.Four[7])}</div>
                        </li>
                      </ul>
                    </div>
                    <div className="stat-card-column">
                      <ul className="stat-card-ul">
                        <li>
                          <div className="stat-card-header">Win Rate</div>
                          <div className="stat-card-value">{state.Four[9]}%</div>
                        </li>
                        <li>
                          <div className="stat-card-header">KD</div>
                          <div className="stat-card-value">
                            {state.Four[10]}
                          </div>
                        </li>
                        <li>
                          <div className="stat-card-header">FKDR</div>
                          <div className="stat-card-value">
                            {state.Four[11]}
                          </div>
                        </li>
                        <li>
                          <div className="stat-card-header">Games Played</div>
                          <div className="stat-card-value">{f.format(state.Four[8])}</div>
                        </li>
                        
                        
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="coming-soon">Dream Modes Coming Soon...</div>
              </div>
            </div>
            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <div className="stat-cards-holder">
              <div className="coming-soon" >*Tap on the legend keys to focus on certain stats or gamemodes in a graph</div>
                <div className="radar-graph-card">
                  <h3 id="chart-header">Stats per Game</h3>
                  <Radar
                    data={statsPerGameChartData}
                    options={{
                      scales: {
                        r: {
                          ticks: {
                            showLabelBackdrop: false,
                            font: {
                              size: 15,
                            },
                          },
                          angleLines: {
                            color: "rgba(255, 255, 255, .3)",
                          },
                          grid: {
                            color: "rgba(255, 255, 255, .3)",
                          },
                          pointLabels: {
                            font:{
                              size:12
                            }
                          }
                        },
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
                <div className="bar-graph-card">
                  <h3 id="chart-header">
                    # of Resources Collected by Gamemode
                  </h3>
                  <Bar
                    data={resourcesChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        title: {
                          display: false,
                          text: "# of Resources Collected by Gamemode",
                        },
                      },
                    }}
                  />
                </div>
                <div className="bar-graph-card">
                  <h3 id="chart-header">
                    K/D, BB/BL, and FK/FD by Gamemode
                  </h3>
                  <Bar
                    data={ratiosChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
                <div className="bar-graph-card">
                  <h3 id="chart-header">Types of Kills by Amount</h3>
                  <Pie
                    data={killTypesChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
                <div className="bar-graph-card">
                  <h3 id="chart-header">Types of Deaths by Amount</h3>
                  <Pie
                    data={deathTypesChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
                <div className="coming-soon">More Graphs Coming Soon...</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tabs;
