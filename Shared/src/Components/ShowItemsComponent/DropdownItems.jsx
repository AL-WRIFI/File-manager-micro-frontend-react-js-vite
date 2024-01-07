import { useDispatch } from 'react-redux';
import { faArrowRotateRight, faCircleInfo, faCopy, faScissors, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { copyItemToBuffer ,deleteFolder ,softDeleteFolder , recoveryFolder } from "Folders_MFE/actions";
import { deleteFile ,softDeleteFile , recoveryFile} from "Files_MFE/actions";
import Rename from './Rename';

function DropdownItems({item}) {

  const dispatch = useDispatch();
  const handleCopy = () => {
    dispatch(copyItemToBuffer({ item, action: "copy" }));
  };
  const handleCut = () => {
    dispatch(copyItemToBuffer({ item, action: "cut" }));
  };
  const handleDelete = () => {
    if(item.data.show == true){
      dispatch(item.data.type.startsWith('folder') ? softDeleteFolder(item) : softDeleteFile(item));
    }else{
      dispatch(item.data.type.startsWith('folder') ? deleteFolder(item) : deleteFile(item));
    }
  };
  const handleRecovery = ( ) => {
    if(item.data.show == false){
      dispatch(item.data.type.startsWith('folder') ? recoveryFolder(item) : recoveryFile(item));
    }
  }

  return (
    <div className="float-end">
            <div className="dropdown">
                <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal align-middle">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" ><Rename item={item}/> </a></li>
                    <li><a onClick={handleCopy} className="dropdown-item" ><FontAwesomeIcon icon={faCopy} /> &nbsp;Copy</a></li>
                    <li><a onClick={handleCut}className="dropdown-item" ><FontAwesomeIcon icon={faScissors} />&nbsp;Cut</a></li>
                    <li><a onClick={handleDelete}className="dropdown-item"><FontAwesomeIcon icon={faTrashCan} />&nbsp;Delete</a></li>
                    {!item.data.show ?<li><a onClick={handleRecovery} className="dropdown-item"><FontAwesomeIcon icon={faArrowRotateRight} />&nbsp;Recovery</a></li> : ""}
                    <li><a onClick={""}className="dropdown-item"><FontAwesomeIcon icon={faCircleInfo} />&nbsp;Info</a></li>
                    
                </ul>
            </div>
        </div>
  );
}

export default DropdownItems;