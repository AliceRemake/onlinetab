import { useContext, useEffect, useState } from "react";
import * as alphaTab from "@coderline/alphatab"
import { AlphaTabValueCtx } from '../../AlphaTabCtx';
import { IconButton } from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


const PlayPauseBtn = () => {

    const alphaTabApi = useContext(AlphaTabValueCtx)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    useEffect(() => {
        if (alphaTabApi !== null) {
            setIsPlaying(alphaTabApi.playerState === alphaTab.synth.PlayerState.Playing)
        } else {
            setIsPlaying(false)
        }
    }, [alphaTabApi])

    const handleClick = (_event: React.MouseEvent) => {
        switch (alphaTabApi!.playerState) {
            case alphaTab.synth.PlayerState.Paused:
                {
                    alphaTabApi!.play()
                    setIsPlaying(true)
                    break
                }
            case alphaTab.synth.PlayerState.Playing:
                {
                    alphaTabApi!.pause()
                    setIsPlaying(false)
                    break
                }
        }
    }

    return <>
        <IconButton size="large" color="inherit" onClick={handleClick}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton >
    </>
}

export default PlayPauseBtn
