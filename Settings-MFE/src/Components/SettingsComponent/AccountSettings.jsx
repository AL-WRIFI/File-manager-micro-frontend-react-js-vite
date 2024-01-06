import { Fragment, useState, useEffect } from "react";
import fire from "Auth_MFE/fire";
import { useSelector } from "react-redux";
// import { doc, updateDoc } from "firebase/firestore";
function AccountSettings(){


  const { uid , email , displayName } = useSelector( state => state.auth.user);
  const auth = fire.auth().currentUser;

  

    return(
        <Fragment>
              <div className="tab-pane fade" id="account">
              <h6>ACCOUNT SETTINGS</h6>
                    <hr />
                    <form>
                      <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter your username" value={displayName} />
                        <small id="usernameHelp" className="form-text text-muted"></small>
                      </div>
                      <hr />
                      <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input type="email" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter your username" value={email} />
                        <small id="usernameHelp" className="form-text text-muted"></small>
                      </div>
                      <hr />
                      <div className="form-group">
                        <label className="d-block text-danger">Delete Account</label>
                        <p className="text-muted font-size-sm"></p>
                      </div>
                      <button className="btn btn-danger" type="button">Delete Account</button>
                    </form>
              </div>
        </Fragment>
    )
}

export default AccountSettings;