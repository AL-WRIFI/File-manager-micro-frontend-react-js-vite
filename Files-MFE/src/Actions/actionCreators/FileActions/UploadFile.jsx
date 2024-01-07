import { toast } from "react-toastify";
import axios from 'axios';
import { addFile } from "./ActionsFileReducer";
import fire from "../../../config/firebase";



export const uploadFile = (file, data, setSuccess) => async (dispatch) => {
    const isImage = file.type.startsWith('image');
    const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);
    
    try {
      await uploadFileRef.put(file);   
      const fileUrl = await uploadFileRef.getDownloadURL();
      const fullData = { ...data, url: fileUrl };
      
      if (isImage) {
        await uploadImageWithThumbnail(file, fullData, setSuccess, dispatch);
      } else {
        await uploadFileWithoutThumbnail(fullData, setSuccess, dispatch);
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };
  
  const uploadImageWithThumbnail = async (file, fullData, setSuccess, dispatch) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const { resizedImageBuffer } = response.data;
      const thumbnailBuffer = `data:image/jpeg;base64,${resizedImageBuffer}`;
  
      const thumbnailRef = fire.storage().ref(`thumbnails/${fullData.userId}/${fullData.name}`);
      const blob = await (await fetch(thumbnailBuffer)).blob();
      await thumbnailRef.put(blob);
  
      const thumbnailUrl = await thumbnailRef.getDownloadURL();
      const fullDataWithThumbnail = { ...fullData, thumbnailUrl };
  
      await uploadFileToFirestore(fullDataWithThumbnail, setSuccess, dispatch);
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };
  
  const uploadFileWithoutThumbnail = async (fullData, setSuccess, dispatch) => {
    await uploadFileToFirestore(fullData, setSuccess, dispatch);
  };
  
  const uploadFileToFirestore = async (fullData, setSuccess, dispatch) => {
    try {
      const fileRef = await fire.firestore().collection('files').add(fullData);
      const fileData = await (await fileRef.get()).data();
      const fileId = fileRef.id;
  
      dispatch(addFile({ data: fileData, docId: fileId }));
      toast.success("File Uploaded Successfully");
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };
  