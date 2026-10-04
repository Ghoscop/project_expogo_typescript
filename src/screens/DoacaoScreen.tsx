import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

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
    const quantidadeNumerica = Number(
      quantidade.replace(',', '.')
    );

    if (
      !nomeDoador.trim() ||
      !tipo.trim() ||
      !quantidade.trim()
    ) {
      Alert.alert(
        'Atenção',
        'Preencha seu nome, o tipo de doação e a quantidade.'
      );

      return;
    }

    if (
      !Number.isFinite(quantidadeNumerica) ||
      quantidadeNumerica <= 0
    ) {
      Alert.alert(
        'Atenção',
        'A quantidade deve ser um número maior que zero.'
      );

      return;
    }

    try {
      if (estaEditando) {
        const doacaoAtualizada: Doacao = {
          ...doacao,
          nomeDoador: nomeDoador.trim(),
          tipo: tipo.trim(),
          quantidade,
          observacao: observacao.trim(),
        };

        await atualizarDoacao(doacaoAtualizada);

        Alert.alert(
          'Doação atualizada!',
          'As alterações foram salvas com sucesso.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );

        return;
      }

      const novaDoacao: Doacao = {
        id: Date.now().toString(),
        pontoId: pontoId || '',
        pontoNome: pontoNome || '',
        nomeDoador: nomeDoador.trim(),
        tipo: tipo.trim(),
        quantidade,
        observacao: observacao.trim(),
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
            onPress: () => navigation.popToTop(),
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
    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <TouchableOpacity
            style={styles.voltar}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#123B32"
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitulo}>
              {estaEditando
                ? 'Editar doação'
                : 'Fazer doação'}
            </Text>

            <Text style={styles.headerSubtitulo}>
              Sua contribuição faz a diferença
            </Text>
          </View>

        </View>

        {/* PONTO */}
        <View style={styles.pontoCard}>

          <View style={styles.pontoIcone}>
            <Ionicons
              name="location"
              size={23}
              color="#16834A"
            />
          </View>

          <View style={styles.pontoInfo}>

            <Text style={styles.pontoLabel}>
              Ponto de apoio
            </Text>

            <Text style={styles.nomePonto}>
              {doacao?.pontoNome ||
                pontoNome ||
                'Ponto não informado'}
            </Text>

          </View>

        </View>

        {/* FORMULÁRIO */}
        <View style={styles.formulario}>

          <Text style={styles.secaoTitulo}>
            Informações da doação
          </Text>

          <Text style={styles.label}>
            Seu nome
          </Text>

          <View style={styles.inputContainer}>

            <Ionicons
              name="person-outline"
              size={20}
              color="#98A2B3"
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#98A2B3"
              value={nomeDoador}
              onChangeText={setNomeDoador}
            />

          </View>

          <Text style={styles.label}>
            O que você deseja doar?
          </Text>

          <View style={styles.inputContainer}>

            <Ionicons
              name="gift-outline"
              size={20}
              color="#98A2B3"
            />

            <TextInput
              style={styles.input}
              placeholder="Ex: roupas, alimentos..."
              placeholderTextColor="#98A2B3"
              value={tipo}
              onChangeText={setTipo}
            />

          </View>

          <Text style={styles.dica}>
            Você pode escrever livremente. O aplicativo
            identifica a categoria automaticamente.
          </Text>

          <Text style={styles.label}>
            Quantidade
          </Text>

          <View style={styles.inputContainer}>

            <Ionicons
              name="layers-outline"
              size={20}
              color="#98A2B3"
            />

            <TextInput
              style={styles.input}
              placeholder="Ex: 5"
              placeholderTextColor="#98A2B3"
              value={quantidade}
              onChangeText={(texto) => {
                const valor = texto.replace(
                  /[^0-9.,]/g,
                  ''
                );

                setQuantidade(valor);
              }}
              keyboardType="numeric"
            />

          </View>

          <Text style={styles.label}>
            Observação
          </Text>

          <View
            style={[
              styles.inputContainer,
              styles.observacaoContainer,
            ]}
          >

            <Ionicons
              name="chatbubble-outline"
              size={20}
              color="#98A2B3"
              style={styles.iconeObservacao}
            />

            <TextInput
              style={[
                styles.input,
                styles.textArea,
              ]}
              placeholder="Alguma informação adicional?"
              placeholderTextColor="#98A2B3"
              value={observacao}
              onChangeText={setObservacao}
              multiline
            />

          </View>

        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.botaoSalvar}
          activeOpacity={0.85}
          onPress={handleSalvarDoacao}
        >

          <Ionicons
            name={
              estaEditando
                ? 'checkmark-circle-outline'
                : 'heart-outline'
            }
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.textoBotao}>
            {estaEditando
              ? 'Salvar alterações'
              : 'Registrar doação'}
          </Text>

        </TouchableOpacity>

        <Text style={styles.rodape}>
          Obrigado por fazer parte dessa corrente do bem. ❤️
        </Text>

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
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  voltar: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  headerTitulo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#123B32',
  },

  headerSubtitulo: {
    fontSize: 12,
    color: '#667085',
    marginTop: 3,
  },

  pontoCard: {
    backgroundColor: '#E8F7EF',
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  pontoIcone: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  pontoInfo: {
    flex: 1,
  },

  pontoLabel: {
    color: '#16834A',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 3,
  },

  nomePonto: {
    color: '#123B32',
    fontSize: 15,
    fontWeight: '800',
  },

  formulario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
  },

  secaoTitulo: {
    fontSize: 18,
    color: '#123B32',
    fontWeight: '800',
    marginBottom: 4,
  },

  label: {
    fontSize: 13,
    color: '#344054',
    fontWeight: '700',
    marginTop: 17,
    marginBottom: 7,
  },

  inputContainer: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#E2E8E5',
    borderRadius: 15,
    backgroundColor: '#FAFCFB',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#123B32',
    paddingVertical: 12,
  },

  dica: {
    fontSize: 11,
    lineHeight: 16,
    color: '#98A2B3',
    marginTop: 7,
  },

  observacaoContainer: {
    alignItems: 'flex-start',
    minHeight: 110,
  },

  iconeObservacao: {
    marginTop: 13,
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  botaoSalvar: {
    height: 54,
    backgroundColor: '#16834A',
    borderRadius: 16,
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    elevation: 5,
    shadowColor: '#16834A',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  rodape: {
    textAlign: 'center',
    color: '#98A2B3',
    fontSize: 11,
    marginTop: 16,
  },
});