import './App.css';
// import Greeting from './components/Greeting';
// import Super from './components/Super';
// import Application from './components/Application';
// import ExternalPlugin from './components/ExternalPlugin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import TopBar from './components/TopBar';
import Routes from './Routes';

// Greeting.defaultProps = {
//   designation:'Software engineer',
//   employeeCode:'2020',
// }

function App() {
  return (
    // <div className="App">
    //   {/* <Greeting name="User"/>
    //   <Super/>
    //   <Application/>
    //   <ExternalPlugin/> */}
    //   <Login/>
    // </div>
    <Router>
      <div className="App">
          <TopBar />
          <Routes />
      </div>
    </Router>
  );
}

export default App;
