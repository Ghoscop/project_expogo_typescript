import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PontosScreen from './src/screens/PontosScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
return (
<NavigationContainer>

  <Stack.Navigator>


    <Stack.Screen
      name="Pontos"
      component={PontosScreen}
      options={{
        title: 'Pontos de Apoio',
      }}
    />


    <Stack.Screen
      name="Descrição"
      component={ProductDetailsScreen}
      options={{
        title: 'Detalhes do ponto',
      }}
    />


  </Stack.Navigator>


</NavigationContainer>

);
}