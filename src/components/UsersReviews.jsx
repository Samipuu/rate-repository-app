import ReviewItem from './ReviewItem';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import {
  View,
  FlatList,
  StyleSheet,
  Button,
  Pressable,
  Alert,
} from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    justifyContent: 'space-around',
  },
  lang: {
    backgroundColor: theme.colors.primary,
    flexGrow: 0,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  remove: {
    backgroundColor: theme.colors.errorRed,
    flexGrow: 0,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UsersReviews = () => {
  const navigate = useNavigate();
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const { data, error, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <View>
        <Text>loading....</Text>
      </View>
    );
  }
  const deleteReview = async (id) => {
    console.log(id);
    await mutate({
      variables: { deleteReviewId: id },
    });
    refetch();
  };

  const createTwoButtonAlert = (id) =>
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        { text: 'Delete', onPress: () => deleteReview(id) },
      ]
    );

  console.log(data);

  const reviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <>
          <ReviewItem review={item} />
          <View style={styles.container}>
            <Pressable
              style={styles.lang}
              onPress={() => {
                navigate(`/repo/${item.repository.id}`);
              }}
            >
              <Text color='white' fontSize='subheading'>
                View repository
              </Text>
            </Pressable>
            <Pressable
              style={styles.remove}
              onPress={() => createTwoButtonAlert(item.id)}
            >
              <Text color='white' fontSize='subheading'>
                Delete review
              </Text>
            </Pressable>
          </View>
        </>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UsersReviews;
