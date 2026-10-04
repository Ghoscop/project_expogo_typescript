import React from 'react';

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

export default function EscolherPontoScreen() {
  const navigation = useNavigation<any>();

  function escolherPonto(ponto: any) {
    navigation.navigate('Doacao', {
      pontoId: ponto.id,
      pontoNome: ponto.nome,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* CABEÇALHO */}
        <View style={styles.header}>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#123B32"
            />
          </TouchableOpacity>

          <View style={styles.iconeHeader}>
            <Ionicons
              name="heart"
              size={25}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.headerTexto}>
            <Text style={styles.titulo}>
              Escolha um ponto
            </Text>

            <Text style={styles.subtitulo}>
              Onde você deseja fazer sua doação?
            </Text>
          </View>

        </View>

        {/* AVISO */}
        <View style={styles.aviso}>

          <View style={styles.iconeAviso}>
            <Ionicons
              name="location"
              size={21}
              color="#16834A"
            />
          </View>

          <View style={styles.textoAviso}>
            <Text style={styles.tituloAviso}>
              Selecione um ponto de apoio
            </Text>

            <Text style={styles.descricaoAviso}>
              Escolha onde sua doação será entregue.
            </Text>
          </View>

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
              activeOpacity={0.9}
              onPress={() => escolherPonto(item)}
            >

              <Image
                source={{ uri: item.imagem }}
                style={styles.imagem}
              />

              <View style={styles.info}>

                <View style={styles.status}>
                  <View style={styles.statusPonto} />

                  <Text style={styles.statusTexto}>
                    Aberto
                  </Text>
                </View>

                <Text
                  style={styles.nome}
                  numberOfLines={2}
                >
                  {item.nome}
                </Text>

                <View style={styles.linha}>

                  <Ionicons
                    name="location-outline"
                    size={15}
                    color="#667085"
                  />

                  <Text
                    style={styles.endereco}
                    numberOfLines={2}
                  >
                    {item.endereco}
                  </Text>

                </View>

                <View style={styles.linha}>

                  <Ionicons
                    name="time-outline"
                    size={15}
                    color="#16834A"
                  />

                  <Text style={styles.horario}>
                    {item.horario}
                  </Text>

                </View>

              </View>

              <View style={styles.botaoSelecionar}>
                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color="#FFFFFF"
                />
              </View>

            </TouchableOpacity>

          )}
        />

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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 18,
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

  iconeHeader: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#16834A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  headerTexto: {
    flex: 1,
  },

  titulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#123B32',
  },

  subtitulo: {
    fontSize: 12,
    color: '#667085',
    marginTop: 3,
  },

  aviso: {
    margin: 20,
    padding: 15,
    borderRadius: 17,
    backgroundColor: '#E8F7EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconeAviso: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoAviso: {
    flex: 1,
    marginLeft: 12,
  },

  tituloAviso: {
    fontSize: 14,
    fontWeight: '800',
    color: '#123B32',
  },

  descricaoAviso: {
    fontSize: 12,
    color: '#667085',
    marginTop: 3,
  },

  lista: {
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 11,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#123B32',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  imagem: {
    width: 82,
    height: 100,
    borderRadius: 14,
  },

  info: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
  },

  status: {
    alignSelf: 'flex-start',
    backgroundColor: '#E4F7EC',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  statusPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16834A',
    marginRight: 5,
  },

  statusTexto: {
    fontSize: 10,
    fontWeight: '800',
    color: '#16834A',
  },

  nome: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
    color: '#123B32',
    marginBottom: 5,
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 3,
  },

  endereco: {
    flex: 1,
    marginLeft: 5,
    fontSize: 10,
    lineHeight: 14,
    color: '#667085',
  },

  horario: {
    marginLeft: 5,
    fontSize: 10,
    color: '#16834A',
    fontWeight: '700',
  },

  botaoSelecionar: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#16834A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});