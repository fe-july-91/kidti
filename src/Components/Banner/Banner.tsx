import React, { useEffect, useState } from 'react';
import './Banner.scss';
import { avatars } from '../../Utils/kit';

const Banner = () => {
  const letters = ['K', 'I', 'D', 'T', 'Y'];
  const shapes = ['circle', 'square', 'rectangle', 'd-shape', 't-shape'];
  const colors = ['#6771DE', '#C88CF8', '#50C3F9', '#6c6e90'];

  const rows = 10;
  const columns = 5;
  const updateRate = 0.2; // Процент элементов для обновления (20%)

  const generateRandomItem = (key: number, columnIndex: number) => {
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
  };

  const generateInitialGrid = () => {
    const items = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        items.push(generateRandomItem(i * columns + j, j));
      }
    }
    return items;
  };

  const [grid, setGrid] = useState(() => generateInitialGrid());

  const partiallyUpdateGrid = () => {
    setGrid((prevGrid) => {
      const totalItems = prevGrid.length;
      const itemsToUpdate = Math.floor(totalItems * updateRate);
      const updatedIndices = new Set<number>();

      // Выбираем случайные индексы для обновления
      while (updatedIndices.size < itemsToUpdate) {
        const randomIndex = Math.floor(Math.random() * totalItems);
        updatedIndices.add(randomIndex);
      }

      // Создаём новый массив с обновлёнными элементами
      return prevGrid.map((item, index) =>
        updatedIndices.has(index)
          ? generateRandomItem(item.key, item.columnIndex)
          : item
      );
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      partiallyUpdateGrid();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBannerClick = () => {
    partiallyUpdateGrid();
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

