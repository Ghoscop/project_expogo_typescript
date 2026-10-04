import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PontosScreen from './src/screens/PontosScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import DoacaoScreen from './src/screens/DoacaoScreen';
import DoacoesScreen from './src/screens/DoacoesScreen';
import DetalheDoacaoScreen from './src/screens/DoacaoDetailsScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import EscolherPontoScreen from './src/screens/EscolherPontoScreen';
import NotificacoesScreen from './src/screens/NotificacoesScreen';
import InicioScreen from './src/screens/InicioScreen';
import SobreScreen from './src/screens/SobreScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Inicio"
        component={InicioScreen}
      />

      <Stack.Screen
        name="Pontos"
        component={PontosScreen}
      />

      <Stack.Screen
        name="Descricao"
        component={ProductDetailsScreen}
      />

      <Stack.Screen
        name="Doacao"
        component={DoacaoScreen}
      />

      <Stack.Screen
        name="DetalheDoacao"
        component={DetalheDoacaoScreen}
      />

      <Stack.Screen
        name="Doacoes"
        component={DoacoesScreen}
      />

      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
      />

      <Stack.Screen
        name="Sobre"
        component={SobreScreen}
      />

      <Stack.Screen
        name="EscolherPonto"
        component={EscolherPontoScreen}
      />

      <Stack.Screen
        name="Notificacoes"
        component={NotificacoesScreen}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
