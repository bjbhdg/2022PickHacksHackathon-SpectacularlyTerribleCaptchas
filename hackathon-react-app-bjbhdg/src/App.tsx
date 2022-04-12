import React from 'react'
import CSS from 'csstype'
import PhonePage from './pages/PhonePage'
import CaptchaPage from './pages/CaptchaPage'
import WelcomePage from './pages/WelcomePage'
import NotRobotPage from './pages/NotRobotPage'

const pageChangeButton: CSS.Properties = {
  marginTop: "10px",
  marginBottom: "10px",
  backgroundColor: "cornflowerblue",
  textAlign: "center",
  margin: "auto",
  display: "flex",
  color: "white",
  fontFamily: "arial",
  fontSize: "12px"
}

interface IProps {}

interface IState {
  welcomeOpen: boolean
  inputPhoneOpen: boolean
  captchaOpen: boolean
  notRobotOpen: boolean
}

class App extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      welcomeOpen: true,
      inputPhoneOpen: false,
      captchaOpen: false,
      notRobotOpen: false
    }
  }

  // Called every time the blue button at the bottom of each page is pressed.
  handlePageChange(): void {
    // Close the welcoming screen, if currently on it.
    if(this.state.welcomeOpen) {
      this.setState({welcomeOpen: false})
    }

    switch(Math.floor(Math.random() * 3)) {
      case 0:
        this.setState({ inputPhoneOpen: true, captchaOpen: false, notRobotOpen: false })
        break
      case 1:
        this.setState({ inputPhoneOpen: false, captchaOpen: true, notRobotOpen: false })
        break
      case 2:
        this.setState({ inputPhoneOpen: false, captchaOpen: false, notRobotOpen: true })
    }

    // If neither of the two other pages are open, then randomly open one.
    /*if(!this.state.inputPhoneOpen && !this.state.captchaOpen) {
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
    }*/
  }

  render(): JSX.Element {
    return (
      <div id="Main Render">
        {this.state.welcomeOpen ? <WelcomePage /> : null}
        {this.state.inputPhoneOpen ? <PhonePage /> : null}
        {this.state.captchaOpen ? <CaptchaPage /> : null}
        {this.state.notRobotOpen ? <NotRobotPage /> : null}
        <button style={pageChangeButton} type="button" id="Page Navigation Button"
          onClick={() => this.handlePageChange()}
        >
          {this.state.welcomeOpen ? "Click Here" : "Change Page"}
        </button>
      </div>
    )
  }
}

export default App
