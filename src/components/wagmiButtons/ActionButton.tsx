// import { useEffect } from "react";
// import {
//   useDisconnect,
//   useAppKit,
//   useAppKitNetwork,
//   useAppKitAccount,
// } from "@reown/appkit/react";
// import { parseGwei, type Address } from "viem";
// import {
//   useEstimateGas,
//   useSendTransaction,
//   useSignMessage,
//   useBalance,
// } from "wagmi";

//to test transaction, don't use, just testing it out
// const TEST_TX = {
//   to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045" as Address,
//   value: parseGwei("0.001"),
// };

// interface ActionButtonListProps {
//   sendHash: (hash: `0x${string}`) => void;
//   sendSignMsg: (hash: string) => void;
//   sendBalance: (balance: string) => void;
// }

// export const ActionButton = ({
//   sendBalance,
//   sendHash,
//   sendSignMsg,
// }: ActionButtonListProps) => {
// //   const { disconnect } = useDisconnect(); // AppKit hook to disconnect
// //   const { open } = useAppKit(); // AppKit hook to open the modal
// //   const { switchNetwork } = useAppKitNetwork(); // AppKithook to switch network
// //   const { address, isConnected } = useAppKitAccount(); // AppKit hook to get the address and check if the user is connected

// //   const { data: gas } = useEstimateGas({ ...TEST_TX }); // Wagmi hook to estimate gas
// //   const { data: hash, sendTransaction } = useSendTransaction(); // Wagmi hook to send a transaction
// //   const { signMessageAsync } = useSignMessage(); // Wagmi hook to sign a message
// //   const { refetch } = useBalance({
// //     address: address as Address,
// //   }); // wagmi hook to get balance

// //   useEffect(() => {
// //     if(hash){
// //         sendHash(hash)
// //     }
// //   }, [hash])

// };

// everything in this component is for reference purpose, mostly reown action buttons functionalities
