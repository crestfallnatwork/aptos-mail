"use client"

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface GlobalState {
    privateKey: string
    setPrivateKey: (sk: string) => void
}

export const useGlobalState = create<GlobalState>()(
    persist((set) => ({
        privateKey: "",
        setPrivateKey: (sk: string) => { set((state) => ({ privateKey: sk })) }
    }),
        {
            name: "global-state"
        })
)
