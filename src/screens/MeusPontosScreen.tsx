import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
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
  removerFavorito,
} from '../services/favoritosService';

import {
  buscarPorId,
  type Ponto,
} from '../services/pontosService';

export default function MeusPontosScreen() {
  const navigation = useNavigation<any>();

  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  const carregarPontos = useCallback(async () => {
    let ativo = true;

    setCarregando(true);
    setErro(false);

    try {
      const ids = await buscarIdsFavoritos();

      if (!ativo) {
        return;
      }

      if (ids.length === 0) {
        setPontos([]);
        setCarregando(false);
        return;
      }

      const resultados = await Promise.allSettled(
        ids.map((id) => buscarPorId(id))
      );

      if (!ativo) {
        return;
      }

      const pontosEncontrados: Ponto[] = [];
      const idsInexistentes: string[] = [];
      let houveErroDeConsulta = false;

      resultados.forEach((resultado, indice) => {
        if (resultado.status === 'fulfilled') {
          pontosEncontrados.push(resultado.value);
          return;
        }

        const erroApi = resultado.reason as {
          status?: number;
        };

        if (erroApi?.status === 404) {
          idsInexistentes.push(ids[indice]);
        } else {
          houveErroDeConsulta = true;
        }
      });

      setPontos(pontosEncontrados);

      for (const id of idsInexistentes) {
        await removerFavorito(id);
      }

      if (houveErroDeConsulta && pontosEncontrados.length === 0) {
        setErro(true);
      }
    } catch {
      if (ativo) {
        setErro(true);
        setPontos([]);
      }
    } finally {
      if (ativo) {
        setCarregando(false);
      }
    }

    return () => {
      ativo = false;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      async function carregar() {
        setCarregando(true);
        setErro(false);

        try {
          const ids = await buscarIdsFavoritos();

          if (!ativo) {
            return;
          }

          if (ids.length === 0) {
            setPontos([]);
            setCarregando(false);
            return;
          }

          const resultados = await Promise.allSettled(
            ids.map((id) => buscarPorId(id))
          );

          if (!ativo) {
            return;
          }

          const encontrados: Ponto[] = [];
          const inexistentes: string[] = [];
          let falhaConsulta = false;

          resultados.forEach((resultado, indice) => {
            if (resultado.status === 'fulfilled') {
              encontrados.push(resultado.value);
            } else {
              const erroApi = resultado.reason as {
                status?: number;
              };

              if (erroApi?.status === 404) {
                inexistentes.push(ids[indice]);
              } else {
                falhaConsulta = true;
              }
            }
          });

          setPontos(encontrados);

          for (const id of inexistentes) {
            await removerFavorito(id);
          }

          if (falhaConsulta && encontrados.length === 0) {
            setErro(true);
          }
        } catch {
          if (ativo) {
            setErro(true);
            setPontos([]);
          }
        } finally {
          if (ativo) {
            setCarregando(false);
          }
        }
      }

      carregar();

      return () => {
        ativo = false;
      };
    }, [])
  );

  async function controlarFavorito(id: string) {
    try {
      await alternarFavorito(id);

      setPontos((anteriores) =>
        anteriores.filter((ponto) => ponto.id !== id)
      );
    } catch {
      setErro(true);
    }
  }

  function renderizarPonto({ item }: { item: Ponto }) {
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
                name="heart"
                size={23}
                color="#E5484D"
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

  function renderizarVazio() {
    if (carregando) {
      return (
        <View style={styles.estadoVazio}>
          <ActivityIndicator
            size="large"
            color="#16834A"
          />

          <Text style={styles.textoEstado}>
            Carregando seus pontos...
          </Text>
        </View>
      );
    }

    if (erro) {
      return (
        <View style={styles.estadoVazio}>
          <Ionicons
            name="cloud-offline-outline"
            size={48}
            color="#98A2B3"
          />

          <Text style={styles.tituloVazio}>
            Não foi possível carregar os pontos
          </Text>

          <Text style={styles.textoEstado}>
            Verifique sua conexão com a API e tente novamente.
          </Text>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.navigate('Pontos')}
          >
            <Text style={styles.textoBotao}>
              Voltar aos pontos
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.estadoVazio}>
        <Ionicons
          name="heart-outline"
          size={55}
          color="#98A2B3"
        />

        <Text style={styles.tituloVazio}>
          Você ainda não tem pontos favoritos
        </Text>

        <Text style={styles.textoEstado}>
          Acesse os pontos de apoio e toque no coração
          para salvar seus favoritos aqui.
        </Text>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('Pontos')}
        >
          <Text style={styles.textoBotao}>
            Explorar pontos
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botaoVoltarHeader}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.headerTexto}>
            <Text style={styles.tituloHeader}>
              Meus pontos
            </Text>

            <Text style={styles.subtituloHeader}>
              Seus pontos de apoio favoritos
            </Text>
          </View>

          <Ionicons
            name="heart"
            size={26}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.conteudo}>
          <Text style={styles.tituloSecao}>
            Pontos favoritos
          </Text>

          <Text style={styles.subtituloSecao}>
            Os locais que você salvou para encontrar facilmente.
          </Text>

          <FlatList
            data={pontos}
            keyExtractor={(item) => item.id}
            renderItem={renderizarPonto}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.lista}
            ListEmptyComponent={renderizarVazio}
          />
        </View>

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
              name="location-outline"
              size={23}
              color="#98A2B3"
            />

            <Text style={styles.navTexto}>
              Pontos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCentral}
            onPress={() => navigation.navigate('EscolherPonto')}
          >
            <Ionicons
              name="add"
              size={32}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
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
    paddingTop: 18,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },

  botaoVoltarHeader: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTexto: {
    flex: 1,
    marginLeft: 13,
  },

  tituloHeader: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '800',
  },

  subtituloHeader: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 3,
  },

  conteudo: {
    flex: 1,
    paddingTop: 22,
  },

  tituloSecao: {
    fontSize: 22,
    fontWeight: '800',
    color: '#123B32',
    marginHorizontal: 20,
  },

  subtituloSecao: {
    fontSize: 13,
    color: '#667085',
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 18,
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
    minHeight: 280,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  tituloVazio: {
    color: '#16483D',
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 14,
  },

  textoEstado: {
    color: '#667085',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
  },

  botaoVoltar: {
    backgroundColor: '#16834A',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 18,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
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

  botaoCentral: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#16834A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -28,
    elevation: 7,
  },
});
