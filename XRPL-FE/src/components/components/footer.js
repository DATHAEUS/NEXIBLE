import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsTwitter, BsTwitch, BsReddit, BsInstagram, BsDribbble } from "react-icons/bs"
import { createGlobalStyle } from 'styled-components';

function Footer() {
    const [SocialTrigger, setSocialTrigger] = useState({
        Twitter: false,
        Titch: false,
        Reddit: false,
        Instagram: false,
        Dribble: false
    })
    function MouseEnter(current) {
        setSocialTrigger(
            {
                Twitter: false,
                Titch: false,
                Reddit: false,
                Instagram: false,
                Dribble: false,
                [current]: true,
            }
        )
    }

    function MouseLeave() {
        setSocialTrigger(
            {
                Twitter: false,
                Titch: false,
                Reddit: false,
                Instagram: false,
                Dribble: false,
            }
        )
    }



    const GlobalStyles = createGlobalStyle`
    @media only screen and (max-width: 800px) {
   .FirstDiv{
       margin-bottom:30px
   }
    }
@media only screen and (max-width: 500px) {
.ButtonSubscribe{
    font-size:12px;
    padding-inline:0.5rem !important;
    }
    .inputSubscribe{
    font-size:14px !important;
padding:0px 5px !important;
    }
}
`;



    return (
        <footer className="footer-light">
            <GlobalStyles />
            <div className="container" style={{ marginBottom: "90px", marginTop: "30px" }}>
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-1 FirstDiv" >
                        <h3>Get The Latest Nexible Updates</h3>
                        <div style={{ position: "relative" }}>
                            <input className='inputSubscribe' type="email" placeholder="Your Mail Address" style={{ "backgroundColor": "rgba(255,255,255,.5)", "color": "#fff", "background": "rgba(255,255,255,.15)", "height": "60px", "padding": "0.5rem 1.5rem", "fontSize": "1rem", "borderRadius": "2px", "fontWeight": "700", "width": "100%", border: "1px solid rgb(193 189 189)" }} />
                            <button type="submit" className='ButtonSubscribe' style={{ position: 'absolute', "right": "5px", "top": "50%", "transform": "translateY(-50%)", "height": "50px", "paddingInline": "1.5rem", "borderRadius": "2px", "background": "rgb(4, 17, 243)", "color": "#fff", "textTransform": "uppercase", "border": "none", "outline": "none", "boxShadow": "none", "transition": "all .3s ease", "cursor": "pointer", "fontWeight": "700" }}> Subscribe now</button>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-1">
                        <h3>
                            Join the Community
                        </h3>
                        <div className="row SocialFooterRow" >
                            <div className="SocialFooterMain col-md-2 col-sm-2 col-xs-2">
                                <div className='SocialFooter' onMouseEnter={() => MouseEnter("Twitter")} onMouseLeave={() => MouseLeave()} style={{ background: SocialTrigger.Twitter ? "rgb(4, 17, 243)" : " rgb(212, 218, 241)", borderRadius: SocialTrigger.Twitter ? "99px" : "5px" }}>
                                    <BsTwitter />
                                </div>
                            </div>
                            <div className="SocialFooterMain col-md-2 col-sm-2 col-xs-2">
                                <div className='SocialFooter' onMouseEnter={() => MouseEnter("Twitch")} onMouseLeave={() => MouseLeave()} style={{ background: SocialTrigger.Twitch ? "rgb(4, 17, 243)" : " rgb(212, 218, 241)", borderRadius: SocialTrigger.Twitch ? "99px" : "5px" }}>
                                    <BsTwitch />
                                </div>
                            </div>
                            <div className="SocialFooterMain col-md-2 col-sm-2 col-xs-2">
                                <div className='SocialFooter' onMouseEnter={() => MouseEnter("Reddit")} onMouseLeave={() => MouseLeave()} style={{ background: SocialTrigger.Reddit ? "rgb(4, 17, 243)" : " rgb(212, 218, 241)", borderRadius: SocialTrigger.Reddit ? "99px" : "5px" }}>
                                    <BsReddit />
                                </div>
                            </div>
                            <div className="SocialFooterMain col-md-2 col-sm-2 col-xs-2">
                                <div className='SocialFooter' onMouseEnter={() => MouseEnter("Instagram")} onMouseLeave={() => MouseLeave()} style={{ background: SocialTrigger.Instagram ? "rgb(4, 17, 243)" : " rgb(212, 218, 241)", borderRadius: SocialTrigger.Instagram ? "99px" : "5px" }}>
                                    <BsInstagram />
                                </div>
                            </div>
                            <div className="SocialFooterMain col-md-2 col-sm-2 col-xs-2">
                                <div className='SocialFooter' onMouseEnter={() => MouseEnter("Dribble")} onMouseLeave={() => MouseLeave()} style={{ background: SocialTrigger.Dribble ? "rgb(4, 17, 243)" : " rgb(212, 218, 241)", borderRadius: SocialTrigger.Dribble ? "99px" : "5px" }}>
                                    <BsDribbble />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>About</h5>
                            <ul>
                                <li><Link to="">Explore</Link></li>
                                <li><Link to="">How it works</Link></li>
                                <li><Link to="">Support</Link></li>
                                <li><Link to="">Become a partner</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>NFT Marketplace</h5>
                            <ul>
                                <li><Link to="">Sell your assets</Link></li>
                                <li><Link to="">FAQ</Link></li>
                                <li><Link to="">Support</Link></li>
                                <li><Link to="">Privacy/Policy</Link></li>
                                <li><Link to="">Your purchases</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Company</h5>
                            <ul>
                                <li><Link to="">About</Link></li>
                                <li><Link to="">Mission & Team</Link></li>
                                <li><Link to="">Our Blog</Link></li>
                                <li><Link to="">Services</Link></li>
                                <li><Link to="">We're Hiring</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>NFT Marketplace</h5>
                            <ul>
                                <li><Link to="">Sell your assets</Link></li>
                                <li><Link to="">FAQ</Link></li>
                                <li><Link to="">Support</Link></li>
                                <li><Link to="">Privacy/Policy</Link></li>
                                <li><Link to="">Your purchases</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ "width": "100vw", "marginRight": "auto", "marginLeft": "auto", "color": "rgb(0, 0, 0)", "fontSize": "1rem", "fontFamily": "Roboto, sans-serif", "lineHeight": "1.5", "display": "flex", "alignItems": "center", "alignContent": "center", "justifyContent": "center", "padding": "1.5rem 0px", "fontWeight": "600" }}>
                All rights reserved © Nexible2022 
            </div>
        </footer>
    )
};
export default Footer;