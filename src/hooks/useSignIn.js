import { SIGN_IN } from '../graphql/mutations';
import { useApolloClient, useMutation } from '@apollo/client';
import { useContext } from 'react';

import useAuthStorage from '../hooks/useAuthStorage';

import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ account, password }) => {
    const credentials = { username: account, password: password };
    const { data } = await mutate({ variables: { credentials } });
    // call the mutate function here with the right arguments
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();

    console.log(data);
  };

  return [signIn, result];
};

export default useSignIn;
