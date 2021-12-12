import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {IQuestion, IQuestionResponse} from "../interfaces/question.interface";
import {shuffleArray} from "../helpers/helper";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private readonly Path: string = 'https://opentdb.com/api.php?amount=1&encode=base64&type=multiple';

  constructor(private httpClient: HttpClient) {}

  getAllQuestions(): Observable<IQuestion> {
    return from(new Array(10)).pipe(
      mergeMap(id => this.httpClient.get<IQuestionResponse>(this.Path)),
      map((value: IQuestionResponse) => {
          const val = value.results[0];
          return {
            category: atob(val.category),
            question: atob(val.question),
            correct_answer: atob(val.correct_answer),
            answers: shuffleArray(val.incorrect_answers.map( v => atob(v)).concat(atob(val.correct_answer)))
          };
        }
      )
    )
  }
}
