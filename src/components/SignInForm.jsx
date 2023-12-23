import FormikTextInput from './FormikTextInput';
import { StyleSheet, View, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-around',
    itemAlign: 'center',
    backgroundColor: theme.colors.white,
  },
  input: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
  },
  submit: {
    margin: 5,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    textAlign: 'center',
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.input}
        name='account'
        placeholder='Account name'
      />
      <FormikTextInput
        style={styles.input}
        name='password'
        placeholder='Password'
      />
      <Pressable onPress={onSubmit} style={styles.submit}>
        <Text color='white'>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
