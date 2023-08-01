import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[gameState]'
})
export class GameStateDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }


}
