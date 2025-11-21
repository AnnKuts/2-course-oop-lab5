import React, { useEffect, useState } from 'react';
import { MyTable } from '../editor/MyTable';
import type { ShapeData } from '../editor/MyTable';
import '../styles/index.css';

interface TableWindowProps {
  isOpen: boolean;
  onClose: () => void;
  myTable: MyTable;
}

const TableWindow: React.FC<TableWindowProps> = ({ isOpen, onClose, myTable }) => {
  const [shapes, setShapes] = useState<ShapeData[]>([]);

  useEffect(() => {
    const updateShapes = (newShapes: ShapeData[]) => {
      setShapes(newShapes);
    };

    myTable.Subscribe(updateShapes);
    setShapes(myTable.GetAll());

    return () => {
      myTable.Unsubscribe(updateShapes);
    };
  }, [myTable]);

  if (!isOpen) return null;

  return (
    <div className="table-window-overlay">
      <div className="table-window">
        <div className="table-window-header">
          <h2>Таблиця об'єктів</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="table-container">
          <table className="shapes-table">
            <thead>
            <tr>
              <th>№</th>
              <th>Назва об'єкта</th>
              <th>X1</th>
              <th>Y1</th>
              <th>X2</th>
              <th>Y2</th>
            </tr>
            </thead>
            <tbody>
            {shapes.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-message">
                  Немає об'єктів
                </td>
              </tr>
            ) : (
              shapes.map((shape, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{shape.name}</td>
                  <td>{shape.x1}</td>
                  <td>{shape.y1}</td>
                  <td>{shape.x2}</td>
                  <td>{shape.y2}</td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableWindow;