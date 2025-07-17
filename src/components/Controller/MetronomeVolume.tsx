import { useContext, useEffect, useState } from "react"
import { AlphaTabValueCtx } from "../../AlphaTabCtx"
import { IconButton, Paper, Popper, Slider } from "@mui/material"
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';


interface Props { }

const MetronomeVolume = (_props: Props) => {

    const alphaTabApi = useContext(AlphaTabValueCtx)
    const [volume, setVolume] = useState<number>(0)

    useEffect(() => {
        if (alphaTabApi !== null) {
            setVolume(alphaTabApi.metronomeVolume * 100)
        }
    }, [alphaTabApi])

    return <>
        <PopupState variant="popper" popupId="metronome-volume">
            {(popupState) => (<>
                <IconButton size="large" color="inherit" {...bindToggle(popupState)}>
                    {volume === 0 ? <AlarmOffIcon /> : <AlarmOnIcon />}
                </IconButton>
                <Popper {...bindPopper(popupState)} placement="top" disablePortal keepMounted>
                    <Paper sx={{ padding: "10px 0px" }}>
                        <Slider
                            size="small" orientation="vertical" valueLabelDisplay="auto"
                            defaultValue={0} value={volume} min={0} max={200} sx={{ minHeight: "100px" }}
                            onChange={(_event, volume) => {
                                if (alphaTabApi !== null) {
                                    alphaTabApi.metronomeVolume = volume / 100
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

export default MetronomeVolume
