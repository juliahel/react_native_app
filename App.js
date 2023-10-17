import React from 'react';
import AppNavigator from './AppNavigator';
import { Amplify } from 'aws-amplify';
//import { withAuthenticator, AmplifyTheme } from '@aws-amplify/ui-react-native';
import config from './src/aws-exports';

Amplify.configure(config);

const App = () => {
  return (
    <AppNavigator />
  );
};

export default App;
//export default withAuthenticator(App);