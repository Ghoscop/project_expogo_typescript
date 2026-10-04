import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NotificacoesScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>

          <TouchableOpacity
            style={styles.botaoVoltar}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.tituloHeader}>
              Notificações
            </Text>

            <Text style={styles.subtituloHeader}>
              Fique por dentro das novidades
            </Text>
          </View>

          <View style={styles.iconeHeader}>
            <Ionicons
              name="notifications"
              size={22}
              color="#FFFFFF"
            />
          </View>

        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.conteudo}
        >

          {/* DESTAQUE */}
          <View style={styles.destaque}>

            <View style={styles.iconeDestaque}>
              <Ionicons
                name="information-circle"
                size={27}
                color="#16834A"
              />
            </View>

            <View style={styles.textoDestaque}>
              <Text style={styles.tituloDestaque}>
                Tudo em um só lugar
              </Text>

              <Text style={styles.descricaoDestaque}>
                Aqui você encontrará avisos importantes
                sobre suas doações e os pontos de apoio.
              </Text>
            </View>

          </View>

          {/* NOTIFICAÇÃO */}
          <Text style={styles.secao}>
            Recentes
          </Text>

          <View style={styles.notificacaoCard}>

            <View style={styles.iconeNotificacao}>
              <Ionicons
                name="heart"
                size={21}
                color="#16834A"
              />
            </View>

            <View style={styles.notificacaoTexto}>

              <Text style={styles.notificacaoTitulo}>
                Suas doações fazem a diferença
              </Text>

              <Text style={styles.notificacaoDescricao}>
                Continue contribuindo para ajudar a
                comunidade. Cada doação é importante.
              </Text>

              <Text style={styles.data}>
                Mão Amiga
              </Text>

            </View>

          </View>

          {/* ESTADO */}
          <View style={styles.vazio}>

            <View style={styles.iconeVazio}>
              <Ionicons
                name="notifications-off-outline"
                size={42}
                color="#16834A"
              />
            </View>

            <Text style={styles.tituloVazio}>
              Nenhuma nova notificação
            </Text>

            <Text style={styles.textoVazio}>
              Quando houver novidades ou avisos
              importantes, eles aparecerão aqui.
            </Text>

          </View>

        </ScrollView>

        {/* NAVEGAÇÃO */}
        <View style={styles.bottomNav}>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Inicio')
            }
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

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Pontos')
            }
          >
            <Ionicons
              name="location-outline"
              size={23}
              color="#98A2B3"
            />

            <Text style={styles.navTexto}>
              Pontos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCentral}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('EscolherPonto')
            }
          >
            <Ionicons
              name="add"
              size={32}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Doacoes')
            }
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

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Perfil')
            }
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
    paddingTop: 14,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  botaoVoltar: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  tituloHeader: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  subtituloHeader: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 11,
    marginTop: 2,
  },

  iconeHeader: {
    marginLeft: 'auto',
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  conteudo: {
    padding: 20,
    paddingBottom: 110,
  },

  destaque: {
    backgroundColor: '#E8F7EF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconeDestaque: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoDestaque: {
    flex: 1,
    marginLeft: 12,
  },

  tituloDestaque: {
    color: '#123B32',
    fontSize: 14,
    fontWeight: '800',
  },

  descricaoDestaque: {
    color: '#667085',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },

  secao: {
    color: '#123B32',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 25,
    marginBottom: 11,
  },

  notificacaoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    elevation: 2,
  },

  iconeNotificacao: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#E8F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificacaoTexto: {
    flex: 1,
    marginLeft: 12,
  },

  notificacaoTitulo: {
    color: '#123B32',
    fontSize: 13,
    fontWeight: '800',
  },

  notificacaoDescricao: {
    color: '#667085',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },

  data: {
    color: '#98A2B3',
    fontSize: 10,
    marginTop: 7,
    fontWeight: '600',
  },

  vazio: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 48,
  },

  iconeVazio: {
    width: 85,
    height: 85,
    borderRadius: 42,
    backgroundColor: '#E8F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tituloVazio: {
    color: '#123B32',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 17,
  },

  textoVazio: {
    color: '#667085',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 7,
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

  botaoCentral: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#16834A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -28,
    elevation: 7,
  },
});