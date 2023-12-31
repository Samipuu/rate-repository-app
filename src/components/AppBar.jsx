import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarItem from './AppBarItem';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import Text from './Text';
import { useNavigate } from 'react-router-native';

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
  const { data, error, loading } = useQuery(ME);

  const hello = () => {
    console.log('boink');
  };
  console.log(data);

  if (loading) {
    return;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable onPress={hello}>
          <AppBarItem style={styles.item} name='Repositories' link='/' />
        </Pressable>
        {data.me !== null ? (
          <>
            <AppBarItem
              style={styles.item}
              name='My reviews'
              link='/ownReviews'
            />
            <AppBarItem
              style={styles.item}
              name='Create a review'
              link='/createReview'
            />
            <SignOut />
          </>
        ) : (
          <>
            <AppBarItem style={styles.item} name='Sign Up' link='/signUp' />
            <AppBarItem style={styles.item} name='Sign In' link='/signIn' />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const logOut = () => {
    console.log('Logging out...');
    navigate('/');
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return (
    <>
      <Pressable onPress={logOut}>
        <Text style={styles.item} color='white' fontSize='subheading'>
          Sign Out
        </Text>
      </Pressable>
    </>
  );
};

export default AppBar;
