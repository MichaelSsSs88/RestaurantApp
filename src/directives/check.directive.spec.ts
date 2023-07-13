import { ComponentFactory, ComponentRef, ElementRef, EmbeddedViewRef, EnvironmentInjector, Injector, NgModuleRef, TemplateRef, Type, ViewContainerRef, ViewRef } from '@angular/core';
import { CheckDirective } from './check.directive';

class TestViewContainerRef extends ViewContainerRef {
  get element(): ElementRef<any> {
    throw new Error('Method not implemented.');
  }
  get injector(): Injector {
    throw new Error('Method not implemented.');
  }
  get parentInjector(): Injector {
    throw new Error('Method not implemented.');
  }
  clear(): void {
    throw new Error('Method not implemented.');
  }
  get(index: number): ViewRef {
    throw new Error('Method not implemented.');
  }
  get length(): number {
    throw new Error('Method not implemented.');
  }
  createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, options?: { index?: number; injector?: Injector; }): EmbeddedViewRef<C>;
  createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C>;
  createEmbeddedView(templateRef: unknown, context?: unknown, index?: unknown): EmbeddedViewRef<any> | EmbeddedViewRef<any> {
    throw new Error('Method not implemented.');
  }
  createComponent<C>(componentType: Type<C>, options?: { index?: number; injector?: Injector; ngModuleRef?: NgModuleRef<unknown>; environmentInjector?: NgModuleRef<unknown> | EnvironmentInjector; projectableNodes?: Node[][]; }): ComponentRef<C>;
  createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][], environmentInjector?: EnvironmentInjector | NgModuleRef<any>): ComponentRef<any>;
  createComponent(componentFactory: unknown, index?: unknown, injector?: unknown, projectableNodes?: unknown, environmentInjector?: unknown): ComponentRef<any> | ComponentRef<any> {
    throw new Error('Method not implemented.');
  }


  insert(viewRef: ViewRef, index?: number): ViewRef {
    throw new Error('Method not implemented.');
  }
  move(viewRef: ViewRef, currentIndex: number): ViewRef {
    throw new Error('Method not implemented.');
  }
  indexOf(viewRef: ViewRef): number {
    throw new Error('Method not implemented.');
  }
  remove(index?: number): void {
    throw new Error('Method not implemented.');
  }
  detach(index?: number): ViewRef {
    throw new Error('Method not implemented.');
  }

}

class TestTemplateRef implements TemplateRef<any> {
  elementRef: ElementRef<any>;
  createEmbeddedView(context: any, injector?: Injector): EmbeddedViewRef<any> {
    throw new Error('Method not implemented.');
  }


}

describe('CheckDirective', () => {
  it('should create an instance', () => {
    const directive = new CheckDirective(new TestTemplateRef(), new TestViewContainerRef());
    expect(directive).toBeTruthy();
  });
});
