import { FunctionComponent } from "react";

class Component<Props> {
  protected name: string;
  protected templateFnComponent?: FunctionComponent<unknown>;

  constructor(name: string) {
    this.name = name;
  }

  render<F extends FunctionComponent<Props>>(fnComponent: F): F {
    console.log(this.templateFnComponent);
    Object.defineProperties(fnComponent, {
      name: { // For log outputs and other places where `.name` is used
        value: this.name,
      },
      displayName: { // For React DevTools
        value: this.name,
      },
      Template: {
        value: this.templateFnComponent,
      },
    });

    return fnComponent;
  }

  template(fnComponent: FunctionComponent<Props>): this {
    this.templateFnComponent = fnComponent;
    return this;
  }
}

export function component<Props>(name: string) {
  return new Component<Props>(name);
}
