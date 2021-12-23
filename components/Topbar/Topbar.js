import Link from 'next/link'
import { useState ,useEffect,React} from 'react';

import { useRouter } from "next/router"
import Web3Modal from "web3modal"
import { ethers } from "ethers"
import Web3 from "web3"

export default function Topbar() {
  
  const router =useRouter()

  async function cobra(){ 

  const web3Modal=new Web3Modal()
  const connection=await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const web3 = new Web3(provider);

  router.push('/')

  
  return(console.log(web3))
  }
    
return (
<header className="transparent scroll-dark">
  <div className="container">
    
    <div className="row">
      <div className="col-md-14">
        <div className="de-flex sm-pt12">
          <div className="de-flex-col">
            <div className="de-flex-col">
              
              {/* logo begin */}
              <div id="logo">
                
                <a href="/">
                  <img src="images/logo-3.png" />
                </a>
               
              </div>
              {/* logo close */}
            </div>
           
          </div>
          <div className="de-flex-col header-col-mid">
            {/* mainmenu begin */}
            <ul id="mainmenu">
              <li>
                
                <a href='/'>
                  Home
                  <span />
                </a>
                
                
              </li>
              <li>
               
                <a  href="/plots">
                  Lands
                  <span />
                </a>
              </li>
              </ul>
            {/* mainmenu close */}
            <div className="menu_side_area">
           
            
                <input
                type="button"
                id="submit"
                className="btn-main"
                 
                defaultValue="Connect Wallet"
                onClick={cobra}
                
                 />
                 
              
              <span id="menu-btn" />
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  </div>
</header>

        )
    }


