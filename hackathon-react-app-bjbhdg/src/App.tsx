import React from 'react'
import styles from './App.module.css'

interface IProps {}

interface IState {
  allowErrorPopUp: boolean
  welcomeOpen: boolean
  inputPhoneOpen: boolean
  userPhoneNumber: number
  captchaOpen: boolean
}

function outputPhoneFormat(phoneNum: number): string {
  const firstThreeDigits = Math.floor(phoneNum / 10000000)
  const nextThreeDigits = Math.floor((phoneNum - (firstThreeDigits * 10000000)) / 10000)
  const nearlyLastThreeDigits = Math.floor((phoneNum - (firstThreeDigits * 10000000 + nextThreeDigits * 10000)) / 10)
  const lastDigit = phoneNum % 10

  return `(${
    firstThreeDigits.toLocaleString(undefined, {minimumIntegerDigits: 3,})}) ${
    nextThreeDigits.toLocaleString(undefined, {minimumIntegerDigits: 3},)}-${
    nearlyLastThreeDigits.toLocaleString(undefined, {minimumIntegerDigits: 3})}${lastDigit}`
}

class App extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      allowErrorPopUp: false,
      welcomeOpen: true,
      inputPhoneOpen: false,
      userPhoneNumber: 0,
      captchaOpen: false
    }
  }

  handlePageChange(): void {
    // Close the welcoming screen.
    if(this.state.welcomeOpen) {
      this.setState({welcomeOpen: false})
    }

    // If neither of the two other pages are open, then randomly open one.
    if(!this.state.inputPhoneOpen && !this.state.captchaOpen) {
      switch(Math.floor(Math.random() * 2)) {
        case 0:
          this.setState({ inputPhoneOpen: true, captchaOpen: false, userPhoneNumber: 0 })
          break
        case 1:
          this.setState({ inputPhoneOpen: false, captchaOpen: true })
      }
    // If the phone page is open, then swap to the captcha page.
    } else if(this.state.inputPhoneOpen) {
      this.setState({ inputPhoneOpen: false, captchaOpen: true })
    // If the captcha page is open, then swap to the phone page.
    } else if(this.state.captchaOpen) {
      this.setState({ inputPhoneOpen: true, captchaOpen: false })
    }
  }

  randomAlertText(): string {
    const { inputPhoneOpen } = this.state

    let alert = ""

    if(inputPhoneOpen) {
      const phoneInputAlertList = [
        "Your e-mail seems to be incorrect, try again.",
        "We're sorry, but your e-mail already has an account associated with it.",
        "Try entering your phone number again (it should be simple!).",
        "Connection timed out...",
        "Just try again, you'll get it soon!"
      ]
      
      alert = phoneInputAlertList[Math.floor(Math.random() * phoneInputAlertList.length)]
    }

    return alert
  }
  
  authenticatePhoneNum(phoneNum: number): number {
    const maxNum = 9999999999
    let authenticatedPhoneNum = phoneNum

    if(authenticatedPhoneNum > maxNum) {
      authenticatedPhoneNum = 0
    } else if(authenticatedPhoneNum < 0) {
      authenticatedPhoneNum = maxNum
    }

    return authenticatedPhoneNum
  }

  randomImageSelector(): JSX.Element {
    let fileDir = ""

    // There is currently no method of browser extensions having access to local files
    // (specifically regarding the use of 'fs' and 'path'), so the random image selector
    // is hardcoded below.
    switch(Math.floor(Math.random() * 10)) {
      case 0:
        fileDir = "./pics/20220326_171921.jpg"
        break
      case 1:
        fileDir = "./pics/20220327_114916.jpg"
        break
      case 2:
        fileDir = "./pics/20220328_201156.jpg"
        break
      case 3:
        fileDir = "./pics/20220329_121620.jpg"
        break
      case 4:
        fileDir = "./pics/20220329_121623.jpg"
        break
      case 5:
        fileDir = "./pics/20220329_121624.jpg"
        break
      case 6:
        fileDir = "./pics/20220330_000808.jpg"
        break
      case 7:
        fileDir = "./pics/20220330_002441.jpg"
        break
      case 8:
        fileDir = "./pics/20220403_145736.jpg"
        break
      case 9:
        fileDir = "./pics/Screenshot_20220110-121027_Video_Player.jpg"
        break
      case 10:
        fileDir = "./pics/IMG_20200813_104513.jpg"
        break
      case 11:
        fileDir = "./pics/IMG_20211122_205738-1.jpg"
    }

    return(
      <img src={fileDir} alt={fileDir} width= "100px" height= "100px"/>
    )
  }

  welcomeMenu(): JSX.Element {
    return(
      <div className={styles.mainContainer} id="Welcome Menu">
        <header className={styles.title}>
          Welcome to the Spectacularly Terrible Captchas!
        </header>
        <div className={styles.normalText}>
          Press the Button Below to Begin... Have Fun!
        </div>
      </div>
    )
  }

  inputPhone(): JSX.Element {
    return(
      <div className={styles.mainContainer} id="Input Phone Number">
        <header className={styles.title}>
          Welcome!
          <p className={styles.normalText}>
            To create you account, please input your email and phone number:
          </p>
        </header>
        <div>
          <div className={styles.alertText}>
            {this.state.allowErrorPopUp ? this.randomAlertText() : null}
            {this.state.allowErrorPopUp
              ? clearTimeout(setTimeout(() => {this.setState({allowErrorPopUp: false})}, 1500))
              : null
            }
          </div>
          <div className={styles.normalText}>
            <label>Email:</label>
            <input type="email" id="userEMail" /><br/>
          </div>
          <div className={styles.normalText}>
            <label>Phone Number:</label>
            <input readOnly={true} type="string"
              value={outputPhoneFormat((this.state.userPhoneNumber))} />
            <button type="button" style={{ width: "auto" }} onClick={
              () => this.setState({ userPhoneNumber: this.authenticatePhoneNum(this.state.userPhoneNumber + 1 )})}>
              +
            </button>
            <button type="button" style={{ width: "auto" }} onClick={
              () => this.setState({ userPhoneNumber: this.authenticatePhoneNum(this.state.userPhoneNumber - 1 )})}>
              -
            </button><br/>
          </div>
          <div style={{ textAlign: "center" }}>
            <button type="button" style={{ marginBottom: "10px" }} onClick={
              () => this.setState({ allowErrorPopUp: true })
            }>
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }

  captchaMenu(): JSX.Element {
    return (
      <div className={styles.mainContainer} id="Captcha Menu">
        <header className={styles.title}>
          Captcha Time!
          <p className={styles.normalText}>
            You know what to do...
          </p>
        </header>
        <div className={styles.normalText}>
          Select Pictures of {(Math.floor(Math.random() * 2)) ? "Cats" : "Dogs"}
        </div> 
        <div style={{ justifyContent: "center", marginBottom: "10px" }} className={styles.captchaImageColumn}>
          <button className={styles.captchaImageCell}>
            {this.randomImageSelector()}
          </button>
          <button className={styles.captchaImageCell}>
            {this.randomImageSelector()}
          </button>
          <button className={styles.captchaImageCell}>
            {this.randomImageSelector()}
          </button>
          <button className={styles.captchaImageCell}>
            {this.randomImageSelector()}
          </button>
          <button className={styles.captchaImageCell}>
            {this.randomImageSelector()}
          </button>
          <button className={styles.captchaImageCell}>
            {this.randomImageSelector()}
          </button>
          <button className={styles.captchaImageCell}>
            {this.randomImageSelector()}
          </button>
          <button className={styles.captchaImageCell}>
            {this.randomImageSelector()}
          </button>
          <button className={styles.captchaImageCell}>
            {this.randomImageSelector()}
          </button>
        </div>
      </div>
    )
  }

  render(): JSX.Element {
    return (
      <div id="Main Render">
        {this.state.welcomeOpen ? this.welcomeMenu() : null}
        {this.state.inputPhoneOpen ? this.inputPhone() : null}
        {this.state.captchaOpen ? this.captchaMenu() : null}
        <button className={styles.button} type="button" onClick={() => this.handlePageChange()}>
          {this.state.welcomeOpen ? "Click Here" : "Next..."}
        </button>
      </div>
    )
  }
}

export default App;
