import logo from './logo.svg';
import Header from './Components/Header'
import NavBarHome from './Components/NavBarHome'
import Homepage from './Components/Homepage'
import capa from './img/capa.png'
import './App.css'
function App() {
  return (
    <div className="App img" style={{
      height:"100%"
    }}>
        <NavBarHome/>
        <Homepage/>
    </div>
  );
}

export default App;
