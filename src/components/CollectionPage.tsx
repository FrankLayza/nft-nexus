import Confused from '../assets/confused.jpg'

const CollectionPage = () => {
    return ( 
        <>
            <div className="flex flex-col min-h-screen justify-center items-center font-bold">
                <div className='py-4'>
                    <img src={Confused} alt="" className='w-full h-64' />
                </div>
                <h3 className="text-2xl">NO NFTs Found</h3>
                <p>We couldn't find any NFTs here yet.</p>
                <p>Try Switching the network or try later</p>
            </div>
        </>
     );
}
 
export default CollectionPage;