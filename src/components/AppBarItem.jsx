import Text from './Text';
import { View } from 'react-native';
import { Link } from 'react-router-native';
const AppBarItem = ({ style, name, link }) => {
  return (
    <View>
      <Link to={link}>
        <Text style={style} color='white' fontSize='subheading'>
          {name}
        </Text>
      </Link>
    </View>
  );
};

export default AppBarItem;
