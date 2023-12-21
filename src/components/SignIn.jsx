import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { StyleSheet, View, Pressable } from 'react-native';
import { Formik, useField } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

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

const initialValues = {
  account: '',
  password: '',
};

const validationSchema = yup.object().shape({
  account: yup.string().required('Account name is required'),
  password: yup.string().required('Password is required'),
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
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
