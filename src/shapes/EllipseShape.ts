import { Shape } from './Shape.ts';
import type { Ellipse } from '../interfaces/Ellipse.ts';
import { EllipseImpl } from '../interfaces/Ellipse.ts';

export class EllipseShape extends Shape implements Ellipse {
  drawEllipse = EllipseImpl.drawEllipse;
  showEllipse = EllipseImpl.showEllipse;

  show(ctx: CanvasRenderingContext2D): void {
    this.showEllipse(ctx, this.xs1, this.ys1, this.xs2, this.ys2, this.strokeColor || 'black', this.fillColor, this.isFilled);
  }

  getName(): string {
    return 'Ellipse';
  }

  static fromJSON(data: any): EllipseShape {
    const e = new EllipseShape();
    e.set(data.x1, data.y1, data.x2, data.y2);
    e.setStrokeColor(data.strokeColor);
    e.setFillColor(data.fillColor);
    e.setFilled(data.isFilled);
    return e;
  }


}