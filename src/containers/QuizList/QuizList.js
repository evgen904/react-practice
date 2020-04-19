import React, {Component} from "react";
import classes from './QuizList.module.scss'
import {NavLink} from "react-router-dom";
import axios from 'axios'

export default class QuizList extends Component {

  componentDidMount() {
    axios.get('https://react-quiz-72735.firebaseio.com/quiz.json').then(response => {
      console.log(response);
    })
  }

  renderQuizes() {
    return [1,2,3].map((quiz, index) => {
      return(
        <li key={index}>
          <NavLink
            to={'/quiz/' + quiz}
          >
            Тест {quiz}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    return(
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          <ul>
            {this.renderQuizes()}
          </ul>
        </div>
      </div>
    )
  }
}
