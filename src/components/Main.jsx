import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { Route, Routes, Navigate } from 'react-router-native';
import SingleRepository from './SingleRepository';
import Review from './Review';
import SignUp from './SignUp';
import UsersReviews from './UsersReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/repo/:id' element={<SingleRepository />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/createReview' element={<Review />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/ownReviews' element={<UsersReviews />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
