import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCheck]'
})
export class CheckDirective {
  @Input()
  public set appCheck(condition : boolean) {
    !condition?this.vcRef.createEmbeddedView(this.templateRef):this.vcRef.clear();

  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef ) { }

}
