import React from "react";

import logo from '../logo.svg';

// Due to the router being nested in "App-main", it also takes its CSS, found in "App.css"
const Home = () => {
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
        </div>
    );
};
 
export default Home;
