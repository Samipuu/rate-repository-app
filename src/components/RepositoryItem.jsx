import { View, Image, StyleSheet, Pressable } from 'react-native';
import StatItem from './StatItem';
import theme from '../theme';
import Text from './Text';
import { openURL } from 'expo-linking';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 8,

    alignSelf: 'stretch',
    backgroundColor: theme.colors.white,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  flexRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  flexColumn: {
    flexDirection: 'column',
    paddingLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  stats: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 5,
    alignSelf: 'stretch',
  },
  name: { padding: 5 },
  desc: { paddingLeft: 5, paddingBottom: 5 },
  lang: {
    backgroundColor: theme.colors.primary,
    flexGrow: 0,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
});

const RepositoryItem = ({ item }) => {
  //console.log(item);
  const navigate = useNavigate();
  const handlePress = () => {
    openURL(item.url);
  };

  return (
    <Pressable
      onPress={() => {
        console.log(item);
        navigate(`/repo/${item.id}`);
      }}
    >
      <View style={styles.flexContainer} testID='repositoryItem'>
        <View style={styles.flexRow}>
          <View>
            <Image
              source={{ uri: item.ownerAvatarUrl }}
              style={styles.tinyLogo}
            />
          </View>
          <View style={styles.flexColumn}>
            <View style={styles.name}>
              <Text fontSize='subheading' fontWeight='bold'>
                {item.fullName}
              </Text>
            </View>
            <View style={styles.desc}>
              <Text color='secondary'>{item.description}</Text>
            </View>
            <View style={styles.lang}>
              <Text color='white'>{item.language}</Text>
            </View>
          </View>
        </View>

        <View style={styles.stats}>
          <StatItem name='Stars' value={item.stargazersCount} />
          <StatItem name='Forks' value={item.forksCount} />
          <StatItem name='Reviews' value={item.reviewCount} />
          <StatItem name='Rating' value={item.ratingAverage} />
        </View>
        {item.url ? (
          <View style={styles.lang}>
            <Pressable onPress={handlePress}>
              <Text color='white'>Open in GitHub</Text>
            </Pressable>
          </View>
        ) : (
          <></>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
