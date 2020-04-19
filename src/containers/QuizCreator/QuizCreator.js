import React, {Component} from "react";
import classes from './QuizCreator.module.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import {createControl, validate, validateForm} from '../../form/formFramework'


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
    formControls: createFormControls(),
    rightAnswerId: 1,
    isFormValid: false
  }

  submitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = (event) => {
    event.preventDefault()

    const quiz = this.state.quiz.concat()
    const index = this.state.quiz.length + 1

    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false
    })
  }

  createQuizHendler = (event) => {
    event.preventDefault()

    console.log(this.state.quiz);
    // TODO: Server
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
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

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: event.target.value
    })
  }

  render() {

    const select = <Select
      label="Выберите правильный ответ"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: '1', value: 1},
        {text: '2', value: 2},
        {text: '3', value: 3},
        {text: '4', value: 4}
      ]}
    />

    return(
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>

            { this.renderControls() }

            { select }

            <Button
              type={'primary'}
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type={'success'}
              onClick={this.createQuizHendler}
              disabled={this.state.quiz.length === 0}
            >
              Создать тест
            </Button>

          </form>
        </div>
      </div>
    )
  }
}
