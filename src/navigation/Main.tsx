import React from 'react';
import {MainStack, MainRoutes} from './routes';

import HomeScreen from '../screens/Home';
import AllCountries from '../screens/AllCountries';

const Main = (): React.ReactElement => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={MainRoutes.Home}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={MainRoutes.AppCountries}
        component={AllCountries}
      />
    </MainStack.Navigator>
  );
};
export default Main;
