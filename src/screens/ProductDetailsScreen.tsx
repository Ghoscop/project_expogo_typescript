import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetailsScreen({
  route,
}: any) {
  const navigation = useNavigation<any>();

  const { ponto } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* IMAGEM */}
        <View style={styles.imagemContainer}>

          <Image
            source={{ uri: ponto.imagem }}
            style={styles.imagem}
          />

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

        </View>

        {/* CABEÇALHO */}
        <View style={styles.cabecalho}>

          <View style={styles.status}>
            <View style={styles.statusPonto} />

            <Text style={styles.statusTexto}>
              Aberto para doações
            </Text>
          </View>

          <Text style={styles.nome}>
            {ponto.nome}
          </Text>

          <View style={styles.linhaEndereco}>

            <Ionicons
              name="location-outline"
              size={20}
              color="#16834A"
            />

            <Text style={styles.endereco}>
              {ponto.endereco}
            </Text>

          </View>

        </View>

        {/* HORÁRIO */}
        <View style={styles.infoPrincipal}>

          <View style={styles.infoItem}>

            <View style={styles.iconeInfo}>
              <Ionicons
                name="calendar-outline"
                size={21}
                color="#16834A"
              />
            </View>

            <View>
              <Text style={styles.labelInfo}>
                Dias
              </Text>

              <Text style={styles.valorInfo}>
                {ponto.dias}
              </Text>
            </View>

          </View>

          <View style={styles.divisor} />

          <View style={styles.infoItem}>

            <View style={styles.iconeInfo}>
              <Ionicons
                name="time-outline"
                size={21}
                color="#16834A"
              />
            </View>

            <View>
              <Text style={styles.labelInfo}>
                Horário
              </Text>

              <Text style={styles.valorInfo}>
                {ponto.horario}
              </Text>
            </View>

          </View>

        </View>

        {/* O QUE RECEBE */}
        <View style={styles.caixa}>

          <View style={styles.tituloCaixa}>

            <View style={styles.iconeRecebe}>
              <Ionicons
                name="heart"
                size={19}
                color="#16834A"
              />
            </View>

            <Text style={styles.titulo}>
              O que recebe
            </Text>

          </View>

          <Text style={styles.texto}>
            {ponto.recebe}
          </Text>

        </View>

        {/* O QUE DISTRIBUI */}
        <View style={styles.caixa}>

          <View style={styles.tituloCaixa}>

            <View style={styles.iconeDistribui}>
              <Ionicons
                name="gift-outline"
                size={19}
                color="#3182CE"
              />
            </View>

            <Text style={styles.titulo}>
              O que distribui
            </Text>

          </View>

          <Text style={styles.texto}>
            {ponto.distribui}
          </Text>

        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.botao}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('Doacao', {
              pontoId: ponto.id,
              pontoNome: ponto.nome,
            })
          }
        >

          <Ionicons
            name="heart-outline"
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.textoBotao}>
            Fazer doação
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

  scroll: {
    flex: 1,
    backgroundColor: '#F5F8F6',
  },

  container: {
    paddingBottom: 35,
  },

  imagemContainer: {
    height: 245,
    position: 'relative',
  },

  imagem: {
    width: '100%',
    height: '100%',
  },

  botaoVoltar: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cabecalho: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  status: {
    alignSelf: 'flex-start',
    backgroundColor: '#E4F7EC',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  statusPonto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16834A',
    marginRight: 6,
  },

  statusTexto: {
    color: '#16834A',
    fontSize: 12,
    fontWeight: '800',
  },

  nome: {
    fontSize: 27,
    lineHeight: 33,
    fontWeight: '800',
    color: '#123B32',
    marginBottom: 10,
  },

  linhaEndereco: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  endereco: {
    flex: 1,
    marginLeft: 7,
    fontSize: 14,
    lineHeight: 20,
    color: '#667085',
  },

  infoPrincipal: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconeInfo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#E8F7EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },

  divisor: {
    width: 1,
    height: 42,
    backgroundColor: '#E8EEEB',
    marginHorizontal: 10,
  },

  labelInfo: {
    fontSize: 11,
    color: '#98A2B3',
    fontWeight: '600',
  },

  valorInfo: {
    fontSize: 12,
    color: '#123B32',
    fontWeight: '700',
    marginTop: 3,
  },

  caixa: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginHorizontal: 20,
    marginBottom: 13,
    padding: 17,
  },

  tituloCaixa: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  iconeRecebe: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E8F7EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  iconeDistribui: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EAF4FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  titulo: {
    fontSize: 16,
    fontWeight: '800',
    color: '#123B32',
  },

  texto: {
    fontSize: 14,
    lineHeight: 21,
    color: '#667085',
  },

  botao: {
    marginHorizontal: 20,
    marginTop: 5,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#16834A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
    shadowColor: '#16834A',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 5,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});