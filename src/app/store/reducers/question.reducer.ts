import {createReducer, on} from "@ngrx/store";
import {IQuestion} from "../../common/interfaces/question.interface";
import {GetQuestions, Reset, SetQuestions, UpdateCorrectAnswer, UpdateWrongAnswer} from "../actions/question.action";

export interface State {
  questions: IQuestion[];
  numCorrectAnswers: number;
  numWrongAnswers: number;
}

const initialState: State = {
  questions: [],
  numCorrectAnswers: 0,
  numWrongAnswers: 0
};

export const questionReducer = createReducer(initialState,
  on(GetQuestions, (state) => ({...state})),
  on(SetQuestions, (state, {question}) => ({...state, questions: [...state.questions, question]})),
  on(UpdateCorrectAnswer, (state) => {
    let numCorrectAnswers = state.numCorrectAnswers;
    return {...state, numCorrectAnswers: ++numCorrectAnswers}
  }),
  on(UpdateWrongAnswer, (state) => {
    let numWrongAnswers = state.numWrongAnswers;
    return {...state, numWrongAnswers: ++numWrongAnswers}
  }),
  on(Reset, (state) => ({...state, questions: [], numCorrectAnswers: 0, numWrongAnswers: 0}))
)
