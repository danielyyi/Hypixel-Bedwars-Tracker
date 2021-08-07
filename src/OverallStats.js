import React, { useEffect, useState } from "react";
import "./App.css";
import { useLocation } from 'react-router-dom'

const key = process.env.REACT_APP_API_KEY

function OverallStats() {
    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)
    const profile = searchParams.get('profile')
    useEffect(() => {
        if (profile !== null) {
            ConnectAPI(profile)
        }
    }, [])

    const [invalidName, invalidNameShow] = useState(false)
    const [frequentName, frequentNameShow] = useState(false)
    const [info, infoShow] = useState(false)

    const [state, setState] = useState({
        wins: 0,
        losses: 0,
        winRate: 0,
        kills: 0,
        deaths: 0,
        kd: 0,
        bedsLost: 0,
        bedsBroken: 0,
        gamesPlayed: 0,
        displayName: '',
        uuid:''
    });

    function updateState(stats) {
        setState({
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
            uuid: stats.uuid
        })
    }

    async function ConnectAPI(profile) {

        try {
            const rawRes = await fetch(`https://api.hypixel.net/player?key=${key}&name=${profile}`)
            const res = await rawRes.json()
            console.log(res)
            if (res.success == true && res.player == null) {
                invalidNameShow(true)
            }
            else if (res.success == false && res.cause === "You have already looked up this name recently") {
                frequentNameShow(true)
            }
            else {
                infoShow(true)
                getBedwarsData(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function getBedwarsData(res) {
        //overall stats
        const wins = res.player.stats.Bedwars.wins_bedwars
        const losses = res.player.stats.Bedwars.losses_bedwars
        const winRate = Math.round(100 * (res.player.stats.Bedwars.wins_bedwars) / (res.player.stats.Bedwars.games_played_bedwars)) / 100
        const kills = res.player.stats.Bedwars.kills_bedwars
        const deaths = res.player.stats.Bedwars.deaths_bedwars
        const kd = Math.round(100 * (res.player.stats.Bedwars.kills_bedwars) / (res.player.stats.Bedwars.deaths_bedwars)) / 100
        const bedsBroken = res.player.stats.Bedwars.beds_broken_bedwars
        const bedsLost = res.player.stats.Bedwars.beds_lost_bedwars
        const gamesPlayed = res.player.stats.Bedwars.games_played_bedwars
        const displayName = res.player.displayname
        const uuid = res.player.uuid

        const stats = { wins, losses, winRate, kills, deaths, kd, bedsBroken, bedsLost, gamesPlayed, displayName,uuid }
        updateState(stats)
    }




    return (
        <body>
            <div className="infoWrapper" id="infoWrapper">
                {invalidName ? <div className="error-text">Invalid player name</div> : null}
                {frequentName ? <div className="error-text">You have already looked up this name recently. Wait 1 minute before searching it again.</div> : null}
            </div>
            {info ?
                <div id="infoVisible" >

                    <div className="infoWrapper" id="infoWrapper">
                        <div className="infoName" id="infoName">
                            <div className="player-head-wrapper"><img src={`https://crafatar.com/avatars/${state.uuid}`} className="player-head"/></div>
                            {state.displayName}'s Bedwars Stats
                        </div>
                    </div>
                    <div className="infoWrapper" id="infoWrapper">
                        <div className="infoOverallStats" id="infoOverallStats">

                            <div className="oStatBlock">
                                <div className="overallStat" style={{ color: 'lime' }} >Wins</div>
                                <div className="oStatValue" id="wins">{state.wins}</div>
                            </div>
                            <div className="oStatBlock">
                                <div className="overallStat" style={{ color: 'red' }}>Losses</div>
                                <div className="oStatValue">{state.losses}</div>
                            </div>
                            <div className="oStatBlock">
                                <div className="overallStat" >Win Rate</div>
                                <div className="oStatValue">{state.winRate}</div>
                            </div>


                            <div className="oStatBlock">
                                <div className="overallStat" style={{ color: 'lime' }}>Kills</div>
                                <div className="oStatValue">{state.kills}</div>
                            </div>
                            <div className="oStatBlock">
                                <div className="overallStat" style={{ color: 'red' }}>Deaths</div>
                                <div className="oStatValue">{state.deaths}</div>
                            </div>
                            <div className="oStatBlock">
                                <div className="overallStat">KD</div>
                                <div className="oStatValue">{state.kd}</div>
                            </div>


                            <div className="oStatBlock">
                                <div className="overallStat" style={{ color: 'lime' }}>Beds Broken</div>
                                <div className="oStatValue">{state.bedsBroken}</div>
                            </div>
                            <div className="oStatBlock">
                                <div className="overallStat" style={{ color: 'red' }}>Beds Lost</div>
                                <div className="oStatValue">{state.bedsLost}</div>
                            </div>
                            <div className="oStatBlock">
                                <div className="overallStat">Games Played</div>
                                <div className="oStatValue">{state.gamesPlayed}</div>
                            </div>


                        </div>
                    </div>
                </div>
                : null}

        </body>

    );

}







export default OverallStats;
