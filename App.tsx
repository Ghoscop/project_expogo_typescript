import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductScreen from './src/screens/ProductScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Produtos"
          component={ProductScreen}
          options={{
            title: 'Produtos',
          }}
        />

        <Stack.Screen
          name="Descrição"
          component={ProductDetailsScreen}
          options={{
            title: 'Detalhes do produto',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}