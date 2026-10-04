import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import {
  buscarDoacoes,
  Doacao,
} from '../data/Doacao';

function DoacaoItem({
  doacao,
  onPress,
}: {
  doacao: Doacao;
  onPress: () => void;
}) {
  const dataFormatada = new Date(
    doacao.data
  ).toLocaleDateString('pt-BR');

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.conteudo}>
        <Text style={styles.tipo}>
          {doacao.tipo}
        </Text>

        <Text style={styles.info}>
          Quantidade: {doacao.quantidade}
        </Text>

        <Text style={styles.info}>
          Ponto: {doacao.pontoNome}
        </Text>

        <Text style={styles.data}>
          Registrada em: {dataFormatada}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const DoacaoItemMemo = React.memo(DoacaoItem);

export default function DoacoesScreen({
  navigation,
}: any) {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [busca, setBusca] = useState('');

  async function carregarDoacoes() {
    const dados = await buscarDoacoes();
    setDoacoes(dados);
  }

  useFocusEffect(
    useCallback(() => {
      carregarDoacoes();
    }, [])
  );

  function irParaDoacao() {
    navigation.navigate('Pontos');
  }

  const doacoesFiltradas = doacoes.filter((doacao) =>
    doacao.tipo
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Minhas doações
      </Text>

      {doacoes.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.textoVazio}>
            Você ainda não possui nenhuma doação registrada.
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={irParaDoacao}
          >
            <Text style={styles.textoBotao}>
              Fazer uma doação
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.buscaContainer}>
            <TextInput
              style={styles.inputBusca}
              placeholder="Buscar por tipo..."
              value={busca}
              onChangeText={setBusca}
              returnKeyType="search"
            />

            {busca.length > 0 && (
              <TouchableOpacity
                style={styles.botaoLimpar}
                onPress={() => setBusca('')}
              >
                <Text style={styles.textoLimpar}>
                  Limpar
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {doacoesFiltradas.length === 0 ? (
            <View style={styles.vazioBusca}>
              <Text style={styles.textoVazio}>
                Nenhuma doação encontrada para "{busca}".
              </Text>
            </View>
          ) : (
            <FlatList
              data={doacoesFiltradas}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <DoacaoItemMemo
                  doacao={item}
                  onPress={() => {
                    navigation.navigate('DetalheDoacao', {
                      doacao: item,
                    });
                  }}
                />
              )}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1B3A5C',
    marginTop: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#1B3A5C',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  conteudo: {
    gap: 5,
  },

  tipo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1B3A5C',
    marginBottom: 3,
  },

  info: {
    fontSize: 14,
    color: '#667085',
  },

  data: {
    fontSize: 12,
    color: '#98A2B3',
    marginTop: 5,
  },

  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  textoVazio: {
    fontSize: 16,
    color: '#667085',
    textAlign: 'center',
    marginBottom: 20,
  },

  botao: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 25,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  inputBusca: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },

  botaoLimpar: {
    marginLeft: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  textoLimpar: {
    color: '#1B3A5C',
    fontWeight: '700',
  },

  vazioBusca: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});