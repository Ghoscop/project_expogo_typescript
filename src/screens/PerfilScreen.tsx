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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
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
            name="chevron-forward"
            size={20}
            color="#98A2B3"
          />
        </View>

        {/* OPÇÕES */}
        <Text style={styles.secao}>
          Minha conta
        </Text>

        <TouchableOpacity style={styles.opcao}>
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

        <TouchableOpacity style={styles.opcao}>
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

        <TouchableOpacity style={styles.opcao}>
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

        {/* VOLTAR */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('Pontos')}
        >
          <Ionicons
            name="home-outline"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.textoBotao}>
            Voltar para início
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8F6',
  },

  container: {
    paddingBottom: 40,
  },

  header: {
    backgroundColor: '#075E46',
    paddingTop: 35,
    paddingBottom: 35,
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

  botaoVoltar: {
    marginHorizontal: 20,
    marginTop: 15,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#16834A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});