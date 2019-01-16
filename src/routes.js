import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Auth from './pages/Auth';
import Inbox from './pages/Inbox';
import Message from './pages/Message';

const createRouter = userLogged =>
  createAppContainer(
    createSwitchNavigator(
      {
        Auth,
        Inbox,
        Message,
      },
      {
        initialRouteName: userLogged ? 'Inbox' : 'Auth',
      }
    )
  );

export default createRouter;
