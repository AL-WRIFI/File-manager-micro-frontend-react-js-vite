import { Fragment } from "react";

function AccountSettings(){

   

    

    return(
        <Fragment>
              <div className="tab-pane fade" id="account">
              <h6>ACCOUNT SETTINGS</h6>
                    <hr />
                    <form>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter your username" value="kennethvaldez" />
                        <small id="usernameHelp" className="form-text text-muted">After changing your username, your old username becomes available for anyone else to claim.</small>
                      </div>
                      <hr />
                      <div className="form-group">
                        <label className="d-block text-danger">Delete Account</label>
                        <p className="text-muted font-size-sm">Once you delete your account, there is no going back. Please be certain.</p>
                      </div>
                      <button className="btn btn-danger" type="button">Delete Account</button>
                    </form>
              </div>
        </Fragment>
    )
}

export default AccountSettings;