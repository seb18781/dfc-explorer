import { StatsData } from "@defichain/whale-api-client/dist/api/stats";

interface StatusBarI {
    stats: StatsData
}

export function StatusBar(props: StatusBarI): JSX.Element {
    return (
        <>
            <div>
                <p>DFI: {props.stats.price.usd} Blocks: {props.stats.count.blocks} Blockrewards: {props.stats.emission.total} TVL: {props.stats.tvl.total}</p>
            </div>
            <hr></hr>
        </>
    )
}