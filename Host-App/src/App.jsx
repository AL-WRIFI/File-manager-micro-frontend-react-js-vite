
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import { Fragment ,lazy,Suspense,useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector ,shallowEqual, useDispatch} from "react-redux";
import { gitFolders } from "./Redux/actionCreators/FolderActions/GetFolders";
import { gitFiles } from "./Redux/actionCreators/FileActions/GetFiles";
// import Settings from './Components/Settings/Settings';
import NavbarComponent from './Components/Layouts/Navbar';
import Dashboard from './Components/Dashboard';
import Index from "./Components/Index";
import { changeTheme  } from "./Redux/actionCreators/AccountActions";

// import InfoFile from './components/Dashboard/infoFile';
const FileComponent = lazy (()=> import("Files_MFE/FileComponent")); 
const FoldersList = lazy (()=> import("Folders_MFE/FoldersList"));
const FilterPage = lazy (()=> import("Shared/FilterPage")); 
const Register = lazy (()=> import("Auth_MFE/Register")); 
const Login = lazy (()=> import("Auth_MFE/Login")); 
const Settings = lazy (()=> import("Settings_MFE/settings")); 
import "./App.css";
function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated , userId , darkMode } = useSelector((state) =>({ 
      isAuthenticated : state.auth.isAuthenticated ,
      userId: state.auth.user.uid,
      darkMode: state.Settings.darkMode,
      preferredColor: state.Settings.preferredColor,
  }),shallowEqual);

  useEffect(()=>{
      if(!isAuthenticated){
          navigate("/login");
      }else{
        dispatch(gitFolders(userId));
        dispatch(gitFiles(userId));
        navigate("/dashboard");
      }
  },[isAuthenticated]);

  const theme = darkMode ? "dark" : "light";
  return (
    
    <Fragment> 
    <div style={{ backgroundColor: darkMode ? "#181a1b" : "white" }} >
      <div className="container1">
        <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
        <div className="switch-checkbox">
          <label className="switch">
            <input type="checkbox" onChange={() => dispatch(changeTheme())} />
            <span className="slider round"> </span>
          </label>
        </div>
        <span style={{ color: darkMode ? "#c96dfd" : "grey" }}>☽</span>
      </div>
      <div data-bs-theme={theme} >
      <NavbarComponent/>
      <ToastContainer/>
      <Routes>
        <Route  path="settings" element={<Suspense> <Settings/> </Suspense>}/>
        {/* <Route  path="profile" element={ <Settings/> }> */}
        <Route  path="/login" element={ <Suspense> <Login/> </Suspense>} />
        <Route  path="/signup" element={ <Suspense> <Register/> </Suspense>} />
        <Route  path="/" element={<Dashboard />}/>
        <Route  path="/dashboard" element={<Dashboard />}>
            <Route  path='' element={<Index />} >
              <Route  path='' element={<Suspense fallback={<div>Loding....</div>}><FoldersList/></Suspense>}/>
              <Route  path="filter/:filterName" element={<Suspense><FilterPage /></Suspense>}/>
              {/* <Route  path="folder/:folderId" element={<FolderComponent />}/> */}
              <Route  path="file/:fileId" element={<Suspense><FileComponent/></Suspense>}/>    
          </Route>
        </Route>       
      </Routes>
      </div>
    </div>
      
    </Fragment>
    
  )
}

export default App
