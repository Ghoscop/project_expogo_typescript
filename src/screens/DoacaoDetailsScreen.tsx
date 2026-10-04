import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { excluirDoacao } from '../data/Doacao';

export default function DetalheDoacaoScreen({
  route,
  navigation,
}: any) {
  const { doacao } = route.params;

  const dataFormatada = new Date(
    doacao.data
  ).toLocaleString('pt-BR');

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
              await excluirDoacao(doacao.id);

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
    >
      <Text style={styles.titulo}>
        Detalhes da doação
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Tipo de doação
        </Text>

        <Text style={styles.valor}>
          {doacao.tipo}
        </Text>

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
          {doacao.observacao || 'Nenhuma observação'}
        </Text>

        <Text style={styles.label}>
          Data da doação
        </Text>

        <Text style={styles.valor}>
          {dataFormatada}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={handleExcluir}
      >
        <Text style={styles.textoBotao}>
          Excluir doação
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B3A5C',
    marginTop: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#667085',
    marginTop: 12,
    marginBottom: 4,
  },

  valor: {
    fontSize: 17,
    color: '#1B3A5C',
  },

  botaoExcluir: {
    backgroundColor: '#C62828',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});