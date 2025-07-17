import { useContext, useEffect, useState } from "react"
import * as alphaTab from "@coderline/alphatab";
import { AlphaTabValueCtx } from "../../AlphaTabCtx"
import {
    Drawer, FormControl, IconButton, InputLabel,
    List, ListItem, ListItemIcon, ListItemText,
    MenuItem, Select, Slider, Switch, Typography
} from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';


interface Props { }

const Settings = (_props: Props) => {

    const alphaTabApi = useContext(AlphaTabValueCtx)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [renderEngine, setRenderEngine] = useState<string>("default")
    const [layoutMode, setLayoutMode] = useState<alphaTab.LayoutMode>(alphaTab.LayoutMode.Page)
    const [autoLayout, setAutoLayout] = useState<boolean>(true)
    const [animeCursor, setAnimeCursor] = useState<boolean>(true)
    const [scale, setScale] = useState<number>(1)
    const [stretch, setStretch] = useState<number>(1)


    useEffect(() => {
        if (alphaTabApi !== null) {
            setRenderEngine(alphaTabApi.settings.core.engine)
            setLayoutMode(alphaTabApi.settings.display.layoutMode)
            setAutoLayout(alphaTabApi.settings.display.systemsLayoutMode === alphaTab.SystemsLayoutMode.Automatic)
            setAnimeCursor(alphaTabApi.settings.player.enableAnimatedBeatCursor)
            setScale(alphaTabApi.settings.display.scale)
            setStretch(alphaTabApi.settings.display.stretchForce)
        }
    }, [alphaTabApi])

    return <>
        <IconButton size="large" color="inherit" onClick={() => { setIsOpen(true) }}>
            <SettingsIcon />
        </IconButton>
        <Drawer anchor="left" open={isOpen} onClose={() => { setIsOpen(false) }}>
            <List sx={{ minWidth: "240px" }}>
                <ListItem>
                    <Typography variant="h6">Settings</Typography>
                </ListItem>
                <ListItem>
                    <FormControl variant="outlined" fullWidth={true}>
                        <InputLabel id="render-engine-label">Render Engine</InputLabel>
                        <Select value={renderEngine} id="render-engine" label="Render Engine"
                            onChange={(event) => {
                                if (alphaTabApi !== null) {
                                    alphaTabApi.settings.core.engine = event.target.value
                                    alphaTabApi.updateSettings()
                                    alphaTabApi.render()
                                    setRenderEngine(event.target.value)
                                }
                            }}
                        >
                            <MenuItem value={"default"}>Default</MenuItem>
                            <MenuItem value={"svg"}>SVG</MenuItem>
                            <MenuItem value={"html5"}>HTML5</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <FormControl variant="outlined" fullWidth={true}>
                        <InputLabel id="layout-mode-label">Layout Mode</InputLabel>
                        <Select value={layoutMode} id="layout-mode" label="Layout Mode"
                            onChange={(event) => {
                                if (alphaTabApi !== null) {
                                    alphaTabApi.settings.display.layoutMode = event.target.value
                                    alphaTabApi.updateSettings()
                                    alphaTabApi.render()
                                    if (event.target.value === alphaTab.LayoutMode.Page) {
                                        document.getElementById("player-container")!.style.overflowX = "hidden"
                                        document.getElementById("player-container")!.style.overflowY = "auto"
                                    }
                                    else {
                                        document.getElementById("player-container")!.style.overflowX = "auto"
                                        document.getElementById("player-container")!.style.overflowY = "hidden"
                                    }
                                    setLayoutMode(event.target.value)
                                }
                            }}
                        >
                            <MenuItem value={alphaTab.LayoutMode.Page}>Page</MenuItem>
                            <MenuItem value={alphaTab.LayoutMode.Horizontal}>Horizontal</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem secondaryAction={
                    <Switch checked={autoLayout} onChange={() => {
                        if (alphaTabApi !== null) {
                            alphaTabApi.settings.display.systemsLayoutMode = !autoLayout
                                ? alphaTab.SystemsLayoutMode.Automatic
                                : alphaTab.SystemsLayoutMode.UseModelLayout
                            alphaTabApi.updateSettings()
                            alphaTabApi.render()
                            setAutoLayout(!autoLayout)
                        }
                    }} />
                }>
                    <ListItemText>Use Auto Layout</ListItemText>
                </ListItem>
                <ListItem secondaryAction={
                    <Switch checked={animeCursor} onChange={() => {
                        if (alphaTabApi !== null) {
                            alphaTabApi.settings.player.enableAnimatedBeatCursor = !animeCursor
                            alphaTabApi.updateSettings()
                            alphaTabApi.render()
                            setAnimeCursor(!animeCursor)
                        }
                    }} />
                }>
                    <ListItemText>Use Anime Cursor</ListItemText>
                </ListItem>
                <ListItem>
                    {/* <ListItemAvatar>Scale</ListItemAvatar> */}
                    <ListItemIcon><ZoomInIcon /></ListItemIcon>
                    <Slider value={scale} size="small" defaultValue={1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
                        onChange={(_event, newScale) => {
                            if (alphaTabApi !== null) {
                                alphaTabApi.settings.display.scale = newScale
                                alphaTabApi.updateSettings()
                                alphaTabApi.render()
                                setScale(newScale)
                            }
                        }}
                    />
                </ListItem>
                <ListItem>
                    {/* <ListItemAvatar>Stretch</ListItemAvatar> */}
                    <ListItemIcon><SwapHorizIcon /></ListItemIcon>
                    <Slider value={stretch} size="small" defaultValue={1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
                        onChange={(_event, newStretch) => {
                            if (alphaTabApi !== null) {
                                alphaTabApi.settings.display.stretchForce = newStretch
                                alphaTabApi.updateSettings()
                                alphaTabApi.render()
                                setStretch(newStretch)
                            }
                        }}
                    />
                </ListItem>
            </List>
        </Drawer >
    </>
}

export default Settings
