"use client"

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Client as ACMP } from 'acmp-js'
import {
    AccountAddress,
    Network,
    Aptos,
    AptosConfig,
    Account,
    AnyRawTransaction,
    Ed25519PrivateKey
} from "@aptos-labs/ts-sdk";
import { FullClient as acksp, ReadOnlyClient as ackspRO } from 'acksp-js'
import { ACESS, ECDHWalletExtension } from 'acess-js'

export async function createACMP(sk: string) {
    const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }))
    const acc = Account.fromPrivateKey({
        privateKey: new Ed25519PrivateKey(sk)
    })
    const keyservice = new acksp(
        AccountAddress.fromString("0xb60fd39de7a42e40bc1393a72f5212334c178e318248bc85138fc82fc34c8ef6"),
        aptos as Aptos,
        {
            accountAddress: acc.accountAddress,
            signTransaction: async (txn: AnyRawTransaction) => {
                return acc.signTransactionWithAuthenticator(txn)
            },
        }
    )
    const encryptor = new ACESS(new ECDHWalletExtension(acc.privateKey.toUint8Array()))
    try {
        await keyservice.fetchKey(acc.accountAddress)
    } catch (e: any) {
        console.log(e)
        const privkey = await keyservice.publishKey({ encryptor: encryptor })
        console.log("here")
        console.log(privkey.toString())
    }
    const acmp = new ACMP({
        encryptor: keyservice.createACESS.bind(keyservice, acc.accountAddress, encryptor),
        keyservice: new ackspRO(
            AccountAddress.fromString("0xb60fd39de7a42e40bc1393a72f5212334c178e318248bc85138fc82fc34c8ef6"),
            aptos as Aptos,
        ),
        signer: {
            accountAddress: acc.accountAddress,
            signTransaction: async (txn: AnyRawTransaction) => {
                return acc.signTransactionWithAuthenticator(txn)
            },
        },
        aptos: aptos,
        contractAddress: AccountAddress.fromString("0xb60fd39de7a42e40bc1393a72f5212334c178e318248bc85138fc82fc34c8ef6")
    })
    try {
        await acmp.createStore()
    } catch (e: any) {
        console.log(e)
    }
    return acmp
}

interface GlobalState {
    privateKey: string
    setPrivateKey: (sk: string) => Promise<void>
    acmp: ACMP | null
}

export const useGlobalState = create<GlobalState>()(
    persist((set) => ({
        privateKey: "",
        acmp: null,
        setPrivateKey: async (sk: string) => {
            if (sk === "") {
                set((state) => {
                    return {
                        privateKey: sk,
                        acmp: null
                    }
                })
                return
            }
            const acmp = await createACMP(sk)
            set((state) => {
                return {
                    privateKey: sk,
                    acmp: acmp
                }
            })
        }
    }),
        {
            name: "global-state",
            partialize: (state => state.privateKey),
        }
    )
)
