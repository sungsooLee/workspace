import { useState } from 'react';
import { Button } from '@learnway/ui';
import styles from './arrays.module.css';

const ArraysButton = () => {
  const [arraysActive, setArraysActive] = useState([true, false, false]);
  const arrays = [
    { title: '최신순', active: arraysActive[0] },
    { title: '과정명순', active: arraysActive[1] },
    { title: '조회순', active: arraysActive[2] },
  ];

  const handleOnChange = (key: number) => {
    const arrayChange = [...arraysActive];
    arrays.map((array, index) => {
      if (key === index) {
        arrayChange[index] = true;
      } else {
        arrayChange[index] = false;
      }
    });
    setArraysActive(arrayChange);
  };

  return (
    <div className={styles.array}>
      {arrays.map((arrays, index) => (
        <Button
          key={index}
          className={`${arrays.active === true ? styles.active : ''}`}
          onClick={() => handleOnChange(index)}>
          {arrays.title}
        </Button>
      ))}
    </div>
  );
};

export const Arrays = ArraysButton;
