import { HashLink } from 'react-router-hash-link'
import './footer.scss'

export default function Footer() {
    return (
        <div className="footer">
            <div className="footerContent" data-aos="fade-up">
                <div className="wrapper">
                    <div className="left">
                        <div className="links">
                            <a href="https://www.azteccrypto.xyz/welcome" target="_blank"rel="noreferrer">Home</a> 
                            <a href="https://www.azteccrypto.xyz/info" target="_blank"rel="noreferrer">Info</a> 
                          
                            <a href="https://www.azteccrypto.xyz/resources" target="_blank"rel="noreferrer">Resources</a> 
                            <a href="https://quickswap.exchange/#/swap?inputCurrency=ETH&outputCurrency=0xe5087395862a208071A7909687a6c4Fe30458F1e&swapIndex=1" target="_blank"rel="noreferrer">Buy/Sell</a> 
                            <a href="https://staking.azteccrypto.xyz/" target="_blank"rel="noreferrer">Staking</a> 
                            <a href="https://www.azteccrypto.xyz/Whitepaper" target="_blank"rel="noreferrer">White Paper</a> 
                        </div>
                        
                    </div>
                    <div className="right">
                        <HashLink to="/" ><img src="assets/logo.png" alt="" /></HashLink>

                        <div className="socialLinks">
                            <a href="https://www.facebook.com/profile.php?id=100088880297462&mibextid=LQQJ4d" target="_blank"rel="noreferrer">
                                <i className="fab fa-facebook"></i>
                            </a> 
                            <a href="https://www.instagram.com/azteccryptocurrencyrgv/" target="_blank"rel="noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a> 

                            <a href="https://twitter.com/azteccryptorgv" target="_blank"rel="noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a> 
                        </div>
                    </div>
                </div>
                
                <span>Copyright 2024 <a href="https://azteccrypto.xyz/" target="_blank"rel="noreferrer">Aztec Crypto</a> | 
                <a href="https://www.azteccrypto.xyz/Term_Condition">Terms & Conditions</a> | 
                <a href="https://www.azteccrypto.xyz/PrivacyPolicy">Privacy Policy</a> | <a href="https://www.azteccrypto.xyz/disclaimer">Disclaimer</a></span>
            </div>
           
        </div>
    )
}
 