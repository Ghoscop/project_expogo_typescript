import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function InicioScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >

          {/* HEADER */}
          <View style={styles.header}>

            <View style={styles.headerTopo}>

              <View style={styles.logoArea}>
                <View style={styles.logo}>
                  <Ionicons
                    name="heart"
                    size={27}
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
                onPress={() =>
                  navigation.navigate('Notificacoes')
                }
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#FFFFFF"
                />

                <View style={styles.pontoNotificacao} />
              </TouchableOpacity>

            </View>

            <Text style={styles.saudacao}>
              Olá, Doador! 👋
            </Text>

            <Text style={styles.frase}>
              Pequenas atitudes podem transformar vidas.
            </Text>

          </View>

          {/* DESTAQUE */}
          <View style={styles.destaque}>

            <View style={styles.destaqueTexto}>

              <View style={styles.tag}>
                <Ionicons
                  name="heart"
                  size={13}
                  color="#16834A"
                />

                <Text style={styles.tagTexto}>
                  FAÇA A DIFERENÇA
                </Text>
              </View>

              <Text style={styles.destaqueTitulo}>
                Sua doação pode{'\n'}
                mudar uma história.
              </Text>

              <Text style={styles.destaqueDescricao}>
                Encontre um ponto de apoio e contribua
                com quem mais precisa.
              </Text>

              <TouchableOpacity
                style={styles.botaoDoar}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate('EscolherPonto')
                }
              >
                <Text style={styles.botaoDoarTexto}>
                  Fazer uma doação
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

            </View>

            <View style={styles.iconeDestaque}>
              <Ionicons
                name="heart"
                size={58}
                color="#16834A"
              />
            </View>

          </View>

          {/* AÇÕES RÁPIDAS */}
          <Text style={styles.secaoTitulo}>
            O que você deseja fazer?
          </Text>

          <View style={styles.acoes}>

            <TouchableOpacity
              style={styles.acao}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('Pontos')
              }
            >
              <View
                style={[
                  styles.acaoIcone,
                  { backgroundColor: '#E8F7EF' },
                ]}
              >
                <Ionicons
                  name="location"
                  size={24}
                  color="#16834A"
                />
              </View>

              <Text style={styles.acaoTitulo}>
                Encontrar pontos
              </Text>

              <Text style={styles.acaoDescricao}>
                Veja locais próximos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.acao}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('Doacoes')
              }
            >
              <View
                style={[
                  styles.acaoIcone,
                  { backgroundColor: '#EAF2FC' },
                ]}
              >
                <Ionicons
                  name="heart"
                  size={24}
                  color="#3182CE"
                />
              </View>

              <Text style={styles.acaoTitulo}>
                Minhas doações
              </Text>

              <Text style={styles.acaoDescricao}>
                Veja seu histórico
              </Text>
            </TouchableOpacity>

          </View>

          {/* COMO AJUDAR */}
          <Text style={styles.secaoTitulo}>
            Como ajudar?
          </Text>

          <View style={styles.comoAjudar}>

            <View style={styles.passo}>

              <View style={styles.numero}>
                <Text style={styles.numeroTexto}>
                  1
                </Text>
              </View>

              <View style={styles.passoTexto}>
                <Text style={styles.passoTitulo}>
                  Escolha um ponto
                </Text>

                <Text style={styles.passoDescricao}>
                  Encontre um local de apoio.
                </Text>
              </View>

            </View>

            <View style={styles.linha} />

            <View style={styles.passo}>

              <View style={styles.numero}>
                <Text style={styles.numeroTexto}>
                  2
                </Text>
              </View>

              <View style={styles.passoTexto}>
                <Text style={styles.passoTitulo}>
                  Escolha o que doar
                </Text>

                <Text style={styles.passoDescricao}>
                  Roupas, alimentos e muito mais.
                </Text>
              </View>

            </View>

            <View style={styles.linha} />

            <View style={styles.passo}>

              <View style={styles.numero}>
                <Text style={styles.numeroTexto}>
                  3
                </Text>
              </View>

              <View style={styles.passoTexto}>
                <Text style={styles.passoTitulo}>
                  Faça sua contribuição
                </Text>

                <Text style={styles.passoDescricao}>
                  Sua atitude faz a diferença.
                </Text>
              </View>

            </View>

          </View>

          {/* MENSAGEM FINAL */}
          <View style={styles.mensagem}>

            <Ionicons
              name="people"
              size={28}
              color="#16834A"
            />

            <View style={styles.mensagemTexto}>

              <Text style={styles.mensagemTitulo}>
                Juntos fazemos mais
              </Text>

              <Text style={styles.mensagemDescricao}>
                Cada contribuição ajuda a construir
                uma comunidade mais solidária.
              </Text>

            </View>

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
              name="home"
              size={23}
              color="#16834A"
            />

            <Text style={styles.navTextoAtivo}>
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

  scroll: {
    paddingBottom: 110,
  },

  header: {
    backgroundColor: '#075E46',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.17)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },

  logoTitulo: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },

  logoSubtitulo: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    marginTop: 2,
  },

  notificacao: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pontoNotificacao: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5A5F',
  },

  saudacao: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    marginTop: 27,
  },

  frase: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    marginTop: 6,
  },

  destaque: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 19,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#123B32',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },

  destaqueTexto: {
    flex: 1,
  },

  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F7EF',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  tagTexto: {
    color: '#16834A',
    fontSize: 9,
    fontWeight: '800',
    marginLeft: 5,
  },

  destaqueTitulo: {
    color: '#123B32',
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '800',
    marginTop: 11,
  },

  destaqueDescricao: {
    color: '#667085',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 8,
  },

  botaoDoar: {
    alignSelf: 'flex-start',
    backgroundColor: '#16834A',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
  },

  botaoDoarTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginRight: 6,
  },

  iconeDestaque: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#E8F7EF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 8,
  },

  secaoTitulo: {
    marginHorizontal: 20,
    marginTop: 23,
    marginBottom: 12,
    color: '#123B32',
    fontSize: 17,
    fontWeight: '800',
  },

  acoes: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },

  acao: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    elevation: 2,
  },

  acaoIcone: {
    width: 45,
    height: 45,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  acaoTitulo: {
    color: '#123B32',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 11,
  },

  acaoDescricao: {
    color: '#667085',
    fontSize: 10,
    marginTop: 4,
  },

  comoAjudar: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 17,
    elevation: 2,
  },

  passo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  numero: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E8F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  numeroTexto: {
    color: '#16834A',
    fontSize: 15,
    fontWeight: '800',
  },

  passoTexto: {
    flex: 1,
    marginLeft: 12,
  },

  passoTitulo: {
    color: '#123B32',
    fontSize: 13,
    fontWeight: '800',
  },

  passoDescricao: {
    color: '#667085',
    fontSize: 11,
    marginTop: 3,
  },

  linha: {
    width: 1,
    height: 17,
    backgroundColor: '#DDE8E2',
    marginLeft: 19,
    marginVertical: 4,
  },

  mensagem: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 18,
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#E8F7EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  mensagemTexto: {
    flex: 1,
    marginLeft: 12,
  },

  mensagemTitulo: {
    color: '#123B32',
    fontSize: 14,
    fontWeight: '800',
  },

  mensagemDescricao: {
    color: '#667085',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
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
    elevation: 7,
  },
});