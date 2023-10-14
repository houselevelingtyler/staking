import { useEffect, useState } from 'react';
import StakingCard from './StakingCard';
import './tokenStaking.scss'

import { scClaimBronze, scClaimGold, scClaimSilver, scGetStakingEngineInfo, scStakeBronze, scStakeGold, scStakeSilver } from 'utils/contracts';
import { StakingEngineDetail } from 'utils/typs';
import toast from 'react-hot-toast';
import { useAccount, useNetwork } from 'wagmi';
import { currentNetwork } from 'utils';
import { useActiveWeb3 } from 'hooks/useActiveWeb3';

type LoadingType = {
    setIsLoading?(flag: boolean): void;
};
export default function TokenStaking({ setIsLoading }: LoadingType) {
    const category3Month = "3 Months";
    const category6Month = "6 Months";
    const category1Year = "1 Year";

    const [isCard1Loading, setIsCard1Loading] = useState(true)
    const [isCard2Loading, setIsCard2Loading] = useState(true)
    const [isCard3Loading, setIsCard3Loading] = useState(true)

    useEffect(() => {
        if (!isCard1Loading && !isCard2Loading && !isCard3Loading) {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    }, [setIsLoading, isCard2Loading, isCard1Loading, isCard3Loading]);


    const { isConnected, address } = useAccount();
    const { chain } = useNetwork();

    const [loginStatus, setLoginStatus] = useState(false);
    const [stakingEngineDetail, setStakingEngineDetail] = useState<StakingEngineDetail>(null);

    useEffect(() => {
        const isLoggedin = address && isConnected && chain.id === parseInt(currentNetwork);
        setLoginStatus(isLoggedin);
    }, [address, chain, isConnected]);

    useEffect(() => {
        scGetStakingEngineInfo(address).then(
            (engineInfo: StakingEngineDetail) => {
                setStakingEngineDetail(engineInfo);
            }
        );
    }, [address]);


    const {library} = useActiveWeb3();

    const onStake = async (category: string, tokenAmount: number) => {
        if (!loginStatus) {
            toast.error("Please connect wallet correctly!");
            return;
        }

        if (tokenAmount <= 0) {
            toast.error("Stake amount should be higher than 0");
            return;
        }

        const load_toast_id = toast.loading("Please wait for Staking...");
        try {
            let bSuccess = false
            
            if (category === category3Month) {
                bSuccess = await scStakeBronze(chain.id, library, address, tokenAmount);
            } else if (category === category6Month) {
                bSuccess = await scStakeSilver(chain.id, library, address, tokenAmount);
            } else if (category === category1Year) {
                bSuccess = await scStakeGold(chain.id, library, address, tokenAmount);
            }

            if (bSuccess) {
                toast.success("Staking Success!");
                setTimeout(() => {
                    scGetStakingEngineInfo(address).then(
                        (engineInfo: StakingEngineDetail) => {
                            setStakingEngineDetail(engineInfo);
                        }
                    );
                }, 3000);
            } else {
                toast.error("Staking Failed!");
            }
        } catch (error) {
            toast.error("Staking Failed!");
        }
        toast.dismiss(load_toast_id);
    };

    const onClaim = async (category: string) => {
        if (!loginStatus) {
            toast.error("Please connect wallet correctly!");
            return;
        }

        const load_toast_id = toast.loading("Please wait for Claim...");
        try {
            let bSuccess = false;

            if (category === category3Month) {
                bSuccess = await scClaimBronze(chain.id, library);
            } else if (category === category6Month) {
                bSuccess = await scClaimSilver(chain.id, library);
            } else if (category === category1Year) {
                bSuccess = await scClaimGold(chain.id, library);
            }

            if (bSuccess) {
                toast.success("Claim Success!");
                setTimeout(() => {
                    scGetStakingEngineInfo(address).then(
                        (engineInfo: StakingEngineDetail) => {
                            setStakingEngineDetail(engineInfo);
                        }
                    );
                }, 3000);
            } else {
                toast.error("Claim Failed!");
            }
        } catch (error) {
            toast.error("Claim Failed!");
        }
        toast.dismiss(load_toast_id);
    };

    return (
        <div className="tokenStaking">
            <div className="content">
                <h1>Aztec Crypto Currecy Staking</h1>
                <div className="wrapper" data-aos="zoom-in">
                    {loginStatus ?
                        <>
                            <div className="col_div">
                                <StakingCard
                                    title={category3Month}
                                    profit={2}
                                    daysLeft={stakingEngineDetail?.bronzeStakedTimestamp + stakingEngineDetail?.periodForBronze || 0}
                                    stakedAmount={stakingEngineDetail?.bronzeStaked || 0}
                                    earning={stakingEngineDetail?.bronzeRewards || 0}
                                    setIsLoading={setIsCard1Loading}
                                    onStake={onStake}
                                    onClaim={onClaim}
                                    loginStatus={loginStatus}
                                />
                            </div>
                            <div className="col_div">
                                <StakingCard
                                    title={category6Month}
                                    profit={5}
                                    daysLeft={stakingEngineDetail?.silverStakedTimestamp + stakingEngineDetail?.periodForSilver || 0}
                                    stakedAmount={stakingEngineDetail?.silverStaked || 0}
                                    earning={stakingEngineDetail?.silverRewards || 0}
                                    setIsLoading={setIsCard2Loading}
                                    onStake={onStake}
                                    onClaim={onClaim}
                                    loginStatus={loginStatus}
                                />
                            </div>
                            <div className="col_div">
                                <StakingCard
                                    title={category1Year}
                                    profit={11}
                                    daysLeft={stakingEngineDetail?.goldStakedTimestamp + stakingEngineDetail?.periodForGold || 0}
                                    stakedAmount={stakingEngineDetail?.goldStaked || 0}
                                    earning={stakingEngineDetail?.goldRewards || 0}
                                    setIsLoading={setIsCard3Loading}
                                    onStake={onStake}
                                    onClaim={onClaim}
                                    loginStatus={loginStatus}
                                />
                            </div>
                        </> :
                        <div className="not_connectiot">
                            <h2>Please Connect Wallet!</h2>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}