import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="landingPageContainer">
           <nav>
            <div className="navHeader">
                <h1>Vemeet</h1>
            </div>
            <div className="navlist">
                <p>Join as Guest</p>
                <p>Register</p>
                <div role='button'>
                    <p>Login</p>
                </div>
            </div>
           </nav>
           <div className="landingMainContainer">
            <div>
                <h1><span style={{color:"#FF9839"}}>Connect</span> with your loved Ones</h1>
                <p>Cover a distance by Vemeet</p>
                {/* <div>
                    <button>Get Started</button>
                </div> */}
                <div>
                    <Link to="/auth">
                        <button>Get Started</button>
                    </Link>
                </div>
            </div>
            <div>
                <img src="/image1.png" alt="landingImage" />
            </div>
           </div>
        </div>
    );
}