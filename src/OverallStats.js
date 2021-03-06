import React, { useEffect, useState } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const key = process.env.REACT_APP_API_KEY;
const f = new Intl.NumberFormat("en");

function OverallStats({ childToParent }) {
  //gets search query
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const profile = searchParams.get("profile");

  //show error messages/loading
  const [invalidName, invalidNameShow] = useState(false);
  const [frequentName, frequentNameShow] = useState(false);
  const [noData, noDataShow] = useState(false);
  const [wentWrong, wentWrongShow] = useState(false);
  const [loading, loadingShow] = useState(false);

  const [info, infoShow] = useState(false);

  useEffect(() => {
    if (profile !== null) {
      ConnectMojang(profile);
    }
  }, []);

  //handles the change of overall stats
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
      fkfd: 0,
      stars: 0,
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
        fkfd: stats.fkfd,
        stars: stats.stars,
      },
      []
    );
  }

  //converts player name to uuid by calling playerdb api
  async function ConnectMojang(profile) {
    try {
      const rawRes = await fetch(
        `https://playerdb.co/api/player/minecraft/${profile}`
      );
      const res = await rawRes.json();
      if (res.data.player == undefined) {
        invalidNameShow(true);
      } else {
        loadingShow(true);
        ConnectAPI(res.data.player.raw_id);
      }
    } catch (e) {
      console.log(e);
    }
  }
  //calls the netlify lambda function to connect to hypixel api
  async function ConnectAPI(uuid) {
    try {
      const rawRes = await fetch(`/.netlify/functions/fetch-hypixel?uuid=${uuid}`)
      const res = await rawRes.json()
      //const rawRes = await fetch(`https://api.hypixel.net/player?key=${key}&uuid=${uuid}`);
      //const res = await rawRes.json();
      console.log(res);
      if (res == undefined) {
        loadingShow(false);
        wentWrongShow(true);
      } else if (res.success === true && res.player == null) {
        loadingShow(false);
        invalidNameShow(true);
      } else if (
        res.success === false &&
        res.cause === "You have already looked up this name recently"
      ) {
        loadingShow(false);
        frequentNameShow(true);
      } else {
        if (res.player.stats.Bedwars == null) {
          loadingShow(false);
          noDataShow(true);
        } else {
          loadingShow(false);
          infoShow(true);
          childToParent(res);
          getBedwarsData(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  //assigns api data to variables
  function getBedwarsData(res) {
    //overall stats
    const wins = res.player.stats.Bedwars.wins_bedwars;
    const losses = res.player.stats.Bedwars.losses_bedwars;
    const winRate = Math.round(
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
    const fkfd =
      Math.round(
        100 *
          (res.player.stats.Bedwars.final_kills_bedwars /
            res.player.stats.Bedwars.final_deaths_bedwars)
      ) / 100;
    const stars = res.player.achievements.bedwars_level;
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
      stars,
    };
    updateState(stats);
  }


  return (
    <div>
      <div className="info-wrapper" id="info-wrapper">
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
          {wentWrong ? (
            <div className="error-text">Something went wrong :(</div>
          ) : null}
          {loading ? (
            <div className="error-text" style={{ color: "white" }}>
              Loading stats...
            </div>
          ) : null}
        </div>
      </div>
      {info ? (
        <>
          <div className="info-wrapper" id="info-wrapper">
            <div className="info-name" id="info-name">
              <div className="name">{state.displayName}'s Bedwars Stats</div>
            </div>
          </div>
          <div className="info-wrapper" id="info-wrapper">

          <div className="view-card">
            <div>
              <div className="info-wrapper">
                <img
                  alt="playerhead"
                  src={`https://minotar.net/armor/body/${state.uuid}/100.png`}
                  className="player-head"
                />
              </div>
              <div className="info-wrapper">
                <div className="star">
                  {state.stars}
                  <FontAwesomeIcon icon={faStar} />
                </div>
              </div>
            </div>
            </div>

            <div className="ovr-card">
              <div className="ovr-card-title">Overall</div>
              <div className="ovr-card-info">
                <div className="ovr-card-column">
                  <ul className="ovr-card-ul">
                    <li>
                      <div
                        className="ovr-card-header"
                        style={{ color: "lime" }}
                      >
                        Wins
                      </div>
                      <div className="ovr-card-value">{f.format(state.wins)}</div>
                    </li>
                    <li>
                      <div
                        className="ovr-card-header"
                        style={{ color: "lime" }}
                      >
                        Kills
                      </div>
                      <div className="ovr-card-value">{f.format(state.kills)}</div>
                    </li>
                    <li>
                      <div
                        className="ovr-card-header"
                        style={{ color: "lime" }}
                      >
                        Beds Broken
                      </div>
                      <div className="ovr-card-value">{f.format(state.bedsBroken)}</div>
                    </li>
                    <li>
                      <div
                        className="ovr-card-header"
                        style={{ color: "lime" }}
                      >
                        Final Kills
                      </div>
                      <div className="ovr-card-value">{f.format(state.finalKills)}</div>
                    </li>
                  </ul>
                </div>
                <div className="ovr-card-column">
                  <ul className="ovr-card-ul">
                    <li>
                      <div className="ovr-card-header" style={{ color: "red" }}>
                        Losses
                      </div>
                      <div className="ovr-card-value">{f.format(state.losses)}</div>
                    </li>
                    <li>
                      <div className="ovr-card-header" style={{ color: "red" }}>
                        Deaths
                      </div>
                      <div className="ovr-card-value">{f.format(state.deaths)}</div>
                    </li>
                    <li>
                      <div className="ovr-card-header" style={{ color: "red" }}>
                        Beds Lost
                      </div>
                      <div className="ovr-card-value">{f.format(state.bedsLost)}</div>
                    </li>
                    <li>
                      <div className="ovr-card-header" style={{ color: "red" }}>
                        Final Deaths
                      </div>
                      <div className="ovr-card-value">{f.format(state.finalDeaths)}</div>
                    </li>
                  </ul>
                </div>
                <div className="ovr-card-column">
                  <ul className="ovr-card-ul">
                    <li>
                      <div className="ovr-card-header">Win Rate</div>
                      <div className="ovr-card-value">{f.format(state.winRate)}%</div>
                    </li>
                    <li>
                      <div className="ovr-card-header">KD</div>
                      <div className="ovr-card-value">{f.format(state.kd)}</div>
                    </li>
                    <li>
                      <div className="ovr-card-header">FKDR</div>
                      <div className="ovr-card-value">{f.format(state.fkfd)}</div>
                    </li>
                    <li>
                      <div className="ovr-card-header">Games Played</div>
                      <div className="ovr-card-value">{f.format(state.gamesPlayed)}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default OverallStats;
