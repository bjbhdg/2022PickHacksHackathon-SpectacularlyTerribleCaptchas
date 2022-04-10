import React from 'react'
import styles from './App.module.css' // CSS styles located here.

interface IProps {}

interface IState {
  allowAlertPopUp: boolean
  welcomeOpen: boolean
  inputPhoneOpen: boolean
  userPhoneNumber: number
  captchaOpen: boolean
}

function outputPhoneFormat(phoneNum: number): string {
  // Cuts off the trailing seven numbers in the phone number (*xxx*) xxx-xxxx.
  const firstThreeDigits = Math.floor(phoneNum / 10000000)

  // Retrieves these (surrounded by '*') numbers in a phone number (xxx) *xxx*-xxxx
  const nextThreeDigits = Math.floor((phoneNum - (firstThreeDigits * 10000000)) / 10000)

  // Retrieves these (surrounded by '*') three digits: (xxx) xxx-*xxx*x
  const nearlyLastThreeDigits = Math.floor((phoneNum - 
    (firstThreeDigits * 10000000 + nextThreeDigits * 10000)) / 10)

  // Last digit of the phone number is retrieved, this is done because .toLocaleString()
  // below will forcibly place a comma in a number of greater than 3 digits.
  const lastDigit = phoneNum % 10

  // Formats the number as follows:
  // (firstThreeDigits) nextThreeDigits-nearlyLastThreeDigitslastDigit [(xxx) xxx-xxxx]
  return `(${
    firstThreeDigits.toLocaleString(undefined, {minimumIntegerDigits: 3,})}) ${
    nextThreeDigits.toLocaleString(undefined, {minimumIntegerDigits: 3},)}-${
    nearlyLastThreeDigits.toLocaleString(undefined, {minimumIntegerDigits: 3})}${lastDigit}`
}

