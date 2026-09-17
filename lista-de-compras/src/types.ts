export type Unit = 'un' | 'kg' | 'cx' | 'pct';

export const UNITS: Unit[] = ['un', 'kg', 'cx', 'pct'];

export interface ShoppingItem {
  id: string;
  name: string;
  unit: Unit;
  quantity: number;
  done: boolean;
}

export function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const DEFAULT_ITEMS: ShoppingItem[] = [
  { id: 'seed-arroz', name: 'Arroz', unit: 'kg', quantity: 5, done: false },
  { id: 'seed-feijao', name: 'Feijão', unit: 'kg', quantity: 2, done: false },
  { id: 'seed-leite', name: 'Leite', unit: 'un', quantity: 6, done: false },
  { id: 'seed-sabao', name: 'Sabão em pó', unit: 'cx', quantity: 1, done: false },
  { id: 'seed-cafe', name: 'Café', unit: 'pct', quantity: 1, done: true },
  { id: 'seed-acucar', name: 'Açúcar', unit: 'pct', quantity: 1, done: true },
];