import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useRef, useEffect, useState } from 'react';

import styles from './detail_m.module.css';

// 예시 이미지

export const Route = createFileRoute('/_layout/category/detail_m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles.start}>
      '<div className={styles.category_box}></div>
    </div>
  );
}
