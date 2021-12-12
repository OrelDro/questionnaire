import {createSelector} from "@ngrx/store";
import {IQuestion} from "../../common/interfaces/question.interface";

export interface FeatureState {
  questions: IQuestion[];
  numCorrectAnswers: number;
  numWrongAnswers: number;
}

export interface QuestionnaireState {
  questionnaire: FeatureState;
}

export const selectQuestionnaire = (state: QuestionnaireState) => state.questionnaire;

export const selectQuestionsList = createSelector(
  selectQuestionnaire,
  (state: FeatureState) => state.questions
);

export const selectCorrectAnswers = createSelector(
  selectQuestionnaire,
  (state: FeatureState) => state.numCorrectAnswers
);

export const selectWrongAnswers = createSelector(
  selectQuestionnaire,
  (state: FeatureState) => state.numWrongAnswers
);

