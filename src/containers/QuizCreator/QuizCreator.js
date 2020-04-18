import React, {Component} from "react";
import classes from './QuizCreator.module.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import {createControl} from '../../form/formFramework'


function createOPtionControl(number) {
  return createControl({
    label: `Вопрос ${number}`,
    errorMeaasage: 'Значение не может быть пустым',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMeaasage: 'Вопрос не может быть пустым'
    }, {required: true}),
    option1: createOPtionControl(1),
    option2: createOPtionControl(2),
    option3: createOPtionControl(3),
    option4: createOPtionControl(4)
  }
}

export default class QuizCreator extends Component {

  state = {
    quiz: [],
    formControls: createFormControls()
  }

  submitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = () => {

  }

  createQuizHendler = () => {

  }

  changeHandler = (value, controlName) => {

  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return(
        <Auxiliary key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          { index === 0 ? <hr/> : null }
        </Auxiliary>
      )
    })
  }

  render() {
    return(
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>

            { this.renderControls() }

            <select></select>

            <Button
              type={'primary'}
              onClick={this.addQuestionHandler}
            >
              Добавить вопрос
            </Button>
            <Button
              type={'success'}
              onClick={this.createQuizHendler}
            >
              Создать тест
            </Button>

          </form>
        </div>
      </div>
    )
  }
}
