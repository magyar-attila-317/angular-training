import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appCustomDirectiveWithInput]'
})
export class CustomDirectiveWithInputDirective implements OnInit {

  // @Input() color = '';
  @Input('appCustomDirectiveWithInput') color = '';

  constructor(private eleRef: ElementRef) {
  }

  ngOnInit(): void {
    this.eleRef.nativeElement.style.background = this.color;
  }


}
