import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reauthenticateWithCredential } from 'firebase/auth';
import { EmailAuthProvider } from 'firebase/auth';

import fire from "Auth_MFE/fire";


function ProfileSettings(){
    const auth = fire.auth();
    const { uid , email , displayName } = useSelector( state => state.auth.user);
    const [fullName, setFullName] = useState(displayName);
    const [newEmail, setEmail] = useState(email);
    const dispatch = useDispatch();

    const loginUser = (payload)=>{
        return{
          type: "USER_LOGIN",
          payload
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
              if(displayName !== fullName){
                updateName(fullName);
              }else if(email !== newEmail){
                updateEmaill(newEmail);
              }else { return }

        } catch (error) {
          toast.error("Error updateing information");
          console.log(error);
        }
     };

     

     const updateEmaill = (newEmail) => {
      console.log(auth.currentUser.password);
      try{
        fire.auth().currentUser.updateEmail(newEmail).then(() => {
          dispatch(loginUser({
            uid: uid,
            email: newEmail,
            displayName: name,
          }));
          toast.success("Email Updated successfully",);
        }).catch((error)=>{
          toast.error("Error updateing Email");
          console.log(error)
        });
      //   reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(email, auth.currentUser.getIdToken())).then(() => {
      //     auth.currentUser.updateEmail(newEmail).then(() => {
      //       toast.success("Email Updated successfully");
      //       console.log('تم تغيير عنوان البريد الإلكتروني بنجاح.');
      //     })
      //     .catch((error) => {
      //       toast.error("Error updateing Email");
      //       console.error('حدث خطأ أثناء تحديث عنوان البريد الإلكتروني:', error.message);
      //     });
      // })
      // .catch((error) => {
      //   console.error('فشلت عملية إعادة التحقق:', error.message);
      // }); 
      }catch(error){
        toast.error("Error updateing Email");
        console.log(error)
      }
    };


    const updateName = (name) => {
      auth.currentUser.updateProfile({ displayName:name}).then(()=>{
        dispatch(loginUser({
            uid: uid,
            email: newEmail,
            displayName: fullName,
          }));
        toast.success("Name Updated successfully",);
      }).catch((error)=>{
      toast.error("Error updateing Name"); 
      console.log(error)})
    };

    return(
        <Fragment>
          <div className="tab-pane fade show active" id="profile">
            <h6>YOUR PROFILE INFORMATION</h6>
                <form  >
                    <div className="row">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label htmlFor="inputUsername" className="form-label">Name</label>
                                <input onChange={(e) => setFullName(e.target.value)} type="text" className="form-control" id="inputUsername" placeholder="Name" value={fullName} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputUsername" className="form-label">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="inputUsername" placeholder="Email" value={newEmail} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center">
                                <img alt="Andrew Jones" src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle img-fluid mt-2" width="128" height="128"/>
                                <div className="mt-2">
                                    <span className="btn btn-primary"><i className="fas fa-upload"></i></span>
                                </div>
                                <small>For best results, use an image at least 128px by 128px in .jpg format</small>
                            </div>
                        </div>
                    </div>

                    <button onClick={handleSubmit} type="button" className="btn btn-primary">Update Profile</button>
                    <button type="reset" className="btn btn-light">Reset Changes</button>
                </form>
              
          </div>
        </Fragment>
    )
}

export default ProfileSettings;