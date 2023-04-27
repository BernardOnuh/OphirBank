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
        <section className={`flex justify-center items-center ${styles.paddingY}`}>
            <div className='sm:flex  grid-cols-2 gap-2 '>
                <div>
                <div className='border rounded-md py-5 px-1 content-center'>
                <h3 className='font-semibold text-center pb-3'>Deposit Your $GWR</h3>
                <p className="text-[12px] text-center text-black rounded-md  pb-3">
                    Balance of $GWR
                    <br/>{gwrTokenBalance?.displayValue}
                </p>
                <input
                placeholder="Deposit"
                value={amountToDeposit}
                onChange={(e) => setAmountToDeposit(e.target.value)}
                className="w-2/3  h-10 rounded-md bg-neutral-900  border-black pb-3  mx-auto flex justify-center items-center"/>
                <div className='px-12 py-2 flex justify-center items-center'>
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
                </div>
                </div>
                <div>
                <div className='border rounded-md py-5 px-10 content-center'>
                <h3 className='font-semibold text-center pb-3'>Withdraw Your $GWR</h3>
                <p className="text-[12px] text-center text-black rounded-md  pb-3">
                    Deposited $GWR
                    <br/>
                    {balanceinfo && ethers.utils.formatEther(balanceinfo.toString())}
                </p>
                <input
                placeholder="Withdraw"
                value={amountToWithdraw}
                onChange={(e) => setAmountToWithdraw(e.target.value)}
                className="w-2/3  h-10 rounded-md bg-neutral-900  border-black pb-3  mx-auto flex justify-center items-center"/>
                <div className='px-12 py-2 flex justify-center items-center'>
                <Web3Button
                contractAddress={bankAddress}
                action={(contract) => {
                    contract.call('withdraw',[ethers.utils.parseEther(amountToWithdraw)])
                }}
                >Withdraw</Web3Button>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}
export default Bank;