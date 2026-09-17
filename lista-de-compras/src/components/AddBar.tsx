import { memo, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius } from '../theme';
import { UNITS, Unit } from '../types';
import { useKeyboardHeight } from '../useKeyboard';
import { MinusIcon, PlusIcon } from './icons';

export interface NewItem {
  name: string;
  quantity: number;
  unit: Unit;
}

interface Props {
  onAdd: (item: NewItem) => void;
  onLayout: (height: number) => void;
}

export const AddBar = memo(function AddBar({ onAdd, onLayout }: Props) {
  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState<Unit>('un');

  const canAdd = value.trim().length > 0;
  const keyboardOpen = keyboardHeight > 0;
  const addActive = canAdd || focused;

  function handleAdd() {
    const name = value.trim();
    if (!name) return;
    onAdd({ name, quantity, unit });
    setValue('');
    setQuantity(1);
    setUnit('un');
    setFocused(false);
    Keyboard.dismiss();
  }

  return (
    <View
      onLayout={(e) => onLayout(e.nativeEvent.layout.height)}
      style={[styles.outer, { marginBottom: 12 + (keyboardOpen ? 0 : insets.bottom) }]}
    >
      <View style={[styles.bar, focused && styles.barFocused]}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Novo item..."
            placeholderTextColor={colors.placeholder}
            selectionColor={colors.lime}
            returnKeyType="done"
            onSubmitEditing={handleAdd}
          />
          <Pressable
            onPress={handleAdd}
            disabled={!canAdd}
            style={({ pressed }) => [
              styles.addBtn,
              canAdd && styles.addBtnActive,
              pressed && { opacity: 0.7 },
            ]}
          >
            <PlusIcon size={18} color={canAdd ? colors.limeInk : '#3C414A'} />
          </Pressable>
        </View>

        <View style={styles.controlsRow}>
          <View style={styles.qtyGroup}>
            <Pressable
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              style={({ pressed }) => [styles.qtyBtn, pressed && { opacity: 0.7 }]}
            >
              <MinusIcon size={12} color={quantity <= 1 ? '#3A3F46' : colors.white} />
            </Pressable>
            <Text style={styles.qtyText}>{quantity}</Text>
            <Pressable
              onPress={() => setQuantity((q) => Math.min(999, q + 1))}
              style={({ pressed }) => [styles.qtyBtn, pressed && { opacity: 0.7 }]}
            >
              <PlusIcon size={12} color={colors.lime} />
            </Pressable>
          </View>

          <View style={styles.unitGroup}>
            {UNITS.map((u) => {
              const selected = u === unit;
              return (
                <Pressable
                  key={u}
                  onPress={() => setUnit(u)}
                  style={({ pressed }) => [
                    styles.unitBtn,
                    selected && styles.unitBtnActive,
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <Text style={[styles.unitText, selected && styles.unitTextActive]}>{u}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  outer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  bar: {
    backgroundColor: colors.bar,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  barFocused: {
    borderColor: 'rgba(181, 242, 61, 0.45)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 42,
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 4,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.button,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnActive: {
    backgroundColor: colors.lime,
    borderColor: colors.lime,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  qtyGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    minWidth: 28,
    textAlign: 'center',
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  unitGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  unitBtn: {
    minWidth: 44,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: colors.cardDeep,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitBtnActive: {
    backgroundColor: colors.lime,
  },
  unitText: {
    color: colors.muted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  unitTextActive: {
    color: colors.limeInk,
  },
});