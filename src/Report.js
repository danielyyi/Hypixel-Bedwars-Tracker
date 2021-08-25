import { defaults } from "chart.js";
import React, { useEffect, useState } from "react";
import "./App.css";

function Report({ res }) {
  useEffect(() => {
    if (res.success === true) {
      writeReport(res);
    }
  }, [res]);

  const [state, setState] = useState(
    {
      name: "",
      mp: "sqauds",
      rating: "novice",
      winrate: "",
      bestgamemode: "",
      fillers: [],
      wingamemode: "",
      author: "",
      strength: '',
      weakness: ''
    },
    []
  );
  function updateState(stats) {
    setState(
      {
        ...state,
        name: stats.name,
        mp: stats.mp,
        rating: stats.rating,
        winrate: stats.winrate,
        bestgamemode: stats.bestgamemode,
        fillers: stats.fillers,
        wingamemode: stats.wingamemode,
        author: stats.author,
        strength: stats.strength,
        weakness: stats.weakness
      },
      []
    );
  }

  async function writeReport(res) {
    const bwdata = res.player.stats.Bedwars;
    const name = res.player.displayname;
    const mp = findMP(bwdata);
    const rating = assignRating(res.player.achievements.bedwars_level);
    const winrate = assignWinRating(bwdata);
    const bestgamemode = findBestPerform(bwdata);
    const wingamemode = findWinGamemode(bwdata);
    const fillers = assignFillers(wingamemode, bestgamemode, mp);
    const author = pickAuthor();
    const strength = findStrength(bwdata, mp);
    const weakness = findWeakness(bwdata, mp);
    const stats = {
      name,
      mp,
      rating,
      winrate,
      bestgamemode,
      fillers,
      wingamemode,
      author,
      strength,
      weakness,
    };

    updateState(stats);
  }
  function findStrength(data) {
    const bb = (data.beds_broken_bedwars / data.games_played_bedwars) * 2
    const fk = (data.final_kills_bedwars / data.games_played_bedwars) * 1
    const k =(data.kills_bedwars / data.games_played_bedwars) * .5
    const max = Math.max(bb , fk, k);
    switch (max) {
      case bb:
       return "breaking opposing teams' beds"
     
      case fk:
        return "getting final kills"
       
      case k:
        return "getting non-final kills"
    }

  }

  function findWeakness(data) {
    const bb = (data.beds_broken_bedwars / data.games_played_bedwars) * 2
    const fk = (data.final_kills_bedwars / data.games_played_bedwars) * 1
    const k =(data.kills_bedwars / data.games_played_bedwars) * .5
    const min = Math.min(bb , fk, k);
    switch (min) {
      case bb:
       return "they could be better at breaking beds"
     
      case fk:
        return "they could be better at getting more final kills"
       
      case k:
        return "they dont get a lot of non-final kills"
    }

  }
  function pickAuthor() {
    return " - Sun Tzu, 𝘈𝘳𝘵 𝘰𝘧 𝘞𝘢𝘳";
  }

  function findWinGamemode(data) {
    let solos =
      data.eight_one_wins_bedwars / data.eight_one_games_played_bedwars;
    let duos =
      data.eight_two_wins_bedwars / data.eight_two_games_played_bedwars;
    let trios =
      data.four_three_wins_bedwars / data.four_three_games_played_bedwars;
    let squads =
      data.four_four_wins_bedwars / data.four_four_games_played_bedwars;

    if (solos != solos) {
      solos = 0;
    }
    if (duos != duos) {
      duos = 0;
    }
    if (trios != trios) {
      trios = 0;
    }
    if (squads != squads) {
      squads = 0;
    }

    const best = Math.max(solos, duos, trios, squads);

    switch (best) {
      case solos:
        return "Solos";
      case duos:
        return "Duos";
      case trios:
        return "Trios";
      case squads:
        return "Squads";
    }
  }

  function assignFillers(wins, best, loved) {
    const fillers = [];
    if (wins == best) {
      fillers[0] =
        "which makes sense, as they appear to perform the best while playing";
    } else {
      fillers[0] = "but appears to perform the best while playing";
    }

    if (loved == best) {
      fillers[1] = "Not suprisingly,";
    } else {
      fillers[1] = "Despite this,";
    }

    return fillers;
  }

  function findBestPerform(data) {
    //for each gamemode: add the fk/dr + bb/lr
    let solos =
      data.eight_one_final_kills_bedwars / data.eight_one_final_deaths_bedwars +
      data.eight_one_beds_broken_bedwars / data.eight_one_beds_lost_bedwars +
      data.eight_one_kills_bedwars / data.eight_one_deaths_bedwars;

    let duos =
      data.eight_two_final_kills_bedwars / data.eight_two_final_deaths_bedwars +
      data.eight_two_beds_broken_bedwars / data.eight_two_beds_lost_bedwars +
      data.eight_two_kills_bedwars / data.eight_two_deaths_bedwars;

    let trios =
      data.four_three_final_kills_bedwars /
        data.four_three_final_deaths_bedwars +
      data.four_three_beds_broken_bedwars / data.four_three_beds_lost_bedwars +
      data.four_three_kills_bedwars / data.four_three_deaths_bedwars;

    let squads =
      data.four_four_final_kills_bedwars / data.four_four_final_deaths_bedwars +
      data.four_four_beds_broken_bedwars / data.four_four_beds_lost_bedwars +
      data.four_four_kills_bedwars / data.four_four_deaths_bedwars;

    if (solos != solos) {
      solos = 0;
    }
    if (duos != duos) {
      duos = 0;
    }
    if (trios != trios) {
      trios = 0;
    }
    if (squads != squads) {
      squads = 0;
    }

    const best = Math.max(solos, duos, trios, squads);

    switch (best) {
      case solos:
        return "Solos";
      case duos:
        return "Duos";
      case trios:
        return "Trios";
      case squads:
        return "Squads";
    }
  }

  function assignWinRating(data) {
    const winRate = data.wins_bedwars / data.games_played_bedwars;
    if (winRate < 0.1) {
      return "does not win very often, but im sure they have fun";
    } else {
      if (winRate < 0.3) {
        return "wins a fair amount of their games";
      } else {
        if (winRate < 0.6) {
          return "wins quite a lot of their games";
        } else {
          if (winRate < 0.9) {
            return "wins a vast majority of their games";
          } else {
            return "barely loses..";
          }
        }
      }
    }
  }

  function assignRating(stars) {
    if (stars < 10) {
      return "novice";
    } else {
      if (stars < 100) {
        return "an intermediate";
      } else {
        if (stars < 500) {
          return "a seasoned";
        } else {
          if (stars < 1000) {
            return "an experienced";
          } else {
            if (stars < 1500) {
              return "a masterful";
            } else {
              return "a legendary";
            }
          }
        }
      }
    }
  }

  function findMP(data) {
    const mostPlayed = Math.max(
      data.eight_one_games_played_bedwars,
      data.eight_two_games_played_bedwars,
      data.four_three_games_played_bedwars,
      data.four_four_games_played_bedwars
    );

    switch (mostPlayed) {
      case data.four_four_games_played_bedwars:
        return "Squads";
      case data.eight_one_games_played_bedwars:
        return "Solos";
      case data.eight_two_games_played_bedwars:
        return "Duos";
      case data.four_three_games_played_bedwars:
        return "Trios";
    }
  }

  return (
    <div className="pr-card-holder">
      <div className="pr-card">
        <div className="pr-text">{`"${state.name} is ${state.rating} Bedwars player, who ${state.winrate}. 
  This person wins most frequently when playing ${state.wingamemode}, ${state.fillers[0]} ${state.bestgamemode}. 
  ${state.fillers[1]} they seem to enjoy playing ${state.mp} the most. In terms of overall stats, ${state.name}'s greatest strength is 
   ${state.strength}, but ${state.weakness}."`}</div>

 
          <div className="author">{state.author}</div>
        </div>
      </div>
   
  );
}

export default Report;
