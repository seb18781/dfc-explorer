import { StatsData } from "@defichain/whale-api-client/dist/api/stats";

interface StatusBarI {
    stats: StatsData
}

export function StatusBar(props: StatusBarI): JSX.Element {
    return (
        <>
            <div>
                <p>DFI: {props.stats.price.usd}</p>
                <p>Blocks: {props.stats.count.blocks}</p>
                <p>Blockrewards: {props.stats.emission.total}</p>
                <p>TVL: {props.stats.tvl.total}</p>
            </div>
        </>
    )
}