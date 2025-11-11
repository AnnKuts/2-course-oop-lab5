export interface Ellipse {
  drawEllipse(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void;
  showEllipse(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, strokeColor: string, fillColor?: string, isFilled?: boolean): void;
}

export const EllipseImpl: Ellipse = {
  drawEllipse(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void {
    const radiusX = Math.abs(x2 - x1);
    const radiusY = Math.abs(y2 - y1);
    const cx = x1;
    const cy = y1;

    ctx.beginPath();
    ctx.ellipse(cx, cy, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.stroke();
  },

  showEllipse(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, strokeColor: string, fillColor?: string, isFilled?: boolean): void {
    const centerX = x1;
    const centerY = y1;

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;

    if (isFilled && fillColor) {
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      const radiusX = Math.abs(x2 - centerX);
      const radiusY = Math.abs(y2 - centerY);
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    this.drawEllipse(ctx, centerX, centerY, x2, y2);
  }
};