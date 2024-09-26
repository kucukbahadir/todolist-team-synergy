import './App.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Todo from "./pages/todo";
import Detail from "./pages/detail";
import Completed from "./pages/completed";

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <a href='/login'>Login example</a> <br></br>
        <a href='/todo'>ToDo list example</a> <br></br>
        <a href='/detail'>Task detail example</a> <br></br>
        <a href='/completed'>Completed tasks example</a>        
      </header>
      <main className="App-main">
      <Router>
        <Routes>
          <Route exact path="/" element= {<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/todo" element={<Todo />}/>
          <Route path="/detail" element={<Detail />}/>
          <Route path="/completed" element={<Completed />}/>
        </Routes>
        </Router>
        
      </main>
    </div>
  );
}

export default App;
