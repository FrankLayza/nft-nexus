const OPENSEA_NFT = import.meta.env.VITE_GET_NFT_OPENSEA

const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-api-key': OPENSEA_NFT }
}

export interface Nft {
    identifier: string | number,
    name: string,
    description: string,
    image_url: string
}

export const fetchNftCollection = async(): Promise<Nft[]> => {
    const res = await fetch ('https://api.opensea.io/api/v2/collection/pudgypenguins/nfts?limit=18', options)

    if(!res.ok){
        throw new Error('error fetching nfts')
    }
    const data = await res.json()
    return data.nfts
}