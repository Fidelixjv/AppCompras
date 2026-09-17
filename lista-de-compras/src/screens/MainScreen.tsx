import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme';
import { AddBar } from '../components/AddBar';
import { EmptyList } from '../components/EmptyList';
import { ItemCard } from '../components/ItemCard';
import { ProgressBar } from '../components/ProgressBar';
import { SectionHeader } from '../components/SectionHeader';
import { ExportIcon } from '../components/icons';
import { useShoppingList } from '../useShoppingList';

export function MainScreen() {
  const insets = useSafeAreaInsets();
  const { items, loaded, addItem, toggleItem, removeItem } = useShoppingList();
  const [barHeight, setBarHeight] = useState(150);

  const list = useMemo(() => items ?? [], [items]);
  const pending = useMemo(() => list.filter((i) => !i.done), [list]);
  const bought = useMemo(() => list.filter((i) => i.done), [list]);
  const total = list.length;
  const isEmpty = total === 0;
  const progress = total > 0 ? bought.length / total : 0;

  if (!loaded) {
    return <View style={[styles.screen, { paddingTop: insets.top, backgroundColor: colors.bg }]} />;
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.label}>Minha lista</Text>
          <Pressable
            style={({ pressed }) => [styles.shareBtn, pressed && { opacity: 0.6 }]}
            hitSlop={6}
          >
            <ExportIcon size={16} color={colors.shareGlyph} />
          </Pressable>
        </View>
        <Text style={styles.title}>Compras da semana</Text>
        {!isEmpty && (
          <>
            <View style={styles.statsRow}>
              <Text style={styles.statsText}>
                {pending.length} {pending.length === 1 ? 'pendente' : 'pendentes'}
              </Text>
              <Text style={styles.statsText}>
                {bought.length} de {total} no carrinho
              </Text>
            </View>
            <ProgressBar progress={progress} style={styles.progress} />
          </>
        )}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          isEmpty && styles.scrollContentEmpty,
          { paddingBottom: barHeight + 24 + insets.bottom },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {isEmpty ? (
          <EmptyList />
        ) : (
          <View style={styles.list}>
            {pending.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onToggle={() => toggleItem(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
            {bought.length > 0 && (
              <View style={styles.boughtSection}>
                <SectionHeader label="NO CARRINHO" count={bought.length} />
                {bought.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onToggle={() => toggleItem(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <AddBar onAdd={(item) => addItem(item)} onLayout={setBarHeight} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.lime,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.6,
    textTransform: 'uppercase',
  },
  shareBtn: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 29,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statsText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '500',
  },
  progress: {
    marginTop: 12,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  scrollContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 0,
  },
  list: {
    gap: 10,
  },
  boughtSection: {
    gap: 10,
    marginTop: 26,
  },
});