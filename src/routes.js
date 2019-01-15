import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Auth from './pages/Auth';
import Inbox from './pages/Inbox';

const createRouter = userLogged =>
  createAppContainer(
    createSwitchNavigator(
      {
        Auth,
        Inbox,
      },
      {
        initialRouteName: userLogged ? 'Inbox' : 'Auth',
      }
    )
  );

export default createRouter;
