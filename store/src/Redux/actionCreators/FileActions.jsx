import * as types from "../actionsTypes/FileActionsType";
import fire from "../../config/firebase";
import { toast } from "react-toastify";
import axios from 'axios';



// FILES
export const addFile= (payload)=>({
  type: types.CREATE_FILES,
  payload,
})
export const addFiles= (payload)=>({
  type: types.ADD_FILES,
  payload,
})

export const removeFile = (fileId) => ({
  type: types.REMOVE_FILE,
  payload: fileId,
});

export const setFileData = (payload) => ({
  type: types.SET_FILE_DATA,
  payload,
});
export const copyItemToBuffer = (payload) => ({
  type: types.COPY_FILES_TOBUFFER,
  payload,
});

export const moveFile = (payload) => ({
  type: types.MOVE_FILE,
  payload,
});

export const renameFolder = (payload) => ({
  type: types.RENAME_FILE,
  payload,
});


export const pasteFile=(docId,data)=> async (dispatch)=>{
    // const file = await fire.firestore().collection('files').doc(data).get();

    // const isImage = file.data().type && file.data().type.startsWith('image');
    // const storage = fire.storage();

    // if(isImage){
    // const sourcePath = `files/${file.data().userId}/${file.data().name}`;
    // const destinationPath = `filesCopy/${file.data().userId}/${file.data().name}`;
    // const sourceImageRef = storage.ref().child(sourcePath);
    // const sourceImageUrl = await sourceImageRef.getDownloadURL();
    // const imageBlob = await fetch(sourceImageUrl).then(response => response.blob());

    // console.log(imageBlob);
    // // Upload the image to a new path
    // const destinationImageRef = storage.ref().child(destinationPath);
    // await destinationImageRef.put(imageBlob);
    //   // const sourceImageUrl = file.data().url; 
    //   // const imageBlob = await fetch(sourceImageUrl).then(response => response.blob());
    //   // console.log(imageBlob);
      
    //   // const storageRef = fire.storage().ref();
    //   // const destinationImagePath = `files/${file.data().userId}/${file.data().name}`;
    //   // const destinationImageRef = storageRef.child(destinationImagePath);
    //   // await destinationImageRef.put(imageBlob);
    //   const dataWithImage = {
    //     ...file.data(),
    //     url : destinationPath,
    //   };


    //   fire.firestore().collection('files').add(dataWithImage).then( async file =>{
    //     const fileData = await (await file.get()).data();
    //     const filerId = file.id; 
    //     dispatch(addFile({ data:fileData , docId:filerId }));
    //     toast.success("Coped File Successfully"+file.name);
    //   }).catch(()=>{
    //     toast.error("Something went wrong!");
    //   });
    // }else{

    //   fire.firestore().collection('files').add(data).then( async file =>{
    //     const fileData = await (await file.get()).data();
    //     const filerId = file.id; 
    //     dispatch(addFile({ data:fileData , docId:filerId }));
    //     toast.success("Coped File Successfully"+file.name);
    //   }).catch(()=>{
    //     toast.error("Something went wrong!");
    //   });
    // }

    fire.firestore().collection('files').add(data).then( async file =>{
      const fileData = await (await file.get()).data();
      const filerId = file.id; 
      dispatch(addFile({ data:fileData , docId:filerId }));
      toast.success("Coped File Successfully"+file.name);
    }).catch(()=>{
      toast.error("Something went wrong!");
    });
    
}

export const cutFile = (docId,data) => (dispatch)=>{
  fire.firestore().collection("files").doc(docId).update({
    name: data.name,
    path: data.path,
    parent : data.parent    
  }).then( async() => {
    dispatch(moveFile({ docId , data }));
    toast.success("File moved successfully!");
  })
  .catch(() => {
    toast.error("Something went wrong!");
  });
}


// FILES

// export const createFile = (data ,setSuccess) =>(dispatch)=>{
//   fire.firestore().collection('files').add(data).then( async file =>{
//     const fileData = await (await file.get()).data();
//     const filerId = file.id; 
//     addToParentSubFiles(file.id ,fileData.parent );
//     dispatch(addFile({ data:fileData , docId:filerId }));
//     setSuccess(true);
//     toast.success("Created File Successfully"+file.name);
//   }).catch(()=>{
//     setSuccess(false);
//   });
// };

// const addToParentSubFiles = async (fileId,parentId) =>{
//   try{
//    const fileRef = fire.firestore().collection("folders").doc(parentId);
//    const fileSnapshot = await fileRef.get();
//    const subFilesArray = await fileSnapshot.get("subFiles") || [];

//    await fileRef.update({
//     subFiles: [...subFilesArray , fileId],
//    })

//   }catch(error){
//    console.error(" --- " ,error);
//   }
// }

export const gitFiles = (userId) => (dispatch)=>{
  // dispatch(setLoading(true))
  fire.firestore().collection("files").where("userId","==",userId).get().then(
    async (files)=>{
      const fileData = await files.docs.map((file)=>({
        data: file.data(),
        docId: file.id,
      })); 
      // dispatch(setLoading(false)); 
      dispatch(addFiles(fileData));
    });
};

