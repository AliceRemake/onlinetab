import { useContext, useEffect, useState } from 'react';
import * as alphaTab from "@coderline/alphatab"
import { AlphaTabValueCtx } from '../../AlphaTabCtx';
import { Slider } from '@mui/material';


interface Props { }

const MainSlider = (_props: Props) => {

    const alphaTabApi = useContext(AlphaTabValueCtx)

    const [endTime, setEndTime] = useState<number>(0)
    const [curTime, setCurTime] = useState<number>(0)

    useEffect(() => {
        const handlePlayerPositionChanged = (args: alphaTab.synth.PositionChangedEventArgs) => {
            const curSeconds = (args.currentTime / 1000) | 0
            if (curSeconds !== curTime) {
                setCurTime(curSeconds)
            }

            const endSeconds = (args.endTime / 1000) | 0
            if (endSeconds !== endTime) {
                setEndTime(endSeconds)
            }
        }

        alphaTabApi?.playerPositionChanged.on(handlePlayerPositionChanged);

        return () => { alphaTabApi?.playerPositionChanged.off(handlePlayerPositionChanged); }
    }, [alphaTabApi])

    const handleChange = (_event: Event, ratio: number) => {
        alphaTabApi!.timePosition = ratio * 1000 // milliseconds
        setCurTime(alphaTabApi!.timePosition / 1000)
    }

    return <>
        <Slider
            sx={{ position: "fixed", margin: "0", padding: "0", zIndex: "100" }} 
            size='small' color="secondary" min={0} max={endTime} disabled={endTime === 0}
            value={endTime === 0 ? 0 : curTime} onChange={handleChange}
        />
    </>
}

export default MainSlider
