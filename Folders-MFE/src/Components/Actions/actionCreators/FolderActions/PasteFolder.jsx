import { toast } from "react-toastify";
import fire from "../../../../config/firebase";
import { createFile } from "Files_MFE/actions";
import createFolder  from "./CreateFolder";




export const pasetFolder = (docId, data) => async (dispatch) => {

    const copyFolder = async (sourceFolderId, destinationParentId) => {
      try{
        const DB = fire.firestore();
        const sourceFolderSnapshot = await DB.collection('folders').doc(sourceFolderId).get();
        const sourceFolderData = sourceFolderSnapshot.data();
        
        const folderData = {
          ...sourceFolderData,
          parent: destinationParentId,
          subFiles: [],
          subFolders: [],
        }
        const destinationFolderRef = await dispatch(createFolder(folderData));
        const subFilesIds =  sourceFolderData.subFiles || [];
        await subFilesIds.forEach(async (file) => {
          const subFiles = await DB.collection('files').doc(file).get();
          const newFileData = {
            ...subFiles.data(),
            parent: destinationFolderRef.id,
          };   
          await dispatch(createFile(newFileData));
        });      
        const subFolderIds =  sourceFolderData.subFolders || [];
        for (const subFolderId of subFolderIds) {
          await copyFolder(subFolderId, destinationFolderRef.id);
        }

      } catch (error) {
        console.error('Error ', error.message);
        throw error;
      }
    };


  const sourceFolderId = docId;
  const destinationParentId = data.parent;
  try {
    await copyFolder(sourceFolderId, destinationParentId);
    toast.success('Folder Copyied Sucessefully');
  } catch (error) {
    console.error(' Erorr: ', error.message);
    toast.error('حدث خطأ أثناء نسخ المجلد  .');
  }
};
