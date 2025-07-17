import { IconButton } from "@mui/material"
// import { useContext } from "react"
// import { AlphaTabValueCtx } from "../../AlphaTabCtx"
import CloudIcon from '@mui/icons-material/Cloud';


interface Props {}

const CloudFileBtn = (_props: Props) => {

    // const _alphaTabApi = useContext(AlphaTabValueCtx)

    const handleClick = () => {
        console.log("cloud btn click")
    }

    return <>
        <IconButton size="large" color="inherit" onClick={handleClick}>
            <CloudIcon />
        </IconButton>
    </>
}

export default CloudFileBtn