class App extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      allowAlertPopUp: false,
      welcomeOpen: true,
      inputPhoneOpen: false,
      userPhoneNumber: 0,
      captchaOpen: false
    }
  }

  // Called every time the blue button at the bottom of each page is pressed.
  handlePageChange(): void {
    // Close the welcoming screen, if currently on it.
    if(this.state.welcomeOpen) {
      this.setState({welcomeOpen: false})
    }

    // If neither of the two other pages are open, then randomly open one.
    if(!this.state.inputPhoneOpen && !this.state.captchaOpen) {
      switch(Math.floor(Math.random() * 2)) {
        case 0:
          this.setState({ inputPhoneOpen: true, captchaOpen: false })
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

    // Under no circumstances will the user-entered phone number will be kept between page changes,
    // as well as alert message.
    this.setState({ userPhoneNumber: 0, allowAlertPopUp: false })
  }

  // Whenever the user attempts to submit their input, an alert is displayed on top of
  // the page.
  randomAlertText(): string {
    const { inputPhoneOpen, captchaOpen } = this.state

    let alert: string = ""

    // Alerts specifically for the phone number entering page.
    if(inputPhoneOpen) {
      const phoneInputAlertList = [
        "Your e-mail seems to be incorrect, try again.",
        "We're sorry, but your e-mail already has an account associated with it.",
        "Try entering your phone number again (it should be simple!).",
        "Connection timed out...",
        "Just try again, you'll get it soon!",
        "Did you forget your phone number? You better not have...",
        "You're really using that email? In 2022???",
        "Just remember, if you're tired of this, press the button that says \"Other\"",
        "You'll get this, we believe in you!",
        "You're lucky we're not grabbing your IP!",
        "Think long and hard. Remember, you're not logging in, you're creating an account!",
        "Look at all that hard work you did! Unfortunately your phone number is already claimed."
      ]
      
      alert = phoneInputAlertList[Math.floor(Math.random() * phoneInputAlertList.length)]
    }
    // Alerts specifically for the captcha page. 
    else if(captchaOpen) {
      const captchaAlertList = [
        "Aren't cats just the greatest?",
        "Dogs are pretty cool, right?",
        "Cats are better, change my mind.",
        "Come on, it's a captcha! What are you? A robot?",
        "The black/white cat's name is Boots!",
        "The dark gray/white, fat cat's name is Socks!",
        "The black/white, pig-like dog's name is Lucy!",
        "The big, yellow, greedy dog's name is Bella!",
        "The small, brown dog, mid-jump, is named Poppy!",
        "We're not sure what the bowl/chair cat's name is...",
        "Are you starting to realize?... You know what, nevermind.",
        "To continue, say \"I prefer cats over dogs\" out loud.",
        "How are you liking this so far? Entertained???",
        "Do you have any pets? We would love to know!",
        "Doesn't image stretch make the world go 'round?"
      ]

      alert = captchaAlertList[Math.floor(Math.random() * captchaAlertList.length)]
    }

    return alert
  }
  
  authenticatePhoneNum(phoneNum: number): number {
    // The maximum theoretical phone number would be (999) 999-9999.
    const maxNum: number = 9999999999
    let authenticatedPhoneNum: number = phoneNum

    // Overflows the phone number to zero.
    if(authenticatedPhoneNum > maxNum) {
      authenticatedPhoneNum = 0
    // Underflows the phone number to the max phone number.
    } else if(authenticatedPhoneNum < 0) {
      authenticatedPhoneNum = maxNum
    }

    return authenticatedPhoneNum
  }

  // Returns a random image from the directory 'hackathon-react-app-bjbhdg-public-pics'
  // (the directory is navigated from 'index.html' in the public folder).
  randomImageSelector(): JSX.Element {
    let fileDir: string = ""

    // There is currently no method for firefox browser extensions to obtain access to
    // local files without needing user input. Since the captcha needs to be filled with random
    // images from the pics/ folder, I unfortunatetly must hardcode every directory to correctly
    // output the image.
    switch(Math.floor(Math.random() * 20)) {
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
        break
      case 12:
        fileDir = "./pics/Resized_20211031_0131221.jpeg"
        break
      case 13:
        fileDir = "./pics/Resized_20211031_135824.jpeg"
        break
      case 14:
        fileDir = "./pics/Resized_20220306_163016.jpeg"
        break
      case 15:
        fileDir = "./pics/Resized_20220219_1952291.jpeg"
        break
      case 16:
        fileDir = "./pics/Resized_20220204_2129581.jpeg"
        break
      case 17:
        fileDir = "./pics/Resized_20211207_1504381.jpeg"
        break
      case 18:
        fileDir = "./pics/Resized_20210429_14393111.jpeg"
        break
      case 19:
        fileDir = "./pics/Resized_20211212_125918.jpeg"
    }

    // A JSX Element is returned of the image chosen above, then size of the image is forcibly
    // made to be 125px by 125px, so some pictures will have HEAVY stretch.
    return(
      <img src={fileDir} alt={fileDir} width="120px" height="120px"/>
    )
  }

  // Uses a map function to render each cell in the 3x3 captcha grid.
  tableEntries(): JSX.Element {
    // A list of nine integers is used to represent each of the nine cells in the captcha grid.
    const ids: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    // Creates a cell for each of the nine total cells.
    const dataEntries: JSX.Element[] = ids.map((cell) =>
      <div className={styles.captchaImageCell}>
        <input type="checkbox" key={cell}></input>
        {this.randomImageSelector()}
      </div>
    )

    // Encapsulates all of the previous cells.
    return (
      <div style={{ justifyContent: "center", marginBottom: "10px" }}
        className={styles.captchaImageColumn}
      >
        {dataEntries}
      </div>
    )
  }

  // Welcoming screen for the browser extension (will only ever show up once).
  welcomeMenu(): JSX.Element {
    return(
      <div className={styles.mainContainer} id="Welcome Menu">
        <header className={styles.title}>
          Welcome to the Spectacularly Terrible Captchas!
        </header>
        <div className={styles.normalText} id="User Instruction Prompt">
          Press the Button Below to Begin (and Navigate Pages Later)... Have Fun!
        </div>
      </div>
    )
  }

  // Contains the HTML for the phone number entering page.
  inputPhone(): JSX.Element {
    return(
      <div className={styles.mainContainer} id="Input Phone Number Page">
        <header className={styles.title} id="Phone Number Title">
          Welcome!
          <p className={styles.normalText}>
            To create you account, please input your email and phone number:
          </p>
        </header>
        <div>
          <div className={styles.alertText} id="Phone Input Alert Space">
            {/* Alerts will only show up if allowed. */}
            {this.state.allowAlertPopUp ? this.randomAlertText() : null}
          </div>
          <div className={styles.normalText} id="Email Input Field">
            <label>Email:</label>
            {/* Every time a user interacts with the data inputs in some way, the alert
              * on top of the page will be hidden (if previously visible).*/}
            <input type="email" onClick={() => 
              {this.setState({ allowAlertPopUp: false })}}
            /><br/>
          </div>
          <div className={styles.normalText} id="Phone Number Input Field">
            <label>Phone Number:</label>
            <input readOnly={true} type="string"
              onClick={() => {this.setState({ allowAlertPopUp: false })}}
              value={outputPhoneFormat((this.state.userPhoneNumber))}
            />
            <button type="button" style={{ width: "auto" }} onClick={
              () => this.setState({ allowAlertPopUp: false, userPhoneNumber:
              this.authenticatePhoneNum(this.state.userPhoneNumber + 1)})}
            >
              +
            </button>
            <button type="button" style={{ width: "auto" }} onClick={
              () => this.setState({ allowAlertPopUp: false, userPhoneNumber:
              this.authenticatePhoneNum(this.state.userPhoneNumber - 1 )})}
            >
              -
            </button><br/>
          </div>
          <div style={{ textAlign: "center" }} id="Submit Field">
            <button type="button" style={{ marginBottom: "10px" }} onClick={
              () => this.setState({ allowAlertPopUp: true })
            }>
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Contains the HTML code for the "Captcha" page.
  captchaMenu(): JSX.Element {
    return (
      <div className={styles.mainContainer} id="Captcha Menu">
        <header className={styles.title} id="Captcha Title">
          Captcha Time!
          <p className={styles.normalText}>
            You know what to do...
          </p>
        </header>
        <div className={styles.alertText} id="Captcha Alert Space">
          {this.state.allowAlertPopUp ? this.randomAlertText() : null}
        </div>
        <div className={styles.normalText} id="Captcha Task Description">
          {/* Will randomly prompt the user to select pictures of cats or dogs.*/}
          Select Pictures of <b> {(Math.floor(Math.random() * 2)) ? "Cats" : "Dogs"}
          </b> Using the Checkboxes
        </div> 
        {/* A 3x3 grid of 9 random images will be placed here. */}
        {this.tableEntries()}
        <div style={{ textAlign: "center" }} id="Submission/Reset Buttons">
          {/* The setState call forcibly reshuffles each image in the captcha grid. */}
          <button type="button" style={{ marginRight: "5px", marginBottom: "10px"}} onClick={
              () => this.setState({ allowAlertPopUp: false })}
          >
            Reset
          </button>
          {/* The captcha page is reset, along with allowing alerts to be displayed.*/}
          <button type="button" style={{ marginLeft: "5px", marginBottom: "10px" }} onClick={
              () => this.setState({ allowAlertPopUp: true })}
          >
            Submit
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
        <button className={styles.button} type="button" id="Page Navigation Button"
          onClick={() => this.handlePageChange()}
        >
          {this.state.welcomeOpen ? "Click Here" : "Other"}
        </button>
      </div>
    )
  }
}

export default App;
