import { useEffect, useState } from 'react'
import Web3 from 'web3'
import HelloWorldContract from '../../smart-contract/build/contracts/HelloWorld.json'

const __CONTRACT_ADDRESS = '0x6fc77Cd198086cBF7c0ed43609310F7bDA62566D'

function useWeb3() {
	const [web3, setWeb3] = useState()

	useEffect(() => {
		const provider = Web3.givenProvider
		const web3 = new Web3(provider)

		global.web3 = web3
		setWeb3(web3)
	}, [])

	return web3
}

export default function Home() {
	const web3 = useWeb3()
	const [accounts, setAccounts] = useState([])
	const [contract, setContract] = useState(null)
	const [greeting, setGreeting] = useState('')

	useEffect(() => {
		if (!web3) {
			return
		}

		const contract = new web3.eth.Contract(
			HelloWorldContract.abi,
			__CONTRACT_ADDRESS,
		)

		setContract(contract)
	}, [web3])

	async function handleConnect() {
		const accounts = await web3.eth.requestAccounts()

		setAccounts(accounts)
	}

	async function handleHelloWorldContractCall() {
		if (!contract) {
			return
		}

		const greeting = await contract.methods.sayHello().call()
		setGreeting(greeting)
	}

	return (
		<div className="p-4">
			<h1 className="font-bold text-3xl text-blue-800">
				Smart Contract Test
			</h1>

			{accounts.length === 0 && (
				<button
					onClick={handleConnect}
					className="px-4 py-2 border bg-green-300"
				>
					Connect
				</button>
			)}
			{accounts.length > 0 && (
				<div>
					<button
						onClick={handleHelloWorldContractCall}
						className="px-4 py-2 border bg-purple-300"
					>
						Call Hello World
					</button>

					<h2>{greeting}</h2>
				</div>
			)}
		</div>
	)
}
