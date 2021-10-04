import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirectiveDirective {

  constructor(private eleRef: ElementRef) {
    eleRef.nativeElement.style.background = 'magenta';
  }

}