// export const deleteFile = (file) => async (dispatch) => {
//   try {
//     const { url, thumbnailUrl } = file.data;
   
//     url && await fire.storage().refFromURL(url).delete();
//     thumbnailUrl && await fire.storage().refFromURL(thumbnailUrl).delete();

//     await fire.firestore().collection('files').doc(file.docId).delete();

//     dispatch(removeFile(file.docId));
//     toast.success("File Deleted Successfully");
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     toast.error("Failed to delete the file");
//   }
// };


export const updateFileData = (fileId, data) => (dispatch) => {
  fire.firestore().collection("files").doc(fileId).update({ data })
    .then(() => {
      dispatch(setFileData({ fileId, data }));
      toast.success("File saved successfully!");
    })
    .catch(() => {
      toast.error("Something went wrong!");
    });
};

// export const uploadFile = ( file, data, setSuccess) =>(dispatch)=>{
//   const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);
//   uploadFileRef.put(file).on("state_changed", (snapshot)=>{
//     const progress = Math.round(
//       (snapshot.bytesTransferred / snapshot.totalBytes) *100
//     );
//     console.log("Uploading "+progress+"%")
//   },

//   (error)=>{console.log(error)},
//     async()=>{
//     const fileUrl = await uploadFileRef.getDownloadURL();
//     const fullData = { ...data, url:fileUrl};
    
//     fire.firestore().collection('files').add(fullData).then( async (file)=>{
      
//       const fileData = await (await file.get()).data();
//       const filerId = file.id;       
//       dispatch(addFile({ data:fileData , docId:filerId }));
//       toast.success("File Uploaded Successfully");
//       setSuccess(true);

//     }).catch(()=>{setSuccess(false)})
  
//   })
// };


// export const uploadFile = (file, data, setSuccess) => (dispatch) => {
//   const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);
//   uploadFileRef.put(file).on(
//     "state_changed",
//     (snapshot) => {
//       const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//       console.log("Uploading " + progress + "%");
//     },
//     (error) => {
//       console.log(error);
//     },
//     async () => {
     
//       const fileUrl = await uploadFileRef.getDownloadURL();
//       const fullData = { ...data, url: fileUrl };
//       console.log(file.type);

//       const formData = new FormData();
//       formData.append('image', file);

//       const response = await axios.post('http://localhost:3000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       const { resizedImageBuffer } = response.data;
//       const thumbnailBuffer=`data:image/jpeg;base64,${resizedImageBuffer}`;
      
//       const thumbnailRef = fire.storage().ref(`thumbnails/${data.userId}/${data.name}`);
//       const blob = await (await fetch(thumbnailBuffer)).blob();
//       await thumbnailRef.put(blob);

//       const thumbnailUrl = await thumbnailRef.getDownloadURL();
//       const fullDataWithThumbnail = { ...fullData, thumbnailUrl };

//       fire.firestore().collection('files').add(fullDataWithThumbnail).then(async (file) => {
//         const fileData = await (await file.get()).data();
//         const fileId = file.id;
//         dispatch(addFile({ data: fileData, docId: fileId }));
//         toast.success("File Uploaded Successfully");
//         setSuccess(true);
//       }).catch(() => {
//         setSuccess(false);
//       });
//     }
//   );
// };


// export const uploadFile = (file, data, setSuccess) => async (dispatch) => {
//   try {
//     const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);

//     const onStateChanged = (snapshot) => {
//       const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//       console.log("Uploading " + progress + "%");
//     };

//     const onError = (error) => {
//       console.error(error);
//     };

//     const onCompleted = async () => {
//       const fileUrl = await uploadFileRef.getDownloadURL();
//       let fullData = { ...data, url: fileUrl };

//       // Check if the file is an image
//       if (file.type.includes("image/")) {
//         const formData = new FormData();
//         formData.append('image', file);

//         try {
//           const response = await axios.post('http://localhost:3000/upload', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
          
//           const responseData = await response.data;
//           console.log("---",responseData);
//           const { resizedImage } = responseData;
//           const thumbnail = `data:image/jpeg;base64,${resizedImage}`;     
          
//           const thumbnailRef = fire.storage().ref(`thumbnails/${data.userId}`);
//           const blob = await (await fetch(thumbnail)).blob();
//           await thumbnailRef.put(blob);

//           const thumbnailUrl = await thumbnailRef.getDownloadURL();
//           fullData = { ...data, url: fileUrl, thumbnailUrl };
        
         
//         } catch (error) {
//           console.error("Error uploading image:", error);
//         }
//       }

//       try {
//         fire.firestore().collection('files').add(fullData).then(async (file) => {
//                   const fileData = await (await file.get()).data();
//                   const fileId = file.id;
//                   dispatch(addFile({ data: fileData, docId: fileId }));
//                   toast.success("File Uploaded Successfully");
//                   setSuccess(true);
        
//         })
//       } catch (error) {
//         console.error("Error adding file to Firestore:", error);
//         setSuccess(false);
//       }
//     };

//     uploadFileRef.put(file).on("state_changed", onStateChanged, onError, onCompleted);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     toast.error("Error uploading file");
//   }
// };





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

