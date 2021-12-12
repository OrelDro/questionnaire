import {Component, OnInit} from '@angular/core';
import {IQuestion} from "./common/interfaces/question.interface";
import {interval, Subject} from "rxjs";
import {repeatWhen, takeUntil} from "rxjs/operators";
import {QuestionsService} from "./common/services/questions.service";
import {Store} from "@ngrx/store";
import {State} from "./store/reducers/question.reducer";
import {GetQuestions, Reset} from "./store/actions/question.action";
import {selectQuestionsList} from "./store/selectors/question.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;
  questionIndex: number;

  questions: (number | IQuestion | null)[];
  timer: number;
  finishQuestionnaire: boolean;
  private readonly MAX_TIMER = 20;
  private readonly INTERVAL = 1000;
  private _stop$: Subject<void>;
  private _start$: Subject<void>;

  constructor(private questionsService: QuestionsService,
              private store: Store<{ questionnaire: State }>) {
    this.title = 'Questionnaire';
    this._stop$ = new Subject<void>();
    this._start$ = new Subject<void>();
    this.store.dispatch(GetQuestions());
    this.finishQuestionnaire = false;
    this.questionIndex = 0;
    this.questions = [];
    this.timer = this.MAX_TIMER;
  }

  ngOnInit() {
    this.store.select(selectQuestionsList).subscribe( (questions) => {
      const nullArray = new Array(10 - questions.length).fill(null, 0, 10 - questions.length);
      this.questions = [...questions, ...nullArray];
    })

    interval(this.INTERVAL).pipe(
      takeUntil(this._stop$),
      repeatWhen(() => this._start$)
    ).subscribe( (time) => {
      this.timer = this.MAX_TIMER - time;
      if (this.timer === 0) {
        this.toNextQuestion();
      }
    });
  }

  reset(): void {
    this.store.dispatch(Reset());
    this.finishQuestionnaire = false;
    this.questionIndex = 0;
    this.questions = [];
    this.timer = this.MAX_TIMER;
    this._start$.next();
    this.store.dispatch(GetQuestions());
  }

  toNextQuestion(): void {
    this._stop$.next();
    if (this.questionIndex === this.questions.length - 1) {
      this.finishQuestionnaire = true;
      return;
    }
    this._start$.next();
    this.questionIndex += 1;
  }
}
