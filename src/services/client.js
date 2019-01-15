import { Alert } from 'react-native';

const createURL = (entryURL, token) =>
  `https://mailtrap.io/api/v1${entryURL}?api_token=${token}`;

const MailTrapClient = {
  getUser: token =>
    fetch(createURL('/user', token))
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          throw response.error;
        }
        return response;
      }),
};

export default MailTrapClient;
