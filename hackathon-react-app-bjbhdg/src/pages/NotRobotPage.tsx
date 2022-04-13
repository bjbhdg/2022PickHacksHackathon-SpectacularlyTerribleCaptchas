import React from 'react'
import styles from './Pages.module.css'

interface IProps {}

interface IState {
  checkBoxClickCount: number
}

class NotRobotPage extends React.Component <IProps, IState> {
  constructor(props: IProps) {
      super(props)
      this.state = {
        // -3 is the default value so that the user must click the checkbox three times
        // in order for a pop up to be shown.
        checkBoxClickCount: -2
      }
  }

  notRobotPopUpMessage(): string {
      const robotPopUpList: string[] = [
        "Uh... are you okay?",
        "You've been here for a while now...",
        "Don't worry, I trust that you're not a robot.",
        "Look, I realize that this might be a challenge, but don't give up!",
        "ROBOT DETECTED! COMMENCING ANTI-MEASURES.",
        "This is by far the easiest task I have assigned to you, come on.",
        "Look pal, you're wasting valuable server space for our other clients, please hurry!",
        "Imagine you are the button, just check yourself, it's so simply.",
        "You may want to get your parents to help you."
      ]

      return robotPopUpList[Math.floor(Math.random() * robotPopUpList.length)]
  }

  render(): JSX.Element {
    return (
      <div id="Not A Robot Page" className={styles.mainContainer}>
        <header id="Not a Robot Title" className={styles.title}>
          Robot Test!
          <p id="Not a Robot Subtitle" className={styles.normalText}>
            Please confirm that you are not a robot.
          </p>
        </header>
        {/* For every three clicks of the checkbox, a pop up is shown.*/} 
        <div id="Not a Robot Pop Up Space" className={styles.alertText}>
          {(this.state.checkBoxClickCount % 3) ? null : this.notRobotPopUpMessage()}
        </div>
        <div id="Futile Human Prover" style={{ textAlign: "center", marginBottom: "10px" }}>
          <input id="Uncheckable Box" onClick={() => this.setState({
            checkBoxClickCount: this.state.checkBoxClickCount + 1 })}
              type="checkbox" checked={false}
          />
          <label id="Promise Prompt" className={styles.title} style={{ marginBottom: "10px" }}>
            I am not a robot.
          </label>
        </div>
      </div>
    )
  }
}

export default NotRobotPage