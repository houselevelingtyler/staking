import { useEffect, useState } from 'react';
import './why.scss'

type PropsType = {
    setIsLoading?:(flag: boolean)=> void;
};
export default function Why({setIsLoading}:PropsType) {

    const [imgCount, setImgCount] = useState(0)
    const onLoad = ()=>{
        setImgCount(imgCount + 1)
    }
    useEffect(() => {
        if (imgCount>=3){
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    }, [setIsLoading, imgCount]);
    return (
        <div className="why" id="why-participate">
            <div className="whyContent">
                <div className="title" data-aos="fade-up">
                    <h1>Why Participate In Swisscheese Token ($SWCT) ICO?</h1>
                </div>
                <div className="wrapper">
                    
                    <div className="left" data-aos="fade-right">
                        <h2>Platform’s Native Token</h2>
                        <p>$SWCT is at the center of everything we do at Swisscheese. Token swapping, rewards disbursement, and many other crucial aspects of the exchange are done using the $SWCT token</p>

                        <h2>ERC-20 Token Standard</h2>
                        <p>$SWCT is an ERC-20 token built on the Polygon blockchain. This allows high scalability while not compromising the platform’s security.</p>

                        <h2>Huge Growth Potential</h2>
                        <p>As the Swisscheese ecosystem grows, so does the potential for the $SWCT token. With more users and transactions taking place on the platform, the demand for $SWCT will continue to increase. This, in turn, will increase the price of $SWCT, providing holders with a strong return on investment.</p>

                        <h2>OTC Rebates</h2>
                        <p>Customers who hold enough SWCT will receive rebates from all of their OTC trading on Swisscheese.finance.</p>
                    </div>
                    <div className="right" data-aos="fade-left">
                        <img src="assets/imgs/choose.png" alt=""  onLoad={onLoad}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
