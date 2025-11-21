import { Shape } from './Shape.ts';
import type { Line } from '../interfaces/Line.ts';
import { LineImpl } from '../interfaces/Line.ts';

export class LineShape extends Shape implements Line {
  drawLine = LineImpl.drawLine;
  showLine = LineImpl.showLine;

  show(ctx: CanvasRenderingContext2D): void {
    this.showLine(ctx, this.xs1, this.ys1, this.xs2, this.ys2, this.strokeColor || 'black');
  }

  getName(): string {
    return 'Line';
  }

  static fromJSON(data: any): LineShape {
    const line = new LineShape();
    line.set(data.x1, data.y1, data.x2, data.y2);
    line.setStrokeColor(data.strokeColor);
    line.setFillColor(data.fillColor);
    line.setFilled(data.isFilled);
    return line;
  }
}
