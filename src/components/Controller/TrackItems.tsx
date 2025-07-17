import { useContext, useEffect, useState } from 'react';
import * as alphaTab from "@coderline/alphatab"
import { AlphaTabValueCtx } from '../../AlphaTabCtx';
import { Card, Checkbox, Slider, Table, TableBody, TableCell, TableContainer, TableRow, ToggleButton, ToggleButtonGroup } from '@mui/material';
import HeadsetIcon from '@mui/icons-material/Headset';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';


interface Props { }

const TrackItems = (_props: Props) => {

    const alphaTabApi = useContext(AlphaTabValueCtx)
    const [tracks, setTracks] = useState<Array<alphaTab.model.Track>>([])
    const [selected, setSelected] = useState<Array<boolean>>([])
    const [volumes, setVolumes] = useState<Array<number>>([])

    enum TrackSoloMuteState {
        Solo,
        Mute,
    }
    const [soloMuteStates, setSoloMuteStates] = useState<Array<TrackSoloMuteState | null>>([])

    enum StaffFormat {
        Standard = 1,
        Tablature = 1 << 1,
        Slash = 1 << 2,
        Numbered = 1 << 3,
    }
    const [staffFormats, setStaffFormats] = useState<Array<number>>([])
    const showStandard = (format: number) => { return Boolean(format & 1) }
    const showTablature = (format: number) => { return Boolean(format & (1 << 1)) }
    const showSlash = (format: number) => { return Boolean(format & (1 << 2)) }
    const showNumbered = (format: number) => { return Boolean(format & (1 << 3)) }

    useEffect(() => {
        alphaTabApi?.scoreLoaded.on((score: alphaTab.model.Score) => {
            setTracks(score.tracks)
            setSelected(score.tracks.map((track, index) => {
                track.staves[0].showNumbered
                if (index === 0) { return true }
                else { return false }
            }))
            setSoloMuteStates(score.tracks.map(() => { return null }))
            setVolumes(score.tracks.map(() => { return 100 }))
            setStaffFormats(score.tracks.map((track) => {
                return Number(track.staves[0].showStandardNotation)
                    | (Number(track.staves[0].showTablature) << 1)
                    | (Number(track.staves[0].showSlash) << 2)
                    | (Number(track.staves[0].showNumbered) << 3)
            }))
        })
    }, [alphaTabApi])

    return <>
        <TableContainer component={Card} sx={{ overflowX: "hidden", overflowY: "auto", scrollbarWidth: "none", borderRadius: "0" }}>
            <Table size='small'>
                <TableBody>
                    {tracks.map((track: alphaTab.model.Track, index: number) => {
                        return <TableRow key={index}>
                            <TableCell size='small' padding='checkbox'>
                                <Checkbox checked={selected[index]}
                                    onClick={() => {
                                        const newSelectedTracks = selected.map((_, i) => {
                                            if (i === index) { return !selected[i] }
                                            else { return selected[i] }
                                        })
                                        alphaTabApi!.renderTracks(
                                            alphaTabApi!.score!.tracks.filter((_, index) => {
                                                return newSelectedTracks[index]
                                            })!
                                        )
                                        setSelected(newSelectedTracks)
                                    }}
                                />
                            </TableCell>
                            <TableCell size='small'>{track.name}</TableCell>
                            <TableCell size='small'>{track.shortName}</TableCell>
                            <TableCell size='small'>
                                <ToggleButtonGroup size="small" value={soloMuteStates[index]} exclusive
                                    onChange={(_event: React.MouseEvent<HTMLElement>, soloMute: TrackSoloMuteState) => {
                                        const newSoloMuteStates = soloMuteStates.map((_, i) => {
                                            if (i === index) { return soloMute }
                                            else { return soloMuteStates[i] }
                                        })
                                        alphaTabApi?.changeTrackSolo([track], newSoloMuteStates[index] === TrackSoloMuteState.Solo)
                                        alphaTabApi?.changeTrackMute([track], newSoloMuteStates[index] === TrackSoloMuteState.Mute)
                                        setSoloMuteStates(newSoloMuteStates)
                                    }}
                                >
                                    <ToggleButton size='small' color='warning' value={TrackSoloMuteState.Solo}>
                                        <HeadsetIcon fontSize='small' />
                                    </ToggleButton>
                                    <ToggleButton size='small' color='error' value={TrackSoloMuteState.Mute}>
                                        <VolumeOffIcon fontSize='small' />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </TableCell>
                            <TableCell size='small'>
                                <Slider value={volumes[index]} size='small' defaultValue={100} min={0} max={200} sx={{ minWidth: "150px" }}
                                    onChange={(_event: Event, volume: number) => {
                                        alphaTabApi?.changeTrackVolume([track], volume / 100)
                                        setVolumes(volumes.map((_, i) => {
                                            if (i === index) { return volume }
                                            else { return volumes[i] }
                                        }))
                                    }}
                                />
                            </TableCell>
                            <TableCell size='small'>
                                <ToggleButtonGroup size="small">
                                    <ToggleButton size='small' color='primary' value={StaffFormat.Standard} selected={showStandard(staffFormats[index])}
                                        onClick={() => {
                                            const newStaffFormats = staffFormats.map((_, i) => {
                                                if (i === index) { return staffFormats[i] ^ 1 }
                                                else { return staffFormats[i] }
                                            })
                                            track.staves.forEach((staff) => {
                                                staff.showStandardNotation = !staff.showStandardNotation
                                            })
                                            alphaTabApi!.render()
                                            setStaffFormats(newStaffFormats)
                                        }}
                                    >
                                        ♫
                                    </ToggleButton>
                                    <ToggleButton size='small' color='primary' value={StaffFormat.Tablature} selected={showTablature(staffFormats[index])}
                                        onClick={() => {
                                            const newStaffFormats = staffFormats.map((_, i) => {
                                                if (i === index) { return staffFormats[i] ^ (1 << 1) }
                                                else { return staffFormats[i] }
                                            })
                                            track.staves.forEach((staff) => {
                                                staff.showTablature = !staff.showTablature
                                            })
                                            alphaTabApi!.render()
                                            setStaffFormats(newStaffFormats)
                                        }}
                                    >
                                        5
                                    </ToggleButton>
                                    <ToggleButton size='small' color='primary' value={StaffFormat.Slash} selected={showSlash(staffFormats[index])}
                                        onClick={() => {
                                            const newStaffFormats = staffFormats.map((_, i) => {
                                                if (i === index) { return staffFormats[i] ^ (1 << 2) }
                                                else { return staffFormats[i] }
                                            })
                                            track.staves.forEach((staff) => {
                                                staff.showSlash = !staff.showSlash
                                            })
                                            alphaTabApi!.render()
                                            setStaffFormats(newStaffFormats)
                                        }}
                                    >
                                        /
                                    </ToggleButton>
                                    <ToggleButton size='small' color='primary' value={StaffFormat.Slash} selected={showNumbered(staffFormats[index])}
                                        onClick={() => {
                                            const newStaffFormats = staffFormats.map((_, i) => {
                                                if (i === index) { return staffFormats[i] ^ (1 << 3) }
                                                else { return staffFormats[i] }
                                            })
                                            track.staves.forEach((staff) => {
                                                staff.showNumbered = !staff.showNumbered
                                            })
                                            alphaTabApi!.render()
                                            setStaffFormats(newStaffFormats)
                                        }}
                                    >
                                        ̲2̲
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default TrackItems
