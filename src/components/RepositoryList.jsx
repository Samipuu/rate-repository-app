import { Text, FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useApolloClient } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import React from 'react';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import TextInput from './TextInput';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderList = () => {
    const props = this.props;
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];

    console.log(repositoryNodes);
    return repositoryNodes;
  };

  renderEnd = () => {
    return;
  };

  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;

    // ...

    return (
      <>
        <TextInput
          value={props.searchVal}
          onChangeText={props.setSearchVal}
        ></TextInput>
        <Picker
          selectedValue={props.val}
          onValueChange={(itemValue, itemIndex) => {
            props.setVal(itemValue);
          }}
        >
          <Picker.Item label='Latest' value='latest' />
          <Picker.Item label='Highest rated' value='highest' />
          <Picker.Item label='Lowest rated' value='lowest' />
        </Picker>
      </>
    );
  };
  render() {
    return (
      <FlatList
        data={this.renderList()}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, index, seperators }) => (
          <RepositoryItem item={item} />
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedValue, setValue] = useState('latest');
  const [searchVal, setSearchVal] = useState('');
  const [debouncedText] = useDebounce(searchVal, 500);
  let variable;

  if (selectedValue === 'latest') {
    variable = {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
      searchKeyword: debouncedText,
    };
  }
  if (selectedValue === 'highest') {
    variable = {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
      searchKeyword: debouncedText,
    };
  }
  if (selectedValue === 'lowest') {
    variable = {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
      searchKeyword: debouncedText,
    };
  }

  const { repositories, fetchMore, loading } = useRepositories({
    first: 3,
    ...variable,
  });

  /*useQuery(GET_REPOSITORIES, {
    variables: variable,
  });*/

  if (loading) {
    console.log('TEST');
    return (
      <View>
        <Text>loading....</Text>
      </View>
    );
  }

  console.log(repositories, loading);

  const onEndReach = () => {
    console.log('END HAS BEEN REACHED');
    fetchMore();
  };

  console.log(searchVal);
  return (
    <RepositoryListContainer
      repositories={repositories}
      val={selectedValue}
      setVal={setValue}
      searchVal={searchVal}
      setSearchVal={setSearchVal}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
