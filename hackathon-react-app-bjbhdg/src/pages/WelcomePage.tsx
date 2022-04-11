import React from 'react'
import styles from './Pages.module.css'

class WelcomePage extends React.Component {
  // Welcoming screen for the browser extension (will only ever show up once).
  render(): JSX.Element {
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
}

export default WelcomePage