import { Octokit } from "octokit";
import { useContext, useEffect, useState } from "react"
import { AlphaTabValueCtx } from "../../AlphaTabCtx"
import { Box, Breadcrumbs, Divider, Drawer, IconButton, Link, Stack } from "@mui/material"
import { RichTreeView } from "@mui/x-tree-view";
import CloudIcon from '@mui/icons-material/Cloud';


interface Props { }

interface GhFileInfo {
    type: "dir" | "file" | "submodule" | "symlink";
    size: number;
    name: string;
    path: string;
    content?: string | undefined;
    sha: string;
    url: string;
    git_url: string | null;
    html_url: string | null;
    download_url: string | null;
    _links: {
        git: string | null;
        html: string | null;
        self: string;
    };
}

interface TreeViewItem {
    id: string
    label: string
    children: TreeViewItem[] | undefined
}

const CloudFileBtn = (_props: Props) => {

    const alphaTabApi = useContext(AlphaTabValueCtx)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [octokit, setOctokit] = useState<Octokit | null>(null)
    const [treeViewItems, setTreeViewItems] = useState<Array<TreeViewItem>>([])

    const sync = async (path: string): Promise<Array<TreeViewItem>> => {
        const newGpFiles = (await octokit!.rest.repos
            .getContent({
                owner: import.meta.env.VITE_OWNER,
                repo: import.meta.env.VITE_REPO,
                path: path
            })
            .then((res) => {
                return res.data
            })
            .catch((err) => {
                console.log(err)
                return []
            }) as GhFileInfo[])
            .filter((gpFile) => {
                return (gpFile.type === "dir")
                    || (gpFile.type === "file" && gpFile.name.endsWith(".gp"))
            })

        return await Promise.all(newGpFiles
            .map(async (gpFile) => {
                return {
                    id: gpFile.download_url === null ? `dir:${gpFile.path}` : gpFile.download_url,
                    label: gpFile.name,
                    children: gpFile.type === "dir" ? await sync(gpFile.path) : undefined
                }
            }))
    }

    useEffect(() => {
        setOctokit(new Octokit({ auth: import.meta.env.VITE_TOKEN }));
    }, [])

    useEffect(() => {
        (async () => { setTreeViewItems(await sync(".")) })()
    }, [octokit])

    return <>
        <IconButton size="large" color="inherit" onClick={() => { setIsOpen(true) }}>
            <CloudIcon />
        </IconButton>
        <Drawer anchor="left" open={isOpen} onClose={() => { setIsOpen(false) }}>
            <div>
                <Stack direction="row" alignItems="center" justifyContent="flex-start" component="span" padding="12px 24px">
                    <Breadcrumbs separator=">">
                        <Link underline="hover" color="inherit" href="https://github.com">Github</Link>
                        <Link underline="hover" color="inherit" href={`https://github.com/${import.meta.env.VITE_OWNER}`}>{import.meta.env.VITE_OWNER}</Link>
                        <Link underline="hover" color="inherit" href={`https://github.com/${import.meta.env.VITE_OWNER}/${import.meta.env.VITE_REPO}`}>{import.meta.env.VITE_REPO}</Link>
                    </Breadcrumbs>
                </Stack>
            </div>
            <Divider></Divider>
            <Box sx={{ minWidth: "480px" }}>
                <RichTreeView items={treeViewItems} sx={{ height: 'fit-content', flexGrow: 1, overflowY: 'auto', padding: "12px" }}
                    onItemClick={async (_event, itemId) => {
                        if (!itemId.startsWith("dir:")) {
                            alphaTabApi?.load(itemId, [0])
                        }
                    }}
                />
            </Box>
        </Drawer>
    </>
}

export default CloudFileBtn
