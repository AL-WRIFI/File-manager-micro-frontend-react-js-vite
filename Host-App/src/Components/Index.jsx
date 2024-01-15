import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment ,lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";
// import { goBack } from "../Redux/actionCreators/FolderActions/ActionsFolderReducer";
import { Outlet } from "react-router";
import Sidebar from "./Layouts/Sidebar";
import { PulseLoader } from "react-spinners";

import { goBackFolder } from "Folders_MFE/actions"; 
const CreateFile   = lazy (()=> import("Files_MFE/CreateFile")); 
const UploadFile   = lazy (()=> import("Files_MFE/UploadFile"));
const CreateFolder = lazy (()=> import("Folders_MFE/CreateFolder")); 
const DropdownMenu = lazy (()=> import("Shared/DropdownMenu")); 

function Index(){

    
    const {isLoading,currentFolder} = useSelector((state)=>({
        isLoading : state.Folders.isLoading, 
        currentFolder : state.Folders.currentFolder,    
    }));
    
    const dispatch = useDispatch();
    const goBack = ()=>{
       dispatch(goBackFolder());
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
                                                <div type="button" onClick={goBack} className="m-2">
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
                                        <DropdownMenu/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3"></div>
                            {isLoading ? 
                                <div className="display-1 my-5 text-center">
                                    <PulseLoader color="#0a58ca" margin={5} size={25} />
                                </div>
                                :<Outlet/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>              
    </Fragment>
    )  
}

export default Index;