import fire from "../../../../config/firebase";
import {addToParentSubFiles} from "../SharedActions/SharedActions"
import { addFile } from "./ActionsFileReducer";
import { toast } from "react-toastify";
// import { createFile } from "./CreateFile";





// export const pasteFile = (docId , data) => async (dispatch) => {
//     try{
//        await dispatch(createFile(data));
//     }catch (error){
//         console.error("error createing file",error)
//     }
// }
export const pasteFile=(docId,data)=> async (dispatch)=>{
    console.log("----------data => ",data);
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
      addToParentSubFiles(file.id ,fileData.parent ); 
      dispatch(addFile({ data:fileData , docId:filerId }));
      toast.success("Coped File Successfully"+file.name);
    }).catch(()=>{
      toast.error("Something went wrong!");
    });
    
}