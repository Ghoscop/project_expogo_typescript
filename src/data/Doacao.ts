import AsyncStorage from '@react-native-async-storage/async-storage';

export type Doacao = {
  id: string;
  pontoId: string;
  pontoNome: string;
  nomeDoador: string;
  tipo: string;
  quantidade: string;
  observacao: string;
  data: string;
};

const CHAVE_DOACOES = '@doacoes';

export async function buscarDoacoes(): Promise<Doacao[]> {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_DOACOES);

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  } catch (error) {
    console.log('ERRO AO BUSCAR DOAÇÕES:', error);
    return [];
  }
}

export async function salvarDoacao(doacao: Doacao): Promise<void> {
  try {
    const doacoes = await buscarDoacoes();

    doacoes.push(doacao);

    await AsyncStorage.setItem(
      CHAVE_DOACOES,
      JSON.stringify(doacoes)
    );
  } catch (error) {
    console.log('ERRO AO SALVAR DOAÇÃO:', error);
    throw error;
  }
}

export async function excluirDoacao(id: string): Promise<void> {
  try {
    const doacoes = await buscarDoacoes();

    const novasDoacoes = doacoes.filter(
      (doacao) => doacao.id !== id
    );

    await AsyncStorage.setItem(
      CHAVE_DOACOES,
      JSON.stringify(novasDoacoes)
    );
  } catch (error) {
    console.log('ERRO AO EXCLUIR DOAÇÃO:', error);
    throw error;
  }
}