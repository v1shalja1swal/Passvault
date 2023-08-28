import React, {useState} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import './PasswordGenerator.css'
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from './characters'
import 'react-toastify/dist/ReactToastify.css'
import {COPY_SUCCESS} from './message'

function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const createPassword = characterList => {
    const characterListLength = characterList.length
    let TempPassword = ''

    for (let i = 0; i < passwordLength; i += 1) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      TempPassword = TempPassword + characterList.charAt(characterIndex)
    }
    return TempPassword
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleGeneratePassword = e => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify('You must Select atleast one option', true)
    }
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const handleCopyPassword = () => {
    if (password === '') {
      notify('Nothing To Copy', true)
    } else {
      copyToClipboard()
      notify(COPY_SUCCESS)
    }
  }

  return (
    <div className="generator">
      <h2 className="generator__header">Password Generator</h2>
      <div className="generator__password">
        <h3>{password}</h3>
        <button onClick={handleCopyPassword} className="copy__btn">
          <i className="far fa-clipboard" />
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="password-strength">Password length</label>
        <input
          defaultValue={passwordLength}
          onChange={e => setPasswordLength(e.target.value)}
          type="number"
          id="password-strength"
          name="password-strength"
          max="20"
          min="10"
        />
      </div>

      <div className="form-group">
        <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
        <input
          checked={includeUppercase}
          onChange={e => setIncludeUppercase(e.target.checked)}
          type="checkbox"
          id="uppercase-letters"
          name="uppercase-letters"
        />
      </div>

      <div className="form-group">
        <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
        <input
          checked={includeLowercase}
          onChange={e => setIncludeLowercase(e.target.checked)}
          type="checkbox"
          id="lowercase-letters"
          name="lowercase-letters"
        />
      </div>

      <div className="form-group">
        <label htmlFor="include-numbers">Include Numbers</label>
        <input
          checked={includeNumbers}
          onChange={e => setIncludeNumbers(e.target.checked)}
          type="checkbox"
          id="include-numbers"
          name="include-numbers"
        />
      </div>

      <div className="form-group">
        <label htmlFor="include-symbols">Include Symbols</label>
        <input
          checked={includeSymbols}
          onChange={e => setIncludeSymbols(e.target.checked)}
          type="checkbox"
          id="include-symbols"
          name="include-symbols"
        />
      </div>

      <button onClick={handleGeneratePassword} className="generator__btn">
        Generate Password
      </button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default PasswordGenerator
