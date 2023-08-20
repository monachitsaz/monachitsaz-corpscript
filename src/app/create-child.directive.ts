import { Directive, ViewContainerRef } from '@angular/core';
@Directive({
  selector: '[createChild]'
})
export class CreateChildDirective {
  [x: string]: any;

  constructor(public viewContainerRef: ViewContainerRef) { }

}
