import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { StyleSheet, View, Pressable } from 'react-native';
import { Formik, useField } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import SignInForm from './SignInForm';

import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-around',
    itemAlign: 'center',
    backgroundColor: theme.colors.white,
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

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log(values);
    const { account, password } = values;

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
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
