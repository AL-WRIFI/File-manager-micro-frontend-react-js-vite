import { Fragment } from "react";

function SecuritySettings(){

    return(
        <Fragment>
          <div className="tab-pane fade" id="security">
              <h6>SECURITY SETTINGS</h6>
                    <hr />
                    <form>
                      <div className="form-group">
                        <label className="d-block">Change Password</label>
                        <input type="text" className="form-control" placeholder="Enter your old password"/>
                        <input type="text" className="form-control mt-1" placeholder="New password"/>
                        <input type="text" className="form-control mt-1" placeholder="Confirm new password"/>
                      </div>
                    </form>
                    <hr />
                    <form>
                      <div className="form-group">
                        <label className="d-block">Two Factor Authentication</label>
                        <button className="btn btn-info" type="button">Enable two-factor authentication</button>
                        <p className="small text-muted mt-2">Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.</p>
                      </div>
                    </form>
                    <hr />
                    <form>
                      <div className="form-group mb-0">
                        <label className="d-block">Sessions</label>
                        <p className="font-size-sm text-secondary">This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.</p>
                        <ul className="list-group list-group-sm">
                          <li className="list-group-item has-icon">
                            <div>
                              <h6 className="mb-0">San Francisco City 190.24.335.55</h6>
                              <small className="text-muted">Your current session seen in United States</small>
                            </div>
                            <button className="btn btn-light btn-sm ml-auto" type="button">More info</button>
                          </li>
                        </ul>
                      </div>
                    </form>
              </div>
        </Fragment>
    )
}

export default SecuritySettings;