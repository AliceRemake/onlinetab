import { useContext, useEffect, useState } from "react"
import { AlphaTabValueCtx } from "../../AlphaTabCtx"
import { IconButton, Paper, Popper, Slider } from "@mui/material"
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';


interface Props { }

const CountInVolume = (_props: Props) => {

    const alphaTabApi = useContext(AlphaTabValueCtx)
    const [volume, setVolume] = useState<number>(0)

    useEffect(() => {
        alphaTabApi?.metronomeVolume
        if (alphaTabApi !== null) {
            setVolume(alphaTabApi.countInVolume * 100)
        }
    }, [alphaTabApi])

    return <>
        <PopupState variant="popper" popupId="count-in-volume">
            {(popupState) => (<>
                <IconButton size="large" color="inherit" {...bindToggle(popupState)}>
                    {volume === 0 ? <HourglassDisabledIcon /> : <HourglassEmptyIcon />}
                </IconButton>
                <Popper {...bindPopper(popupState)} placement="top" disablePortal keepMounted>
                    <Paper sx={{ padding: "10px 0px" }}>
                        <Slider
                            size="small" orientation="vertical" valueLabelDisplay="auto"
                            defaultValue={0} value={volume} min={0} max={200} sx={{ minHeight: "100px" }}
                            onChange={(_event, volume) => {
                                if (alphaTabApi !== null) {
                                    alphaTabApi.countInVolume = volume / 100
                                }
                                setVolume(volume)
                            }}
                        />
                    </Paper>
                </Popper>
            </>)}
        </PopupState>
    </>
}

export default CountInVolume
