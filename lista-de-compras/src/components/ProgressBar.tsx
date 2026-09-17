import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../theme';

interface Props {
  progress: number;
  style?: StyleProp<ViewStyle>;
}

export function ProgressBar({ progress, style }: Props) {
  const pct = Math.max(0, Math.min(1, progress)) * 100;
  return (
    <View style={[styles.track, style]}>
      {pct > 0 && <View style={[styles.fill, { width: `${pct}%` }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.track,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.lime,
  },
});