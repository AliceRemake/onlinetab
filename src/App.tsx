import { useContext, useEffect, useRef } from "react"
import * as alphaTab from '@coderline/alphatab'
import { AlphaTabUpdateCtx, AlphaTabValueCtx } from "./AlphaTabCtx"
import Navbar from "./components/Navbar"
import Player from "./components/Player"
import Controller from "./components/Controller"
import "./App.css"


const App = () => {

    const playerDivRef = useRef<HTMLDivElement>(null)
    const alphaTabApi = useContext(AlphaTabValueCtx)
    const setAlphaTabApi = useContext(AlphaTabUpdateCtx)

    useEffect(() => {
        const api = new alphaTab.AlphaTabApi(playerDivRef.current!, {
            display: {
                layoutMode: alphaTab.LayoutMode.Page
                // layoutMode: alphaTab.LayoutMode.Horizontal
            },
            core: {
                file: '/canon-full.gp',
                fontDirectory: '/font/'
            },
            player: {
                enablePlayer: true,
                enableCursor: true,
                enableAnimatedBeatCursor: true,
                enableUserInteraction: true,
                scrollMode: alphaTab.ScrollMode.Continuous,
                scrollElement: playerDivRef.current!,
                soundFont: '/soundfont/sonivox.sf2'
            }
        } as alphaTab.json.SettingsJson)

        setAlphaTabApi!(api);

        return () => { alphaTabApi?.destroy(); }
    }, [])

    return <>
        <Navbar />
        <div id="player-container" style={{
            position: "absolute",
            top: "48px",
            bottom: "48px",
            right: 0,
            left: 0,
            overflowX: "hidden",
            overflowY: "auto",
            scrollbarWidth: "auto",
            scrollbarGutter: "unset"
        }}>
            <Player ref={playerDivRef} />
        </div>
        <Controller />
    </>
}

export default App
