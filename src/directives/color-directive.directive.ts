import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { TimeoutError, timeout } from 'rxjs';

@Directive({
  selector: '[appColorDirective]'
})
//Directive to manage style in this case
export class ColorDirectiveDirective implements OnInit {

  @Input() defaultColor='blue';
  @Input() highLightColor='red';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue'); //Both ways are rigthly different
    this.backgroundColor=this.defaultColor;
    //throw new Error('Method not implemented.');
  }

  @HostListener('mouseenter') mouseover(evenData: Event): void{
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red');//Both ways are rigthly different
    this.backgroundColor=this.highLightColor;
  }

  @HostListener('mouseleave') mouseleave(evenData: Event): void{
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');//Both ways are rigthly different
    this.backgroundColor=this.defaultColor;
  }
  @HostListener('click') mouseclick(evenData: Event): void{
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');//Both ways are rigthly different
    this.backgroundColor="white";
    setTimeout(() => {
      this.backgroundColor=this.highLightColor;
    }, 200);
  }

}
