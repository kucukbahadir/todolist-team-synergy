import './App.css';

import {
    BrowserRouter,
    Routes,
    Route, useNavigate,
} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Todo from "./pages/todo";
import Detail from "./pages/detail";
import Completed from "./pages/completed";
import Navbar from "./components/Navbar";
import ProtectedRoute from './components/ProtectedRoute.js';
import NoPage from "./pages/noPage.js";
import {SessionService} from "./services/SessionService";
import FetchInterceptor from "./services/FetchInterceptor";

function App() {
  const navigate = useNavigate();
  new FetchInterceptor(SessionService, navigate);

  return (
    <div className="App">
      <Navbar />
      <main className="App-main">
          <Routes>
            <Route exact path="/" element= {<Home />}/>
            <Route path="/login" element={<Login />}/>
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
            <Route path="/detail/:listID/:taskID" element={<Detail />} />
          </Routes>
      </main>
    </div>
  );
}

export default App;
