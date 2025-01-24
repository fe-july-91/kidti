import React, { useEffect, useState, useMemo } from 'react';
import './GenerativeBG.scss';

type Props = {
  isloading?: boolean;
};

const GenerativeBG: React.FC<Props> = ({ isloading }) => {
  const shapes = ['circle', 'square', 'rectangle', 'd-shape', 't-shape'];
  const colors = ['#adb0d9', '#9bc7dc', '#cdbdda'];

  const rows = 90;
  const columns = 60;

  const generateInitialGrid = () => {
    return Array.from({ length: rows * columns }, (_, index) => 
      generateRandomItem(index, index % columns)
    );
  };

  const generateRandomItem = (key: number, columnIndex: number) => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return { type: `shape ${randomShape}`, color: randomColor, key, columnIndex };
  };

  const [grid, setGrid] = useState(() => generateInitialGrid());

  // Используем useMemo для сохранения неизменной структуры сетки
  const gridStructure = useMemo(() => generateInitialGrid(), []);

  // Обновление сетки раз в секунду
  useEffect(() => {
    const interval = setInterval(() => {
      setGrid(prevGrid =>
        prevGrid.map(item => generateRandomItem(item.key, item.columnIndex))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-container ${isloading ? 'loading' : ''}`}>
      <div className="bg-grid">
        {grid.map(item => (
          <div
            key={item.key}
            className={`bg-grid-item ${item.type}`}
            style={{
              backgroundColor: item.color,
              transitionDelay: `${item.columnIndex * 10}ms`, // Динамическая задержка
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default GenerativeBG;
