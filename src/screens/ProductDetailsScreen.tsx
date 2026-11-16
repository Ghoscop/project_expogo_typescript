
import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import {
  buscarPorId,
  excluir,
  type Ponto,
} from '../services/pontosService';

export default function ProductDetailsScreen({ route }: any) {
  const navigation = useNavigation<any>();
  const pontoId: string | undefined = route.params?.pontoId;

  const [ponto, setPonto] = useState<Ponto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState('');

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      async function carregarPonto() {
        if (!pontoId) {
          setErro('Identificador do ponto não encontrado.');
          setCarregando(false);
          return;
        }

        try {
          setCarregando(true);
          setErro('');

          const resultado = await buscarPorId(pontoId);

          if (ativo) {
            setPonto(resultado);
          }
        } catch {
          if (ativo) {
            setErro('Não foi possível carregar os dados deste ponto.');
          }
        } finally {
          if (ativo) {
            setCarregando(false);
          }
        }
      }

      carregarPonto();

      return () => {
        ativo = false;
      };
    }, [pontoId])
  );

  function confirmarExclusao() {
    if (!ponto) return;

    Alert.alert(
      'Excluir ponto',
      `Tem certeza que deseja excluir "${ponto.nome}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: realizarExclusao,
        },
      ]
    );
  }

  async function realizarExclusao() {
    if (!ponto) return;

    try {
      setExcluindo(true);
      setErro('');

      await excluir(ponto.id);

      Alert.alert(
        'Sucesso',
        'Ponto excluído com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      setErro(
        error?.message ||
        'Não foi possível excluir o ponto. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setExcluindo(false);
    }
  }

  if (carregando) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.estado}>
          <ActivityIndicator size="large" color="#16834A" />
          <Text style={styles.textoEstado}>Carregando ponto...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!ponto) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.estado}>
          <Ionicons
            name="alert-circle-outline"
            size={45}
            color="#B42318"
          />
          <Text style={styles.tituloErro}>Ponto não encontrado</Text>
          <Text style={styles.textoErro}>{erro}</Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textoBotao}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imagemContainer}>
          {ponto.imagem ? (
            <Image
              source={{ uri: ponto.imagem }}
              style={styles.imagem}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.imagem, styles.imagemVazia]}>
              <Ionicons name="image-outline" size={55} color="#98A2B3" />
              <Text style={styles.textoImagem}>Sem imagem cadastrada</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={23} color="#123B32" />
          </TouchableOpacity>
        </View>

        <View style={styles.cabecalho}>
          <View style={styles.status}>
            <View style={styles.statusPonto} />
            <Text style={styles.statusTexto}>
              Ponto de {ponto.tipo}
            </Text>
          </View>

          <Text style={styles.nome}>{ponto.nome}</Text>

          <View style={styles.linhaEndereco}>
            <Ionicons
              name="location-outline"
              size={20}
              color="#16834A"
            />
            <Text style={styles.endereco}>{ponto.endereco}</Text>
          </View>
        </View>

        <View style={styles.infoPrincipal}>
          <View style={styles.infoItem}>
            <Ionicons
              name="map-outline"
              size={22}
              color="#16834A"
            />
            <View style={styles.infoTexto}>
              <Text style={styles.labelInfo}>Bairro</Text>
              <Text style={styles.valorInfo}>{ponto.bairro}</Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.infoItem}>
            <Ionicons
              name="time-outline"
              size={22}
              color="#16834A"
            />
            <View style={styles.infoTexto}>
              <Text style={styles.labelInfo}>Horário</Text>
              <Text style={styles.valorInfo}>{ponto.horario}</Text>
            </View>
          </View>
        </View>

        {!!erro && (
          <View style={styles.caixaErro}>
            <Text style={styles.textoErro}>{erro}</Text>
          </View>
        )}

        <View style={styles.acoes}>
          <TouchableOpacity
            style={styles.botaoEditar}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('FormularioPonto', {
                pontoId: ponto.id,
              })
            }
          >
            <Ionicons name="create-outline" size={21} color="#FFFFFF" />
            <Text style={styles.textoBotao}>Editar ponto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.botaoExcluir,
              excluindo && styles.botaoDesabilitado,
            ]}
            activeOpacity={0.85}
            disabled={excluindo}
            onPress={confirmarExclusao}
          >
            {excluindo ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons
                  name="trash-outline"
                  size={21}
                  color="#FFFFFF"
                />
                <Text style={styles.textoBotao}>Excluir ponto</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.botaoDoacao}
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
          <Text style={styles.textoBotao}>Fazer doação</Text>
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
  imagemVazia: {
    backgroundColor: '#E8EEEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoImagem: {
    color: '#667085',
    fontSize: 13,
    marginTop: 8,
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
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTexto: {
    marginLeft: 12,
    flex: 1,
  },
  labelInfo: {
    fontSize: 11,
    color: '#98A2B3',
    fontWeight: '600',
  },
  valorInfo: {
    fontSize: 14,
    color: '#123B32',
    fontWeight: '700',
    marginTop: 3,
  },
  divisor: {
    height: 1,
    backgroundColor: '#E8EEEB',
  },
  acoes: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
  },
  botaoEditar: {
    flex: 1,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#16834A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
  botaoExcluir: {
    flex: 1,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#B42318',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoDoacao: {
    marginHorizontal: 20,
    marginTop: 14,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#246BCE',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  caixaErro: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#FEF3F2',
    borderRadius: 12,
    padding: 12,
  },
  estado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  textoEstado: {
    color: '#667085',
    marginTop: 12,
  },
  tituloErro: {
    color: '#123B32',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 12,
  },
  textoErro: {
    color: '#B42318',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
  botao: {
    backgroundColor: '#16834A',
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 18,
  },
});
