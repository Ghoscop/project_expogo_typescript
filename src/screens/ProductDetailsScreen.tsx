import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

export default function ProductDetailsScreen({ route }: any) {
  const { produto } = route.params;

  return (
    <View style={styles.container}>

      <Image
        source={produto.imagem}
        style={styles.imagem}
      />

      <Text style={styles.nome}>
        {produto.nome}
      </Text>

      <Text style={styles.preco}>
        R$ {produto.preco.toFixed(2).replace('.', ',')}
      </Text>

      <Text style={styles.estoque}>
        {produto.estoque} unidades disponíveis
      </Text>

      <View style={styles.caixaDescricao}>
        <Text style={styles.tituloDescricao}>
          Sobre o produto
        </Text>

        <Text style={styles.descricao}>
          Este produto está disponível para
          doação através do Instituto Mão Amiga.
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 20,
  },

  imagem: {
    width: '100%',
    height: 280,
    borderRadius: 20,
    marginTop: 10,
  },

  nome: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B3A5C',
    marginTop: 20,
  },

  preco: {
    fontSize: 23,
    fontWeight: '800',
    color: '#2E7D32',
    marginTop: 8,
  },

  estoque: {
    fontSize: 14,
    color: '#667085',
    marginTop: 8,
  },

  caixaDescricao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginTop: 25,
  },

  tituloDescricao: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B3A5C',
    marginBottom: 8,
  },

  descricao: {
    fontSize: 15,
    lineHeight: 23,
    color: '#475467',
  },
});