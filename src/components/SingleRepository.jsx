import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import { View, FlatList, StyleSheet } from 'react-native';
import Text from './Text';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore, loading } = useRepository({
    first: 3,
    id: id,
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <View>
        <Text>loading....</Text>
      </View>
    );
  }

  console.log();

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    console.log('END HAS BEEN REACHED');
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      ListHeaderComponent={() => <RepositoryItem item={repository} />}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
