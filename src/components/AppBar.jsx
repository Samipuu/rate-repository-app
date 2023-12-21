import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarItem from './AppBarItem';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    padding: 10,

    flexDirection: 'row',
    justifyContent: 'space-around',
    // ...
  },
  item: {
    padding: 10,

    justifyContent: 'space-around',
  },
  // ...
});

const AppBar = () => {
  const hello = () => {
    console.log('boink');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable onPress={hello}>
          <AppBarItem style={styles.item} name='Repositories' link='/' />
        </Pressable>
        <AppBarItem style={styles.item} name='Sign In' link='/signIn' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
