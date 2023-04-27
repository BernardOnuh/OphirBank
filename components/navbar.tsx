import { useState } from 'react';
import { ConnectWallet } from '@thirdweb-dev/react';

const Navbar = () => {
    return (
        <nav className="w-full  flex py-6 justify-between items-center navbar ">
            <img
            src='./logo.png'
            alt='logo'
            />

            <ConnectWallet/>
        </nav>
    )
}
export default Navbar;