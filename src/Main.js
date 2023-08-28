import {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordGenerator from './Components/PasswordGenerator'
import Peer1 from './Components/WebRTC/Peer1'
import './Main.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

const getPasswordsFromLocalStorage = () => {
  const list = localStorage.getItem('lists')
  console.log('The values in the local Storage are: ', list)
  if (list) {
    return JSON.parse(list)
  }
  return []
}

const Try = () => {
  // const latestList = []
  const [addPassword, setAddPassword] = useState(getPasswordsFromLocalStorage())
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [isTrue, setIsTrue] = useState(false)
  const [isSyncClicked, setIsSyncClicked] = useState(false)

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(addPassword))
  }, [addPassword])

  const listenWebsiteHandler = event => {
    setWebsite(event.target.value)
  }

  const usernameHandler = event => {
    setUsername(event.target.value)
  }
  const passwordHandler = event => {
    setPassword(event.target.value)
  }
  const searchListHandler = event => {
    setSearchInput(event.target.value)
  }

  const addContentHandler = event => {
    event.preventDefault()
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    console.log('new values in the Database are: ', newValues)
    setAddPassword(prevState => {
      const newPassword = [...prevState, newValues]
      setWebsite('')
      setUsername('')
      setPassword('')

      console.log('The new entry is', newPassword)
      return newPassword
    })
  }

  const showPasswordHandler = e => {
    if (e.target.checked) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  }

  const deleteItemHandler = id => {
    setAddPassword(addPassword.filter(eachValue => eachValue.id !== id))
    const caseOf = addPassword.length !== 0
    setIsTrue(caseOf)
  }

  const syncHandler = () => {
    setIsSyncClicked(true)
  }

  //   const newList = addPassword.filter(eachValue =>
  //     eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
  //   )
  //   if (newList.length === 0) {
  //     setIsTrue(false)
  //   } else {
  //     setIsTrue(true)
  //   }
  if (isSyncClicked) return <Peer1 />
  return (
    // {!isSyncClicked && }
    <div className="main-container">
      <img src="MainMainLogo.png" className="app-logo" alt="app logo" />
      <div className="sub-div1">
        <img
          src="../public/MainMainLogo.png"
          className="sub-div1-image2"
          alt="password manager"
        />
        <form className="add-details" onSubmit={addContentHandler}>
          <h1 className="detail-heading">Add New Password</h1>
          <div className="input-holder">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              className="input-image"
              alt="website"
            />
            <input
              type="text"
              className="input-element"
              placeholder="Enter Website"
              onChange={listenWebsiteHandler}
              value={website}
            />
          </div>

          <div className="input-holder">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              className="input-image"
              alt="username"
            />
            <input
              type="text"
              className="input-element"
              placeholder="Enter Username"
              onChange={usernameHandler}
              value={username}
            />
          </div>
          <div className="input-holder">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              className="input-image"
              alt="password"
            />
            <input
              type="password"
              className="input-element"
              placeholder="Enter Password"
              onChange={passwordHandler}
              value={password}
            />
          </div>
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          className="sub-div1-image1"
          alt="password manager"
        />
        <PasswordGenerator />
      </div>
      <div className="sub-div2">
        <div className="first-div">
          <div className="your-password">
            <h1 className="heading-name">Your Passwords</h1>
            <p className="colored-text">{addPassword.length}</p>
          </div>
          <div className="search-holder">
            <button className="syncButton" type="submit" onClick={syncHandler}>
              Sync Passwords
            </button>
            {/* <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              className="input-image"
              alt="search"
            /> */}
            {/* <input
              type="search"
              className="input-element"
              placeholder="Search"
              onChange={searchListHandler}
              value={searchInput}
            /> */}
          </div>
        </div>
        <hr />
        <div className="show-passwords">
          <input
            type="checkbox"
            className="check-box"
            id="check"
            onChange={showPasswordHandler}
          />
          <label htmlFor="check" className="label-password">
            Show Passwords
          </label>
        </div>
        {addPassword.length === 0 && (
          <div className="empty-state">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              className="empty-image"
              alt="no passwords"
            />
            <p className="no-passwords">No Passwords</p>
          </div>
        )}
        {addPassword.length !== 0 && (
          <ul className="result-container">
            {addPassword.map(eachValue => (
              <li className="item-list" id={eachValue.id} key={eachValue.id}>
                <p className={`initial ${eachValue.classAdd}`}>
                  {eachValue.initialValue}
                </p>
                <div className="list-content">
                  <p className="website">{eachValue.websiteName}</p>
                  <p className="website">{eachValue.userName}</p>
                  {!isShow && (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      className="stars-image"
                      alt="stars"
                    />
                  )}
                  {isShow && <p className="website">{eachValue.Password}</p>}
                </div>
                <button
                  type="button"
                  className="del-btn"
                  onClick={() => deleteItemHandler(eachValue.id)}
                  // testid="delete"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    className="del-image"
                    alt="delete"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {/* <button type="submit" onClick={this.getLocaPasswords}>
          get from LS
        </button> */}
      </div>
    </div>
  )
}

export default Try
