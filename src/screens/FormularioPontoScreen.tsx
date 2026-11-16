
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  buscarPorId,
  cadastrar,
  editar,
  type PontoInput,
} from '../services/pontosService';

export default function FormularioPontoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const pontoId: string | undefined = route.params?.pontoId;
  const modoEdicao = Boolean(pontoId);

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [horario, setHorario] = useState('');
  const [tipo, setTipo] = useState<'coleta' | 'distribuição'>('coleta');
  const [imagem, setImagem] = useState<string | null>(null);

  const [carregando, setCarregando] = useState(modoEdicao);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (pontoId) {
      carregarPonto();
    }
  }, [pontoId]);

  async function carregarPonto() {
    try {
      setCarregando(true);
      setErro('');

      const ponto = await buscarPorId(pontoId!);

      setNome(ponto.nome);
      setEndereco(ponto.endereco);
      setBairro(ponto.bairro);
      setHorario(ponto.horario);
      setTipo(ponto.tipo as 'coleta' | 'distribuição');
      setImagem(ponto.imagem);
    } catch {
      setErro('Não foi possível carregar os dados deste ponto.');
    } finally {
      setCarregando(false);
    }
  }

  async function salvarPonto() {
    if (
      !nome.trim() ||
      !endereco.trim() ||
      !bairro.trim() ||
      !horario.trim() ||
      !tipo.trim()
    ) {
      setErro('Preencha todos os campos antes de continuar.');
      return;
    }

    const urlImagem = imagem?.trim() || '';

    if (
      urlImagem &&
      !/^https?:\/\/.+/i.test(urlImagem)
    ) {
      setErro('Informe uma URL válida começando com http:// ou https://.');
      return;
    }

    const dados: PontoInput = {
      nome: nome.trim(),
      endereco: endereco.trim(),
      bairro: bairro.trim(),
      horario: horario.trim(),
      tipo,
      imagem: urlImagem || null,
    };

    try {
      setSalvando(true);
      setErro('');

      if (modoEdicao) {
        await editar(pontoId!, dados);
      } else {
        await cadastrar(dados);
      }

      Alert.alert(
        'Sucesso',
        modoEdicao
          ? 'Ponto atualizado com sucesso!'
          : 'Ponto cadastrado com sucesso!',
        [
          {
            text: 'Cadastrar outro',
            onPress: () => {
              if (modoEdicao) {
                navigation.goBack();
              } else {
                setNome('');
                setEndereco('');
                setBairro('');
                setHorario('');
                setTipo('coleta');
                setImagem(null);
                setErro('');
              }
            },
          },
          {
            text: 'Voltar para pontos',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      if (error?.status === 400) {
        setErro(
          error.message ||
          'A API recusou os dados. Confira as informações e tente novamente.'
        );
      } else {
        setErro(
          'Não foi possível salvar o ponto. Verifique sua conexão com a API e tente novamente.'
        );
      }
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.carregando}>
          <ActivityIndicator size="large" color="#16834A" />
          <Text style={styles.textoCarregando}>
            Carregando dados do ponto...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={23} color="#123B32" />
          </TouchableOpacity>

          <View style={styles.headerTexto}>
            <Text style={styles.titulo}>
              {modoEdicao ? 'Editar ponto' : 'Cadastrar ponto'}
            </Text>

            <Text style={styles.subtitulo}>
              {modoEdicao
                ? 'Atualize as informações do ponto'
                : 'Preencha os dados do novo ponto de apoio'}
            </Text>
          </View>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.label}>Nome do ponto</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do ponto"
            placeholderTextColor="#98A2B3"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o endereço"
            placeholderTextColor="#98A2B3"
            value={endereco}
            onChangeText={setEndereco}
          />

          <Text style={styles.label}>Bairro</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o bairro"
            placeholderTextColor="#98A2B3"
            value={bairro}
            onChangeText={setBairro}
          />

          <Text style={styles.label}>Horário</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Segunda a sexta, 8h às 17h"
            placeholderTextColor="#98A2B3"
            value={horario}
            onChangeText={setHorario}
          />

          <Text style={styles.label}>URL da imagem (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="https://exemplo.com/imagem.jpg"
            placeholderTextColor="#98A2B3"
            value={imagem || ''}
            onChangeText={setImagem}
            autoCapitalize="none"
            keyboardType="url"
            autoCorrect={false}
          />

          {imagem?.trim() ? (
            <Image
              source={{ uri: imagem.trim() }}
              style={styles.previewImagem}
              resizeMode="cover"
              onError={() => setErro('Não foi possível carregar a imagem desta URL.')}
            />
          ) : null}

          <Text style={styles.label}>Tipo de ponto</Text>

          <View style={styles.opcoesTipo}>
            <TouchableOpacity
              style={[
                styles.opcaoTipo,
                tipo === 'coleta' && styles.opcaoSelecionada,
              ]}
              activeOpacity={0.8}
              onPress={() => setTipo('coleta')}
            >
              <Ionicons
                name="archive-outline"
                size={21}
                color={tipo === 'coleta' ? '#FFFFFF' : '#16834A'}
              />
              <Text
                style={[
                  styles.textoOpcao,
                  tipo === 'coleta' && styles.textoOpcaoSelecionada,
                ]}
              >
                Coleta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.opcaoTipo,
                tipo === 'distribuição' && styles.opcaoSelecionada,
              ]}
              activeOpacity={0.8}
              onPress={() => setTipo('distribuição')}
            >
              <Ionicons
                name="gift-outline"
                size={21}
                color={tipo === 'distribuição' ? '#FFFFFF' : '#16834A'}
              />
              <Text
                style={[
                  styles.textoOpcao,
                  tipo === 'distribuição' && styles.textoOpcaoSelecionada,
                ]}
              >
                Distribuição
              </Text>
            </TouchableOpacity>
          </View>

          {!!erro && (
            <View style={styles.caixaErro}>
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color="#B42318"
              />
              <Text style={styles.textoErro}>{erro}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.botaoSalvar,
              salvando && styles.botaoDesabilitado,
            ]}
            activeOpacity={0.85}
            onPress={salvarPonto}
            disabled={salvando}
          >
            {salvando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons
                  name="save-outline"
                  size={21}
                  color="#FFFFFF"
                />
                <Text style={styles.textoBotao}>
                  {modoEdicao ? 'Salvar alterações' : 'Cadastrar ponto'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
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
    flexGrow: 1,
    paddingBottom: 35,
  },

  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EEEB',
  },

  botaoVoltar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F1F5F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  headerTexto: {
    flex: 1,
  },

  titulo: {
    fontSize: 21,
    fontWeight: '800',
    color: '#123B32',
  },

  subtitulo: {
    fontSize: 12,
    color: '#667085',
    marginTop: 4,
  },

  formulario: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16483D',
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    height: 49,
    borderWidth: 1,
    borderColor: '#E0E8E3',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#16483D',
    backgroundColor: '#FAFCFB',
  },

  previewImagem: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: '#E8EEEB',
  },

  opcoesTipo: {
    flexDirection: 'row',
    gap: 10,
  },

  opcaoTipo: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    borderColor: '#DCE8E0',
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: '#FFFFFF',
  },

  opcaoSelecionada: {
    backgroundColor: '#16834A',
    borderColor: '#16834A',
  },

  textoOpcao: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16834A',
  },

  textoOpcaoSelecionada: {
    color: '#FFFFFF',
  },

  caixaErro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3F2',
    borderRadius: 12,
    padding: 12,
    marginTop: 18,
    gap: 8,
  },

  textoErro: {
    flex: 1,
    color: '#B42318',
    fontSize: 13,
    lineHeight: 19,
  },

  botaoSalvar: {
    height: 54,
    borderRadius: 15,
    backgroundColor: '#16834A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
    marginTop: 25,
  },

  botaoDesabilitado: {
    opacity: 0.65,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoCarregando: {
    color: '#667085',
    marginTop: 12,
    fontSize: 14,
  },
});
