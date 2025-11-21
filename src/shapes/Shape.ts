export abstract class Shape {
  protected xs1 = 0;
  protected ys1 = 0;
  protected xs2 = 0;
  protected ys2 = 0;
  protected strokeColor: string = 'black';
  protected fillColor?: string;
  protected isFilled: boolean = false;

  set(x1: number, y1: number, x2: number, y2: number) {
    this.xs1 = x1; this.ys1 = y1; this.xs2 = x2; this.ys2 = y2;
  }

  setStrokeColor(color: string) {
    this.strokeColor = color;
  }

  setFillColor(color: string | undefined) {
    this.fillColor = color;
  }

  setFilled(filled: boolean) {
    this.isFilled = filled;
  }
  
  toJSON() {
    return {
      type: this.getName(),
      x1: this.xs1,
      y1: this.ys1,
      x2: this.xs2,
      y2: this.ys2,
      strokeColor: this.strokeColor,
      fillColor: this.fillColor,
      isFilled: this.isFilled
    };
  }


  abstract show(ctx: CanvasRenderingContext2D): void;
  abstract getName(): string;
}
