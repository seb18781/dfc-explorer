import { Block } from "@defichain/whale-api-client/dist/api/blocks";
export default function BlockTable({blocks,}: {blocks: Block[]}): JSX.Element {
  let nowTimeSeconds: number= Math.floor(Date.now() / 1000) //Actual Time in seconds
  return (
    <div>
      <table>
        <thead>
          	<tr>
              <td>Height</td>
              <td>{'Age [min]'}</td>
              <td>Transactions</td>
              <td>Minter</td>
            </tr>
        </thead>
        <tbody>
          {blocks.map((block) => {
            return (
              <tr>
                <td>{block.height.toString()}</td>
                <td>{Math.floor((nowTimeSeconds - block.medianTime) / 60)}</td>
                <td>{block.transactionCount}</td>
                <td>{block.minter}</td>
              </tr>
            )
        })} 
        </tbody>
      </table>
    </div>
  )
}
