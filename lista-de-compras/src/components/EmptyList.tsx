import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { ShoppingBagIcon } from './icons';

export function EmptyList() {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <ShoppingBagIcon size={54} color={colors.muted} />
      </View>
      <Text style={styles.title}>Nada na lista ainda</Text>
      <Text style={styles.subtitle}>Escreva o primeiro item na barra abaixo.</Text>
      <Text style={styles.subtitle}>Fica salvo no aparelho, mesmo sem internet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  circle: {
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 2,
    borderColor: colors.circle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
});