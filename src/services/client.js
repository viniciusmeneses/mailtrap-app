import moment from 'moment';

const createURL = (entryURL, token) =>
  `https://mailtrap.io/api/v1${entryURL}?api_token=${token}`;

const request = (URL, token) =>
  fetch(createURL(URL, token))
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        throw response.error;
      }
      return response;
    });

const MailTrapClient = {
  getUser: token =>
    request('/user', token).then(user => ({
      id: user.id,
      api_token: user.api_token,
      name: user.name,
      email: user.email,
    })),
  getInboxes: token =>
    request('/inboxes', token).then(inboxes =>
      inboxes.map(inbox => ({
        id: inbox.id,
        name: inbox.name,
      }))
    ),
  getMessages: (token, inbox) =>
    request(`/inboxes/${inbox}/messages`, token).then(messages =>
      messages.map(message => ({
        id: message.id,
        subject: message.subject,
        sent_at: moment(message.sent_at).fromNow(),
        from_email: message.from_email,
        content: message.html_path || message.txt_path,
        to_email: message.to_email,
      }))
    ),
};

export default MailTrapClient;
