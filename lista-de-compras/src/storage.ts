import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingItem } from './types';

const KEY = 'compras:lista:v1';

export async function loadList(): Promise<ShoppingItem[] | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as ShoppingItem[];
    return null;
  } catch {
    return null;
  }
}

export async function saveList(items: ShoppingItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // ignore write failures; list still works in memory
  }
}