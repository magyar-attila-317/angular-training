import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCustomDirectiveWithListener]'
})
export class CustomDirectiveWithListenerDirective {

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('mouseenter')
  public mouseEnter(): void {
    console.log('elementRef:', this.elementRef);
    console.log('elementRef.nativeElement:', this.elementRef.nativeElement);
    this.elementRef.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave', ['$event.target']) // We may also access our events target this way
  public mouseUp(target: EventTarget): void {
    console.log('$event.target: ', target);
    this.elementRef.nativeElement.style.backgroundColor = 'lightgrey';
  }

}
