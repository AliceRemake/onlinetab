import { Octokit } from "octokit";
import { useContext, useEffect, useState } from "react"
import { Drawer, IconButton } from "@mui/material"
import { AlphaTabValueCtx } from "../../AlphaTabCtx"
import CloudIcon from '@mui/icons-material/Cloud';


interface Props { }

const CloudFileBtn = (_props: Props) => {

    const _alphaTabApi = useContext(AlphaTabValueCtx)
    const [octokit, setOctokit] = useState<Octokit | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        console.log("TOKEN", import.meta.env.VITE_TOKEN)
        console.log("", import.meta.env.VITE_REPO)
        setOctokit(new Octokit({ auth: import.meta.env.VITE_TOKEN }));
        // await octokit?.rest.repos.getContent({
        //     owner: 'OWNER',
        //     repo: 'REPO',
        //     path: 'PATH',
        // })
    }, [])

    return <>
        <IconButton size="large" color="inherit" onClick={() => { setIsOpen(true) }}>
            <CloudIcon />
        </IconButton>
        <Drawer anchor="left" open={isOpen} onClose={() => { setIsOpen(false) }}>

        </Drawer>
    </>
}

export default CloudFileBtn
