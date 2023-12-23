import { Formik, useField } from 'formik';
import * as yup from 'yup';
import { StyleSheet, View, Pressable } from 'react-native';
import theme from '../theme';
import ReviewForm from './ReviewForm';
import { useNavigate } from 'react-router-native';
import { ADD_REVIEW } from '../graphql/mutations';
import { useApolloClient, useMutation } from '@apollo/client';

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  reviewText: '',
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-around',
    itemAlign: 'center',
    backgroundColor: theme.colors.white,
  },
});

const validationSchema = yup.object().shape({
  owner: yup.string().required('Owner is required'),
  name: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
});

const Review = () => {
  const navigate = useNavigate();
  const [mutate, result] = useMutation(ADD_REVIEW);

  const onSubmit = async (values) => {
    const { owner, name, rating, reviewText } = values;
    const review = {
      ownerName: owner,
      rating: Number(rating),
      repositoryName: name,
      text: reviewText,
    };

    const { data } = await mutate({ variables: { review } });
    console.log(data);
    navigate(`/repo/${data.createReview.repositoryId}`);
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default Review;
