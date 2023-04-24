import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
export default function TransactionTable({transactions}: {transactions: Transaction[]}): JSX.Element {
  let nowTimeSeconds: number= Math.floor(Date.now() / 1000) //Actual Time in seconds
  return (
    <div>
      <table>
        <thead>
          	<tr>
              <td>Id</td>
              <td>Input</td>
              <td>Output</td>
              <td>Output_Value</td>
            </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr>
                <td>{transaction.id}</td>
                <td>{transaction.vinCount}</td>
                <td>{transaction.voutCount}</td>
                <td>{transaction.totalVoutValue}</td>
              </tr>
            )
        })} 
        </tbody>
      </table>
    </div>
  )
}
