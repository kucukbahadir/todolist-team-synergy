// App.js
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Todo from "./pages/todo";
import Detail from "./pages/detail";
import Completed from "./pages/completed";
import Navbar from "./components/Navbar";
import ProtectedRoute from './components/ProtectedRoute.js';
import NoPage from "./pages/noPage.js";
import { SessionService } from "./services/SessionService";
import FetchInterceptor from "./services/FetchInterceptor";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize FetchInterceptor with SessionService and navigate function
        const fetchInterceptor = new FetchInterceptor(SessionService, navigate);

        // Optionally store instances in session or context if needed elsewhere
        return () => {
            // Cleanup if needed
            fetchInterceptor.unregister();
        };
    }, [navigate]);

    return (
        <div className="App" >
            <Navbar />
            <main className="App-main">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/todo" element={
                        <ProtectedRoute>
                            <Todo />
                        </ProtectedRoute>
                    } />
                    <Route path="/completed" element={
                        <ProtectedRoute>
                            <Completed />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/detail/:id" element={<Detail />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
