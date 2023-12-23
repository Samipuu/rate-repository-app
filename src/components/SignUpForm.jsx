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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.input}
        name='username'
        placeholder='Username'
      />
      <FormikTextInput
        style={styles.input}
        name='password'
        placeholder='Password'
      />
      <FormikTextInput
        style={styles.input}
        name='confirmPassword'
        placeholder='Password confirmation'
      />
      <Pressable onPress={onSubmit} style={styles.submit}>
        <Text color='white'>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;
