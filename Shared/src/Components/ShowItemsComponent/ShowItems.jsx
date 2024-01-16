import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeFolder } from "Folders_MFE/actions"; 
import useOutsideClick from "./useOutsideClick";
// import { changeFile } from "Files_MFE/changeFile"; 
import { setSelectItemsMode , clearSelectedItems , toggleItemSelection } from "../../Actions/SelectedItemsActions/ActionsSelectedItemsReducer";

import DropdownItems from "./DropdownItems";
import { useRef } from "react";


import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Captions, Download, Fullscreen,Thumbnails,Zoom,} from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';


const changeFile = (payload) => {
    return{
    type: "CHANGE_FILE",
    payload,
    }
};

function ShowItems({title,items}){

    const ref = useRef();
    const [index, setIndex] = useState(-1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const slides = items
    .filter((file) => file.data.type.startsWith('image'))
    .map((file) => ({
      src: file.data.url,
      title: file.data.name,
      description: file.data.name,
    }));
    
    const { selectItemsMode , selectedItems } = useSelector((state)=>({ 
        selectItemsMode: state.SelectedItems.selectItemsMode,
        selectedItems: state.SelectedItems.selectedItems,
    }));
    
    const handleDoubleClick= (item)=>{
        inverseSelected();
        if(item.data.type === "folder"){
            dispatch(changeFolder(item.docId));
            //navigate(`/dashboard/folder/${item.docId}`);
        }else if (item.data.type.startsWith('image')){
            const imageIndex = slides.findIndex((slide) => slide.src === item.data.url);
            setIndex(imageIndex);  
        }else{
            dispatch(changeFile(item.docId));
            navigate(`/dashboard/file/${item.docId}`);
        }
    };

    const handleCheckboxChange = (file) => {
        dispatch(toggleItemSelection(file));
    };

    useOutsideClick(ref,() => {
        inverseSelected();
    });
    
    const inverseSelected = () => {
        dispatch(setSelectItemsMode(false));
        dispatch(clearSelectedItems());
    }

    return(
        <Fragment>
            <h5>{title}</h5>
                <div className="row mt-4 my-5"  >
                    {items.map((el,idx)=>{
                        return(
                        <div key={idx*55} className="col-12 col-lg-3 my-1">
                            <div id="card" className="card shadow-none border radius-15">
                                <div style={{ position: 'absolute', top: 0, right: 5 }}>
                                {selectItemsMode === true ? 
                                    <input type="checkbox" checked={selectedItems.includes(el)} onChange={() => handleCheckboxChange(el)} className="mr-2" />
                                    : <DropdownItems item={el} />       
                                }
                                </div>
                                <div className="card-body" onDoubleClick={()=>handleDoubleClick(el)} >
                                    <div className="d-flex align-items-center">
                                        {el.data.type.startsWith('image') ? (
                                        <div  className="font-30 text-primary"> <img src={el.data.thumbnailUrl} /> </div>
                                        ) : ( 
                                        <div className="font-30 text-primary">
                                            <i className={el.data.type === 'folder' ? "bx bxs-folder " :"lni lni-empty-file"} style={{ fontSize: '30px' }}></i>
                                        </div>
                                        )}
                                    </div>
                                    <div className="mb-0 text-primary" style={{cursor: "pointer" , userSelect:"none"}} >{el.data.name}</div>
                                    {el.data.type.startsWith('folder')? <small style={{cursor: "pointer" , userSelect:"none"}} >{12} files</small> : ""}
                                </div>
                            </div>
                        </div>
                    )})}              
            </div>
            <Lightbox
                plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
                captions={{
                showToggle: true,
                descriptionTextAlign: 'end',
                }}
                index={index}
                open={index >= 0}
                close={() => setIndex(-1)}
                slides={slides}
            />
        </Fragment>
    )
}

export default ShowItems;