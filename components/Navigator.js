import { createStackNavigator } from 'react-navigation';

import HomeScreen  from './scenes/HomeScreen';
import InfosScreen  from './scenes/InfosScreen';
import HistoriqueScreen  from './scenes/HistoriqueScreen';
import NewPosition  from './scenes/NewPosition';

const Navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Infos: InfosScreen,
    NewPosition: NewPosition,
    Historique: HistoriqueScreen
  },
  {
    initialRouteName: 'NewPosition',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f9f9f9',
      },
      headerTintColor: '#222',
    },
  }
);

export default Navigator;