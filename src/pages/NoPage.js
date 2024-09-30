import react from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
    return (
        <div className={"flex flex-col space-y-8"}>
            <h1 className={"font-bold text-4xl"}>404 Page not found</h1>
            <Link to="/" class={"rounded-lg bg-white text-gray-800 p-4 shadow-lg hover:bg-gray-300"}>Go Back Home</Link>
        </div>
    );
};

export default NoPage;