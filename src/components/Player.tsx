import { forwardRef } from "react"
import "./Player.css"


interface Props { }

const Player = forwardRef<HTMLDivElement>((_props: Props, ref: React.Ref<HTMLDivElement> | undefined) => {

    return <>
        <div ref={ref} />
    </>
})

export default Player
