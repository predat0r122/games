

import Footer from './Footer/Footer'
import Topbar from './Topbar/Topbar'

export default function Layout({children}) {
    return (
        <>
            <Topbar/>
            {children}
            <Footer/>
        </>
    );
}
