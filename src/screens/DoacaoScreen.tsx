import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import { salvarDoacao } from '../data/Doacao';

export default function DoacaoScreen({ route, navigation }: any) {
  const { pontoId, pontoNome } = route.params || {};

  const [nomeDoador, setNomeDoador] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [observacao, setObservacao] = useState('');

  async function handleSalvarDoacao() {
    if (!nomeDoador || !tipo || !quantidade) {
      Alert.alert(
        'Atenção',
        'Preencha seu nome, o tipo de doação e a quantidade.'
      );
      return;
    }

    const novaDoacao = {
      id: Date.now().toString(),
      pontoId: pontoId || '',
      pontoNome: pontoNome || '',
      nomeDoador,
      tipo,
      quantidade,
      observacao,
      data: new Date().toISOString(),
    };

    try {
      await salvarDoacao(novaDoacao);

      Alert.alert(
        'Doação registrada!',
        'Sua doação foi salva com sucesso.',
        [
          {
            text: 'Fazer outra',
            onPress: () => {
              setNomeDoador('');
              setTipo('');
              setQuantidade('');
              setObservacao('');
            },
          },
          {
            text: 'Finalizar',
            onPress: () => {
              navigation.popToTop();
            },
          },
        ]
      );
    } catch (error) {
      console.log('ERRO AO SALVAR:', error);

      Alert.alert(
        'Erro',
        'Não foi possível salvar a doação.'
      );
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        Fazer doação
      </Text>

      <Text style={styles.ponto}>
        Ponto de apoio:
      </Text>

      <Text style={styles.nomePonto}>
        {pontoNome || 'Ponto não informado'}
      </Text>

      <Text style={styles.label}>
        Seu nome
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nomeDoador}
        onChangeText={setNomeDoador}
      />

      <Text style={styles.label}>
        Tipo de doação
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Alimentos, roupas..."
        value={tipo}
        onChangeText={setTipo}
      />

      <Text style={styles.label}>
        Quantidade
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 5 kg, 3 peças..."
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Text style={styles.label}>
        Observação
      </Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Alguma informação adicional?"
        value={observacao}
        onChangeText={setObservacao}
        multiline
      />

      <Button
        title="Salvar doação"
        onPress={handleSalvarDoacao}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  ponto: {
    fontSize: 14,
    color: '#666',
  },

  nomePonto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
});
