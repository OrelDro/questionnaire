import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {GetQuestions, SetQuestions} from "../actions/question.action";
import {map, mergeMap} from "rxjs/operators";
import {QuestionsService} from "../../common/services/questions.service";

@Injectable()
export class QuestionsEffects {
  getQuestions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GetQuestions),
        mergeMap(() => this.questionsService.getAllQuestions().pipe(
          map((question) => {
            return SetQuestions({question})
          })
        ))
      )
  );

  constructor(
    private actions$: Actions,
    private questionsService: QuestionsService
  ) {}
}
