import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment ,lazy,Suspense} from "react";
import { useDispatch, useSelector } from "react-redux";
import { faAlignRight, faCircleArrowRight, faPaste ,faSquareCheck} from "@fortawesome/free-solid-svg-icons";
import { clearBuffer, goBack } from "../Redux/actionCreators/FolderActions/ActionsFolderReducer";
import { Outlet } from "react-router";
import Sidebar from "./Layouts/Sidebar";

import { MoveFolder , pasetFolder } from "Folders_MFE/actions"; 
import { MoveFile , pasteFile } from "Files_MFE/actions"; 
import { setSelectItemsMode } from "../Redux/actionCreators/BufferAactions";
const CreateFile   = lazy (()=> import("Files_MFE/CreateFile")); 
const UploadFile   = lazy (()=> import("Files_MFE/UploadFile"));
const CreateFolder = lazy (()=> import("Folders_MFE/CreateFolder")); 
const DropdownMenu = lazy (()=> import("Shared/DropdownMenu")); 
// const FoldersList  = lazy (()=> import("Folders_MFE/FoldersList")); 


function Index(){
    
    const dispatch = useDispatch();
    const {childFolders ,childFiles ,currentFolder ,itemsBuffer ,currentFolderData , selectItemsMode ,actionBuffer} = useSelector((state)=>({
        
        isLoading : state.Folders.isLoading, 
        currentFolder : state.Folders.currentFolder,
        itemsBuffer: state.Buffer.itemsBuffer,
        actionBuffer: state.Buffer.action,
        selectItemsMode : state.Buffer.selectItemsMode,
        currentFolderData : state.Folders.userFolders.find(
            (folder)=> folder.docId === state.Folders.currentFolder),

        childFolders : state.Folders.userFolders.filter(
            (folder)=> (folder.data.parent === state.Folders.currentFolder)),

        childFiles : state.Files.userFiles.filter(
            (file)=> (file.data.parent === state.Folders.currentFolder)),     
    }));

    const checkAlreadyExists = (name) =>{
        let newName = name;
        let counter = 1;
        let nameList;
        const dotIndex = newName.lastIndexOf('.');
        const baseName = dotIndex !== -1 ? newName.slice(0, dotIndex) : newName;
        const extension = dotIndex !== -1 ? newName.slice(dotIndex) : '';
        itemsBuffer.map((el)=>{
            nameList = el.data.type == "folder" ? childFolders : childFiles;
        })
        
        
        while (nameList.find(file => file.data.name === newName)) {
            newName = `${baseName}(${counter})${extension}`;
            counter++;
        }

        return newName; 
    }
    const getTypeActions = (type) =>{
    const actions = type === "folder" ? 
    {move:MoveFolder , paste:pasetFolder}: 
    {move:MoveFile , paste:pasteFile};

    return actions;
    }

    const pasetAction = () =>{

        itemsBuffer.map((el)=>{
            const name = checkAlreadyExists(el.data.name);
            const docId = el.docId;
            const parentId = el.data.parent;
            const path = currentFolder !== "root" ? [...currentFolderData.data.path,currentFolderData.docId]:[];
            const data = {
                ...el.data,
                name : name,
                path : path,
                parent : currentFolder,
            }
            const actions = getTypeActions(el.data.type);
            actionBuffer === "cut" ?
            dispatch(actions.move(docId,data,parentId)):
            dispatch(actions.paste(docId,data));
            
        })
        dispatch(clearBuffer())        
    }  

    const goBackFolder = ()=>{
       dispatch(goBack());
    }

    return(
    <Fragment>
        <div className="container">
            <div className="row mt-5">
                <Sidebar />
                <div className="col-12 col-lg-9">
                    <div className="card ">
                        <div className="card-body ">
                            <div className="row mb-3">
                                <div className="col-lg-4 col-sm-6">
                                    <div className="search-box mb-2 me-2">
                                        <div className="d-flex align-items-center justify-content-between ">
                                            {currentFolder !== "root" ?
                                                <div type="button" onClick={goBackFolder} className="m-2">
                                                    <FontAwesomeIcon icon={faCircleArrowRight} rotation={180} size="xl" className="" />  
                                                </div>
                                            : ""}     
                                            <input type="text" className="form-control bg-light border-light rounded " placeholder="Search..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-6">
                                    <div className="mt-4 mt-sm-0 d-flex align-items-center justify-content-sm-end">
                                        <div className="mb-2 me-2">
                                            <div className="dropdown">
                                                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="mdi mdi-plus me-1"></i> Create New
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-end ">
                                                    <a className="dropdown-item" href="#"><i className="mdi mdi-folder-outline me-1 d-flex align-items-center justify-content-end"></i><div><CreateFile/></div></a>
                                                    <a className="dropdown-item" href="#"><i className="mdi mdi-file-outline me-1 d-flex align-items-center justify-content-end"></i><CreateFolder/></a>
                                                    <a className="dropdown-item" href="#"><i className="mdi mdi-file-outline me-1 d-flex align-items-center justify-content-end"></i><UploadFile/></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown mb-0">
                                            <DropdownMenu/>
                                            <a className="btn btn-link text-muted  p-1 mt-n2" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                <i className="mdi mdi-dots-vertical font-size-20"><FontAwesomeIcon icon={faAlignRight}/></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                    {itemsBuffer.length !=0 &&
                                                    <div type="button" className="dropdown-item" >                                   
                                                        <div onClick={pasetAction} > Paste &nbsp;
                                                            <FontAwesomeIcon icon={faPaste}/>
                                                        </div>
                                                    </div>               
                                                    }
                                                <a onClick={ ()=> dispatch(setSelectItemsMode(true))} className="dropdown-item" href="#">select  &nbsp; <FontAwesomeIcon icon={faSquareCheck} /></a>
                                                <a className="dropdown-item" href="#">share</a>
                                                <a className="dropdown-item" href="#">info</a>
                                            </div>
                                        </div>         
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3"></div>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>              
    </Fragment>
    )  
}

export default Index;