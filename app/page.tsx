"use client";

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Button, Web3Modal, Web3NetworkSwitch, useWeb3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import CustomButton from './ConnectButton';

export default function ConnectWallet() {
  const { open, close } = useWeb3Modal()

  const chains = [mainnet, polygon]
  const projectId = 'eb7a6b78a62020eb5c43a7a7f698d3ee'

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div>
          <Web3NetworkSwitch />
          <br />
          <br />
          <CustomButton />
        </div>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>

  );
}