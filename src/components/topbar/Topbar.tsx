// import CustomDropdown from 'components/dropdown/CustomDropdown';
import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'
import { currentNetwork, truncateWalletString } from 'utils';
import { scGetBalances } from 'utils/contracts';
import ConnectModal from '../connectModal/ConnectModal';
import AccountModal from "components/accountModal/AccountModal";
import './topbar.scss'
import { useAccount, useNetwork } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

type MenuType = {
    menuOpen?: boolean;
    setMenuOpen(flag: boolean): void;
};
export default function Topbar({ menuOpen, setMenuOpen }: MenuType) {
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [showAccountModal, setShowAccountModal] = useState(false);

    const { isConnected, address } = useAccount();
    const { chain } = useNetwork();

    const [loginStatus, setLoginStatus] = useState(false);
    const [balances, setBalances] = useState<number[]>([0.00, 0.00]);

    useEffect(() => {
        const isLoggedin = address && isConnected && chain.id === parseInt(currentNetwork);
        setLoginStatus(isLoggedin);
        if (isLoggedin) {
            scGetBalances(address).then(
                (balances: number[]) => {
                    setBalances(balances);
                }
            );
        }
    }, [address, chain, isConnected]);

    return (
        <div className="topbar">
            <div className="content">
                <div className="logo">
                    <HashLink to="/" ><img src="assets/logo.gif" alt="" /></HashLink>
                </div>

                {loginStatus &&
                    <div className="balance_div">
                        <div className="balance">
                            <p className='mob_text'>MATIC : </p>
                            <p><span> {balances?.[0].toFixed(2) || "0.00"} </span> <img src="/assets/icons/magic.webp" alt="" /></p>
                        </div>
                        <div className="balance">
                            <p className='mob_text'>RGV : </p>
                            <p><span> {balances?.[1].toFixed(2) || "0.00"} </span> <img src="/assets/logo_icon.png" alt="" /></p>
                        </div>
                    </div>
                }

                <div className="connectBtn button" onClick={() => { !loginStatus ? setShowConnectModal(true) : setShowAccountModal(true); }}>
                    <p>{loginStatus ? truncateWalletString(address) : "Connect Wallet"}</p>
                </div>

                {/* <ConnectButton/> */}

                <div className={(menuOpen ? "hamburger active" : "hamburger")} onClick={() => setMenuOpen(!menuOpen)}>
                    <span className="line1"></span>
                    <span className="line2"></span>
                    <span className="line3"></span>
                </div>
            </div>

            <ConnectModal showConnectModal={showConnectModal} setShowConnectModal={setShowConnectModal} />
            <AccountModal showAccountModal={showAccountModal} setShowAccountModal={setShowAccountModal} />
        </div>
    )
}
