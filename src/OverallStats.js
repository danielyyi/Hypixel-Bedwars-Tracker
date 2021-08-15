import React, { useEffect, useState } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";

const key = process.env.REACT_APP_API_KEY;
const f = new Intl.NumberFormat('en')

function OverallStats({ childToParent }) {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const profile = searchParams.get("profile");
  useEffect(() => {
    if (profile !== null) {
      
      ConnectMojang(profile);
    }
  }, []);


  //show error messages
  const [invalidName, invalidNameShow] = useState(false);
  const [frequentName, frequentNameShow] = useState(false);
  const [noData, noDataShow] = useState(false);

  const [info, infoShow] = useState(false);

  const [state, setState] = useState(
    {
      wins: 0,
      losses: 0,
      winRate: 0,
      kills: 0,
      deaths: 0,
      kd: 0,
      bedsLost: 0,
      bedsBroken: 0,
      gamesPlayed: 0,
      displayName: "",
      uuid: "",
      finalKills: 0,
      finalDeaths: 0,
      fkfd: 0
    },
    []
  );

  function updateState(stats) {
    setState(
      {
        ...state,
        wins: stats.wins,
        losses: stats.losses,
        winRate: stats.winRate,
        kills: stats.kills,
        deaths: stats.deaths,
        kd: stats.kd,
        bedsLost: stats.bedsLost,
        bedsBroken: stats.bedsBroken,
        gamesPlayed: stats.gamesPlayed,
        displayName: stats.displayName,
        uuid: stats.uuid,
        finalKills: stats.finalKills,
        finalDeaths: stats.finalDeaths,
        fkfd: stats.fkfd
      },
      []
    );
  }
  async function ConnectMojang(profile) {
    try {
      const rawRes = await fetch(
        `https://playerdb.co/api/player/minecraft/${profile}`
      );
      const res = await rawRes.json();
      if(res.data.player == undefined){
        invalidNameShow(true);
      }
      else{
        ConnectAPI(res.data.player.raw_id);
      }

    } catch (e) {
      console.log(e);
    }
  }


  async function ConnectAPI(uuid) {
    try {
      const rawRes = await fetch(`/.netlify/functions/fetch-hypixel?uuid=${uuid}`)
      const res = await rawRes.json();
      if (res.success === true && res.player == null) {
        invalidNameShow(true);
      } else if (
        res.success === false &&
        res.cause === "You have already looked up this name recently"
      ) {
        frequentNameShow(true);
      } else {
        if (res.player.stats.Bedwars == null) {
          noDataShow(true);
        } else {
          infoShow(true);
          childToParent(res);
          getBedwarsData(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getBedwarsData(res) {
    //overall stats
    const wins = res.player.stats.Bedwars.wins_bedwars;
    const losses = res.player.stats.Bedwars.losses_bedwars;
    const winRate =
      Math.round(
        (100 * res.player.stats.Bedwars.wins_bedwars) /
          res.player.stats.Bedwars.games_played_bedwars
      );
    const kills = res.player.stats.Bedwars.kills_bedwars;
    const deaths = res.player.stats.Bedwars.deaths_bedwars;
    const kd =
      Math.round(
        (100 * res.player.stats.Bedwars.kills_bedwars) /
          res.player.stats.Bedwars.deaths_bedwars
      ) / 100;
    const bedsBroken = res.player.stats.Bedwars.beds_broken_bedwars;
    const bedsLost = res.player.stats.Bedwars.beds_lost_bedwars;
    const gamesPlayed = res.player.stats.Bedwars.games_played_bedwars;
    const displayName = res.player.displayname;
    const uuid = res.player.uuid;
    const finalKills = res.player.stats.Bedwars.final_kills_bedwars;
    const finalDeaths = res.player.stats.Bedwars.final_deaths_bedwars;
    const fkfd = Math.round(100* (res.player.stats.Bedwars.final_kills_bedwars/res.player.stats.Bedwars.final_deaths_bedwars))/100
    const stats = {
      wins,
      losses,
      winRate,
      kills,
      deaths,
      kd,
      bedsBroken,
      bedsLost,
      gamesPlayed,
      displayName,
      uuid,
      finalKills,
      finalDeaths,
      fkfd,
    };
    updateState(stats);
  }

  return (
    <div>
      <div className="infoWrapper" id="infoWrapper">
        <div>
          {invalidName ? (
            <div className="error-text">Invalid player name.</div>
          ) : null}
          {noData ? (
            <div className="error-text">
              The player you looked up does not have any Bedwars data.
            </div>
          ) : null}
          {frequentName ? (
            <div className="error-text">
              Please wait a bit before searching another name.
            </div>
          ) : null}
        </div>
      </div>
      {info ? (
        <div id="infoVisible">
          <div className="infoWrapper">
            
          <img
                  alt="playerhead"
                  src={`https://minotar.net/helm/${state.uuid}/100.png`}
                  className="player-head"
                />
          </div>
          <div className="infoWrapper" id="infoWrapper">
            
            <div className="infoName" id="infoName">
              
              <div className="name">{state.displayName}'s Bedwars Stats</div>
            </div>
          </div>
          <div className="infoWrapper" id="infoWrapper">
            <div className="infoOverallStats" id="infoOverallStats">
              <ul className="overall-ul">
                <li>
                  <div className="overallStat" style={{ color: "lime" }}>
                    Wins
                  </div>
                  <div className="oStatValue" id="wins">
                    {f.format(state.wins)}
                  </div>
                </li>
                <li>
                  <div className="overallStat" style={{ color: "red" }}>
                    Losses
                  </div>
                  <div className="oStatValue">{f.format(state.losses)}</div>
                </li>
                <li>
                  <div className="overallStat" style={{ color: "lime" }}>
                    Kills
                  </div>
                  <div className="oStatValue">{f.format(state.kills)}</div>
                </li>
                <li>
                  <div className="overallStat" style={{ color: "red" }}>
                    Deaths
                  </div>
                  <div className="oStatValue">{f.format(state.deaths)}</div>
                </li>
                <li>
                  <div className="overallStat" style={{ color: "lime" }}>
                    Beds Broken
                  </div>
                  <div className="oStatValue">{f.format(state.bedsBroken)}</div>
                </li>
                <li>
                  <div className="overallStat" style={{ color: "red" }}>
                    Beds Lost
                  </div>
                  <div className="oStatValue">{f.format(state.bedsLost)}</div>
                </li>
                <li>
                  <div className="overallStat" style={{ color: "lime" }}>
                    Final Kills
                  </div>
                  <div className="oStatValue">{f.format(state.finalKills)}</div>
                </li>
                <li>
                  <div className="overallStat" style={{ color: "red" }}>
                    Final Deaths
                  </div>
                  <div className="oStatValue">{f.format(state.finalDeaths)}</div>
                </li>
                <li>
                  <div className="overallStat">Win Rate</div>
                  <div className="oStatValue">{state.winRate}%</div>
                </li>
                <li>
                  <div className="overallStat">KD</div>
                  <div className="oStatValue">{state.kd}</div>
                </li>
                <li>
                  <div className="overallStat">FKFD</div>
                  <div className="oStatValue">{state.fkfd}</div>
                </li>
                <li>
                  <div className="overallStat">Games Played</div>
                  <div className="oStatValue">{f.format(state.gamesPlayed)}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default OverallStats;
