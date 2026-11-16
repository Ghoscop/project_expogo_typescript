import { get, post, put, del } from './api';

export type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  bairro: string;
  horario: string;
  tipo: string;
  imagem: string | null;
};

export type PontoInput = {
  nome: string;
  endereco: string;
  bairro: string;
  horario: string;
  tipo: string;
  imagem?: string | null;
};

export type Pagina<T> = {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

const BASE_PATH = '/pontos';

export function listar(): Promise<Ponto[]> {
  return get<Ponto[]>(BASE_PATH);
}

export function buscarPagina(
  pagina = 0,
  tamanho = 10,
  filtro = ''
): Promise<Pagina<Ponto>> {
  const params = new URLSearchParams({
    page: String(pagina),
    size: String(tamanho),
    sort: 'nome,asc',
  });

  if (filtro.trim()) {
    params.set('filtro', filtro.trim());
  }

  return get<Pagina<Ponto>>(
    `${BASE_PATH}/filtro?${params.toString()}`
  );
}

export function buscarPorId(id: string): Promise<Ponto> {
  return get<Ponto>(`${BASE_PATH}/${id}`);
}

export function cadastrar(dados: PontoInput): Promise<Ponto> {
  return post<Ponto>(BASE_PATH, dados);
}

export function editar(
  id: string,
  dados: PontoInput
): Promise<Ponto> {
  return put<Ponto>(`${BASE_PATH}/${id}`, dados);
}

export function excluir(id: string): Promise<void> {
  return del(`${BASE_PATH}/${id}`);
}
