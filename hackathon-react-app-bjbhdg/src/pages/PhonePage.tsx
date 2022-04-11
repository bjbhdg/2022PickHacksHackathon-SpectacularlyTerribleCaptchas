import React from 'react'
import styles from './Pages.module.css'

interface IProps {}

interface IState {
  allowPopUps: boolean
  userPhoneNum: number
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

class PhonePage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      allowPopUps: false,
      userPhoneNum: 0
    }
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
    const phonePopUps = [
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

    return phonePopUps[Math.floor(Math.random() * phonePopUps.length)]
  }

  render(): JSX.Element {
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
            {this.state.allowPopUps ? this.phonePopUpMessage() : null}
          </div>
          <div className={styles.normalText} id="Email Input Field">
            <label>Email:</label>
            {/* Every time a user interacts with the data inputs in some way, the alert
              * on top of the page will be hidden (if previously visible).*/}
            <input type="email" onClick={() => 
              {this.setState({ allowPopUps: false })}}
            /><br/>
          </div>
          <div className={styles.normalText} id="Phone Number Input Field">
            <label>Phone Number:</label>
            <input readOnly={true} type="string"
              onClick={() => {this.setState({ allowPopUps: false })}}
              value={outputPhoneFormat((this.state.userPhoneNum))}
            />
            <button type="button" style={{ width: "auto" }} onClick={
              () => this.setState({ allowPopUps: false, userPhoneNum:
              this.authenticatePhoneNum(this.state.userPhoneNum + 1)})}
            >
              +
            </button>
            <button type="button" style={{ width: "auto" }} onClick={
              () => this.setState({ allowPopUps: false, userPhoneNum:
              this.authenticatePhoneNum(this.state.userPhoneNum - 1 )})}
            >
              -
            </button><br/>
          </div>
          <div style={{ textAlign: "center" }} id="Submit Field">
            <button type="button" style={{ marginBottom: "10px" }} onClick={
              () => this.setState({ allowPopUps: true })
            }>
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default PhonePage