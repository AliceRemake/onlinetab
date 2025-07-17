import { IconButton } from "@mui/material"
import { useContext } from "react"
import { AlphaTabValueCtx } from "../../AlphaTabCtx"
import SaveAltIcon from '@mui/icons-material/SaveAlt';

interface Props {}

const PrintBtn = (_props: Props) => {

    const alphaTabApi = useContext(AlphaTabValueCtx)

    const handleClick = () => {
        alphaTabApi?.print()
    }

    return <>
        <IconButton size="large" color="inherit" onClick={handleClick}>
            <SaveAltIcon />
        </IconButton>
    </>
}

export default PrintBtn
