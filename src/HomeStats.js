import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
const f = new Intl.NumberFormat('en')
//handles info shown before username is searched. Right now it is just the player count
function HomeStats() {
  const key = process.env.REACT_APP_API_KEY;
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const profile = searchParams.get("profile");
  useEffect(() => {
    if (profile == null) {
      ConnectAPI();
    }
  }, []);

  const [info, infoShow] = useState(false);
  const [state, setState] = useState(
    {
      bwPlayerCount: 0,
      bwPlayerPercent: 0,
    },
    []
  );

  function updateState(count) {
    setState(
      {
        bwPlayerCount: count.games.BEDWARS.players,
        bwPlayerPercent: Math.round(
          100 * (count.games.BEDWARS.players / count.playerCount)
        ),
      },
      []
    );
  }

  //connects to hypixel api via netlify functions
  async function ConnectAPI() {
    try {
      //const rawRes = await fetch(`/.netlify/functions/fetch-count`);
      //const count = await rawRes.json();

      const rawRes = await fetch(`https://api.hypixel.net/counts?key=${key}`)
      const count = await rawRes.json()

      updateState(count);
      infoShow(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {info ? (
        <>
          <div className="home-stat-wrapper">
            <div className="home-stat-card">
              Current Bedwars Player Count:{" "}
              <span style={{ color: "lime" }}>{f.format(state.bwPlayerCount)}</span>{" "}
              Players ({state.bwPlayerPercent}%)
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default HomeStats;
