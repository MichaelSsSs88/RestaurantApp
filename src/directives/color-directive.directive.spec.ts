import { ElementRef, Renderer2 } from '@angular/core';
import { ColorDirectiveDirective } from './color-directive.directive';

describe('ColorDirectiveDirective', () => {
  it('should create an instance', () => {
    const directive = new ColorDirectiveDirective(null, null);
    expect(directive).toBeTruthy();
  });
});
