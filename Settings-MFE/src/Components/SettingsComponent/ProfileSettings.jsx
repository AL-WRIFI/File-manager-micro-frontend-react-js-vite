import { Fragment } from "react";

function ProfileSettings(){

  
    return(
        <Fragment>
          {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" /> */}
          <div className="tab-pane fade show active" id="profile">
            <h6>YOUR PROFILE INFORMATION</h6>
                <form>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label for="inputUsername" className="form-label">Username</label>
                                <input type="text" className="form-control" id="inputUsername" placeholder="Username"/>
                            </div>
                            <div className="mb-3">
                                <label for="inputBio" className="form-label">Biography</label>
                                <textarea rows="2" className="form-control" id="inputBio" placeholder="Tell something about yourself"></textarea>
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

                    <button type="button" className="btn btn-primary">Update Profile</button>
                    <button type="reset" className="btn btn-light">Reset Changes</button>
                </form>
              
          </div>
        </Fragment>
    )
}

export default ProfileSettings;


// import React, { Fragment, useState } from "react";
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import firebaseConfig from "./firebaseConfig"; 

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// function ProfileSettings() {
//   const [fullName, setFullName] = useState("Kenneth Valdez");
//   const [email, setEmail] = useState("kenneth.valdez@example.com");
//   const [location, setLocation] = useState("Bay Area, San Francisco, CA");

//   const updateProfile = async () => {
//     try {
//       const user = firebase.auth().currentUser;

//       if (user) {
//         await user.updateProfile({
//           displayName: fullName,
//         });

//         await user.updateEmail(email);

//         // يمكنك أيضًا إضافة تحديثات إضافية حسب الحاجة
//       }

//       console.log("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error.message);
//     }
//   };

//   const resetChanges = () => {
//     // إعادة تعيين القيم إلى القيم الافتراضية أو استعادتها من قاعدة البيانات إذا كانت مفيدة
//     setFullName("Kenneth Valdez");
//     setEmail("kenneth.valdez@example.com");
//     setLocation("Bay Area, San Francisco, CA");
//   };

//   return (
//     <Fragment>
//       <div className="tab-pane fade show active" id="profile">
//         <h6>YOUR PROFILE INFORMATION</h6>
//         <hr />
//         <form>
//           {/* ... الرمز الحالي ... */}
//           <div className="form-group">
//             <label htmlFor="fullName">Full Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="fullName"
//               aria-describedby="fullNameHelp"
//               placeholder="Enter your fullname"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//             <small id="fullNameHelp" className="form-text text-muted">
//               You can change or remove it at any time.
//             </small>
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               aria-describedby="emailHelp"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <small id="emailHelp" className="form-text text-muted">
//               You can change your email at any time.
//             </small>
//           </div>
//           <div className="form-group">
//             <label htmlFor="location">Location</label>
//             <input
//               type="text"
//               className="form-control"
//               id="location"
//               placeholder="Enter your location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             />
//           </div>
//           {/* ... الرمز الحالي ... */}
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={updateProfile}
//           >
//             Update Profile
//           </button>
//           <button type="button" className="btn btn-light" onClick={resetChanges}>
//             Reset Changes
//           </button>
//         </form>
//       </div>
//     </Fragment>
//   );
// }

// export default ProfileSettings;
