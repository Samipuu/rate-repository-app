import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
    itemAlign: 'center',
  },
});

const StatItem = ({ name, value }) => {
  if (value >= 1000) {
    return (
      <View style={styles.item}>
        <Text>{(value / 1000).toFixed(1)}k</Text>
        <Text>{name}</Text>
      </View>
    );
  }

  return (
    <View style={styles.item}>
      <Text>{value}</Text>
      <Text>{name}</Text>
    </View>
  );
};

export default StatItem;
