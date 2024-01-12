import { useDispatch } from 'react-redux';
import { faArrowRotateRight, faCircleInfo, faCopy, faScissors, faTrashCan ,faEllipsis} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { copyItemToBuffer ,deleteFolder ,softDeleteFolder , recoveryFolder } from "Folders_MFE/actions";
import { deleteFile ,softDeleteFile , recoveryFile} from "Files_MFE/actions";
import Rename from './Rename';

export const addActionBuffer = (payload) => {
  return{
      type: "ADD_ACTION_BUFFER",
      payload
  }
} 
function DropdownItems({ item }) {
  const dispatch = useDispatch();
  const { data: { type, show } } = item;

  const handleCopyCut = (actionType) => {
    dispatch(copyItemToBuffer({ data: item.data, docId: item.docId }));
    dispatch(addActionBuffer(actionType));
  };

  const handleDelete = () => {
    const deleteAction = show ? (type.startsWith('folder') ? softDeleteFolder : softDeleteFile) : (type.startsWith('folder') ? deleteFolder : deleteFile);
    dispatch(deleteAction(item));
  };

  const handleRecovery = () => {
    if (!show) {
      const recoveryAction = type.startsWith('folder') ? recoveryFolder : recoveryFile;
      dispatch(recoveryAction(item));
    }
  };

  return (
    <div className="float-end">
      <div className="dropdown">
        <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <FontAwesomeIcon icon={faEllipsis} style={{color: "#0a58ca",}} />
        </a>
        <ul className="dropdown-menu dropdown-menu-end">
          <li><a className="dropdown-item"><Rename item={item} /></a></li>
          <li><a onClick={() => handleCopyCut("copy")} className="dropdown-item"><FontAwesomeIcon icon={faCopy} />&nbsp;Copy</a></li>
          <li><a onClick={() => handleCopyCut("cut")} className="dropdown-item"><FontAwesomeIcon icon={faScissors} />&nbsp;Cut</a></li>
          <li><a onClick={handleDelete} className="dropdown-item"><FontAwesomeIcon icon={faTrashCan} />&nbsp;Delete</a></li>
          {!show ? <li><a onClick={handleRecovery} className="dropdown-item"><FontAwesomeIcon icon={faArrowRotateRight} />&nbsp;Recovery</a></li> : ""}
          <li><a onClick={""} className="dropdown-item"><FontAwesomeIcon icon={faCircleInfo} />&nbsp;Info</a></li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownItems;
