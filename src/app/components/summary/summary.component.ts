import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {selectCorrectAnswers, selectWrongAnswers} from "../../store/selectors/question.selectors";
import {Store} from "@ngrx/store";
import {State} from "../../store/reducers/question.reducer";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  numOfCorrectAnswers$: Observable<number> | null;
  numOfWrongAnswers$: Observable<number> | null;
  @Output() resetEmit: EventEmitter<void>;

  constructor(private store: Store<{ questionnaire: State }>) {
    this.resetEmit = new EventEmitter<void>();
    this.numOfCorrectAnswers$ = null;
    this.numOfWrongAnswers$ = null;
  }

  ngOnInit(): void {
    this.numOfCorrectAnswers$ = this.store.select(selectCorrectAnswers);
    this.numOfWrongAnswers$ = this.store.select(selectWrongAnswers);
  }

  clickResetHandler():void {
    this.resetEmit.emit();
  }

}
