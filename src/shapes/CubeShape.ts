import { Shape } from './Shape';
import type { Line } from '../interfaces/Line';
import { LineImpl } from '../interfaces/Line';
import type { Rectangle } from '../interfaces/Rectangle';
import { RectangleImpl } from '../interfaces/Rectangle';

export class CubeShape extends Shape implements Line, Rectangle {
  drawLine = LineImpl.drawLine;
  drawRect = RectangleImpl.drawRect;

  constructor() {
    super();
  }

  set(x1: number, y1: number, x2: number, y2: number): void {
    super.set(x1, y1, x2, y2);

  }

  show(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.strokeStyle = this.strokeColor || 'black';

    const dx = Math.abs(this.xs2 - this.xs1);
    const dy = Math.abs(this.ys2 - this.ys1);
    const offX = Math.max(10, Math.min(30, dx * 0.2));
    const offY = -Math.max(10, Math.min(30, dy * 0.2));

    this.drawRect(ctx, this.xs1, this.ys1, this.xs2, this.ys2);
    this.drawRect(ctx, this.xs1 + offX, this.ys1 + offY, this.xs2 + offX, this.ys2 + offY);

    this.drawLine(ctx, this.xs1, this.ys1, this.xs1 + offX, this.ys1 + offY);
    this.drawLine(ctx, this.xs2, this.ys1, this.xs2 + offX, this.ys1 + offY);
    this.drawLine(ctx, this.xs1, this.ys2, this.xs1 + offX, this.ys2 + offY);
    this.drawLine(ctx, this.xs2, this.ys2, this.xs2 + offX, this.ys2 + offY);

    ctx.restore();
  }

  getName(): string {
    return 'Cube';
  }
}