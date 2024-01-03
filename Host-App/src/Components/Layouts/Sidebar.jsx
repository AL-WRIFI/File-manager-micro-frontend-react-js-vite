import { Fragment ,lazy,Suspense} from "react";
import { Link, useNavigate } from "react-router-dom";
import { changeFolder } from "Folders_MFE/actions";
import { useDispatch } from "react-redux";
import { addFilterName } from "../../Redux/actionCreators/FilterActions/ActionsFilterReducer";


const CreateFile   = lazy (()=> import("Files_MFE/CreateFile")); 

function Sidebar(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAllFiles =(filterName)=>{
        if(filterName === "AllFiles"){
            dispatch(changeFolder("root"));
            navigate("/dashboard");
        }else{
            dispatch(addFilterName(filterName));
            navigate("/dashboard/filter");
        }
    }

    

    return(
        <Fragment>
            <div className="col-12 col-lg-3">
            <div className="card">
                <div className="card-body">
                    <div className="d-grid"> <CreateFile/>
                    </div>
                    <h5 className="my-3">My Drive</h5>
                    <div className="fm-menu">
                        <div className="list-group list-group-flush"> 
                            <div type="button" onClick={()=>{handleAllFiles("AllFiles")}} className="list-group-item py-1"><i className="bx bx-folder me-2"></i><span>All Files</span></div>
                            {/* <a href="#" className="list-group-item py-1"><i className="bx bx-analyse me-2"></i><span>Recents</span></a> */}
                            <div type="button" onClick={()=>{handleAllFiles("AllDocs")}} className="list-group-item py-1"><i className="bx bx-file me-2"></i><span>Documents</span></div>
                            <div type="button" onClick={()=>{handleAllFiles("AllImage")}} className="list-group-item py-1"><i className="bx bx-image me-2"></i><span>Images</span></div>
                            {/* <div type="button" className="list-group-item py-1"><i className="bx bx-video me-2"></i><span>Videos</span></div> */}
                            {/* <div type="button" className="list-group-item py-1"><i className="bx bx-music me-2"></i><span>Audio</span></div> */}
                            {/* <div type="button" className="list-group-item py-1"><i className="bx bx-beer me-2"></i><span>Zip Files</span></div> */}
                            {/* <div type="button" className="list-group-item py-1"><i className="bx bx-plug me-2"></i><span>Important</span></div> */}
                            <div type="button" onClick={()=>{navigate("/settings")}} className="list-group-item py-1"><i className="bx bx-cog me-2"></i><span>Settings</span></div>
                            <div type="button" className="list-group-item py-1"><i className="bx bx-trash-alt me-2"></i><span>Deleted Files</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <br></br>
            <div className="card">
                <div className="card-body">
                    <h5 className="mb-0 text-primary font-weight-bold">45.5 GB <span className="float-end text-secondary">50 GB</span></h5>
                    <p className="mb-0 mt-2"><span className="text-secondary">Used</span><span className="float-end text-primary">Upgrade</span>
                    </p>
                    <div className="progress mt-3" style={{height:"7px"}}>
                        <div className="progress-bar" role="progressbar" style={{width: "15%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                        <div className="progress-bar bg-warning" role="progressbar" style={{width: "30%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                        <div className="progress-bar bg-danger" role="progressbar" style={{width: "20%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="mt-3"></div>
                    <div className="d-flex align-items-center">
                        <div className="fm-file-box bg-light-primary text-primary"><i className="bx bx-image"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <h6 className="mb-0">Images</h6>
                            <p className="mb-0 text-secondary">1,756 files</p>
                        </div>
                        <h6 className="text-primary mb-0">15.3 GB</h6>
                    </div>
                    <div className="d-flex align-items-center mt-3">
                        <div className="fm-file-box bg-light-success text-success"><i className="bx bxs-file-doc"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <h6 className="mb-0">Documents</h6>
                            <p className="mb-0 text-secondary">123 files</p>
                        </div>
                        <h6 className="text-primary mb-0">256 MB</h6>
                    </div>
                    <div className="d-flex align-items-center mt-3">
                        <div className="fm-file-box bg-light-danger text-danger"><i className="bx bx-video"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <h6 className="mb-0">Media Files</h6>
                            <p className="mb-0 text-secondary">24 files</p>
                        </div>
                        <h6 className="text-primary mb-0">3.4 GB</h6>
                    </div>
                    <div className="d-flex align-items-center mt-3">
                        <div className="fm-file-box bg-light-warning text-warning"><i className="bx bx-image"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <h6 className="mb-0">Other Files</h6>
                            <p className="mb-0 text-secondary">458 files</p>
                        </div>
                        <h6 className="text-primary mb-0">3 GB</h6>
                    </div>
                    <div className="d-flex align-items-center mt-3">
                        <div className="fm-file-box bg-light-info text-info"><i className="bx bx-image"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <h6 className="mb-0">Unknown Files</h6>
                            <p className="mb-0 text-secondary">57 files</p>
                        </div>
                        <h6 className="text-primary mb-0">178 GB</h6>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default Sidebar;