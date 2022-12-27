import './App.css';
import Game from './components/Game';
import Register from './components/Register';
import Scores from './components/Scores';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
function App() {
  return (
    <Router>
      <>
      <Routes>
        <Route exact path="/" element={<Register/>}></Route>
        <Route exact path="/:id" element={<Game/>}></Route>
        <Route exact path="/scores" element={<Scores/>}></Route>
      </Routes>
      </>
    </Router>
  )
}

export default App;
