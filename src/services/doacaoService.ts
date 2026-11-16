import { get, post, put, del } from './api';

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

export type DoacaoInput = {
  pontoId?: string;
  pontoNome: string;
  nomeDoador: string;
  tipo: string;
  quantidade: string;
  observacao: string;
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

export type PaginaDoacoes = {
  content: DoacaoResponse[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

const BASE_PATH = '/doacoes';

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

function converterRequest(doacao: DoacaoInput): DoacaoRequest {
  return {
    tipoItem: doacao.tipo.trim(),
    quantidade: Number(doacao.quantidade),
    pontoDestino: doacao.pontoNome,
    pontoId: doacao.pontoId,
    pontoNome: doacao.pontoNome,
    nomeDoador: doacao.nomeDoador.trim(),
    observacao: doacao.observacao.trim(),
  };
}

export async function buscarDoacoes(
  filtro = '',
  page = 0,
  size = 10
): Promise<{ content: Doacao[]; page: PaginaDoacoes['page'] }> {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort: 'criadoEm,desc',
  });

  if (filtro.trim()) {
    params.set('filtro', filtro.trim());
  }

  const resposta = await get<PaginaDoacoes>(
    `${BASE_PATH}/filtro?${params.toString()}`
  );

  return {
    content: resposta.content.map(converterDoacao),
    page: resposta.page,
  };
}

export async function buscarDoacaoPorId(id: string): Promise<Doacao> {
  const resposta = await get<DoacaoResponse>(`${BASE_PATH}/${id}`);
  return converterDoacao(resposta);
}

export async function salvarDoacao(
  doacao: DoacaoInput
): Promise<Doacao> {
  const resposta = await post<DoacaoResponse>(
    BASE_PATH,
    converterRequest(doacao)
  );

  return converterDoacao(resposta);
}

export async function atualizarDoacao(
  id: string,
  doacao: DoacaoInput
): Promise<Doacao> {
  const resposta = await put<DoacaoResponse>(
    `${BASE_PATH}/${id}`,
    converterRequest(doacao)
  );

  return converterDoacao(resposta);
}

export function excluirDoacao(id: string): Promise<void> {
  return del(`${BASE_PATH}/${id}`);
}
