import { useCallback, useEffect, useState } from 'react';
import { loadList, saveList } from './storage';
import { DEFAULT_ITEMS, newId, ShoppingItem, Unit } from './types';

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[] | null>(null);

  useEffect(() => {
    let active = true;
    loadList().then((saved) => {
      if (!active) return;
      setItems(saved && saved.length ? saved : DEFAULT_ITEMS);
    });
    return () => {
      active = false;
    };
  }, []);

  const commit = useCallback((next: ShoppingItem[]) => {
    setItems(next);
    saveList(next);
  }, []);

  const addItem = useCallback(
    ({ name, quantity, unit }: { name: string; quantity: number; unit: Unit }) => {
      setItems((prev) => {
        const base = prev ?? DEFAULT_ITEMS;
        const next = [
          ...base,
          { id: newId(), name, unit, quantity: Math.max(1, quantity), done: false },
        ];
        saveList(next);
        return next;
      });
    },
    [],
  );

  const toggleItem = useCallback(
    (id: string) => {
      setItems((prev) => {
        const base = prev ?? DEFAULT_ITEMS;
        const next = base.map((it) => (it.id === id ? { ...it, done: !it.done } : it));
        saveList(next);
        return next;
      });
    },
    [],
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => {
        const base = prev ?? DEFAULT_ITEMS;
        const next = base.filter((it) => it.id !== id);
        saveList(next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    commit(DEFAULT_ITEMS);
  }, [commit]);

  return { items, loaded: items !== null, addItem, toggleItem, removeItem, reset };
}