import {createAction, props} from "@ngrx/store";
import {IQuestion} from "../../common/interfaces/question.interface";

export enum QuestionActionTypes {
  GetQuestions = 'GetQuestions',
  SetQuestions = 'SetQuestions',

  UpdateCorrectAnswer = 'UpdateCorrectAnswer',
  UpdateWrongAnswer = 'UpdateWrongAnswer',

  Reset = 'Reset'
}

export const GetQuestions = createAction(QuestionActionTypes.GetQuestions);
export const SetQuestions = createAction(QuestionActionTypes.SetQuestions, props<{question: IQuestion}>());

export const UpdateCorrectAnswer = createAction(QuestionActionTypes.UpdateCorrectAnswer);
export const UpdateWrongAnswer = createAction(QuestionActionTypes.UpdateWrongAnswer);

export const Reset = createAction(QuestionActionTypes.Reset);
