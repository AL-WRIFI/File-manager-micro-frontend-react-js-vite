import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uploadFile } from "../Actions/actionCreators/FileActions/UploadFile";
import { faFileUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";


const UploadFile = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const { userFiles,user,currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFiles: state.Files.userFiles,
      user : state.auth.user,
      currentFolder: state.Folders.currentFolder,
      currentFolderData: state.Folders.userFolders.find(
        (folder) => folder.docId === state.Folders.currentFolder
      ),
    }),
    shallowEqual
  );

  const checkAlreadyExists = (name) => {
    return userFiles.some(
      (items) =>
        items.data.parent === currentFolder && items.data.name === name
    );
  };

  const handleUploadFileSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("File cannot be empty");
      return;
    }

    const modifiedType = file.type.includes("image/")? `image/${file.type.split("/").pop()}`
      : `file/${file.type.split("/").pop()}`;

    if (checkAlreadyExists(file.name)) {
      toast.error("File already exists");
      return;
    }
    const data = {
      createdAt: new Date(),
      createdBy: user.displayName,
      lastAccessed: null,
      type: modifiedType,
      name: file.name,
      path:
        currentFolder === "root"
          ? [] : [...currentFolderData.data.path, currentFolder],
      parent: currentFolder,
      updatedAt: new Date(),
      userId: user.uid,
      extent: file.name.split(".").pop(),
      data: null,
      url: "",
    };

    try {
      dispatch(uploadFile(file, data, setSuccess));
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };

  useEffect(() => {
    if (success) {
      setShowModal(false);
      setSuccess(false);
    }
  }, [success]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return(
    <>
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header>
          <Modal.Title>Upload File</Modal.Title>
            <Button variant="white" style={{ cursor: "pointer" }} onClick={toggleModal}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
         </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleUploadFileSubmit}>
            
            <Form.Group controlId="formBasicFolderName" className="my-2">
              <Form.Control type="file"placeholder="Enter folder name..."
                 onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>

            <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
              <Button type="submit" className="form-control" variant="primary">
                Upload File
              </Button>
            </Form.Group>

          </Form>
        </Modal.Body>
      </Modal>

      <div type="button" onClick={toggleModal}  className="">
         <FontAwesomeIcon icon={faFileUpload} />
          &nbsp; Upload 
      </div>
    </>
  );
};

export default UploadFile;
