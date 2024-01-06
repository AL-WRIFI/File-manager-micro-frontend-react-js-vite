import { faFileAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState ,Fragment } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createFile } from "../Actions/actionCreators/FileActions/CreateFile";
import { toast } from "react-toastify";

const CreateFile = () => {

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [success, setSuccess] = useState(false);
  
  const toggle = () => {
    setShowModal(!showModal);
  };
  const { userFiles,user,currentFolder ,currentFolderData} = useSelector((state)=>({
    userFiles: state.Files.userFiles,
    user : state.auth.user,
    currentFolder : state.Folders.currentFolder,
    currentFolderData : state.Folders.userFolders.find((folder)=> folder.docId === state.Folders.currentFolder),

  }),shallowEqual);

   const checkAlreadyExists =(name ,extention) =>{
    !extention ? name = name +".txt":'';
    return userFiles.some(
      (items) =>
        items.data.parent === currentFolder && items.data.name === name
    );
  }

  const handleFileSubmit = (e) => {
   e.preventDefault();

   let extention = false;
   if(fileName.split(".").length >1){
     extention = true;
   }
   
   if (!fileName) {
    toast.error("File Name cannot by empty");
    return;
  }
  
  if (checkAlreadyExists(fileName,extention)) {
    toast.error("Folder already exists");
    return;
  }

  const data = {
    createdAt: new Date(),
    createdBy: user.displayName,
    lastAccessed: null,
    type: "file",
    name: extention ? fileName : `${fileName}.txt`,
    path: currentFolder === "root" ? [] : [...currentFolderData.data.path,currentFolder],
    parent: currentFolder,
    updatedAt: new Date(),
    userId: user.uid,
    extent: extention ? fileName.split(".").pop() : "txt",
    data: "",
    url: "",
    show:true
  }

  try {
    dispatch(createFile(data));
    setSuccess(true);
    toast.success("Created File Successfully"+data.name);
  } catch (error) {
    console.error("Error Createing file:", error);
    toast.error("Error Createing file");
  }
  };

  useEffect(()=>{
    if(success){
      setFileName("");
      setShowModal(false);
      setSuccess(false);
    }
  },[success])
  
  return (
    <Fragment>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Create File</Modal.Title>
          <Button
            variant="white"
            style={{ cursor: "pointer" }}
            onClick={() => toggle()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFileSubmit}>

            <Form.Group controlId="formBasicFolderName" className="my-2">
              <Form.Control type="text" placeholder="File Name e,g txt..."
                value={fileName}onChange={(e) => setFileName(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
              <Button type="submit" className="form-control" variant="primary">
                Add File
              </Button>
            </Form.Group>

          </Form>
        </Modal.Body>
      </Modal>
      <div type="button" onClick={() => toggle()} className=" "  >
        <FontAwesomeIcon icon={faFileAlt} />
             &nbsp;&nbsp; File
      </div>
    </Fragment>
  );
};

export default CreateFile;
