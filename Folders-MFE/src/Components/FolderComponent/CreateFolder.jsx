import { faFolderPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createFolder } from "../Actions/actionCreators/FolderActions/CreateFolder";
import { toast } from "react-toastify";

const CreateFolder = () => {

  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [success, setSuccess] = useState(false);

  const { userFolders,user,currentFolder ,currentFolderData} = useSelector(
    (state)=>({
      userFolders: state.Folders.userFolders,
      user : state.auth.user,
      currentFolder : state.Folders.currentFolder,
      currentFolderData : state.Folders.userFolders.find(
       (folder)=> folder.docId === state.Folders.currentFolder),
  }),shallowEqual);

 
  const checkAlreadyExists = (name) => {
    return userFolders.some(
      (items) =>
        items.data.parent === currentFolder && items.data.name === name,
    );
  };

  const toggle = () => {
    setShowModal(!showModal);
  };
  const dispatch = useDispatch();


  const handleFolderSubmit = (e) => {
      e.preventDefault();

      if (!folderName) {
        toast.error("Folder Name cannot be empty");
        return;
      }

      if (checkAlreadyExists(folderName)) {
        toast.error("Folder already exists");
        return;
      }

    const data = {
      createdAt: new Date(),
      createdBy: user.displayName,
      lastAccessed: null,
      type: "folder", 
      name: folderName,
      path: currentFolder === "root" ? [] : [...currentFolderData.data.path,currentFolder],
      parent: currentFolder,
      subFolders:[],
      subFiles:[],
      updatedAt: new Date(),
      userId: user.uid,
    }
    
    try {
      dispatch(createFolder(data));
      toast.success("Created Folder Successfully"+data.name);
      setSuccess(true);
    } catch (error) {
      console.error("Error Createing file:", error);
      toast.error("Error Createing file");
      setSuccess(false);
    }
  };

   

  useEffect(()=>{
    if(success){
      setFolderName("");
      setShowModal(false);
      setSuccess(false);
    }
   },[success])

  return(
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Create Folder</Modal.Title>
          <Button
            variant="white"
            style={{ cursor: "pointer" }}
            onClick={() => toggle()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFolderSubmit}>
            <Form.Group controlId="formBasicFolderName" className="my-2">
              <Form.Control
                type="text"
                placeholder="Enter folder name..."
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
              <Button type="submit" className="form-control" variant="primary">
                Add Folder
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <div type="button" onClick={() => toggle()}  className="">
      <FontAwesomeIcon icon={faFolderPlus} />
          &nbsp; Folder 
      </div>
      
    </>
  );
};

export default CreateFolder;
