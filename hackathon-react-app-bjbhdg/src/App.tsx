import React, { Component } from 'react';
import CSS from "csstype"

const mainContainer: CSS.Properties = {
  height: "auto",
  width: "auto",
  marginLeft: "10px",
  marginRight: "10px",
}

const title: CSS.Properties = {
  marginTop: "10px",
  marginBottom: "10px",
  textAlign: "center",
  fontFamily: "arial",
  fontSize: "16px",
  fontWeight: "bold",
}

const normalText: CSS.Properties = {
  marginTop: "10px",
  marginBottom: "10px",
  textAlign: "center",
  fontFamily: "arial",
  fontSize: "12px",
}

const button: CSS.Properties = {
  marginTop: "10px",
  marginBottom: "10px",
  backgroundColor: "blue",
  border: "none",
  textAlign: "center",
  margin: "auto",
  display: "flex",
  color: "white",
  fontFamily: "arial",
  fontSize: "12px",
}

interface IProps {}

interface IState {
  welcomeOpen: boolean,
  inputPhoneOpen: boolean,
  pictureCaptchaOpen: boolean
}

class App extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      welcomeOpen: true,
      inputPhoneOpen: false,
      pictureCaptchaOpen: false,
    }
  }

  welcomeMenu(): JSX.Element {
    return(
      <div style={mainContainer} className="Welcome Menu">
        <header style={title}>
          Welcome to the Laughly Bad "Captcha-Like" Task Extension!
        </header>
        <div style={normalText}>
          Press the Button Below to Begin... Have Fun!
        </div>
        <button style={button} type="button" onClick={() => this.setState({ welcomeOpen: false })}>
          Click Here
        </button>
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <div>
        {this.state.welcomeOpen ? this.welcomeMenu() : null}
      </div>
    );
  }
}

export default App;
