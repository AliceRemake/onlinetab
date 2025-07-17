import { useContext, useEffect, useState } from "react"
import { AlphaTabValueCtx } from "../../AlphaTabCtx"
import { IconButton, Paper, Popper, Slider } from "@mui/material"
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';


interface Props { }

const MasterVolume = (_props: Props) => {

    const alphaTabApi = useContext(AlphaTabValueCtx)
    const [volume, setVolume] = useState<number>(100)

    useEffect(() => {
        if (alphaTabApi !== null) {
            setVolume(alphaTabApi.masterVolume * 100)
        }
    }, [alphaTabApi])

    return <>
        <PopupState variant="popper" popupId="master-volume">
            {(popupState) => (<>
                <IconButton size="large" color="inherit" {...bindToggle(popupState)}>
                    {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </IconButton>
                <Popper {...bindPopper(popupState)} placement="top" disablePortal keepMounted>
                    <Paper sx={{ padding: "10px 0px" }}>
                        <Slider
                            size="small" orientation="vertical" valueLabelDisplay="auto"
                            defaultValue={100} value={volume} min={0} max={200} step={5}
                            sx={{ minHeight: "100px" }}
                            onChange={(_event, volume) => {
                                if (alphaTabApi !== null) {
                                    alphaTabApi.masterVolume = volume / 100
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

export default MasterVolume
