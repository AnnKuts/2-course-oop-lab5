import { Shape } from '../shapes/Shape';

export class MyEditor {
  private static instance: MyEditor | null = null;

  private constructor() {}

  public static getInstance(): MyEditor {
    if (!MyEditor.instance) {
      MyEditor.instance = new MyEditor();
    }
    return MyEditor.instance;
  }

  private ctx: CanvasRenderingContext2D | null = null;
  private shapes: Shape[] = [];
  private currentShape: Shape | null = null;
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private savedImageData: ImageData | null = null;
  private N = 111;
  private onShapeDrawnCallback?: (name: string, x1: number, y1: number, x2: number, y2: number) => void;

  setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  start(shape: Shape) {
    this.currentShape = shape;
  }

  onLBDown(x: number, y: number) {
    if (!this.currentShape || !this.ctx) return;

    this.startX = x;
    this.startY = y;
    this.isDrawing = true;

    this.savedImageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  onMouseMove(x: number, y: number) {
    if (!this.ctx || !this.isDrawing || !this.currentShape) return;

    if (this.savedImageData) {
      this.ctx.putImageData(this.savedImageData, 0, 0);
    }

    this.ctx.save();
    this.ctx.setLineDash([5, 5]);
    this.currentShape.set(this.startX, this.startY, x, y);
    this.currentShape.show(this.ctx);
    this.ctx.restore();
  }

  onLBUp(x: number, y: number) {
    if (!this.currentShape || !this.ctx) return;

    this.currentShape.set(this.startX, this.startY, x, y);

    if (this.shapes.length < this.N) {
      this.shapes.push(this.currentShape);
    }

    // Викликаємо callback для оновлення таблиці
    if (this.onShapeDrawnCallback) {
      const shapeName = this.currentShape.getName();
      this.onShapeDrawnCallback(shapeName, this.startX, this.startY, x, y);
    }

    this.currentShape = null;
    this.isDrawing = false;
    this.savedImageData = null;
    this.onPaint();
  }

  getStartCoordinates() {
    return { x: this.startX, y: this.startY };
  }

  setOnShapeDrawn(callback: (name: string, x1: number, y1: number, x2: number, y2: number) => void) {
    this.onShapeDrawnCallback = callback;
  }

  onPaint() {
    if (!this.ctx) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const shape of this.shapes) {
      ctx.save();
      shape.show(ctx);
      ctx.restore();
    }
  }

  clear() {
    this.shapes = [];
    this.onPaint();
  }

  undo() {
    if (this.shapes.length > 0) {
      this.shapes.pop();
      this.onPaint();
    }
  }
}

export const Editor = MyEditor.getInstance();