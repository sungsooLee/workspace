import React from 'react';
import styles from './label.module.css';

const LabelComponent = () => {
  const label = [
    { text: 'New', color: '#00afd5' },
    { text: '접수중', color: '#06226a' },
    { text: 'D-7', color: '#ff4646' },
  ];

  return (
    <ul className={`${styles.start} ${styles.label_box}`}>
      {label.map((labels, index) => (
        <li key={index} style={{ backgroundColor: labels.color }}>
          {labels.text}
        </li>
      ))}
    </ul>
  );
};

export const Label = LabelComponent;
