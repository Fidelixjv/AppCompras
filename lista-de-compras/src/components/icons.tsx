import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IconProps {
  size: number;
  color: string;
  style?: StyleProp<ViewStyle>;
}

export function ShoppingBagIcon({ size: s, color }: IconProps) {
  return (
    <View
      style={{
        width: s,
        height: s,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          left: s * 0.2,
          top: s * 0.2,
          width: s * 0.6,
          height: s * 0.68,
          borderWidth: Math.max(1, s * 0.055),
          borderColor: color,
          borderRadius: s * 0.1,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: s * 0.3,
          top: s * 0.06,
          width: s * 0.4,
          height: s * 0.16,
          borderWidth: Math.max(1, s * 0.055),
          borderColor: 'transparent',
          borderTopColor: color,
          borderTopLeftRadius: s * 0.16,
          borderTopRightRadius: s * 0.16,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: s * 0.34,
          top: s * 0.62,
          width: s * 0.32,
          height: Math.max(2, s * 0.045),
          backgroundColor: color,
          borderRadius: s * 0.025,
        }}
      />
    </View>
  );
}

export function CheckIcon({ size: s, color }: IconProps) {
  const box = s * 0.62;
  return (
    <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: box, height: box, transform: [{ rotate: '45deg' }] }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: Math.max(1.5, s * 0.16),
            height: box,
            borderRadius: Math.max(1, s * 0.08),
            backgroundColor: color,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: box,
            height: Math.max(1.5, s * 0.16),
            borderRadius: Math.max(1, s * 0.08),
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
}

export function CloseIcon({ size: s, color }: IconProps) {
  const bar = { width: s * 0.76, height: Math.max(1.5, s * 0.14), backgroundColor: color, borderRadius: Math.max(1, s * 0.07) };
  return (
    <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
      <View style={[bar, styles.absCentered, { transform: [{ rotate: '45deg' }] }]} />
      <View style={[bar, styles.absCentered, { transform: [{ rotate: '-45deg' }] }]} />
    </View>
  );
}

export function PlusIcon({ size: s, color }: IconProps) {
  return (
    <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: s * 0.62, height: Math.max(1.5, s * 0.16), backgroundColor: color, borderRadius: Math.max(1, s * 0.08) }} />
      <View style={{ position: 'absolute', width: Math.max(1.5, s * 0.16), height: s * 0.62, backgroundColor: color, borderRadius: Math.max(1, s * 0.08) }} />
    </View>
  );
}

export function MinusIcon({ size: s, color }: IconProps) {
  return (
    <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: s * 0.62, height: Math.max(1.5, s * 0.16), backgroundColor: color, borderRadius: Math.max(1, s * 0.08) }} />
    </View>
  );
}

export function ExportIcon({ size: s, color }: IconProps) {
  return (
    <View style={{ width: s, height: s, position: 'relative' }}>
      <View
        style={{
          position: 'absolute',
          left: s * 0.4,
          top: s * 0.1,
          width: 0,
          height: 0,
          borderLeftWidth: s * 0.1,
          borderRightWidth: s * 0.1,
          borderBottomWidth: s * 0.12,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: s * 0.47,
          top: s * 0.24,
          width: Math.max(1.5, s * 0.06),
          height: s * 0.28,
          backgroundColor: color,
          borderRadius: Math.max(1, s * 0.03),
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: s * 0.22,
          top: s * 0.5,
          width: s * 0.56,
          height: Math.max(1.5, s * 0.06),
          backgroundColor: color,
          borderRadius: s * 0.03,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: s * 0.22,
          top: s * 0.58,
          width: s * 0.12,
          height: s * 0.12,
          borderBottomLeftRadius: s * 0.05,
          borderLeftWidth: Math.max(1, s * 0.05),
          borderBottomWidth: Math.max(1, s * 0.05),
          borderColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: s * 0.22,
          top: s * 0.58,
          width: s * 0.12,
          height: s * 0.12,
          borderBottomRightRadius: s * 0.05,
          borderRightWidth: Math.max(1, s * 0.05),
          borderBottomWidth: Math.max(1, s * 0.05),
          borderColor: color,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  absCentered: {
    position: 'absolute',
  },
});