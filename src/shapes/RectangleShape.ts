import { Shape } from './Shape.ts';
import type { Rectangle } from '../interfaces/Rectangle.ts';
import { RectangleImpl } from '../interfaces/Rectangle.ts';

export class RectangleShape extends Shape implements Rectangle {
  drawRect = RectangleImpl.drawRect;
  showRect = RectangleImpl.showRect;

  constructor(xs1: number, ys1: number, xs2: number, ys2: number) {
    super();
    this.xs1 = xs1;
    this.ys1 = ys1;
    this.xs2 = xs2;
    this.ys2 = ys2;
  }

  show(ctx: CanvasRenderingContext2D): void {
    this.showRect(ctx, this.xs1, this.ys1, this.xs2, this.ys2, this.strokeColor || 'black', this.fillColor, this.isFilled);
  }

  getName(): string {
    return 'Rectangle';
  }
}
