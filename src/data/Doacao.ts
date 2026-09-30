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

const CHAVE_DOACOES =