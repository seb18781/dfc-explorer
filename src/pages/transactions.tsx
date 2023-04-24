import Navigation from "@/components/Navigation";
import { StatusBar } from "@/components/StatusBar";
import Head from "next/head";
import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
import { MainNet } from "@defichain/jellyfish-network";
import { WhaleApiClient } from "@defichain/whale-api-client";
import { GetServerSidePropsResult, InferGetServerSidePropsType } from "next/types";
import { StatsData } from "@defichain/whale-api-client/dist/api/stats";
import TransactionTable from "@/components/TransactionTable";

interface TransactionPagePropsI{
    transactions: Transaction[]
    stats: StatsData
}

export default function transactions(props: InferGetServerSidePropsType<typeof getServerSideProps>
    ): JSX.Element {
    return (
        <>
            <Head>
                <title>DFC-Explorer - Transactions</title>
                <meta charSet="utf-8" />
                <meta name="description" content="Just another explorer for defichain" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="symbol-defi-blockchain.png" />
            </Head>
            <main>
                <div>
                    <StatusBar stats={props.stats} />
                    <Navigation/>
                    <TransactionTable transactions={props.transactions}/>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<TransactionPagePropsI>>{
    const client = new WhaleApiClient({
        url: 'https://ocean.defichain.com',
        version: 'v0',
        network: MainNet.name
      })
    const blocks = await client.blocks.list(8)
    let transactions: Transaction[] = []
    await Promise.all(
        blocks.map(async (block) => 
            await client.blocks.getTransactions(block.id,8).then((results) => {
                return results
            })
        )).then((results) => {
            results.map((result) => transactions.push(...result))
        })
    transactions = transactions.slice(0,8)
    const stats = await client.stats.get()
    return {
        props: {
            transactions,
            stats
        }
    }
}