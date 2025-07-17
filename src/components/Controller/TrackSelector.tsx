import { IconButton, Popper } from '@mui/material';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import TrackItems from './TrackItems';


interface Props { }

const TrackSelector = (_props: Props) => {

    return <>
        <PopupState variant="popper" popupId="tracker-selector">
            {(popupState) => (<>
                <IconButton size="large" color="inherit" {...bindToggle(popupState)}>
                    <GraphicEqIcon />
                </IconButton>
                <Popper {...bindPopper(popupState)} placement="top-end" keepMounted sx={{ zIndex: 1000 }}>
                    <TrackItems />
                </Popper>
            </>)}
        </PopupState>
    </>
}

export default TrackSelector
