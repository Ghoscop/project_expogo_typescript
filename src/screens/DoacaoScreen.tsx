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

import {
  salvarDoacao,
  atualizarDoacao,
  Doacao,
} from '../data/Doacao';

export default function DoacaoScreen({
  route,
  navigation,
}: any) {
  const params = route.params || {};

  const {
    pontoId = '',
    pontoNome = '',
    doacao,
  } = params;

  const estaEditando = !!doacao;

  const [nomeDoador, setNomeDoador] = useState(
    doacao?.nomeDoador || ''
  );

  const [tipo, setTipo] = useState(
    doacao?.tipo || ''
  );

  const [quantidade, setQuantidade] = useState(
    doacao?.quantidade || ''
  );

  const [observacao, setObservacao] = useState(
    doacao?.observacao || ''
  );

  async function handleSalvarDoacao() {
    if (!nomeDoador || !tipo || !quantidade) {
      Alert.alert(
        'Atenção',
        'Preencha seu nome, o tipo de doação e a quantidade.'
      );
      return;
    }

    try {
      if (estaEditando) {
        const doacaoAtualizada: Doacao = {
          ...doacao,
          nomeDoador,
          tipo,
          quantidade,
          observacao,
        };

        await atualizarDoacao(doacaoAtualizada);

        Alert.alert(
          'Doação atualizada!',
          'As alterações foram salvas com sucesso.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]
        );

        return;
      }

      const novaDoacao: Doacao = {
        id: Date.now().toString(),
        pontoId: pontoId || '',
        pontoNome: pontoNome || '',
        nomeDoador,
        tipo,
        quantidade,
        observacao,
        data: new Date().toISOString(),
      };

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
        estaEditando
          ? 'Não foi possível atualizar a doação.'
          : 'Não foi possível salvar a doação.'
      );
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        {estaEditando
          ? 'Editar doação'
          : 'Fazer doação'}
      </Text>

      <Text style={styles.ponto}>
        Ponto de apoio:
      </Text>

      <Text style={styles.nomePonto}>
        {doacao?.pontoNome ||
          pontoNome ||
          'Ponto não informado'}
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
        title={
          estaEditando
            ? 'Salvar alterações'
            : 'Salvar doação'
        }
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