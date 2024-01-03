import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

import { useState, useEffect, Fragment } from "react"
import SecuritySettings from "./SecuritySettings"
import ProfileSettings from "./ProfileSettings"
import AccountSettings from "./AccountSettings"
// import './settings.css';
export default function Settings(){
    const [settings, setSettings] = useState({
        "--background-color": "#fff",
        "--background-light": "#fff",
        "--primary-color": "rgb(255, 0, 86)",
        "--shadow-color": "rgba(0,0,0,0.2)",
        "--text-color": "#0A0A0A",
        "--text-light": "#575757",
        "--font-size": "16px",
        "--animation-speed": 1
    })
    useEffect(() => {
        const root = document.documentElement
        for(let key in settings){
            root.style.setProperty(key, settings[key])
        }
    }, [settings])

    const [theme, setTheme] = useState("light")
    const themes = [
        {
            "--background-color": "#fff",
            "--background-light": "#fff",
            "--shadow-color": "rgba(0,0,0,0.2)",
            "--text-color": "#0A0A0A",
            "--text-light": "#575757"
        },
        {
            "--background-color": "rgb(29, 29, 29)",
            "--background-light": "rgb(77, 77, 77)",
            "--shadow-color": "rgba(0,0,0,0.2)",
            "--text-color": "#ffffff",
            "--text-light": "#eceaea",
        }
    ]

    function changeTheme(i){
        const _theme = {...themes[i]}
        setTheme(i === 0 ? "light" : "dark")
        let _settings = {...settings}
        for(let key in _theme){
            _settings[key] = _theme[key]
        }
        setSettings(_settings)
    }

    function changeColor(i){
        const _color = primaryColors[i]
        let _settings = {...settings}
        _settings["--primary-color"] = _color
        setPrimaryColor(i)
        setSettings(_settings) 
    }

    function changeFontSize(i){
        const _size = fontSizes[i]
        let _settings = {...settings}
        _settings["--font-size"] = _size.value
        setFontSize(i)
        setSettings(_settings)
    }

    function changeAnimationSpeed(i){
        let _speed = animationSpeeds[i]
        let _settings = {...settings}
        _settings["--animation-speed"] = _speed.value
        setAnimationSpeed(i)
        setSettings(_settings)
    }



    const primaryColors = [
        "rgb(255, 0, 86)",
        "rgb(33, 150, 243)",
        "rgb(255, 193, 7)",
        "rgb(0, 200, 83)",
        "rgb(156, 39, 176)"
    ]
    const fontSizes = [
        {
            title: "Small",
            value: "12px"
        },
        {
            title: "Medium",
            value: "16px"
        },
        {
            title: "Large",
            value: "20px"
        }
    ]
    const animationSpeeds = [
        {
              title: "Slow",
              value: 2
        },
        {
              title: "Medium",
              value: 1
        },
        {
              title: "Fast",
              value: .5
        }
    ]
    const [primaryColor, setPrimaryColor] = useState(0)
    const [fontSize, setFontSize] = useState(1)
    const [animationSpeed, setAnimationSpeed] = useState(1)
    return(
    <Fragment>    
      <div className="container">
      <nav aria-label="breadcrumb" className="main-breadcrumb">
       
      </nav>
     <br/>
     <br/>
     <br/>
     <br/>
      <div className="row gutters-sm">
        <div className="col-md-4 d-none d-md-block">
          <div className="card">
            <div className="card-body">
              <ul className="nav flex-column nav-pills nav-gap-y-1">
                <li className="nav-item">
                  <a href="#profile" className="nav-link has-icon nav-link-faded active" data-bs-toggle="pill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user mr-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>Profile Information
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#account" className="nav-link has-icon nav-link-faded" data-bs-toggle="pill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings mr-2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>Account Settings
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#security" className="nav-link has-icon nav-link-faded" data-bs-toggle="pill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shield mr-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>Security
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#notification" className="nav-link has-icon nav-link-faded" data-bs-toggle="pill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell mr-2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>Notification
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#billing" className="nav-link has-icon nav-link-faded" data-bs-toggle="pill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-credit-card mr-2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>Billing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header border-bottom mb-3 d-flex d-md-none">
              <ul className="nav nav-tabs card-header-tabs nav-gap-x-1" role="tablist">
                <li className="nav-item">
                  <a href="#profile" data-bs-toggle="tab" className="nav-link has-icon active"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
                </li>
                <li className="nav-item">
                <a href="#account" data-bs-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></a>            </li>
                <li className="nav-item">
                <a href="#security" data-bs-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></a>            </li>
                <li className="nav-item">
                <a href="#notification" data-bs-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></a>
                </li>
                <li className="nav-item">
                <a href="#billing" data-bs-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-credit-card"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg></a>            </li>
              </ul>
            </div>
            <div className="card-body tab-content">
              <AccountSettings/>
              <ProfileSettings/>
              <SecuritySettings/> 
              <div className="tab-pane fade" id="notification">
              <h6>NOTIFICATION SETTINGS</h6>
                    <hr />
                    <form>
                      <div className="form-group">
                        <label className="d-block mb-0">Security Alerts</label>
                        <div className="small text-muted mb-3">Receive security alert notifications via email</div>
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customCheck1" onChange="" />
                          <label className="custom-control-label" htmlFor="customCheck1">Email each time a vulnerability is found</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customCheck2" onChange="" />
                          <label className="custom-control-label" htmlFor="customCheck2">Email a digest summary of vulnerability</label>
                        </div>
                      </div>
                      <div className="form-group mb-0">
                        <label className="d-block">SMS Notifications</label>
                        <ul className="list-group list-group-sm">
                          <li className="list-group-item has-icon">
                            Comments
                            <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                              <input type="checkbox" className="custom-control-input" id="customSwitch1" onChange="" />
                              <label className="custom-control-label" htmlFor="customSwitch1"></label>
                            </div>
                          </li>
                          <li className="list-group-item has-icon">
                            Updates From People
                            <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                              <input type="checkbox" className="custom-control-input" id="customSwitch2" />
                              <label className="custom-control-label" htmlFor="customSwitch2"></label>
                            </div>
                          </li>
                          <li className="list-group-item has-icon">
                            Reminders
                            <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                              <input type="checkbox" className="custom-control-input" id="customSwitch3" onChange="" />
                              <label className="custom-control-label" htmlFor="customSwitch3"></label>
                            </div>
                          </li>
                          <li className="list-group-item has-icon">
                            Events
                            <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                              <input type="checkbox" className="custom-control-input" id="customSwitch4" onChange="" />
                              <label className="custom-control-label" htmlFor="customSwitch4"></label>
                            </div>
                          </li>
                          <li className="list-group-item has-icon">
                            Pages You Follow
                            <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                              <input type="checkbox" className="custom-control-input" id="customSwitch5" />
                              <label className="custom-control-label" htmlFor="customSwitch5"></label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </form>
              </div>
              <div className="tab-pane fade" id="billing">
              <h6>BILLING SETTINGS</h6>
                    <hr />
                    <form>
                      <div className="form-group">
                        <label className="d-block mb-0">Payment Method</label>
                        <div className="small text-muted mb-3">You have not added a payment method</div>
                        <button className="btn btn-info" type="button">Add Payment Method</button>
                      </div>
                      <div className="form-group mb-0">
                        <label className="d-block">Payment History</label>
                        <div className="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm">You have not made any payment.</div>
                      </div>
                    </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>

    </Fragment>
    )
}