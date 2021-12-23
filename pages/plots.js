import { useState, useEffect } from "react"
import { ethers } from "ethers"
import axios from "axios"
import { create as ipfsHttpClient } from "ipfs-http-client"
import { useRouter } from "next/router"
import Web3Modal from "web3modal"
import Link from "next/link"

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")




import LandSale from "../artifacts/contracts/LandSale.sol/LandSale.json"
import MaisonTower from "../artifacts/contracts/MaisonTower.sol/MaisonTower.json"


import { landsale, MSTWR } from '../config'
export default function Landers() {


    const [plots, setplots] = useState([])
    const [sold, setSoldp] = useState([])
    const [formInput, updateFormInput] = useState({ rcp: '', cords: '' })
    const router = useRouter()
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        plotss()
    }, [])


    async function plotss() {
        const web3Modal = new Web3Modal({
            network: "mumbai",
            cacheProvider: true,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        
        const plotsContract = new ethers.Contract(MSTWR, MaisonTower.abi, provider)
        var plotes = []
        let ttl=await plotsContract.totalSupply()

        for (let i = 4; i <=ttl; i++) {
            
            let pl = await plotsContract.getCoordinatesFromId(i);
            let gl = await plotsContract.tokenURI(i);
            
            const meta=await axios.get(gl)
            
            let cl = await plotsContract._Level([i]);
            var rrl=cl.toNumber();
            var dl = pl[0].toNumber();
            
            var fl = pl[1].toNumber();
            var ml=pl
            var dm =meta.data.image
            var f = [dl, fl, dm,rrl]
            console.log(f)
            plotes.push(f);

        }





        console.log(plotes);
        setplots(plotes);



    }

    return (
        <>

            <div className="container">
                <div className="row wow fadeIn">
                    <div className="col-lg-12">
                        <div className="no-bottom no-top" id="content">

                            <section id="section-collections" className="pt30 pb30">
                                <div className="container">

                                    <div className="row wow fadeIn">
                                        <div className="col-lg-12">
                                        <div className="spacer-double" />
                                        <div className="spacer-double" />
                                        <div className="spacer-double" />
                                            <h2 className="style-2">Lands</h2>
                                        </div>

                                        <div className="container">
                                            
                                            
                                                <div className="col-lg">
                                                    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                        
                                                        {
                                                            plots.map((plot, i) => (
                                                                <div div key={i} className="nft__item style-2">
                                                                    
                                                                    <div className="nft__item_wrap">
                                                                        <a href="">
                                                                            <img src={plot[2]} className="lazy nft__item_preview" />
                                                                        </a>
                                                                    </div>
                                                                    <div className="nft__item_info">
                                                                        <a href="03_grey-item-details.html">
                                                                            <h4></h4>
                                                                        </a>
                                                                        <div className="nft__item_price">
                                                                            MATIC<span></span>
                                                                        </div>
                                                                        <div className="nft__item_action">
                                                                            <a href="#"></a>
                                                                        </div>
                                                                        <div className="nft__item_like">
                                                                            <i className="Level"></i><span>LEVEL:{plot[3]}</span>
                                                                        </div>

                                                                    </div>
                                                                    
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                
                                            </div>




                                       
                                    </div>
                                </div>
                            </section>




                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}