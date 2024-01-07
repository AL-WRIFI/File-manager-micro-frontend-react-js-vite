import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {  BrowserRouter as Router  } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
ReactDOM.createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>
    <Router>
     <App />
   </Router>
 </Provider>,
  
)
