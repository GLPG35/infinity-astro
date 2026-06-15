import { useEffect, useState } from "react"

const SteamPrice = ({ appId, text, smallText }: { appId: number, text: string, smallText: string }) => {
	const [rootData, setRootData] = useState<{ [key: number]: { data: { price_overview: { discount_percent: number, initial_formatted: string, final_formatted: string } } } }|null>()
	
	useEffect(() => {
		fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json().then(json => {
				if (res.ok) {
					setRootData(json)
				}
		
				throw new Error(json.message)
		})).catch(() => {
			setRootData(null)
		})
	}, [])

	if (rootData === undefined) return <span>Loading price...</span>

	if (rootData === null) return <span>Price not found</span>
	
	const { [appId]: { data: { price_overview: { discount_percent: discount, initial_formatted: initial, final_formatted: final } } } } = rootData

	return <>
		{rootData === undefined ?
			<span>Loading price...</span>
		: rootData === null ?
			<span>Price not found</span>
		:
			<>
				<span>{discount > 0 ? text : ''} {discount > 0 ? <s>{initial}</s> : ''} {final}</span>
				{discount === 0 && <span className="small">{smallText}</span>}
			</>	
		}
	</>
}

export default SteamPrice
