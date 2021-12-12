export interface IQuestionResponse {
  response_code: number,
  results: IResult[]
}

export interface IResult {
  category: string,
  type: string,
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[]
}

export interface IQuestion {
  category: string,
  question: string,
  correct_answer: string,
  answers: string[]
}
