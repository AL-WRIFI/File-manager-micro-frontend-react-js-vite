import FolderComponent from"./Components/FolderComponent/FoldersList"
// import { useDispatch } from 'react-redux';
// import { gitFolders } from "./Redux/actionCreators/FolderActions";
// import { useEffect } from "react";
// import { gitFiles } from "./Redux/actionCreators/FileActions";

function App() {

//   const dispatch = useDispatch();
//   useEffect(()=>{
   
//         dispatch(gitFolders("EYLLvsyDpGhTMlik7Bf3kloZ8h52"));
//         dispatch(gitFiles("EYLLvsyDpGhTMlik7Bf3kloZ8h52"));
    
// },[])
  return (
    
    <FolderComponent />
  )
}

export default App
