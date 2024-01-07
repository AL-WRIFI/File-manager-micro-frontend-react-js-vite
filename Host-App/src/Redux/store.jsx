import { createStore ,applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducers from "./Reducer/index";



const store = createStore(
    RootReducers,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;


