import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useDisconnect, useSignMessage, useNetwork } from "wagmi";
import { SiweMessage } from 'siwe'

export default function CustomButton() {
    const [loading, setLoading] = useState(false);
    const { open } = useWeb3Modal();
    const { isConnected, address } = useAccount();
    const { chain } = useNetwork();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();
    const label = isConnected ? "Disconnect" : "Connect Now";

    async function onOpen() {
        setLoading(true);
        await open();
        setLoading(false);
    }

    function onClick() {
        if (isConnected) {
            disconnect();
        } else {
            onOpen();
        }
    }

    async function signRequest() {
        const message = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
            chainId: chain?.id,
            nonce: "nonceRandomFromBackEnd",
        })

        const signature = await signMessageAsync({ message: message.prepareMessage(), });
        console.log(message.prepareMessage());
        console.log(signature);
    }

    return (
        <>
            <button onClick={onClick} disabled={loading}>
                {loading ? "Loading..." : label}
            </button>
            <br />
            {isConnected &&
                <button onClick={signRequest} disabled={loading}>
                    {loading ? "Loading..." : "Sign"}
                </button>}
        </>
    );
}