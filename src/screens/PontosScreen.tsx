import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { pontos } from '../data/Ponto';

export default function PontosScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoArea}>

            <View style={styles.logo}>
              <Ionicons
                name="heart"
                size={28}
                color="#FFFFFF"
              />
            </View>

            <View>
              <Text style={styles.logoTitulo}>
                Mão Amiga
              </Text>

              <Text style={styles.logoSubtitulo}>
                Juntos fazemos mais
              </Text>
            </View>

          </View>

          <TouchableOpacity
            style={styles.notificacao}
            activeOpacity={0.8}
          >
            <Ionicons
              name="notifications-outline"
              size={25}
              color="#FFFFFF"
            />

            <View style={styles.pontoNotificacao} />
          </TouchableOpacity>
        </View>

        {/* TÍTULO */}
        <View style={styles.tituloArea}>

          <Text style={styles.titulo}>
            Pontos de Apoio
          </Text>

          <Text style={styles.subtitulo}>
            Encontre um ponto e faça a diferença
          </Text>

        </View>

        {/* LISTA */}
        <FlatList
          data={pontos}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.92}
              onPress={() =>
                navigation.navigate('Descricao', {
                  ponto: item,
                })
              }
            >

              <Image
                source={{ uri: item.imagem }}
                style={styles.imagem}
              />

              <View style={styles.info}>

                <View style={styles.linhaTopo}>

                  <View style={styles.status}>
                    <View style={styles.statusPonto} />

                    <Text style={styles.statusTexto}>
                      Aberto
                    </Text>
                  </View>

                </View>

                <Text
                  style={styles.nome}
                  numberOfLines={2}
                >
                  {item.nome}
                </Text>

                <View style={styles.linhaInfo}>

                  <Ionicons
                    name="location-outline"
                    size={16}
                    color="#667085"
                  />

                  <Text
                    style={styles.endereco}
                    numberOfLines={2}
                  >
                    {item.endereco}
                  </Text>

                </View>

                <View style={styles.linhaInfo}>

                  <Ionicons
                    name="calendar-outline"
                    size={16}
                    color="#667085"
                  />

                  <Text style={styles.endereco}>
                    {item.dias}
                  </Text>

                </View>

                <View style={styles.linhaInfo}>

                  <Ionicons
                    name="time-outline"
                    size={16}
                    color="#667085"
                  />

                  <Text style={styles.horario}>
                    {item.horario}
                  </Text>

                </View>

              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color="#98A2B3"
                style={styles.seta}
              />

            </TouchableOpacity>
          )}
        />

        {/* NAVEGAÇÃO INFERIOR */}
        <View style={styles.bottomNav}>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Inicio')}
          >
            <Ionicons
              name="home-outline"
              size={23}
              color="#98A2B3"
            />

            <Text style={styles.navTexto}>
              Início
            </Text>
          </TouchableOpacity>

          {/* Pontos */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Pontos')}
          >
            <Ionicons
              name="location"
              size={23}
              color="#16834A"
            />

            <Text style={styles.navTextoAtivo}>
              Pontos
            </Text>
          </TouchableOpacity>

            {/* NOVA DOAÇÃO */}
        <TouchableOpacity
          style={styles.botaoCentral}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('EscolherPonto')}
        >
          <Ionicons
            name="add"
            size={32}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {/* MINHAS DOAÇÕES */}
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Doacoes')}
        >
          <Ionicons
            name="heart-outline"
            size={23}
            color="#98A2B3"
          />

          <Text style={styles.navTexto}>
            Doações
          </Text>
        </TouchableOpacity>

        {/* PERFIL */}
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Ionicons
            name="person-outline"
            size={23}
            color="#98A2B3"
          />

          <Text style={styles.navTexto}>
            Perfil
          </Text>
        </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8F6',
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F8F6',
  },

  header: {
    backgroundColor: '#075E46',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  logoTitulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },

  logoSubtitulo: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    marginTop: 2,
  },

  notificacao: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  pontoNotificacao: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5A5F',
  },

  tituloArea: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 16,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#123B32',
  },

  subtitulo: {
    fontSize: 14,
    color: '#667085',
    marginTop: 5,
  },

  buscaContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8E5',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputBusca: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#123B32',
  },

  lista: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 14,
    flexDirection: 'row',
    shadowColor: '#123B32',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    minHeight: 145,
  },

  imagem: {
    width: 112,
    height: 145,
    borderRadius: 16,
  },

  info: {
    flex: 1,
    marginLeft: 13,
    paddingRight: 4,
  },

  linhaTopo: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  status: {
    backgroundColor: '#E4F7EC',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusPonto: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#16834A',
    marginRight: 5,
  },

  statusTexto: {
    color: '#16834A',
    fontSize: 11,
    fontWeight: '800',
  },

  nome: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '800',
    color: '#16483D',
    marginBottom: 7,
  },

  linhaInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },

  endereco: {
    flex: 1,
    marginLeft: 6,
    fontSize: 12,
    lineHeight: 16,
    color: '#667085',
  },

  horario: {
    marginLeft: 6,
    fontSize: 12,
    color: '#16834A',
    fontWeight: '700',
  },

  seta: {
    alignSelf: 'center',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EEEB',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  navItem: {
    width: 62,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navTexto: {
    fontSize: 10,
    color: '#98A2B3',
    marginTop: 3,
    fontWeight: '600',
  },

  navTextoAtivo: {
    fontSize: 10,
    color: '#16834A',
    marginTop: 3,
    fontWeight: '800',
  },

  botaoCentral: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#16834A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -28,
    shadowColor: '#16834A',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 7,
  },
});