import { Web3Button, useAddress, useTokenBalance, useContract, useContractRead } from "@thirdweb-dev/react";
import { useState, useEffect} from 'react';
import { ethers } from "ethers";
import styles from '@/styles/style';


const Bank = () =>{
    const [amountToDeposit, setAmountToDeposit] = useState('')
    const [ amountToWithdraw, setAmountToWithdraw] =useState('');
    const bankAddress ='0x2a54C6FB7e6F1d5d21206F95ca8E67AE47f08C87';
    const gwrAddress ='0x3c38896342BB98E95c1BeEB6389729AefAa284a1';
    const { contract } = useContract(bankAddress);
    const [ transactionSuccessful, setTransactionSuccessful] = useState(false);
    const handleSuccess = (result: any) => {
        console.log('Transaction Successful',result);
        setTransactionSuccessful(true)
    };
    const address = useAddress();
    const { contract:gwrToken, isLoading:isgwrTokenLoading} = useContract(gwrAddress);
    const { data:gwrTokenBalance, refetch:refetchgwrTokenBalance} = useTokenBalance(gwrToken, address);
    const { data:balanceinfo, refetch:refetchBalanceInfo, isLoading: isBalanceLoading,} = useContractRead( contract,'balances',[address]);
    
    useEffect(() => {
        setInterval(() => {
          refetchData();
        }, 10000);
      }, []);

    const refetchData = () => {
        refetchgwrTokenBalance();
        refetchBalanceInfo();
     };   

    return(
        <section>
            <div>
                <div>
                <h3>Deposit Your $GWR</h3>
                <p>
                    Balance of GWR
                    <br/>{gwrTokenBalance?.displayValue}
                </p>
                <input
                placeholder="0"
                value={amountToDeposit}
                onChange={(e) => setAmountToDeposit(e.target.value)}
                className=""/>
                {transactionSuccessful? (
                 <Web3Button
                 contractAddress={bankAddress}
                 action={(contract) => {
                     contract.call('deposit',[ethers.utils.parseEther(amountToDeposit)])
                 }}
                 >Deposit</Web3Button>    
                ):(
                    <Web3Button
                    contractAddress={gwrAddress}
                    action={(contract) =>{
                        contract.call('approve',[bankAddress, ethers.utils.parseEther(amountToDeposit)
                        ])
                    }}
                    onError={(error) => alert('Something went wrong!')}
                    onSuccess = {handleSuccess}
                    >
                         Approve 
                </Web3Button>
                )}
                </div>

                <div>
                <h3>Withdraw Your $GWR</h3>
                <p>
                    Deposited $GWR
                    <br/>
                    {balanceinfo && ethers.utils.formatEther(balanceinfo.toString())}
                </p>
                <input
                placeholder="0"
                value={amountToWithdraw}
                onChange={(e) => setAmountToWithdraw(e.target.value)}
                className=""/>
                <Web3Button
                contractAddress={bankAddress}
                action={(contract) => {
                    contract.call('withdraw',[ethers.utils.parseEther(amountToWithdraw)])
                }}
                >Withdraw</Web3Button>
                </div>
                </div>
        </section>
    )
}
export default Bank;