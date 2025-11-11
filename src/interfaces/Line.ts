export interface Line {
  drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void;
  showLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, strokeColor: string): void;
}

export const LineImpl: Line = {
  drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  },

  showLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, strokeColor: string): void {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    this.drawLine(ctx, x1, y1, x2, y2);
  }
};
