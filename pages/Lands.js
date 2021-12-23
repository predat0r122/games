import { useState,useEffect } from "react"
import { ethers } from "ethers"

import { create as ipfsHttpClient } from "ipfs-http-client"
import { useRouter } from "next/router"
import Web3Modal from "web3modal"
import Link from "next/link"

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")




import LandSale from "../artifacts/contracts/LandSale.sol/LandSale.json"
import MaisonTower from "../artifacts/contracts/MaisonTower.sol/MaisonTower.json"


import {landsale,MSTWR} from '../config'
export default function Lands(){
  

    const [plots,setplots]=useState([])
    const [sold,setSoldp]=useState([])
    const[formInput,updateFormInput]=useState({rcp:'',cords:'',data:'',lvl:''})
    const router =useRouter()
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadplots()
      }, [])

    
 async function loadplots() { 
    const web3Modal=new Web3Modal({
        network: "mumbai",
        cacheProvider:true,
    })
    const connection = await web3Modal.connect()
    const provider= new ethers.providers.Web3Provider(connection)
    const signer=provider.getSigner()
   
    const LandContract= new ethers.Contract(landsale,LandSale.abi,signer)
    const NFTContract=new ethers.Contract(MSTWR,MaisonTower.abi,provider)
   
    
    console.log(Token_id);
    setplots(Token_id);
    setSoldp(plot);
    setLoadingState('loaded')
    
  }

  async function mintplot() {
   
    const web3Modal=new Web3Modal({
      network: "mumbai",
      cacheProvider:true,
      })
  const connection = await web3Modal.connect()
      const provider= new ethers.providers.Web3Provider(connection)
      const signer=provider.getSigner() 

   
      const cords=formInput.cords
      const myArray = cords.split(",");
      const x=myArray[0]
      const y=myArray[1]
      const recipient=formInput.rcp
      const data=formInput.data
      const NFTContract=new ethers.Contract(MSTWR,MaisonTower.abi,signer)
     
        let r =await NFTContract.mintLand(recipient,x,y,data)
        await r.wait()
        console.log(r.data)
        router.push('/plots')
    
      
      
      
      

}

      return(<form
        id="form-create-item"
        className="form-border"
        method="post"
        action="email.php"
  >
    <div className="field-set">
     
      <div className="d-create-file">
      </div>
      <div className="spacer-single" />
      <h5></h5>
      <div className="de_tab tab_methods">
        
        <div className="de_tab_content">
          <div id="tab_opt_1">
            <h5>Recipient</h5>
            <input
              type="text"
              name="item_price"
              id="item_price"
              className="form-control"
              placeholder="Recipient Address"
              onChange={e => updateFormInput({... formInput, rcp: e.target.value})}
            />
          </div>
          <div id="tab_opt_2">
            
          </div>
          <div id="tab_opt_3"></div>
        </div>
      </div>
      <h5>Land Coordinates</h5>
      <input
        type="text"
        name="item_title"
        id="item_title"
        className="form-control"
        placeholder="Coordinates  x,y"
        onChange={e => updateFormInput({... formInput, cords: e.target.value})}
      />
      
      <div className="spacer-10" />
      <h5>Token URI</h5>
      <textarea
        data-autoresize
        name="item_desc"
        id="item_desc"
        className="form-control"
        placeholder="e.g. 'This is Unique '"
        defaultValue=""
        onChange={e => updateFormInput({... formInput, data: e.target.value})}
        />

      <h5>Level</h5>
      <textarea
        data-autoresize
        name="item_desc"
        id="item_desc"
        className="form-control"
        placeholder="e.g. '1 - 10'"
        defaultValue=""
        onChange={e => updateFormInput({... formInput, lvl: e.target.value})}
        />
      <h5>Enter Your Name</h5>
      <textarea
        data-autoresize
        name="item_desc"
        id="item_desc"
        className="form-control"
        placeholder="Alex"
        defaultValue=""
        onChange={e => updateFormInput({... formInput,name: e.target.value})}
        />
     
      <div className="spacer-single" />
      <input
        type="button"
        id="submit"
        className="btn-main"
        defaultValue="Mint Plots"
        onClick={mintplot}
      />
    </div>
  </form>)
}