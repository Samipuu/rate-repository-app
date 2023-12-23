import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import SignInForm from '../components/SignInForm';
import { Formik, useField } from 'formik';
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const initialValues = {
        account: '',
        password: '',
      };

      const onSubmit = jest.fn();
      render(
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
      );
      fireEvent.changeText(
        screen.getByPlaceholderText('Account name'),
        'kalle'
      );
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
      fireEvent.press(screen.getByText('Sign In'));
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          account: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
