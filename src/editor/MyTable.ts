export interface ShapeData {
  name: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export class MyTable {
  private shapes: ShapeData[] = [];
  private listeners: Array<(shapes: ShapeData[]) => void> = [];
  private selectListeners: Array<(index: number, shape: ShapeData) => void> = [];
  private deleteListeners: Array<(index: number, shape: ShapeData) => void> = [];

  public Add(name: string, x1: number, y1: number, x2: number, y2: number): void {
    const newShape: ShapeData = { name, x1, y1, x2, y2 };
    this.shapes.push(newShape);
    this.notifyListeners();
  }

  public GetAll(): ShapeData[] {
    return [...this.shapes];
  }

  public GetShapes(): ShapeData[] {
    return this.GetAll();
  }

  public Clear(): void {
    this.shapes = [];
    this.notifyListeners();
  }

  public RemoveLast(): void {
    if (this.shapes.length > 0) {
      this.shapes.pop();
      this.notifyListeners();
    }
  }

  public Remove(index: number): void {
    if (index >= 0 && index < this.shapes.length) {
      this.shapes.splice(index, 1);
      this.notifyListeners();
    }
  }

  public Subscribe(listener: (shapes: ShapeData[]) => void): void {
    this.listeners.push(listener);
  }

  public Unsubscribe(listener: (shapes: ShapeData[]) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.shapes));
  }

  public OnSelect(listener: (index: number, shape: ShapeData) => void): void {
    this.selectListeners.push(listener);
  }

  public OnDelete(listener: (index: number, shape: ShapeData) => void): void {
    this.deleteListeners.push(listener);
  }

  public Select(index: number): void {
    if (index < 0 || index >= this.shapes.length) return;
    const shape = this.shapes[index];
    this.selectListeners.forEach(l => l(index, shape));
  }

  public Delete(index: number): void {
    if (index < 0 || index >= this.shapes.length) return;
    const shape = this.shapes[index];

    this.shapes.splice(index, 1);
    this.notifyListeners();
    this.deleteListeners.forEach(l => l(index, shape));
  }
}
