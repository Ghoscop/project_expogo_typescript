import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';

import {
  buscarIdsFavoritos,
  alternarFavorito,
} from '../services/favoritosService';

import {
  buscarPagina,
  type Ponto,
} from '../services/pontosService';

const TAMANHO_PAGINA = 10;

export default function PontosScreen() {
  const navigation = useNavigation<any>();

  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [atualizacao, setAtualizacao] = useState(0);
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const paginaAtual = useRef(0);
  const requisicaoAtual = useRef(0);
  const carregandoMaisRef = useRef(false);
  const temMaisRef = useRef(false);
  const paginasSolicitadas = useRef(new Set<number>());

  useFocusEffect(
    React.useCallback(() => {
      let ativo = true;

      async function carregarFavoritos() {
        try {
          const ids = await buscarIdsFavoritos();

          if (ativo) {
            setFavoritos(ids);
          }
        } catch {
          if (ativo) {
            setFavoritos([]);
          }
        }
      }

      carregarFavoritos();

      return () => {
        ativo = false;
      };
    }, [])
  );

  async function controlarFavorito(id: string) {
    try {
      const favoritado = await alternarFavorito(id);

      setFavoritos((anteriores) =>
        favoritado
          ? [...anteriores.filter((item) => item !== id), id]
          : anteriores.filter((item) => item !== id)
      );
    } catch {
      setErro('Não foi possível atualizar os favoritos.');
    }
  }

  useEffect(() => {
    const identificador = ++requisicaoAtual.current;

    setPontos([]);
    setCarregando(true);
    setCarregandoMais(false);
    setErro(null);

    paginaAtual.current = 0;
    carregandoMaisRef.current = false;
    temMaisRef.current = false;
    paginasSolicitadas.current.clear();
    paginasSolicitadas.current.add(0);

    const temporizador = setTimeout(async () => {
      try {
        const resultado = await buscarPagina(
          0,
          TAMANHO_PAGINA,
          busca
        );

        if (identificador !== requisicaoAtual.current) {
          return;
        }

        setPontos(resultado.content);
        paginaAtual.current = resultado.page.number;

        temMaisRef.current =
          resultado.page.number + 1 < resultado.page.totalPages;
      } catch {
        if (identificador !== requisicaoAtual.current) {
          return;
        }

        setErro(
          'Não foi possível carregar os pontos. Verifique sua conexão e tente novamente.'
        );
      } finally {
        if (identificador === requisicaoAtual.current) {
          setCarregando(false);
        }
      }
    }, busca.trim() ? 350 : 0);

    return () => clearTimeout(temporizador);
  }, [busca, atualizacao]);

  async function carregarMais() {
    if (
      carregando ||
      carregandoMaisRef.current ||
      !temMaisRef.current
    ) {
      return;
    }

    const proximaPagina = paginaAtual.current + 1;

    if (paginasSolicitadas.current.has(proximaPagina)) {
      return;
    }

    paginasSolicitadas.current.add(proximaPagina);
    carregandoMaisRef.current = true;
    setCarregandoMais(true);
    setErro(null);

    const identificador = requisicaoAtual.current;

    try {
      const resultado = await buscarPagina(
        proximaPagina,
        TAMANHO_PAGINA,
        busca
      );

      if (identificador !== requisicaoAtual.current) {
        return;
      }

      setPontos((anteriores) => [
        ...anteriores,
        ...resultado.content,
      ]);

      paginaAtual.current = resultado.page.number;

      temMaisRef.current =
        resultado.page.number + 1 < resultado.page.totalPages;
    } catch {
      if (identificador === requisicaoAtual.current) {
        paginasSolicitadas.current.delete(proximaPagina);

        setErro(
          'Não foi possível carregar mais pontos. Tente novamente.'
        );
      }
    } finally {
      if (identificador === requisicaoAtual.current) {
        carregandoMaisRef.current = false;
        setCarregandoMais(false);
      }
    }
  }

  function tentarNovamente() {
    setAtualizacao((valor) => valor + 1);
  }

  function renderizarPonto({ item }: { item: Ponto }) {
    const estaFavoritado = favoritos.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.92}
        onPress={() =>
          navigation.navigate('Descricao', {
            pontoId: item.id,
          })
        }
      >
        {item.imagem ? (
          <Image
            source={{ uri: item.imagem }}
            style={styles.imagem}
          />
        ) : (
          <View style={[styles.imagem, styles.imagemVazia]}>
            <Ionicons
              name="image-outline"
              size={32}
              color="#98A2B3"
            />
          </View>
        )}

        <View style={styles.info}>
          <View style={styles.linhaTopo}>
            <View style={styles.status}>
              <View style={styles.statusPonto} />

              <Text style={styles.statusTexto}>
                {item.tipo || 'Ponto de apoio'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botaoFavorito}
              activeOpacity={0.7}
              onPress={() => controlarFavorito(item.id)}
            >
              <Ionicons
                name={estaFavoritado ? 'heart' : 'heart-outline'}
                size={23}
                color={estaFavoritado ? '#E5484D' : '#98A2B3'}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.nome} numberOfLines={2}>
            {item.nome}
          </Text>

          <View style={styles.linhaInfo}>
            <Ionicons
              name="location-outline"
              size={16}
              color="#667085"
            />

            <Text style={styles.endereco} numberOfLines={2}>
              {item.endereco}
            </Text>
          </View>

          <View style={styles.linhaInfo}>
            <Ionicons
              name="map-outline"
              size={16}
              color="#667085"
            />

            <Text style={styles.endereco} numberOfLines={1}>
              {item.bairro}
            </Text>
          </View>

          <View style={styles.linhaInfo}>
            <Ionicons
              name="time-outline"
              size={16}
              color="#667085"
            />

            <Text style={styles.horario}>
              {item.horario}
            </Text>
          </View>
        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#98A2B3"
          style={styles.seta}
        />
      </TouchableOpacity>
    );
  }

  function renderizarRodape() {
    if (carregandoMais) {
      return (
        <ActivityIndicator
          size="small"
          color="#16834A"
          style={styles.carregandoMais}
        />
      );
    }

    if (erro && pontos.length > 0) {
      return (
        <View style={styles.erroRodape}>
          <Text style={styles.textoErro}>{erro}</Text>

          <TouchableOpacity
            style={styles.botaoTentar}
            onPress={tentarNovamente}
          >
            <Text style={styles.textoBotaoTentar}>
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  }

  function renderizarListaVazia() {
    if (carregando) {
      return (
        <View style={styles.estadoVazio}>
          <ActivityIndicator size="large" color="#16834A" />

          <Text style={styles.textoEstado}>
            Carregando pontos...
          </Text>
        </View>
      );
    }

    if (erro) {
      return (
        <View style={styles.estadoVazio}>
          <Ionicons
            name="cloud-offline-outline"
            size={46}
            color="#98A2B3"
          />

          <Text style={styles.tituloErro}>
            Não foi possível carregar os pontos
          </Text>

          <Text style={styles.textoErro}>
            {erro}
          </Text>

          <TouchableOpacity
            style={styles.botaoTentar}
            onPress={tentarNovamente}
          >
            <Text style={styles.textoBotaoTentar}>
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.estadoVazio}>
        <Ionicons
          name="search-outline"
          size={46}
          color="#98A2B3"
        />

        <Text style={styles.tituloErro}>
          Nenhum ponto encontrado
        </Text>

        <Text style={styles.textoErro}>
          Tente pesquisar por outro nome ou região.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoArea}>
            <View style={styles.logo}>
              <Ionicons
                name="heart"
                size={28}
                color="#FFFFFF"
              />
            </View>

            <View>
              <Text style={styles.logoTitulo}>
                Mão Amiga
              </Text>

              <Text style={styles.logoSubtitulo}>
                Juntos fazemos mais
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.notificacao}
            activeOpacity={0.8}
          >
            <Ionicons
              name="notifications-outline"
              size={25}
              color="#FFFFFF"
            />

            <View style={styles.pontoNotificacao} />
          </TouchableOpacity>
        </View>

        <View style={styles.tituloArea}>
          <Text style={styles.titulo}>
            Pontos de Apoio
          </Text>

          <Text style={styles.subtitulo}>
            Encontre um ponto e faça a diferença
          </Text>
        </View>

        <View style={styles.buscaContainer}>
          <Ionicons
            name="search-outline"
            size={21}
            color="#667085"
          />

          <TextInput
            style={styles.inputBusca}
            placeholder="Buscar por nome ou região..."
            placeholderTextColor="#98A2B3"
            value={busca}
            onChangeText={setBusca}
            returnKeyType="search"
            autoCorrect={false}
          />

          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Ionicons
                name="close-circle"
                size={20}
                color="#98A2B3"
              />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={pontos}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lista}
          renderItem={renderizarPonto}
          ListEmptyComponent={renderizarListaVazia}
          ListFooterComponent={renderizarRodape}
          onEndReached={carregarMais}
          onEndReachedThreshold={0.5}
        />

        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Inicio')}
          >
            <Ionicons
              name="home-outline"
              size={23}
              color="#98A2B3"
            />

            <Text style={styles.navTexto}>
              Início
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Pontos')}
          >
            <Ionicons
              name="location"
              size={23}
              color="#16834A"
            />

            <Text style={styles.navTextoAtivo}>
              Pontos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCentral}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('FormularioPonto')}
          >
            <Ionicons
              name="add"
              size={32}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Doacoes')}
          >
            <Ionicons
              name="heart-outline"
              size={23}
              color="#98A2B3"
            />

            <Text style={styles.navTexto}>
              Doações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Perfil')}
          >
            <Ionicons
              name="person-outline"
              size={23}
              color="#98A2B3"
            />

            <Text style={styles.navTexto}>
              Perfil
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#075E46',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  logoTitulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },

  logoSubtitulo: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    marginTop: 2,
  },

  notificacao: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  pontoNotificacao: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5A5F',
  },

  tituloArea: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 16,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#123B32',
  },

  subtitulo: {
    fontSize: 14,
    color: '#667085',
    marginTop: 5,
  },

  buscaContainer: {
    height: 48,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EEEB',
  },

  inputBusca: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#16483D',
    paddingVertical: 0,
  },

  lista: {
    paddingHorizontal: 20,
    paddingBottom: 110,
    flexGrow: 1,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 14,
    flexDirection: 'row',
    shadowColor: '#123B32',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    minHeight: 145,
  },

  imagem: {
    width: 112,
    height: 145,
    borderRadius: 16,
  },

  imagemVazia: {
    backgroundColor: '#E8EEEB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    flex: 1,
    marginLeft: 13,
    paddingRight: 4,
  },

  linhaTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  status: {
    backgroundColor: '#E4F7EC',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusPonto: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#16834A',
    marginRight: 5,
  },

  statusTexto: {
    color: '#16834A',
    fontSize: 11,
    fontWeight: '800',
  },

  botaoFavorito: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginTop: -10,
    marginRight: -8,
  },

  nome: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '800',
    color: '#16483D',
    marginBottom: 7,
  },

  linhaInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },

  endereco: {
    flex: 1,
    marginLeft: 6,
    fontSize: 12,
    lineHeight: 16,
    color: '#667085',
  },

  horario: {
    flex: 1,
    marginLeft: 6,
    fontSize: 12,
    color: '#16834A',
    fontWeight: '700',
  },

  seta: {
    alignSelf: 'center',
  },

  estadoVazio: {
    flex: 1,
    minHeight: 220,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  tituloErro: {
    color: '#16483D',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
  },

  textoErro: {
    color: '#667085',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },

  textoEstado: {
    color: '#667085',
    fontSize: 14,
    marginTop: 12,
  },

  botaoTentar: {
    backgroundColor: '#16834A',
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 12,
    marginTop: 16,
  },

  textoBotaoTentar: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  carregandoMais: {
    paddingVertical: 18,
  },

  erroRodape: {
    alignItems: 'center',
    paddingVertical: 15,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EEEB',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  navItem: {
    width: 62,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navTexto: {
    fontSize: 10,
    color: '#98A2B3',
    marginTop: 3,
    fontWeight: '600',
  },

  navTextoAtivo: {
    fontSize: 10,
    color: '#16834A',
    marginTop: 3,
    fontWeight: '800',
  },

  botaoCentral: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#16834A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -28,
    shadowColor: '#16834A',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 7,
  },
});
