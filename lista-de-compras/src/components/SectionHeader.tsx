import { StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

interface Props {
  label: string;
  count: number;
}

export function SectionHeader({ label, count }: Props) {
  return (
    <Text style={styles.label}>
      {label} - {count}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
  },
});