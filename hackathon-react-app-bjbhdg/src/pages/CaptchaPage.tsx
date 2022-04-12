import React from 'react'
import styles from './Pages.module.css'

interface IProps {}

interface IState {
    allowPopUps: boolean
}

class CaptchaPage extends React.Component <IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      allowPopUps: false
    }
  }

  // Whenever the user attempts to submit their input, an alert is displayed on top of
  // the page.
  captchaPopUpMessage(): string {
    const captchaPopUpList = [
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

    return captchaPopUpList[Math.floor(Math.random() * captchaPopUpList.length)]
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
        fileDir = "./pics/Resized_20211031_0131221.jpg"
        break
      case 13:
        fileDir = "./pics/Resized_20211031_135824.jpg"
        break
      case 14:
        fileDir = "./pics/Resized_20220306_163016.jpg"
        break
      case 15:
        fileDir = "./pics/Resized_20220219_1952291.jpg"
        break
      case 16:
        fileDir = "./pics/Resized_20220204_2129581.jpg"
        break
      case 17:
        fileDir = "./pics/Resized_20211207_1504381.jpg"
        break
      case 18:
        fileDir = "./pics/Resized_20210429_14393111.jpg"
        break
      case 19:
        fileDir = "./pics/Resized_20211212_125918.jpg"
    }

    // A JSX Element is returned of the image chosen above, the imagge dimensions were forcibly
    // brought down to 120px by 120px, so prepare for some heavy stretching (for the laughs
    // of course).
    return(
      <img src={fileDir} alt={fileDir}/>
    )
  }

  // Uses a map function to render each cell in the 3x3 captcha grid.
  tableEntries(): JSX.Element {
    // A list of nine integers is used to represent each of the nine cells in the captcha grid.
    const ids: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    // Creates a cell for each of the nine total cells.
    const dataEntries: JSX.Element[] = ids.map((cell) =>
      <div className={styles.captchaImageCell} key={cell}>
        <input type="checkbox"></input>
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

  render(): JSX.Element {
    return (
      <div className={styles.mainContainer} id="Captcha Menu">
        <header className={styles.title} id="Captcha Title">
          Captcha Time!
          <p className={styles.normalText}>
            You know what to do...
          </p>
        </header>
        <div className={styles.alertText} id="Captcha Alert Space">
          {this.state.allowPopUps ? this.captchaPopUpMessage() : null}
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
              () => this.setState({ allowPopUps: false })}
          >
            Reset
          </button>
          {/* The captcha page is reset, along with allowing alerts to be displayed.*/}
          <button type="button" style={{ marginLeft: "5px", marginBottom: "10px" }}
            onClick={() => this.setState({ allowPopUps: true })}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}

export default CaptchaPage