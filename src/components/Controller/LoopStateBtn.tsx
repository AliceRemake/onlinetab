import { useContext, useEffect, useState } from "react";
import { AlphaTabValueCtx } from "../../AlphaTabCtx";
import { IconButton } from "@mui/material";
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import RepeatOneOnIcon from '@mui/icons-material/RepeatOneOn';


const LoopStateBtn = () => {

    const alphaTabApi = useContext(AlphaTabValueCtx)
    const [isLooping, setIsLooping] = useState<boolean>(false)

    useEffect(() => {
        if (alphaTabApi !== null) {
            setIsLooping(alphaTabApi.isLooping)
        } else {
            setIsLooping(false)
        }
    }, [alphaTabApi])

    const handleClick = (_e: React.MouseEvent) => {
        if (alphaTabApi !== null) {
            alphaTabApi.isLooping = !alphaTabApi.isLooping
            setIsLooping(alphaTabApi.isLooping)
        }
    }

    return <>
        <IconButton size="large" color="inherit" onClick={handleClick}>
            {isLooping ? <RepeatOneOnIcon /> : <RepeatOneIcon />}
        </IconButton>
    </>
}

export default LoopStateBtn
