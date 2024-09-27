import React from "react";

// Due to the router being nested in "App-main", it also takes its CSS, found in "App.css"
const Todo = () => {
    return (
        <div>
            <div className="container-fluid bg-black rounded-pill">
                <br></br>
                    <div className="row justify-content-center align-items-center text-center">
                        <div className="col"></div>
                        <div className="col">
                            <div className="underline p-2">
                                <h2 className="tx-pro">todo lists</h2>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                <br></br>
            </div>
            <br></br>
            <div className="container-xl">
                    <div className="row justify-content-center align-items-center text-center">
                        <div className="col-4"></div>
                        <div className="col-4">
                        <a href="https://www.playstation.com/nl-nl/games/the-last-of-us-part-ii-remastered/"
                           className="btn btn-outline-success">Add todolist</a>
                        </div>
                        <div className="col-4"></div>
                    </div>
            </div>
            <br></br>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col-3">
                        <div className="card rounded-pill">
                            <div className="card-body">
                                <h4 className="card-title">To do 1</h4>
                                <p className="card-text">I need to add some things to this page</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card rounded-pill">                      
                            <div className="card-body">
                                <h4 className="card-title">To do 2</h4>
                                <p className="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card rounded-pill">                      
                            <div className="card-body">
                                <h4 className="card-title">To do 3</h4>
                                <p className="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card rounded-pill">                      
                            <div className="card-body">
                                <h4 className="card-title">To do 4</h4>
                                <p className="card-text">Text</p>
                            </div>
                        </div>
                    </div>  
                    <div className="col-3">
                        <div className="card rounded-pill">                     
                            <div className="card-body">
                                <h4 className="card-title">To do 5</h4>
                                <p className="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card rounded-pill">                    
                            <div className="card-body">
                                <h4 className="card-title">To do 6</h4>
                                <p className="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card rounded-pill">
                            <div className="card-body">
                                <h4 className="card-title">To do 7</h4>
                                <p className="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card rounded-pill">
                            <div className="card-body">
                                <h4 className="card-title">To do 8</h4>
                                <p className="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;
