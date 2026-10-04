import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';

import { excluirDoacao } from '../data/Doacao';

import {
  obterCategoriaInfo,
} from '../utils/categoriasDoacao';

export default function DetalheDoacaoScreen({
  route,
  navigation,
}: any) {
  const { doacao } = route.params;

  const dataFormatada = new Date(
    doacao.data
  ).toLocaleString('pt-BR');

  const categoria = obterCategoriaInfo(
    doacao.tipo
  );

  function handleExcluir() {
    Alert.alert(
      'Excluir doação',
      'Tem certeza que deseja excluir esta doação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await excluirDoacao(
                doacao.id
              );

              navigation.goBack();
            } catch (error) {
              Alert.alert(
                'Erro',
                'Não foi possível excluir a doação.'
              );
            }
          },
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.header}>

        <Text style={styles.titulo}>
          Detalhes da doação
        </Text>

        <Text style={styles.subtitulo}>
          Confira as informações registradas
        </Text>

      </View>

      <View style={styles.imagemCard}>

        <Image
          source={{
            uri: categoria.imagem,
          }}
          style={styles.imagem}
        />

        <View style={styles.imagemOverlay}>

          <Text style={styles.categoriaIcone}>
            {categoria.icone}
          </Text>

          <View>

            <Text style={styles.categoriaLabel}>
              CATEGORIA
            </Text>

            <Text style={styles.categoriaNome}>
              {categoria.nome}
            </Text>

          </View>

        </View>

      </View>

      <View style={styles.card}>

        <Text style={styles.label}>
          Tipo de doação
        </Text>

        <Text style={styles.valorGrande}>
          {doacao.tipo}
        </Text>

        <View style={styles.divisor} />

        <Text style={styles.label}>
          Quantidade
        </Text>

        <Text style={styles.valor}>
          {doacao.quantidade}
        </Text>

        <Text style={styles.label}>
          Ponto de apoio
        </Text>

        <Text style={styles.valor}>
          {doacao.pontoNome}
        </Text>

        <Text style={styles.label}>
          Nome do doador
        </Text>

        <Text style={styles.valor}>
          {doacao.nomeDoador}
        </Text>

        <Text style={styles.label}>
          Observação
        </Text>

        <Text style={styles.valor}>
          {doacao.observacao ||
            'Nenhuma observação'}
        </Text>

        <Text style={styles.label}>
          Data da doação
        </Text>

        <Text style={styles.valor}>
          {dataFormatada}
        </Text>

      </View>

      <TouchableOpacity
        style={styles.botaoEditar}
        activeOpacity={0.85}
        onPress={() => {
          navigation.navigate(
            'Doacao',
            {
              doacao,
            }
          );
        }}
      >

        <Text style={styles.botaoEditarIcone}>
          ✏️
        </Text>

        <Text style={styles.textoBotaoEditar}>
          Editar doação
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        activeOpacity={0.85}
        onPress={handleExcluir}
      >

        <Text style={styles.botaoExcluirIcone}>
          🗑️
        </Text>

        <Text style={styles.textoBotaoExcluir}>
          Excluir doação
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F4F7F6',
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 18,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1B3A5C',
  },

  subtitulo: {
    fontSize: 13,
    color: '#7A8793',
    marginTop: 4,
  },

  imagemCard: {
    height: 210,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },

  imagem: {
    width: '100%',
    height: '100%',
  },

  imagemOverlay: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 15,
    backgroundColor: 'rgba(27,58,92,0.9)',
    borderRadius: 14,
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoriaIcone: {
    fontSize: 28,
    marginRight: 10,
  },

  categoriaLabel: {
    color: '#B9D8C0',
    fontSize: 9,
    fontWeight: '900',
  },

  categoriaNome: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 2,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 19,
  },

  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#98A2B3',
    marginTop: 13,
    marginBottom: 4,
    textTransform: 'uppercase',
  },

  valorGrande: {
    fontSize: 21,
    fontWeight: '900',
    color: '#1B3A5C',
  },

  valor: {
    fontSize: 16,
    color: '#1B3A5C',
    lineHeight: 22,
  },

  divisor: {
    height: 1,
    backgroundColor: '#EEF1F0',
    marginTop: 14,
  },

  botaoEditar: {
    backgroundColor: '#1B3A5C',
    borderRadius: 15,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },

  botaoEditarIcone: {
    fontSize: 16,
    marginRight: 8,
  },

  textoBotaoEditar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  botaoExcluir: {
    backgroundColor: '#FFF1F1',
    borderWidth: 1,
    borderColor: '#FFD5D5',
    borderRadius: 15,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  botaoExcluirIcone: {
    fontSize: 16,
    marginRight: 8,
  },

  textoBotaoExcluir: {
    color: '#C62828',
    fontSize: 16,
    fontWeight: '800',
  },
});