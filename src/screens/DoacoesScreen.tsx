import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';

import {
  buscarDoacoes,
  Doacao,
} from '../data/Doacao';

type Categoria = {
  nome: string;
  imagem: string;
  icone: keyof typeof Ionicons.glyphMap;
  cor: string;
  fundo: string;
};

const CATEGORIAS: Record<string, Categoria> = {
  alimentos: {
    nome: 'Alimentos',
    imagem:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80',
    icone: 'restaurant-outline',
    cor: '#4E9F3D',
    fundo: '#EAF6E7',
  },

  roupas: {
    nome: 'Roupas',
    imagem:
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=500&q=80',
    icone: 'shirt-outline',
    cor: '#F28B30',
    fundo: '#FFF1E5',
  },

  higiene: {
    nome: 'Higiene',
    imagem:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80',
    icone: 'water-outline',
    cor: '#3182CE',
    fundo: '#EAF4FC',
  },

  brinquedos: {
    nome: 'Brinquedos',
    imagem:
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=500&q=80',
    icone: 'game-controller-outline',
    cor: '#7C4DAB',
    fundo: '#F2EAF9',
  },

  acessorios: {
    nome: 'Acessórios',
    imagem:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80',
    icone: 'bag-handle-outline',
    cor: '#159A9C',
    fundo: '#E7F7F7',
  },

  outros: {
    nome: 'Outros',
    imagem:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80',
    icone: 'cube-outline',
    cor: '#667085',
    fundo: '#F0F2F4',
  },
};

