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

export default function PerfilScreen() {
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

            <View style={styles.avatar}>
              <Ionicons
                name="person"
                size={42}
                color="#16834A"
              />
            </View>

            <Text style={styles.titulo}>
              Meu Perfil
            </Text>

            <Text style={styles.subtitulo}>
              Gerencie suas informações e doações
            </Text>

          </View>

          {/* USUÁRIO */}
          <View style={styles.cardPerfil}>

            <View style={styles.avatarPequeno}>
              <Ionicons
                name="person-outline"
                size={28}
                color="#16834A"
              />
            </View>

            <View style={styles.infoPerfil}>
              <Text style={styles.nome}>
                Doador
              </Text>

              <Text style={styles.email}>
                Participante do Mão Amiga
              </Text>
            </View>

            <Ionicons
              name="checkmark-circle"
              size={22}
              color="#16834A"
            />

          </View>

          {/* OPÇÕES */}
          <Text style={styles.secao}>
            Minha conta
          </Text>

          {/* MINHAS DOAÇÕES */}
          <TouchableOpacity
            style={styles.opcao}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Doacoes')
            }
          >
            <View style={styles.iconeOpcao}>
              <Ionicons
                name="heart-outline"
                size={21}
                color="#16834A"
              />
            </View>

            <View style={styles.textosOpcao}>
              <Text style={styles.tituloOpcao}>
                Minhas doações
              </Text>

              <Text style={styles.descricaoOpcao}>
                Consulte seu histórico de doações
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#98A2B3"
            />
          </TouchableOpacity>

          {/* NOTIFICAÇÕES */}
          <TouchableOpacity
            style={styles.opcao}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Notificacoes')
            }
          >
            <View style={styles.iconeOpcao}>
              <Ionicons
                name="notifications-outline"
                size={21}
                color="#16834A"
              />
            </View>

            <View style={styles.textosOpcao}>
              <Text style={styles.tituloOpcao}>
                Notificações
              </Text>

              <Text style={styles.descricaoOpcao}>
                Gerencie suas notificações
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#98A2B3"
            />
          </TouchableOpacity>

          {/* SOBRE */}
          <TouchableOpacity
            style={styles.opcao}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Sobre')
            }
          >
            <View style={styles.iconeOpcao}>
              <Ionicons
                name="information-circle-outline"
                size={21}
                color="#16834A"
              />
            </View>

            <View style={styles.textosOpcao}>
              <Text style={styles.tituloOpcao}>
                Sobre o Mão Amiga
              </Text>

              <Text style={styles.descricaoOpcao}>
                Saiba mais sobre o projeto
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#98A2B3"
            />
          </TouchableOpacity>

          {/* EXPLORAR */}
          <Text style={styles.secao}>
            Explorar
          </Text>

          <TouchableOpacity
            style={styles.opcao}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Pontos')
            }
          >
            <View style={styles.iconeOpcao}>
              <Ionicons
                name="location-outline"
                size={21}
                color="#16834A"
              />
            </View>

            <View style={styles.textosOpcao}>
              <Text style={styles.tituloOpcao}>
                Pontos de apoio
              </Text>

              <Text style={styles.descricaoOpcao}>
                Encontre locais para realizar doações
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#98A2B3"
            />
          </TouchableOpacity>

          {/* MENSAGEM */}
          <View style={styles.mensagem}>

            <View style={styles.mensagemIcone}>
              <Ionicons
                name="heart"
                size={23}
                color="#16834A"
              />
            </View>

            <View style={styles.mensagemTexto}>

              <Text style={styles.mensagemTitulo}>
                Juntos fazemos mais
              </Text>

              <Text style={styles.mensagemDescricao}>
                Cada doação ajuda a construir uma
                comunidade mais solidária.
              </Text>

            </View>

          </View>

        </ScrollView>

        {/* NAVEGAÇÃO INFERIOR */}
        <View style={styles.bottomNav}>

          {/* INÍCIO */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Pontos')
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

          {/* PONTOS */}
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

          {/* NOVA DOAÇÃO */}
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

          {/* DOAÇÕES */}
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

          {/* PERFIL */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
          >
            <Ionicons
              name="person"
              size={23}
              color="#16834A"
            />

            <Text style={styles.navTextoAtivo}>
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
    paddingTop: 30,
    paddingBottom: 32,
    alignItems: 'center',
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
  },

  subtitulo: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    marginTop: 5,
  },

  cardPerfil: {
    margin: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  avatarPequeno: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E8F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoPerfil: {
    flex: 1,
    marginLeft: 13,
  },

  nome: {
    fontSize: 17,
    fontWeight: '800',
    color: '#123B32',
  },

  email: {
    fontSize: 12,
    color: '#667085',
    marginTop: 3,
  },

  secao: {
    marginHorizontal: 20,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '800',
    color: '#123B32',
  },

  opcao: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconeOpcao: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#E8F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textosOpcao: {
    flex: 1,
    marginLeft: 12,
  },

  tituloOpcao: {
    fontSize: 14,
    fontWeight: '800',
    color: '#123B32',
  },

  descricaoOpcao: {
    fontSize: 11,
    color: '#667085',
    marginTop: 3,
  },

  mensagem: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#E8F7EF',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  mensagemIcone: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mensagemTexto: {
    flex: 1,
    marginLeft: 11,
  },

  mensagemTitulo: {
    fontSize: 14,
    fontWeight: '800',
    color: '#123B32',
  },

  mensagemDescricao: {
    fontSize: 11,
    lineHeight: 16,
    color: '#667085',
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