import { AppBar, Box, Stack, Toolbar } from "@mui/material"
import MainSlider from "./MainSlider"
import LocalFileBtn from "./LocalFileBtn";
import PlayPauseBtn from "./PlayPauseBtn";
import LoopStateBtn from "./LoopStateBtn";
import MasterVolume from "./MasterVolume";
import CountInVolume from "./CountInVolume";
import MetronomeVolume from "./MetronomeVolume";
import TrackSelector from "./TrackSelector";
import PrintBtn from "./PrintBtn";


interface Props { }

function Controller(_props: Props) {

    return <>
        <AppBar sx={{ top: 'auto', bottom: 0 }}>
            <MainSlider />
            <Toolbar variant="dense" disableGutters>
                <Stack direction="row" alignItems="center" justifyContent="flex-start">
                    <LocalFileBtn />
                </Stack>
                <Box flexGrow={1}>
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="flex-start">
                    <PlayPauseBtn />
                    <LoopStateBtn />
                    <MasterVolume />
                    <CountInVolume />
                    <MetronomeVolume />
                </Stack>
                <Box flexGrow={1}>
                </Box>
                <Stack direction="row-reverse" alignItems="center" justifyContent="flex-start">
                    <TrackSelector />
                    <PrintBtn />
                </Stack>
            </Toolbar>
        </AppBar>
    </>
}

export default Controller
