import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { Provider } from 'react-redux';
import {  BrowserRouter as Router  } from 'react-router-dom';
// import store from './Redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(

    <Router>
     <App />
   </Router>
)
