import { AlphaTabApi } from '@coderline/alphatab'
import React, { createContext, useState } from 'react'


export const AlphaTabValueCtx = createContext<AlphaTabApi | null>(null)
export const AlphaTabUpdateCtx = createContext<React.Dispatch<React.SetStateAction<AlphaTabApi | null>> | null>(null)

interface Props {
    children: React.ReactNode | React.ReactNode[]
}

const AlphaTabProvider = (props: Props) => {

    const [alphaTabApi, setAlphaTabApi] = useState<AlphaTabApi | null>(null)

    return <>
        <AlphaTabValueCtx.Provider value={alphaTabApi}>
            <AlphaTabUpdateCtx.Provider value={setAlphaTabApi}>
                {props.children}
            </AlphaTabUpdateCtx.Provider>
        </AlphaTabValueCtx.Provider>
    </>
}

export default AlphaTabProvider
