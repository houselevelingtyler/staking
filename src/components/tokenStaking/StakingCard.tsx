import BtnTimer from 'components/timer/BtnTimer';
import { useEffect, useState } from 'react';
import moment from 'moment';
import './tokenStaking.scss'

type LoadingType = {
    title?: string
    profit?: number
    daysLeft?: number
    stakedAmount?: number
    earning?: number
    loginStatus?: boolean
    setIsLoading?(flag: boolean): void
    onStake?(category: string, amount: number): void
    onUnStake?(category: string): void
    onClaim?(category: string): void
};
export default function StakingCard(
    {
        title,
        profit,
        daysLeft,
        stakedAmount,
        earning,
        loginStatus,
        setIsLoading,
        onStake,
        onUnStake,
        onClaim,
    }: LoadingType) {

    const [imgCount, setImgCount] = useState(0)
    const onLoad = () => {
        setImgCount(imgCount + 1)
    }
    useEffect(() => {
        if (imgCount >= 5) {
            setIsLoading(false)
        }
    }, [setIsLoading, imgCount]);

    const [stakeCount, setStakeCount] = useState<number>(0)
    const [isValid, setIsValid] = useState(0)
    const onChangeVal = (e: any) => {
        if (e.target.value === '0') {
            setIsValid(1)
        } else {
            setIsValid(0)
        }
        setStakeCount(parseFloat(e.target.value))
    }
    const getDays = () => {
        if(moment(daysLeft * 1000).diff(moment(), 'days') < 0){
            return 0;
        }else{
            return moment(daysLeft * 1000).diff(moment(), 'days')
        }
    }
    return (
        <div className="staking_card">
            <div className="header">
                <div className="content_div">
                    <img src="assets/logo_icon.png" alt="" className='logoImg' onLoad={onLoad} />
                    <h2>{title || '_'}</h2>
                </div>
                <img src="/assets/divider.71006fc588fc4cf4cd88.png" alt="" className="bg" onLoad={onLoad} />
            </div>

            <div className="row_div">
                <p className='text lft'>PROFIT  :</p> <p className='text'> <span>{profit}</span> %</p>
            </div>
            <div className="row_div">
                <div className="input_div">
                    <input
                        type="number"
                        onChange={(e: any) => { onChangeVal(e) }}
                        value={stakeCount}
                        min={0}
                        max={10}
                        required
                        style={{ boxShadow: isValid === 0 ? '0px 0px 5px #ff040400' : '0px 0px 5px #ff3f04' }}
                    />
                    {(isValid === 1) && <p className='alrt'>Not Amount</p>}
                </div>

                <p className='text'><span>RGV</span></p>


            </div>

            <div className="btns">
            <button
                    className="claimBtn"
                    onClick={() => { onClaim(title) }}
                    disabled={!loginStatus || stakedAmount === 0 || getDays() !== 0}
                >
                    <p>Claim</p>
                </button>
                <button
                    className="button"
                    onClick={() => { onStake(title, stakeCount) }}
                >
                    <p>Stake</p>
                </button>

            </div>

            <div className="row_div">
                <p className='text lft'>Days Left</p>
                <p className='text'><span>{getDays()}</span> Days</p>
            </div>
            <div className="row_div">
                <p className='text lft'>Staked Amount</p>
                <p className='text'><span>{stakedAmount.toFixed(2)}</span> RGV</p>
            </div>
            <div className="row_div">
                <p className='text lft'>Earning</p>
                <p className='text'><span>{earning.toFixed(2)}</span> RGV</p>
            </div>

        </div>
    )
}