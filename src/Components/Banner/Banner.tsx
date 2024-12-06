import React, { useEffect, useState } from 'react';
import './Banner.scss';
import { avatars } from '../../Utils/kit';

const Banner = () => {
  const letters = ['K', 'I', 'D', 'T', 'Y'];
  const shapes = ['circle', 'square', 'rectangle', 'd-shape', 't-shape'];
  const colors = ['#6771DE', '#C88CF8', '#50C3F9', '#6c6e90'];

  const rows = 10;
  const columns = 5;

  const [grid, setGrid] = useState(() => generateInitialGrid());

  function generateInitialGrid() {
    const items = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        items.push(generateRandomItem(i * columns + j, j));
      }
    }
    return items;
  }

  function generateRandomItem(key: number, columnIndex: number) {
    const randomType = Math.random();

    if (randomType < 0.33) {
      // Генерация буквы
      const letterIndex = key % letters.length;
      const randomLetter = letters[letterIndex];
      return { type: 'letter', content: randomLetter, color: '#6c6e90', key, columnIndex };
    } else if (randomType < 0.66) {
      // Генерация формы
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return { type: `shape ${randomShape}`, color: randomColor, key, columnIndex };
    } else {
      // Генерация аватара
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      return { type: 'avatar', src: randomAvatar, key, columnIndex };
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid(prevGrid =>
        prevGrid.map(item => generateRandomItem(item.key, item.columnIndex))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

    const refreshGrid = () => {
      setGrid(prevGrid =>
        prevGrid.map(item => generateRandomItem(item.key, item.columnIndex))
      );
    };
  
    const handleBannerClick = () => {
      refreshGrid();
    };
  

  return (
    <div className="banner-container" onClick={handleBannerClick}>
      <div className="grid">
        {grid.map((item) => (
          <div
            key={item.key}
            className={`grid-item ${item.type}`}
            style={{
              backgroundColor: item.type.startsWith('shape') ? item.color : undefined,
              color: item.type === 'letter' ? item.color : undefined,
              transitionDelay: `${item.columnIndex * 600}ms`,
            }}
          >
            {item.type === 'letter' && item.content}
            {item.type === 'avatar' && (
              <img src={item.src} alt="Avatar" className="avatar" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;

