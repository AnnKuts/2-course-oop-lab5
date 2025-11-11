import { Shape } from './Shape';
import type { Line } from '../interfaces/Line';
import { LineImpl } from '../interfaces/Line';
import type { Ellipse } from '../interfaces/Ellipse';
import { EllipseImpl } from '../interfaces/Ellipse';

export class LineOOShape extends Shape implements Line, Ellipse {
  drawLine = LineImpl.drawLine;
  drawEllipse = EllipseImpl.drawEllipse;

  show(ctx: CanvasRenderingContext2D): void {
    const r = 8.0;
    const dx = this.xs2 - this.xs1;
    const dy = this.ys2 - this.ys1;
    const dist = Math.sqrt(dx * dx + dy * dy);

    ctx.strokeStyle = this.strokeColor || 'black';
    ctx.lineWidth = 1;

    const drawEndEllipse = (centerX: number, centerY: number) => {
      const x1 = centerX;
      const y1 = centerY;
      const x2 = centerX + r;
      const y2 = centerY + r;

      if (this.isFilled && this.fillColor) {
        EllipseImpl.showEllipse(
          ctx,
          x1,
          y1,
          x2,
          y2,
          this.strokeColor || 'black',
          this.fillColor,
          true
        );
      } else {
        this.drawEllipse(ctx, x1, y1, x2, y2);
      }
    };

    if (dist > 2 * r) {
      const newX1 = this.xs1 + (dx * r / dist);
      const newY1 = this.ys1 + (dy * r / dist);
      const newX2 = this.xs2 - (dx * r / dist);
      const newY2 = this.ys2 - (dy * r / dist);
      this.drawLine(ctx, newX1, newY1, newX2, newY2);
    }

    drawEndEllipse(this.xs1, this.ys1);
    drawEndEllipse(this.xs2, this.ys2);
  }

  getName(): string {
    return 'LineOO';
  }
}