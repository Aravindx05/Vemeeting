import React from "react";

export default function Landing() {
    return (
        <div className="landingPageContainer">
           <nav>
            <div className="navHeader">
                <h1>Vemeeting</h1>
            </div>
            <div className="navlist">
                <p>Join as Guest</p>
                <p>Register</p>
                <div role='button'>
                    <p>Login</p>
                </div>
            </div>
           </nav>
        </div>
    );
}