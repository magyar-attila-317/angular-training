import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import { CustomDirectiveDirective } from './custom-directive/custom-directive.directive';
import { CustomDirectiveWithInputDirective } from './custom-directive/custom-directive-with-input.directive';
import { CustomDirectiveWithListenerDirective } from './custom-directive/custom-directive-with-listener.directive';

@NgModule({
  declarations: [
    AppComponent,
    CustomDirectiveDirective,
    CustomDirectiveWithInputDirective,
    CustomDirectiveWithListenerDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
