import React from 'react'
import '../styles/Home.css'
import logo from '../../public/lrnr-logo.png'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>


      <div className="section no-pad-bot" id="index-banner">
    <div className="container">
      <br></br>
      <div className="row center">
      <img src={logo} alt="lrnr-logo" className="lrnr-logo"></img>
        <h5 className="header col s12 light">Your guided path to programming enlightenment</h5>
      </div>
      <div className="row center">
        <Link to='/quizforms' id="download-button" className="btn-large waves-effect waves-light">Begin Journey</Link>
      </div>
      <br></br>

    </div>
  </div>


  <div className="container">
    <div className="section">

      <div className="row">
        <div className="col s12 m4">
          <div className="icon-block">
          <h2 class="center light-blue-text"><i class="medium material-icons">flash_on</i></h2>
            <h5 className="center">Personalized Quizzes</h5>

            <p className="light">Greetings, young padawan. Are you ready to embark on a journey of personalized enlightenment through the art of coding? Our app, can create custom quizzes that align with your coding skills and interests. Whether you are a novice or a master, our system can generate questions that will test your proficiency in programming languages, tools, and concepts</p>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center light-blue-text"><i className="medium material-icons">payments</i></h2>
            <h5 className="center">Rewarding</h5>

            <p className="light">Our app is designed to be both challenging and rewarding, so you can learn new concepts while enjoying the process. With our personalized quiz app, you can track your progress, compete with your peers, and discover new areas of expertise. The journey of a thousand lines of code begins with a single keystroke</p>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center light-blue-text"><i className="medium material-icons">person</i></h2>
            <h5 className="center">Personal SME</h5>

            <p className="light">Welcome to the path of knowledge. Our app is like having a personal subject matter expert at your side, guiding you on your journey towards wisdom</p>
          </div>
        </div>
      </div>

    </div>
    <br></br>
  </div>
    </div>
  )
}
