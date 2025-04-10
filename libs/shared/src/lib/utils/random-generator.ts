import { v4 as uuidv4 } from 'uuid';
export function getRandomId() {
  return Math.random().toString(36).substring(2, 15);
}

export function getUniqueId() {
  return uuidv4();
}
