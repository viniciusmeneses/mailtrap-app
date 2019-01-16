import moment from 'moment';

const createURL = (entryURL, token) =>
  `https://mailtrap.io/api/v1${entryURL}?api_token=${token}`;

const request = (URL, token, parser = 'json') =>
  fetch(createURL(URL, token))
    .then(response => {
      if (parser !== 'json') return response.text();
      return response.json();
    })
    .then(response => {
      if (response.error) {
        throw response.error;
      }
      return response;
    });

const MailTrapClient = {
  getUser: token =>
    request('/user', token).then(user => ({
      id: String(user.id),
      api_token: user.api_token,
      name: user.name,
      email: user.email,
    })),
  getInboxes: token =>
    request('/inboxes', token).then(inboxes =>
      inboxes.map(inbox => ({
        id: String(inbox.id),
        name: inbox.name,
      }))
    ),
  getMessages: (token, inbox) =>
    request(`/inboxes/${inbox}/messages`, token)
      .then(messages =>
        messages.map(message => ({
          id: String(message.id),
          subject: message.subject,
          sent_at: moment(message.sent_at).fromNow(),
          from_email: message.from_email,
          content: message.txt_path,
          contentHtml: message.html_path,
          to_email: message.to_email,
        }))
      )
      .then(messages =>
        messages.map(message => ({
          ...message,
          content: message.content.split('/api/v1')[1],
          contentHtml: message.contentHtml.split('/api/v1')[1],
        }))
      )
      .then(messages =>
        Promise.all(
          messages.map(message =>
            Promise.all([
              request(message.content, token, 'text'),
              request(message.contentHtml, token, 'text'),
            ]).then(contents => contents[0] || contents[1])
          )
        ).then(contents =>
          messages.map((message, index) => ({
            ...message,
            content: contents[index],
          }))
        )
      ),
};

export default MailTrapClient;