function identificarCategoria(tipo: string): Categoria {
  const texto = tipo.toLowerCase().trim();

  if (
    texto.includes('alimento') ||
    texto.includes('comida') ||
    texto.includes('arroz') ||
    texto.includes('feijão') ||
    texto.includes('feijao') ||
    texto.includes('macarrão') ||
    texto.includes('macarrao') ||
    texto.includes('cesta') ||
    texto.includes('comida')
  ) {
    return CATEGORIAS.alimentos;
  }

  if (
    texto.includes('roupa') ||
    texto.includes('camisa') ||
    texto.includes('camiseta') ||
    texto.includes('calça') ||
    texto.includes('calca') ||
    texto.includes('vestido') ||
    texto.includes('agasalho') ||
    texto.includes('blusa')
  ) {
    return CATEGORIAS.roupas;
  }

  if (
    texto.includes('higiene') ||
    texto.includes('sabonete') ||
    texto.includes('shampoo') ||
    texto.includes('shampu') ||
    texto.includes('escova') ||
    texto.includes('pasta de dente') ||
    texto.includes('fralda') ||
    texto.includes('absorvente')
  ) {
    return CATEGORIAS.higiene;
  }

  if (
    texto.includes('brinquedo') ||
    texto.includes('boneca') ||
    texto.includes('boneco') ||
    texto.includes('carrinho') ||
    texto.includes('jogo') ||
    texto.includes('lego') ||
    texto.includes('pelúcia') ||
    texto.includes('pelucia')
  ) {
    return CATEGORIAS.brinquedos;
  }

  if (
    texto.includes('acessório') ||
    texto.includes('acessorio') ||
    texto.includes('mochila') ||
    texto.includes('bolsa') ||
    texto.includes('sapato') ||
    texto.includes('tênis') ||
    texto.includes('tenis') ||
    texto.includes('chinelo') ||
    texto.includes('cinto')
  ) {
    return CATEGORIAS.acessorios;
  }

  return CATEGORIAS.outros;
}

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

  const categoria = identificarCategoria(doacao.tipo);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.92}
      onPress={onPress}
    >

      <Image
        source={{ uri: categoria.imagem }}
        style={styles.imagemDoacao}
      />

      <View style={styles.conteudo}>

        <View style={styles.linhaTipo}>

          <View
            style={[
              styles.iconeCategoria,
              {
                backgroundColor: categoria.fundo,
              },
            ]}
          >
            <Ionicons
              name={categoria.icone}
              size={19}
              color={categoria.cor}
            />
          </View>

          <Text style={styles.tipo}>
            {categoria.nome}
          </Text>

        </View>

        <View style={styles.linhaInfo}>

          <Ionicons
            name="calendar-outline"
            size={15}
            color="#98A2B3"
          />

          <Text style={styles.info}>
            {dataFormatada}
          </Text>

        </View>

        <View style={styles.linhaInfo}>

          <Ionicons
            name="location-outline"
            size={15}
            color="#98A2B3"
          />

          <Text
            style={styles.info}
            numberOfLines={1}
          >
            {doacao.pontoNome}
          </Text>

        </View>

        <View style={styles.linhaInfo}>

          <Ionicons
            name="cube-outline"
            size={15}
            color="#98A2B3"
          />

          <Text style={styles.info}>
            Quantidade: {doacao.quantidade}
          </Text>

        </View>

      </View>

      <Ionicons
        name="chevron-forward"
        size={21}
        color="#98A2B3"
      />

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

  const doacoesFiltradas = doacoes.filter((doacao) =>
    doacao.tipo
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  const resumo = doacoes.reduce(
    (resultado, doacao) => {
      const categoria = identificarCategoria(
        doacao.tipo
      );

      const quantidade = Number(
        doacao.quantidade.replace(',', '.')
      );

      if (!Number.isFinite(quantidade)) {
        return resultado;
      }

      if (resultado[categoria.nome]) {
        resultado[categoria.nome].quantidade += quantidade;
      } else {
        resultado[categoria.nome] = {
          quantidade,
          categoria,
        };
      }

      return resultado;
    },
    {} as Record<
      string,
      {
        quantidade: number;
        categoria: Categoria;
      }
    >
  );

  const resumoOrdenado = Object.values(resumo).sort(
    (a, b) => b.quantidade - a.quantidade
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>

          <View style={styles.logoArea}>

            <View style={styles.logo}>
              <Ionicons
                name="heart"
                size={27}
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

          <Ionicons
            name="heart-circle-outline"
            size={30}
            color="#FFFFFF"
          />

        </View>

        {/* TÍTULO */}
        <View style={styles.tituloArea}>

          <Text style={styles.titulo}>
            Minhas doações
          </Text>

          <Text style={styles.subtitulo}>
            Cada gesto ajuda a transformar vidas
          </Text>

        </View>

        {doacoes.length === 0 ? (

          <View style={styles.vazio}>

            <View style={styles.iconeVazio}>
              <Ionicons
                name="heart-outline"
                size={48}
                color="#16834A"
              />
            </View>

            <Text style={styles.tituloVazio}>
              Nenhuma doação ainda
            </Text>

            <Text style={styles.textoVazio}>
              Registre sua primeira doação e faça
              parte dessa corrente do bem.
            </Text>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate('Pontos')}
            >
              <Ionicons
                name="heart-outline"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.textoBotao}>
                Fazer uma doação
              </Text>
            </TouchableOpacity>

          </View>

        ) : (

          <>

            {/* RESUMO */}
            <View style={styles.resumo}>

              <Text style={styles.tituloResumo}>
                Resumo das doações
              </Text>

              <FlatList
                horizontal
                data={resumoOrdenado}
                keyExtractor={(item) =>
                  item.categoria.nome
                }
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                  styles.resumoLista
                }
                renderItem={({ item }) => (

                  <View
                    style={[
                      styles.resumoItem,
                      {
                        backgroundColor:
                          item.categoria.fundo,
                      },
                    ]}
                  >

                    <View
                      style={[
                        styles.iconeResumo,
                        {
                          backgroundColor:
                            item.categoria.cor,
                        },
                      ]}
                    >

                      <Ionicons
                        name={item.categoria.icone}
                        size={21}
                        color="#FFFFFF"
                      />

                    </View>

                    <Text
                      style={[
                        styles.nomeResumo,
                        {
                          color:
                            item.categoria.cor,
                        },
                      ]}
                    >
                      {item.categoria.nome}
                    </Text>

                    <Text style={styles.quantidadeResumo}>
                      {item.quantidade}
                    </Text>

                    <Text style={styles.unidadesResumo}>
                      unidades
                    </Text>

                  </View>
                )}
              />

            </View>

            {/* BUSCA */}
            <View style={styles.buscaContainer}>

              <Ionicons
                name="search-outline"
                size={21}
                color="#667085"
              />

              <TextInput
                style={styles.inputBusca}
                placeholder="Buscar por tipo..."
                placeholderTextColor="#98A2B3"
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

            {/* LISTA */}
            {doacoesFiltradas.length === 0 ? (

              <View style={styles.vazioBusca}>

                <Ionicons
                  name="search-outline"
                  size={45}
                  color="#98A2B3"
                />

                <Text style={styles.textoVazio}>
                  Nenhuma doação encontrada para
                  "{busca}".
                </Text>

              </View>

            ) : (

              <FlatList
                data={doacoesFiltradas}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={
                  styles.lista
                }
                renderItem={({ item }) => (

                  <DoacaoItemMemo
                    doacao={item}
                    onPress={() =>
                      navigation.navigate(
                        'DetalheDoacao',
                        {
                          doacao: item,
                        }
                      )
                    }
                  />

                )}
              />

            )}

          </>

        )}

        {/* NAVEGAÇÃO */}
        <View style={styles.bottomNav}>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() =>
              navigation.navigate('Pontos')
            }
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
            onPress={() =>
              navigation.navigate('Pontos')
            }
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
            onPress={() =>
              navigation.navigate('Pontos')
            }
          >
            <Ionicons
              name="add"
              size={32}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
          >
            <Ionicons
              name="heart"
              size={23}
              color="#16834A"
            />

            <Text style={styles.navTextoAtivo}>
              Doações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
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
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.17)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },

  logoTitulo: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },

  logoSubtitulo: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 11,
    marginTop: 2,
  },

  tituloArea: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 15,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#123B32',
  },

  subtitulo: {
    color: '#667085',
    fontSize: 14,
    marginTop: 5,
  },

  resumo: {
    marginBottom: 16,
  },

  tituloResumo: {
    fontSize: 17,
    fontWeight: '800',
    color: '#123B32',
    marginHorizontal: 20,
    marginBottom: 11,
  },

  resumoLista: {
    paddingHorizontal: 20,
    gap: 10,
  },

  resumoItem: {
    width: 112,
    minHeight: 135,
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
  },

  iconeResumo: {
    width: 43,
    height: 43,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },

  nomeResumo: {
    fontSize: 11,
    fontWeight: '800',
  },

  quantidadeResumo: {
    fontSize: 21,
    fontWeight: '900',
    color: '#123B32',
    marginTop: 4,
  },

  unidadesResumo: {
    fontSize: 10,
    color: '#98A2B3',
  },

  buscaContainer: {
    marginHorizontal: 20,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8E5',
    paddingLeft: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  inputBusca: {
    flex: 1,
    marginLeft: 9,
    fontSize: 15,
    color: '#123B32',
  },

  botaoLimpar: {
    paddingHorizontal: 12,
    minHeight: 44,
    justifyContent: 'center',
  },

  textoLimpar: {
    color: '#16834A',
    fontWeight: '800',
    fontSize: 12,
  },

  lista: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 11,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#123B32',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },

  imagemDoacao: {
    width: 82,
    height: 102,
    borderRadius: 15,
  },

  conteudo: {
    flex: 1,
    marginLeft: 12,
  },

  linhaTipo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  iconeCategoria: {
    width: 34,
    height: 34,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  tipo: {
    fontSize: 16,
    fontWeight: '800',
    color: '#16483D',
  },

  linhaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  info: {
    flex: 1,
    marginLeft: 5,
    fontSize: 11,
    color: '#667085',
  },

  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingBottom: 70,
  },

  iconeVazio: {
    width: 92,
    height: 92,
    borderRadius: 32,
    backgroundColor: '#E8F7EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  tituloVazio: {
    fontSize: 21,
    fontWeight: '800',
    color: '#123B32',
    marginBottom: 8,
  },

  textoVazio: {
    fontSize: 14,
    lineHeight: 21,
    color: '#667085',
    textAlign: 'center',
    marginBottom: 22,
  },

  botao: {
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: '#16834A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  vazioBusca: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
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
    elevation: 7,
  },
});