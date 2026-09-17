import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme';
import { ShoppingItem } from '../types';
import { CheckIcon, CloseIcon } from './icons';

interface Props {
  item: ShoppingItem;
  onToggle: () => void;
  onRemove: () => void;
}

export const ItemCard = memo(function ItemCard({ item, onToggle, onRemove }: Props) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onToggle}
        hitSlop={8}
        style={({ pressed }) => [styles.circleWrap, pressed && { opacity: 0.6 }]}
      >
        {item.done ? (
          <View style={[styles.circle, styles.circleDone]}>
            <CheckIcon size={15} color={colors.limeInk} />
          </View>
        ) : (
          <View style={[styles.circle, styles.circleIdle]} />
        )}
      </Pressable>

      <Text style={[styles.name, item.done && styles.nameDone]} numberOfLines={1}>
        {item.name}
      </Text>

      <View style={styles.capsule}>
        <Text style={[styles.capsuleText, item.done && styles.nameDone]}>
          {item.quantity} {item.unit}
        </Text>
      </View>

      <Pressable
        onPress={onRemove}
        hitSlop={6}
        style={({ pressed }) => [styles.removeBtn, pressed && { opacity: 0.6 }]}
      >
        <CloseIcon size={13} color={colors.red} />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.card,
    paddingVertical: 13,
    paddingHorizontal: 14,
    gap: 12,
  },
  circleWrap: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  circleIdle: {
    borderWidth: 2,
    borderColor: colors.circle,
  },
  circleDone: {
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    flex: 1,
    color: colors.white,
    fontSize: 16.5,
    fontWeight: '600',
  },
  nameDone: {
    color: colors.dim,
  },
  capsule: {
    backgroundColor: colors.cardDeep,
    borderRadius: radius.pill,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
  capsuleText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600',
  },
  removeBtn: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: colors.redBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});