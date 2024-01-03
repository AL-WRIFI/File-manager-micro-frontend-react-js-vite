import { createStore ,applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducers from "./Reducer/index";
import { Provider } from 'react-redux';

// import { Provider, useSelector, useDispatch } from "react-redux";
// import * as actionsFile from "./actionCreators/FileActions/ActionsFileReducer";
// import * as actionsFolder from "./actionCreators/FolderActions/ActionsFolderReducer";


const store = createStore(
    RootReducers,
    composeWithDevTools(applyMiddleware(thunk))
);


export default function StoreProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
// export default store;
// export function useStore() {
//     // const count = useSelector((state) => state.counter.count);
//     const dispatch = useDispatch();
//     return {
//       addFile: () => dispatch(actionsFile.addFile()),
//       addFolder: () => dispatch(actionsFolder.addFolder()),
//     };
//   } 

// export function StoreProvider({ children }) {
//     return <Provider store={store}>{children}</Provider>;
//   }

