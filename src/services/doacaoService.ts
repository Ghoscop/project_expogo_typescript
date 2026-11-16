import Constants from 'expo-constants';

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

type DoacaoRequest = {
  tipoItem: string;
  quantidade: number;
  pontoDestino: string;
  pontoId?: string;
  pontoNome?: string;
  nomeDoador?: string;
  observacao?: string;
};

type DoacaoResponse = {
  id: string;
  tipoItem: string;
  quantidade: number;
  pontoDestino: string;
  pontoId?: string;
  pontoNome?: string;
  nomeDoador?: string;
  observacao?: string;
  criadoEm: string;
};

type PaginaDoacoes = {
  content: DoacaoResponse[];
};

const HOST = Constants.expoConfig?.hostUri?.split(':')[0] || 'localhost';

const API_URL = `http://${HOST}:8080/api/v1/doacoes`;

function converterDoacao(dados: DoacaoResponse): Doacao {
  return {
    id: dados.id,
    pontoId: dados.pontoId || '',
    pontoNome: dados.pontoNome || dados.pontoDestino || '',
    nomeDoador: dados.nomeDoador || '',
    tipo: dados.tipoItem,
    quantidade: String(dados.quantidade),
    observacao: dados.observacao || '',
    data: dados.criadoEm,
  };
}

function converterRequest(doacao: Doacao): DoacaoRequest {
  return {
    tipoItem: doacao.tipo,
    quantidade: Number(doacao.quantidade),
    pontoDestino: doacao.pontoNome || 'Ponto não informado',
    pontoId: doacao.pontoId,
    pontoNome: doacao.pontoNome,
    nomeDoador: doacao.nomeDoador,
    observacao: doacao.observacao,
  };
}

async function verificarResposta(resposta: Response) {
  if (!resposta.ok) {
    const mensagem = await resposta.text();
    throw new Error(mensagem || 'Erro ao acessar a API de doações.');
  }
}

export async function buscarDoacoes(
  filtro = '',
  page = 0,
  size = 100
): Promise<Doacao[]> {
  const resposta = await fetch(
    `${API_URL}/filtro?filtro=${encodeURIComponent(filtro)}&page=${page}&size=${size}`
  );

  await verificarResposta(resposta);

  const dados: PaginaDoacoes = await resposta.json();

  return dados.content.map(converterDoacao);
}

export async function buscarDoacaoPorId(
  id: string
): Promise<Doacao> {
  const resposta = await fetch(`${API_URL}/${id}`);

  await verificarResposta(resposta);

  const dados: DoacaoResponse = await resposta.json();

  return converterDoacao(dados);
}

export async function salvarDoacao(
  doacao: Doacao
): Promise<Doacao> {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(converterRequest(doacao)),
  });

  await verificarResposta(resposta);

  const dados: DoacaoResponse = await resposta.json();

  return converterDoacao(dados);
}

export async function atualizarDoacao(
  doacao: Doacao
): Promise<Doacao> {
  const resposta = await fetch(`${API_URL}/${doacao.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(converterRequest(doacao)),
  });

  await verificarResposta(resposta);

  const dados: DoacaoResponse = await resposta.json();

  return converterDoacao(dados);
}

export async function excluirDoacao(
  id: string
): Promise<void> {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  await verificarResposta(resposta);
}
