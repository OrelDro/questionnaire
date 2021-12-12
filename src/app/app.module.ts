import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { QuestionComponent } from './components/question/question.component';
import { ReactiveComponentModule } from '@ngrx/component';

import {HttpClientModule} from '@angular/common/http';
import {CarouselModule} from 'primeng/carousel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import {questionReducer} from "./store/reducers/question.reducer";
import {QuestionsEffects} from "./store/effects/question.effect";
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({questionnaire: questionReducer}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([QuestionsEffects]),
    CarouselModule,
    SelectButtonModule,
    ButtonModule,
    ReactiveComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
