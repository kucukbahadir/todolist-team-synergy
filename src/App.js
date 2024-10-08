import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Todo from "./pages/todo";
import Detail from "./pages/detail";
import Completed from "./pages/completed";
import Navbar from "./components/Navbar";
import NoPage from "./pages/noPage.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="App-main">
          <Routes>
            <Route exact path="/" element= {<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/todo" element={<Todo />}/>
            <Route path="/completed" element={<Completed />}/>
            <Route path="*" element={<NoPage />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
      </main>
    </div>
  );
}

export default App;
