import Navigation from "@/components/Navigation";
import { StatusBar } from "@/components/StatusBar";
import Head from "next/head";

export default function transactions(){
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
                    <StatusBar stats={data.stats} />
                    <Navigation/>
                    <p>Hier geht es weiter Price of DFI: { data.stats.price.usd }</p>
                </div>
            </main>
        </>
    )
}