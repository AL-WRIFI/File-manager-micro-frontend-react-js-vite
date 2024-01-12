// import { useSelector } from 'react-redux';

// const {childFolders ,childFiles ,itemsBuffer } = useSelector((state)=>({
        
//     itemsBuffer: state.Buffer.itemsBuffer,
//     childFolders : state.Folders.userFolders.filter(
//         (folder)=> (folder.data.parent === state.Folders.currentFolder)),
//     childFiles : state.Files.userFiles.filter(
//         (file)=> (file.data.parent === state.Folders.currentFolder)),     
// }));

// export const checkAlreadyExists = (name) =>{

//     let newName = name;
//     let counter = 1;
//     let nameList;
//     const dotIndex = newName.lastIndexOf('.');
//     const baseName = dotIndex !== -1 ? newName.slice(0, dotIndex) : newName;
//     const extension = dotIndex !== -1 ? newName.slice(dotIndex) : '';
//     itemsBuffer.map((el)=>{
//         nameList = el.data.type == "folder" ? childFolders : childFiles;
//     })
    
    
//     while (nameList.find(file => file.data.name === newName)) {
//         newName = `${baseName}(${counter})${extension}`;
//         counter++;
//     }

//     return newName; 
// }