import useAuth from 'hooks/useAuth';
import './connectModal.scss'
import Bounce from 'react-reveal/Bounce';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { currentNetwork } from 'utils';
interface Props {
    showConnectModal: boolean,
    setShowConnectModal?: any

}
const ConnectModal: React.FC<Props> = ({
    showConnectModal,
    setShowConnectModal
}) => {

    const { login } = useAuth();
    const { isConnected, address } = useAccount();
    const { chain } = useNetwork();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);


    const connectMetamask = () => {
        login(1);
        setShowConnectModal(false);
    }
    const connectWalletConnector = () => {
        login(2);
        setShowConnectModal(false);
    }

    const connectWalletCoinbase = () => {
        login(3);
        setShowConnectModal(false);
    }

    const [isStart, setIsStart] = useState(false)
    useEffect(() => {
        if (showConnectModal) {
            setTimeout(() => {
                setIsStart(true)
            }, 100)
        }

    }, [setIsStart, showConnectModal]);
    const onClose = () => {
        setIsStart(false)
        setTimeout(() => {
            setShowConnectModal(false);
        }, 800)
    }
    return (
        <div className={showConnectModal === true ? "connectModal active" : "connectModal"}>
            <Bounce opposite when={isStart}>
                <div className="modelContent">
                    <div className="connectWalletHeader">
                        <h1 className="connectWalletTitle">Connect Wallet</h1>
                        <button className="connectModalCloseButton" onClick={onClose}><i className="fas fa-angle-double-right"></i></button>
                    </div>
                    <div className="connectWalletWrapper">
                        {
                            !isMobile && (
                                <div className="btn_div" onClick={connectMetamask}>
                                    <div className="icon">
                                        <img src="assets/metamask.png" alt="" />
                                    </div>

                                    <div className="text">
                                        <h2>Metamask</h2>
                                    </div>
                                </div>
                            )
                        }

                        <div className="btn_div" onClick={connectWalletConnector}>
                            <div className="icon">
                                <img src="assets/wallet-connect.png" alt="" />
                            </div>
                            <div className="text">
                                <h2>Wallet Connect</h2>
                            </div>
                        </div>

                        <div className="btn_div" onClick={connectWalletCoinbase}>
                            <div className="icon">
                                <img src="assets/coinbase.png" alt="" />
                            </div>
                            <div className="text">
                                <h2>Coinbase</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </Bounce>

        </div>
    )
}
export default ConnectModal;