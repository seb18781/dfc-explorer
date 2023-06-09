import Head from 'next/head'
import { StatusBar } from '@/components/StatusBar'
import {GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Block } from "@defichain/whale-api-client/dist/api/blocks";
import { PoolPairData } from "@defichain/whale-api-client/dist/api/poolpairs";
import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
import { StatsData } from "@defichain/whale-api-client/dist/api/stats";
import { WhaleApiClient } from "@defichain/whale-api-client";
import { MainNet, Network, TestNet } from '@defichain/jellyfish-network'
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';

interface HomePagePropsI{
  blocks: Block[]
  stats: StatsData
  transactions: Transaction[]
  liquidityPools: PoolPairData[]
}

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
  const client = new WhaleApiClient({
    url: 'https://ocean.defichain.com',
    version: 'v0',
    network: MainNet.name
  })
  const [data, setData] = useState<HomePagePropsI>({
    blocks: props.blocks,
    stats: props.stats,
    transactions: props.transactions,
    liquidityPools: props.liquidityPools,
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData()
    },5000)
    return () => clearInterval(intervalId)
  })

  async function fetchData(): Promise<void>{
    const blocks = await client.blocks.list(8)
    const stats = await client.stats.get()  
    let transactions: Transaction[] = []
    await Promise.all(
      blocks.map(async (block) => 
        await client.blocks.getTransactions(block.id,8).then((results) => {
          return results
        })
      )
    ).then((results) => {
      results.map((result) => transactions.push(...result))
    })
    transactions = transactions.slice(0,8)
    const liquidityPools = await client.poolpairs.list(8)
    setData({
      blocks,
      stats,
      transactions,
      liquidityPools
    })
  }
  return (
    <>
      <Head>
        <title>DFC-Explorer</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Just another explorer for defichain" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="symbol-defi-blockchain.png" />
      </Head>
      <main>
        <div>
          <StatusBar stats={data.stats} />
          <Navigation/>
          <p>Hier geht es weiter Price of DFI: { data.stats.price.usd }</p>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<HomePagePropsI>> {
  const client = new WhaleApiClient({
    url: 'https://ocean.defichain.com',
    version: 'v0',
    network: MainNet.name
  })
  const blocks = await client.blocks.list(8)
  const stats = await client.stats.get()  
  let transactions: Transaction[] = []
  await Promise.all(
    blocks.map(async (block) => 
      await client.blocks.getTransactions(block.id,8).then((results) => {
        return results
      })
    )
  ).then((results) => {
    results.map((result) => transactions.push(...result))
  })
  transactions = transactions.slice(0,8)
  const liquidityPools = await client.poolpairs.list(8)
  return {
    props: {
      blocks,
      stats,
      transactions,
      liquidityPools
    }
  }
}