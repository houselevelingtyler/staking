import "./menu.scss"
import { HashLink } from 'react-router-hash-link'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
type MenuType = {
    menuOpen: boolean;
    setMenuOpen(flag: boolean): void;
};

export default function Menu({ menuOpen, setMenuOpen }: MenuType) {
    const [navId, setNavId] = useState('')
    const search = useLocation();
    useEffect(() => {
        const label = search.hash.replace('#', '')
        setNavId(label)
    }, [setNavId, search]);
    return (
        <div className={"sidebar " + (menuOpen && "active")}>
            <ul>

                <li onClick={() => setMenuOpen(false)} className={`menuItem1 ${menuOpen ? "active":""} ${navId === 'about'? 'selected':''}`}>
                    <HashLink to="/#about" smooth>About</HashLink>
                </li>
                <li onClick={() => setMenuOpen(false)} className={`menuItem2 ${menuOpen ? "active":""} ${navId === 'mint'? 'selected':''}`}>
                    <HashLink to="/#why-participate" smooth>Why Participate</HashLink>
                </li>
                <li onClick={() => setMenuOpen(false)} className={`menuItem3 ${menuOpen ? "active":""} ${navId === 'faq'? 'selected':''}`}>
                    <HashLink to="/#products" smooth>Products</HashLink>
                </li>
                <li onClick={() => setMenuOpen(false)} className={`menuItem4 ${menuOpen ? "active":""} ${navId === 'faq'? 'selected':''}`}>
                    <HashLink to="/#advantage" smooth>Advantage</HashLink>
                </li>
                
                <li onClick={() => setMenuOpen(false)} className={`menuItem5 ${menuOpen ? "active":""} ${navId === 'faq'? 'selected':''}`}>
                    <HashLink to="/#token" smooth>Tokenomics</HashLink>
                </li>

                <li onClick={() => setMenuOpen(false)} className={`menuItem6 ${menuOpen ? "active":""} ${navId === 'roadmap'? 'selected':''}`}>
                    <HashLink to="/#roadmap" smooth>Roadmap</HashLink>
                </li>
                <li onClick={() => setMenuOpen(false)} className={`menuItem7 ${menuOpen ? "active":""} ${navId === 'team'? 'selected':''}`}>
                    <HashLink to="/#faq" smooth>FAQ</HashLink>
                </li>
                
                <li onClick={() => setMenuOpen(false)} className={`menuItem7 ${menuOpen ? "active":""} ${navId === 'rarity'? 'selected':''}`}>
                    <HashLink to="/token_sale" smooth>Token Sale</HashLink>
                </li>

            </ul>
        </div>
    )
}

