import {
View,
Text,
Image,
FlatList,
StyleSheet,
TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { pontos } from '../data/Ponto';

export default function PontosScreen() {
const navigation = useNavigation<any>();

return (
<View style={styles.container}>

  <Text style={styles.titulo}>
    Pontos de Apoio
  </Text>


  <Text style={styles.subtitulo}>
    Instituto Mão Amiga
  </Text>


  <FlatList
    data={pontos}
    keyExtractor={(item) => item.id}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Descrição', {
            ponto: item,
          })
        }
      >


        <Image
          source={item.imagem}
          style={styles.imagem}
        />


        <View style={styles.info}>


          <Text style={styles.nome}>
            {item.nome}
          </Text>


          <Text style={styles.endereco}>
            {item.endereco}
          </Text>


          <Text style={styles.horario}>
            {item.dias} • {item.horario}
          </Text>


        </View>


      </TouchableOpacity>
    )}
  />


</View>

);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#F7F9F8',
padding: 20,
},

titulo: {
fontSize: 30,
fontWeight: '800',
color: '#1B3A5C',
marginTop: 35,
},

subtitulo: {
fontSize: 15,
color: '#2E7D32',
marginBottom: 22,
},

card: {
flexDirection: 'row',
backgroundColor: '#FFFFFF',
borderRadius: 18,
padding: 12,
marginBottom: 15,

elevation: 4,


shadowColor: '#1B3A5C',
shadowOffset: {
  width: 0,
  height: 3,
},
shadowOpacity: 0.08,
shadowRadius: 8,

},

imagem: {
width: 90,
height: 90,
borderRadius: 14,
},

info: {
flex: 1,
marginLeft: 14,
justifyContent: 'center',
},

nome: {
fontSize: 17,
fontWeight: '700',
color: '#1B3A5C',
},

endereco: {
fontSize: 13,
color: '#667085',
marginTop: 6,
},

horario: {
fontSize: 12,
fontWeight: '600',
color: '#2E7D32',
marginTop: 7,
},
});