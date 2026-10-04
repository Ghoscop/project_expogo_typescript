import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PontosScreen from './src/screens/PontosScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import DoacaoScreen from './src/screens/DoacaoScreen';
import DoacoesScreen from './src/screens/DoacoesScreen';
import DetalheDoacaoScreen from './src/screens/DoacaoDetailsScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import EscolherPontoScreen from './src/screens/EscolherPontoScreen';

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
          name="Descricao"
          component={ProductDetailsScreen}
          options={{
            title: 'Detalhes do ponto',
          }}
        />

        <Stack.Screen
          name="Doacao"
          component={DoacaoScreen}
          options={{
            title: 'Fazer Doação',
          }}
        />

        <Stack.Screen
          name="DetalheDoacao"
          component={DetalheDoacaoScreen}
          options={{
            title: 'Detalhes da doação',
          }}
        />

        <Stack.Screen
          name="Doacoes"
          component={DoacoesScreen}
          options={{
            title: 'Minhas doações',
          }}
        />

        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            title: 'Perfil',
          }}
        />
        <Stack.Screen
          name="EscolherPonto"
          component={EscolherPontoScreen}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
