import { useEffect } from "react";

import { Client } from '@xmtp/xmtp-js'
import {ethers} from 'ethers';
const Xmtp = () => {
    useEffect(() => {

        
        const getMessage = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const Signer = provider.getSigner();
            // You'll want to replace this with a wallet from your application
            const wallet = window.ethereum.request({method:'eth_requestAccounts'});
            
            // Create the client with your wallet. This will connect to the XMTP development network by default
            const xmtp = await Client.create(Signer)
            // Start a conversation with XMTP
            const conversation = await xmtp.conversations.newConversation(
                '0x394B4d8d8Bf066dFbD2aBD6a705e646C29e80746'
            )
            // Load all messages in the conversation
            const messages = await conversation.messages()
            // Send a message
            await conversation.send('gm')
            // Listen for new messages in the conversation
            console.log('done');
            for await (const message of await conversation.streamMessages()) {
                console.log(`[${message.senderAddress}]: ${message.content}`)
            }
        }
        getMessage();
        },[])
        }


export default Xmtp;