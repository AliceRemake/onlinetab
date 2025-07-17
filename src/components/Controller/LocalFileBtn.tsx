import { useContext } from 'react';
import { AlphaTabValueCtx } from '../../AlphaTabCtx';
import { IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';


import { styled } from '@mui/material/styles';
const HiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface Props { }

const LocalFileBtn = (_props: Props) => {

    const alphaTabApi = useContext(AlphaTabValueCtx)

    const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        reader.onload = (data) => {
            alphaTabApi!.load(data.target?.result, [0])
        }
        if (event.target?.files !== null) {
            reader.readAsArrayBuffer(event.target.files[0])
            console.log("Load Local File: ", event.target.files[0].name)
        }
    }

    return <>
        <IconButton component="label" size="large" color="inherit">
            <FolderIcon />
            <HiddenInput type="file" accept=".gp"
                onChange={handleClick}
            />
        </IconButton>
    </>
}

export default LocalFileBtn
