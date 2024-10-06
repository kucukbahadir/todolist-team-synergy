import React, {useEffect} from "react";

// Due to the router being nested in "App-main", it also takes its CSS, found in "App.css"
const Completed = () => {

    useEffect(() => {
        // This will run when the component is first mounted (or the page is reloaded)
        let jsonString = localStorage.getItem("tasksUser");
        let jsonArray = []

        if (jsonString){
            jsonArray = JSON.parse(jsonString).filter((todo) => todo.completed === true);
            console.log(jsonArray);
        }
    }, []);

    return (
        <div>
            <div>
                <h1>Completed</h1>
            </div>
            <div>

            </div>
        </div>
    );
};
 
export default Completed;