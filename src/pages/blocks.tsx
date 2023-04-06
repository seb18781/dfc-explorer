import Navigation from "@/components/Navigation";
import { Block } from "@defichain/whale-api-client/dist/api/blocks";
import { StatusBar } from "@/components/StatusBar";
import { MainNet } from "@defichain/jellyfish-network";
import { WhaleApiClient } from "@defichain/whale-api-client";
import Head from "next/head";
import { GetServerSidePropsResult, InferGetServerSidePropsType } from "next/types";
import { StatsData } from "@defichain/whale-api-client/dist/api/stats";
import BlockTable from "@/components/Blocktable";

interface BlockPagePropsI{
    blocks: Block[]
    stats: StatsData
}

export default function blocks(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
    return (
        <>
            <Head>
                <title>DFC-Explorer - Blocks</title>
                <meta charSet="utf-8" />
                <meta name="description" content="Just another explorer for defichain" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="symbol-defi-blockchain.png" />
            </Head>
            <main>
                <div>
                    <StatusBar stats={props.stats} />
                    <Navigation/>
                    <BlockTable blocks={props.blocks}/>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<BlockPagePropsI>>{
    const client = new WhaleApiClient({
        url: 'https://ocean.defichain.com',
        version: 'v0',
        network: MainNet.name
      })
      const blocks = await client.blocks.list(200);
      const stats = await client.stats.get()
      return {
        props: {
            blocks,
            stats
        }
      }
}