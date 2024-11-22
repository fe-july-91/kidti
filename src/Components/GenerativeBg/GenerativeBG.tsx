import React, { useEffect, useState } from 'react';
import './GenerativeBG.scss';

type Props = {
  isloading?: boolean;
}
const GenerativeBG: React.FC<Props> = ({isloading}) => {
  const shapes = ['circle', 'square', 'rectangle', 'd-shape', 't-shape'];
  const colors = ['#adb0d9', '#9bc7dc', '#cdbdda'];

  const rows = 30;
  const columns = 30;

  // Используем состояние для хранения сетки
  const [grid, setGrid] = useState(generateInitialGrid());

  // Генерация начальной сетки
  function generateInitialGrid() {
    const items = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        items.push(generateRandomItem(i * columns + j, j));
      }
    }
    return items;
  }

  // Генерация случайного элемента
  function generateRandomItem(key: number, columnIndex: number) {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return { type: `shape ${randomShape}`, color: randomColor, key, columnIndex };
  }

  // Обновление сетки каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      setGrid(generateInitialGrid()); // Обновляем сетку
    }, 1000); // Каждую секунду

    return () => clearInterval(interval); // Очищаем интервал при размонтировании
  }, []);

  return (
    <div
      className="bg-container"
      style={isloading? { opacity: "50%" } : { opacity: "10%" }}
    >
      <div className="bg-grid">
        {grid.map((item) => (
          <div
            key={item.key}
            className={`bg-grid-item ${item.type}`}
            style={{
              backgroundColor: item.type.startsWith('shape') ? item.color : undefined,
              color: item.type === 'letter' ? item.color : undefined,
              transitionDelay: `${item.columnIndex }ms`,
            }}
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerativeBG;
