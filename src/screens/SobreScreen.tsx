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

export default function SobreScreen() {
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
              color="#123B32"
            />
          </TouchableOpacity>

          <View style={styles.headerTexto}>
            <Text style={styles.headerTitulo}>
              Sobre o Mão Amiga
            </Text>

            <Text style={styles.headerSubtitulo}>
              Conheça o nosso projeto
            </Text>
          </View>

        </View>

        {/* CONTEÚDO */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >

          {/* LOGO */}
          <View style={styles.logoContainer}>

            <View style={styles.logo}>
              <Ionicons
                name="heart"
                size={45}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.titulo}>
              Mão Amiga
            </Text>

            <Text style={styles.slogan}>
              Juntos fazemos mais
            </Text>

          </View>

          {/* APRESENTAÇÃO */}
          <View style={styles.card}>

            <View style={styles.iconeCard}>
              <Ionicons
                name="heart-outline"
                size={24}
                color="#16834A"
              />
            </View>

            <Text style={styles.tituloCard}>
              Nossa missão
            </Text>

            <Text style={styles.texto}>
              O Mão Amiga tem como objetivo conectar
              pessoas que desejam ajudar a pontos de
              apoio que recebem e distribuem doações
              para a comunidade.
            </Text>

            <Text style={styles.texto}>
              Através do aplicativo, você pode encontrar
              pontos de apoio, escolher o que deseja doar
              e registrar suas doações de forma simples
              e organizada.
            </Text>

          </View>

          {/* COMO FUNCIONA */}
          <View style={styles.card}>

            <View style={styles.iconeCard}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="#16834A"
              />
            </View>

            <Text style={styles.tituloCard}>
              Como funciona?
            </Text>

            {/* PASSO 1 */}
            <View style={styles.passo}>

              <View style={styles.numero}>
                <Text style={styles.numeroTexto}>
                  1
                </Text>
              </View>

              <View style={styles.passoTexto}>
                <Text style={styles.passoTitulo}>
                  Encontre um ponto
                </Text>

                <Text style={styles.passoDescricao}>
                  Consulte os pontos de apoio disponíveis
                  para realizar sua doação.
                </Text>
              </View>

            </View>

            {/* PASSO 2 */}
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
                  Informe o tipo e a quantidade de itens
                  que deseja entregar.
                </Text>
              </View>

            </View>

            {/* PASSO 3 */}
            <View style={styles.passo}>

              <View style={styles.numero}>
                <Text style={styles.numeroTexto}>
                  3
                </Text>
              </View>

              <View style={styles.passoTexto}>
                <Text style={styles.passoTitulo}>
                  Faça a diferença
                </Text>

                <Text style={styles.passoDescricao}>
                  Sua contribuição ajuda pessoas e fortalece
                  a comunidade.
                </Text>
              </View>

            </View>

          </View>

          {/* BENEFÍCIOS */}
          <View style={styles.card}>

            <View style={styles.iconeCard}>
              <Ionicons
                name="sparkles-outline"
                size={24}
                color="#16834A"
              />
            </View>

            <Text style={styles.tituloCard}>
              Por que doar?
            </Text>

            <View style={styles.beneficio}>
              <Ionicons
                name="checkmark-circle"
                size={21}
                color="#16834A"
              />

              <Text style={styles.beneficioTexto}>
                Ajude pessoas que precisam.
              </Text>
            </View>

            <View style={styles.beneficio}>
              <Ionicons
                name="checkmark-circle"
                size={21}
                color="#16834A"
              />

              <Text style={styles.beneficioTexto}>
                Dê um novo destino a itens em bom estado.
              </Text>
            </View>

            <View style={styles.beneficio}>
              <Ionicons
                name="checkmark-circle"
                size={21}
                color="#16834A"
              />

              <Text style={styles.beneficioTexto}>
                Incentive uma comunidade mais solidária.
              </Text>
            </View>

          </View>

          {/* MENSAGEM FINAL */}
          <View style={styles.mensagem}>

            <View style={styles.mensagemIcone}>
              <Ionicons
                name="people"
                size={27}
                color="#16834A"
              />
            </View>

            <Text style={styles.mensagemTitulo}>
              Juntos fazemos mais
            </Text>

            <Text style={styles.mensagemTexto}>
              Cada pequena atitude pode transformar
              a vida de alguém.
            </Text>

          </View>

          {/* RODAPÉ */}
          <Text style={styles.rodape}>
            Mão Amiga
          </Text>

          <Text style={styles.rodapeSecundario}>
            Projeto acadêmico
          </Text>

        </ScrollView>

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

  /* HEADER */

  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EEEB',
  },

  botaoVoltar: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#F1F5F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  headerTexto: {
    flex: 1,
  },

  headerTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#123B32',
  },

  headerSubtitulo: {
    fontSize: 12,
    color: '#667085',
    marginTop: 3,
  },

  /* SCROLL */

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 35,
  },

  /* LOGO */

  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },

  logo: {
    width: 92,
    height: 92,
    borderRadius: 30,
    backgroundColor: '#16834A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
    elevation: 4,
    shadowColor: '#123B32',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#123B32',
  },

  slogan: {
    fontSize: 13,
    color: '#667085',
    marginTop: 4,
  },

  /* CARDS */

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,

    shadowColor: '#123B32',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  iconeCard: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#E8F7EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  tituloCard: {
    fontSize: 17,
    fontWeight: '800',
    color: '#123B32',
    marginBottom: 10,
  },

  texto: {
    fontSize: 13,
    lineHeight: 20,
    color: '#667085',
    marginBottom: 10,
  },

  /* PASSOS */

  passo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },

  numero: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#16834A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  numeroTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  passoTexto: {
    flex: 1,
    marginLeft: 11,
  },

  passoTitulo: {
    fontSize: 14,
    fontWeight: '800',
    color: '#123B32',
  },

  passoDescricao: {
    fontSize: 12,
    lineHeight: 17,
    color: '#667085',
    marginTop: 3,
  },

  /* BENEFÍCIOS */

  beneficio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
  },

  beneficioTexto: {
    flex: 1,
    marginLeft: 9,
    fontSize: 13,
    color: '#475467',
  },

  /* MENSAGEM */

  mensagem: {
    backgroundColor: '#E8F7EF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
  },

  mensagemIcone: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 11,
  },

  mensagemTitulo: {
    fontSize: 17,
    fontWeight: '900',
    color: '#123B32',
  },

  mensagemTexto: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#667085',
    marginTop: 5,
  },

  /* RODAPÉ */

  rodape: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '800',
    color: '#16834A',
  },

  rodapeSecundario: {
    textAlign: 'center',
    fontSize: 11,
    color: '#98A2B3',
    marginTop: 3,
  },
});