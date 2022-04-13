import React from 'react'
import styles from './Pages.module.css'

interface IProps {}

interface IState {
  allowPopUps: boolean
  userPhoneNum: number
  currEmailChar: number
  userEnteredEmail: string
}

function outputPhoneFormat(phoneNum: number): string {
  // Cuts off the trailing seven numbers in the phone number (*xxx*) xxx-xxxx.
  const firstThreeDigits: number = Math.floor(phoneNum / 10000000)
  
  // Retrieves these (surrounded by '*') numbers in a phone number (xxx) *xxx*-xxxx
  const nextThreeDigits: number = Math.floor((phoneNum - (firstThreeDigits * 10000000)) / 10000)
  
  // Retrieves these (surrounded by '*') three digits: (xxx) xxx-*xxx*x
  const nearlyLastThreeDigits: number = Math.floor((phoneNum - 
    (firstThreeDigits * 10000000 + nextThreeDigits * 10000)) / 10)
  
  // Last digit of the phone number is retrieved, this is done because .toLocaleString()
  // below will forcibly place a comma in a number of greater than 3 digits.
  const lastDigit: number = phoneNum % 10
  
  // Formats the number as follows:
  // (firstThreeDigits) nextThreeDigits-nearlyLastThreeDigitslastDigit [(xxx) xxx-xxxx]
  return `(${
    firstThreeDigits.toLocaleString(undefined, {minimumIntegerDigits: 3,})}) ${
    nextThreeDigits.toLocaleString(undefined, {minimumIntegerDigits: 3},)}-${
    nearlyLastThreeDigits.toLocaleString(undefined, {minimumIntegerDigits: 3})}${lastDigit}`
}

class PhonePage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      allowPopUps: false,
      userPhoneNum: 0,
      currEmailChar: 65, //Captial 'A' in ASCII.
      userEnteredEmail: ""
    }
  }

  authenticateASCII(userEnteredASCII: number): number {
    const MIN_ASCII: number = 33
    const MAX_ASCII: number = 126

    if(userEnteredASCII < MIN_ASCII) {
      userEnteredASCII = MAX_ASCII
    } else if(userEnteredASCII > MAX_ASCII) {
      userEnteredASCII = MIN_ASCII
    }

    return userEnteredASCII
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

  phonePopUpMessage(): string {
    const phonePopUps: string[] = [
      "Your e-mail seems to be incorrect, try again.",
      "We're sorry, but your e-mail already has an account associated with it.",
      "Try entering your phone number again (it should be simple!).",
      "Connection timed out...",
      "Just try again, you'll get it soon!",
      "Did you forget your phone number? You better not have...",
      "You're really using that email? In 2022???",
      "Just remember, if you're tired of this, press the button that says \"Change Page\"",
      "You'll get this, we believe in you!",
      "You're lucky we're not grabbing your IP!",
      "Think long and hard. Remember, you're not logging in, you're creating an account!",
      "Look at all that hard work you did! Unfortunately your phone number is already claimed.",
      `${this.state.userEnteredEmail}? Seriously? Is that the best you can do?`,
      `I wouldn't want to be that guy that has the phone number 
      ${outputPhoneFormat(this.state.userPhoneNum)}, just saying.`,
      "Do you like this input style? I like it at least :)",
      "Don't forget, it's the journey that matters, not the destination.",
      "Don't worry, I can wait, I have all the time in the world."
    ]

    return phonePopUps[Math.floor(Math.random() * phonePopUps.length)]
  }

  render(): JSX.Element {
    return(
      <div id="Input Phone Number Page" className={styles.mainContainer}>
        <header id="Phone Number Title" className={styles.title}>
          Welcome!
          <p id="Phone Number Subtitle" className={styles.normalText}>
            To create you account, please input your email and phone number:
          </p>
        </header>
        <div>
          <div id="Phone Input Alert Space" className={styles.alertText}>
            {/* Alerts will only show up if allowed. */}
            {this.state.allowPopUps ? this.phonePopUpMessage() : null}
          </div>
          <div id="Email Input Field" className={styles.normalText}>
            <label>Email: </label>
            {/* Every time a user interacts with the data inputs in some way, the alert
              * on top of the page will be hidden (if previously visible).*/}
            <input id="User Email Output" type="email" readOnly={true}
              value={this.state.userEnteredEmail} size={64}
                style={{ marginBottom: "10px" }}
                  onClick={() => {this.setState({ allowPopUps: false })}}
            />
            <br/>
            {/* The user must use the following buttons to input their email. */}
            <button id="Char Cycle Increment" type="button" style={{ width: "auto" }}
              onClick={() => this.setState({ allowPopUps: false, currEmailChar:
                this.authenticateASCII(this.state.currEmailChar + 1)})}
            >
              +
            </button>
            <input id="Current User Char Output" type="text" readOnly={true}
              style={{ textAlign: "center" ,width: "15px" }}
              onClick={() => this.setState({ allowPopUps: false })}
              value={String.fromCharCode(this.state.currEmailChar)}
            />
            <button id="Char Cycle Decrement" type="button" style={{ width: "auto" }}
              onClick={() => this.setState({ allowPopUps: false, currEmailChar:
                this.authenticateASCII(this.state.currEmailChar - 1)})}
            >
              -
            </button>
            <button id="Current Char Submit" type="button" style={{ width: "auto" }}
              onClick={() => this.setState({ allowPopUps: false, userEnteredEmail:
                this.state.userEnteredEmail.concat(String.fromCharCode(this.state.currEmailChar))})}
            >
              Add
            </button>
            <button id="Last Email Char Remover" type="button" style={{ width: "auto" }}
              onClick={() => this.setState({ allowPopUps: false, userEnteredEmail:
                this.state.userEnteredEmail.substring(0, this.state.userEnteredEmail.length - 1)})}
            >
              Backspace
            </button>
            <br/>
          </div>
          <div id="Phone Number Input Field" className={styles.normalText}>
            <label>Phone Number: </label>
            <input id="Phone Number Output" readOnly={true} type="string" size={12}
              onClick={() => {this.setState({ allowPopUps: false })}}
              value={outputPhoneFormat((this.state.userPhoneNum))}
            />
            <button id="Phone Number Increment" type="button" style={{ width: "auto" }}
              onClick={() => this.setState({ allowPopUps: false, userPhoneNum:
                this.authenticatePhoneNum(this.state.userPhoneNum + 1)})}
            >
              +
            </button>
            <button id="Phone Number Decrement" type="button" style={{ width: "auto" }}
              onClick={() => this.setState({ allowPopUps: false, userPhoneNum:
                this.authenticatePhoneNum(this.state.userPhoneNum - 1 )})}
            >
              -
            </button>
            <br/>
          </div>
          <div id="Submit Field" style={{ textAlign: "center" }}>
            <button type="button" style={{ marginBottom: "10px" }}
              onClick={() => this.setState({ allowPopUps: true })}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default PhonePage