import { Fragment } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ShowItems from "./ShowItems";


const FoldersList=()=>{
    
    const {childFolders ,childFiles} = useSelector((state)=>({
    
        childFolders : state.Folders.userFolders.filter(
            (folder)=> (folder.data.parent === state.Folders.currentFolder)),

        childFiles : state.Files.userFiles.filter(
            (file)=> (file.data.parent === state.Folders.currentFolder)),     
    }),shallowEqual);
        
    return(
        <Fragment>
            {childFolders.length > 0 || childFiles.length > 0 ?
                <Fragment>          
                    {childFolders.length > 0 &&(
                        <ShowItems title="Folders" type="folder" items={childFolders}/>
                    )}  
                    {childFiles.length > 0 &&(
                        <ShowItems title="Files" type="file" items={childFiles}/>
                    )}   
                </Fragment>
                    
                :<p className="text-center my-5"> Empty Folder </p>
            } 
            {/* <Recentfile /> */}
        </Fragment>
    )
    
}

export default FoldersList;