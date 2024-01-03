import {  faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, Fragment } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RenameFile } from "../Redux/actionCreators/FileActions/RenameFile";
import { RenameFolder } from "../Redux/actionCreators/FolderActions/RenameFolder";


const Rename = ({ item: { data = {}, docId } = {} }) => {
  const { type, name } = data;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState(name);

  const toggle = () => setShowModal(!showModal);

  const { userFolders, userFiles } = useSelector((state) => ({
    userFolders: state.Folders.userFolders.filter((folder) => folder.data.parent === state.Folders.currentFolder),
    userFiles: state.Files.userFiles.filter((file) => file.data.parent === state.Folders.currentFolder),
  }));

  const checkAlreadyExists = (name) => {
    const namesList = type === "folder" ? userFolders : userFiles;
    return namesList.some((item) => item.data.name === name);
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();

    const extention = itemName.split(".").length > 1;
    const isFolder = type === "folder";
    const isNameEmpty = !itemName.trim();

    if (isNameEmpty) {
      toast.error(`${isFolder ? "Folder" : "File"} Name cannot be empty`);
      return;
    }

    if (checkAlreadyExists(itemName)) {
      toast.error(`${isFolder ? "Folder" : "File"} already exists`);
      return;
    }

    const updatedName = isFolder ? itemName : extention ? `${itemName}.txt` : itemName;
    const updatedExtent = extention ? itemName.split(".").pop() : "txt";

    const data = {
      lastAccessed: null,
      updatedAt: new Date(),
      name: updatedName,
    };
    if (!isFolder) { data.extent = updatedExtent }
    // if (isFolder) {
    //   delete data.extent;
    // }

    try {
      dispatch(isFolder ? RenameFolder(data, docId) : RenameFile(data, docId));
      toast.success(`Edited ${isFolder ? "Folder" : "File"} Name Successfully`);
      setShowModal(false);
    } catch (error) {
      console.error(`Error Editing ${isFolder ? "Folder" : "File"} Name:`, error);
      toast.error(`Error Editing ${isFolder ? "Folder" : "File"} Name: ${error.message}`);
    }
  };

  useEffect(() => {
    setItemName(name);
  }, [name]);

  return (
    <Fragment>
      <Modal show={showModal} onHide={toggle}>
        <Modal.Header>
          <Modal.Title>{type === "file" ? "Edit File" : "Edit Folder"}</Modal.Title>
          <Button variant="white" style={{ cursor: "pointer" }} onClick={toggle}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFileSubmit}>
            <Form.Group controlId="formBasicFolderName" className="my-2">
              <Form.Control
                type="text"
                placeholder={`${type === "file" ? "File" : "Folder"} Name e.g. txt...`}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
              <Button onClick={handleFileSubmit} className="form-control" variant="primary">
                Rename {type === "file" ? "File" : "Folder"}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <div type="button" onClick={toggle}>
      <FontAwesomeIcon icon={faPen} />&nbsp;Rename
      </div>
    </Fragment>
  );
};

export default Rename;
