import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import CloudFileBtn from "./CloudFileBtn";
import GitHubIcon from '@mui/icons-material/GitHub';
import BugReportIcon from '@mui/icons-material/BugReport';


interface Props { }

function Navbar(_props: Props) {

    return <>
        <AppBar position="fixed">
            <Toolbar variant="dense" disableGutters>
                <Stack direction="row" alignItems="center" justifyContent="flex-start">
                    <CloudFileBtn />
                </Stack>
                <Box flexGrow={1} padding={"0px 24px"}>
                    <Typography variant="h5" noWrap>
                        onlinetab
                    </Typography>
                </Box>
                <Stack direction="row-reverse" alignItems="center" justifyContent="flex-start">
                    <IconButton size="large" color="inherit" onClick={() => {
                        window.location.href = "https://github.com/AliceRemake/onlinetab"
                    }}>
                        <GitHubIcon />
                    </IconButton>
                    <IconButton size="large" color="inherit" onClick={() => {
                        window.location.href = "https://github.com/AliceRemake/onlinetab/issues/new"
                    }}>
                        <BugReportIcon />
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    </>
}

export default Navbar
