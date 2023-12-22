import { Text, FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES);

  if (loading) {
    console.log('TEST');
    return (
      <View>
        <Text>loading....</Text>
      </View>
    );
  }
  const { repositories } = data;
  //useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({ item, index, seperators }) => (
        <RepositoryItem item={item} />
      )}
    />
  );
};

export default RepositoryList;
