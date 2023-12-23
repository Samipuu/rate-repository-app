import Moment from 'moment';
import { View, FlatList, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  rating: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: theme.colors.textSecondary,
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    paddingTop: 15,
  },
  container: {
    padding: 10,

    itemAlign: 'center',
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  name: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 10,
    addingRight: 10,
  },
});

const ReviewItem = ({ review }) => {
  console.log(review);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.rating}>
          <Text color='secondary' fontSize='subheading' fontWeight='bold'>
            {review.rating}
          </Text>
        </View>
        <View>
          <View style={styles.name}>
            <Text fontSize='subheading' fontWeight='bold'>
              {review.repository
                ? review.repository.fullName
                : review.user.username}
            </Text>
            <Text color='secondary'>
              {Moment(review.createdAt).format('DD/MM/yyyy')}
            </Text>
          </View>
          <View style={styles.text}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ReviewItem;
