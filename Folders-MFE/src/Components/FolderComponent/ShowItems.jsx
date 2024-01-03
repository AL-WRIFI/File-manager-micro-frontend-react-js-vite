import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {changeFolder} from "../Actions/actionCreators/FolderActions.jsx"; 

import DropdownItems from "./DropdownItems";

function ShowItems({title , items}){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleDoubleClick= (item)=>{
     if(item.data.type === "folder"){
        dispatch(changeFolder(item.docId));
        // navigate(`/dashboard/folder/${item.docId}`);
     }else{
        // dispatch(changeFolder(item.docId));
         navigate(`/dashboard/file/${item.docId}`);
     }
    }

    return(
        <Fragment>
            <h5>{title}</h5>
                <div className="row mt-4 my-5">
                    {items.map((el,idx)=>{
                        return(
                        <div key={idx*55} className="col-12 col-lg-3 my-1">
                            <div className="card shadow-none border radius-15">
                                <div style={{ position: 'absolute', top: 0, right: 5 }}>
                                    <DropdownItems item={el} />
                                </div>
                                <div className="card-body" onDoubleClick={()=>handleDoubleClick(el)} >
                                    <div className="d-flex align-items-center">
                                        {el.data.type.startsWith('image') ? (
                                        <div className="font-30 text-primary">
                                            <img src={el.data.thumbnailUrl} />
                                        </div>)
                                        :( 
                                        <div className="font-30 text-primary">
                                            <i className={el.data.type === "folder"? "bx bxs-folder " : "lni lni-empty-file"} style={{ fontSize: '30px' }}></i>
                                        </div>
                                        )}
                                    </div>
                                    <div className="mb-0 text-primary" style={{cursor: "pointer" , userSelect:"none"}} >{el.data.name}</div>
                                    {el.data.type === "folder"? <small style={{cursor: "pointer" , userSelect:"none"}} >{46} files</small> : ""}
                                </div>
                            </div>
                        </div>
                    )})}
                        
                    </div>
        </Fragment>
    )
    
}

export default ShowItems;