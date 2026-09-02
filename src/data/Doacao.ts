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

const CHAVE_DOACOES = '@mao_amiga_doacoes';

export async function salvarDoacao(doacao: Doacao) {
  try {
    const dadosSalvos = await AsyncStorage.getItem(CHAVE_DOACOES);

    const doacoes: Doacao[] = dadosSalvos
      ? JSON.parse(dadosSalvos)
      : [];

    doacoes.push(doacao);

    await AsyncStorage.setItem(
      CHAVE_DOACOES,
      JSON.stringify(doacoes)
    );
  } catch (error) {
    console.log('Erro ao salvar doação:', error);
    throw error;
  }
}

export async function buscarDoacoes(): Promise<Doacao[]> {
  try {
    const dadosSalvos = await AsyncStorage.getItem(CHAVE_DOACOES);

    return dadosSalvos
      ? JSON.parse(dadosSalvos)
      : [];
  } catch (error) {
    console.log('Erro ao buscar doações:', error);
    return [];
  }
}

export async function excluirDoacao(id: string) {
  try {
    const dadosSalvos = await AsyncStorage.getItem(CHAVE_DOACOES);

    const doacoes: Doacao[] = dadosSalvos
      ? JSON.parse(dadosSalvos)
      : [];

    const novasDoacoes = doacoes.filter(
      (doacao) => doacao.id !== id
    );

    await AsyncStorage.setItem(
      CHAVE_DOACOES,
      JSON.stringify(novasDoacoes)
    );
  } catch (error) {
    console.log('Erro ao excluir doação:', error);
    throw error;
  }
}
