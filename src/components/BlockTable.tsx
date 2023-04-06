import { Block } from "@defichain/whale-api-client/dist/api/blocks";

export default function BlockTable({ blocks }: { blocks: Block[] }): JSX.Element{
    return (
        <div>
            {blocks.map((block) => {
                return (<p>{block.hash}</p>)
            })}
        </div>
    )
}