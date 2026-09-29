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

export async function listarDoacoes(): Promise<Doacao[]> {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_DOACOES);

    if (dados === null) {
      return [];
    }

    return JSON.parse(dados);
  } catch (error) {
    console.log('ERRO AO LISTAR:', error);
    throw error;
  }
}

export async function salvarDoacao(doacao: Doacao): Promise<void> {
  try {
    const doacoes = await listarDoacoes();

    const novasDoacoes = [...doacoes, doacao];

    await AsyncStorage.setItem(
      CHAVE_DOACOES,
      JSON.stringify(novasDoacoes)
    );

    console.log('DOAÇÃO SALVA:', novasDoacoes);
  } catch (error) {
    console.log('ERRO AO SALVAR:', error);
    throw error;
  }
}

export async function excluirDoacao(id: string): Promise<void> {
  try {
    const doacoes = await listarDoacoes();

    const novasDoacoes = doacoes.filter(
      (doacao) => doacao.id !== id
    );

    await AsyncStorage.setItem(
      CHAVE_DOACOES,
      JSON.stringify(novasDoacoes)
    );
  } catch (error) {
    console.log('ERRO AO EXCLUIR:', error);
    throw error;
  }
}

export async function atualizarDoacao(
  doacaoAtualizada: Doacao
): Promise<void> {
  try {
    const doacoes = await listarDoacoes();

    const novasDoacoes = doacoes.map((doacao) =>
      doacao.id === doacaoAtualizada.id
        ? doacaoAtualizada
        : doacao
    );

    await AsyncStorage.setItem(
      CHAVE_DOACOES,
      JSON.stringify(novasDoacoes)
    );
  } catch (error) {
    console.log('ERRO AO ATUALIZAR:', error);
    throw error;
  }
}