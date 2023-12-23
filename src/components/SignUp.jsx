import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { StyleSheet, View, Pressable } from 'react-native';
import { Formik, useField } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import SignUpForm from './SignUpForm';
import { useMutation } from '@apollo/client';

import { useNavigate } from 'react-router-native';
import { SIGN_UP } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-around',
    itemAlign: 'center',
    backgroundColor: theme.colors.white,
  },
});

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [signIn] = useSignIn();
  const [mutate, result] = useMutation(SIGN_UP);
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await mutate({
        variables: { user: { username: username, password: password } },
      });
    } catch (e) {
      console.log(e);
    }
    const account = username;
    try {
      await signIn({ account, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignUp;
