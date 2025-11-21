import { Shape } from '../shapes/Shape';
import { ShapeClasses } from "../shapes/ShapeClasses";

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
  public shapes: Shape[] = [];

  private currentShape: Shape | null = null;
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private savedImageData: ImageData | null = null;
  private N = 111;

  private selectedShapeIndex: number = -1;   // <<< НОВЕ

  private onShapeDrawnCallback?: (
    name: string, x1: number, y1: number, x2: number, y2: number
  ) => void;

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

    this.savedImageData = this.ctx.getImageData(
      0, 0, this.ctx.canvas.width, this.ctx.canvas.height
    );
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

    if (this.onShapeDrawnCallback) {
      const shapeName = this.currentShape.getName();
      this.onShapeDrawnCallback(
        shapeName, this.startX, this.startY, x, y
      );
    }

    this.currentShape = null;
    this.isDrawing = false;
    this.savedImageData = null;
    this.onPaint();
  }

  onPaint() {
    if (!this.ctx) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];

      if (i === this.selectedShapeIndex) {
        ctx.save();

        const oldStroke = (shape as any).strokeColor;
        (shape as any).strokeColor = "red";

        ctx.setLineDash([8, 4]);
        ctx.lineWidth = 4;

        shape.show(ctx);

        (shape as any).strokeColor = oldStroke;

        ctx.restore();
      } else {
        ctx.save();
        shape.show(ctx);
        ctx.restore();
      }

    }
  }


  selectShape(index: number) {
    if (index < 0 || index >= this.shapes.length) {
      this.selectedShapeIndex = -1;
    } else {
      this.selectedShapeIndex = index;
    }
    this.onPaint();
  }

  deleteShape(index: number) {
    if (index < 0 || index >= this.shapes.length) return;

    this.shapes.splice(index, 1);

    if (this.selectedShapeIndex === index) {
      this.selectedShapeIndex = -1;
    } else if (this.selectedShapeIndex > index) {
      this.selectedShapeIndex--;
    }

    this.onPaint();
  }


  importFromJSON(jsonString: string) {
    const arr = JSON.parse(jsonString);

    this.shapes = [];

    for (const obj of arr) {
      const Cls = ShapeClasses[obj.type];
      if (!Cls) continue;

      const shape = Cls.fromJSON(obj);
      this.shapes.push(shape);
    }
    this.onPaint();
  }

  exportToJSON(): string {
    return JSON.stringify(
      this.shapes.map(s => s.toJSON()),
      null,
      2
    );
  }


  setOnShapeDrawn(callback: (
    name: string, x1: number, y1: number, x2: number, y2: number
  ) => void) {
    this.onShapeDrawnCallback = callback;
  }

  clear() {
    this.shapes = [];
    this.selectedShapeIndex = -1;
    this.onPaint();
  }

  undo() {
    if (this.shapes.length > 0) {
      this.shapes.pop();
      this.selectedShapeIndex = -1;
      this.onPaint();
    }
  }
}

export const Editor = MyEditor.getInstance();
