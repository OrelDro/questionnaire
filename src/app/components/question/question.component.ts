import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../store/reducers/question.reducer";
import {UpdateCorrectAnswer, UpdateWrongAnswer} from "../../store/actions/question.action";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question?: string;
  @Input() isFinish!: boolean;
  @Input() answers!: string[];
  @Input() correctAnswer?: string;
  @Output() toNextQuestion: EventEmitter<void>;
  attempts: number;
  chosenAnswer: string | null;

  constructor(private store: Store<{ questionnaire: State }>) {
    this.attempts = 0;
    this.chosenAnswer = null;
    this.toNextQuestion = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  onSelectAnswer(ev: {event: MouseEvent, value: string}) {
    this.chosenAnswer = ev.value;
  }

  emitToNextQuestion(): void {
    this.toNextQuestion.emit();
  }

  clickOkHandler() {
    if (this.chosenAnswer === this.correctAnswer) {
      this.store.dispatch(UpdateCorrectAnswer());
      this.emitToNextQuestion();
    } else if (this.attempts === 2) {
      this.store.dispatch(UpdateWrongAnswer());
      this.emitToNextQuestion();
    } else {
      this.attempts += 1;
    }
  }

}
