export type CategoriaDoacao =
  | 'Roupas'
  | 'Alimentos'
  | 'Brinquedos'
  | 'Higiene'
  | 'Acessórios'
  | 'Outros';

type CategoriaInfo = {
  nome: CategoriaDoacao;
  icone: string;
  imagem: string;
};

export const categoriasDoacao: Record<
  CategoriaDoacao,
  CategoriaInfo
> = {
  Roupas: {
  nome: 'Roupas',
  icone: '👕',
  imagem:
    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80',
},

Alimentos: {
  nome: 'Alimentos',
  icone: '🍎',
  imagem:
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
},

Brinquedos: {
  nome: 'Brinquedos',
  icone: '🧸',
  imagem:
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
},

Higiene: {
  nome: 'Higiene',
  icone: '🧴',
  imagem:
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
},

Acessórios: {
  nome: 'Acessórios',
  icone: '👜',
  imagem:
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
},

Outros: {
  nome: 'Outros',
  icone: '📦',
  imagem:
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
},
};

export function identificarCategoria(
  tipo: string
): CategoriaDoacao {
  const texto = tipo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (
    texto.includes('roupa') ||
    texto.includes('camisa') ||
    texto.includes('camiseta') ||
    texto.includes('calca') ||
    texto.includes('vestido') ||
    texto.includes('casaco') ||
    texto.includes('agasalho') ||
    texto.includes('sapato') ||
    texto.includes('tenis') ||
    texto.includes('calcado')
  ) {
    return 'Roupas';
  }

  if (
    texto.includes('alimento') ||
    texto.includes('comida') ||
    texto.includes('arroz') ||
    texto.includes('feijao') ||
    texto.includes('macarrao') ||
    texto.includes('leite') ||
    texto.includes('cesta') ||
    texto.includes('comida')
  ) {
    return 'Alimentos';
  }

  if (
    texto.includes('brinquedo') ||
    texto.includes('boneca') ||
    texto.includes('boneco') ||
    texto.includes('jogo') ||
    texto.includes('pelucia') ||
    texto.includes('carrinho')
  ) {
    return 'Brinquedos';
  }

  if (
    texto.includes('higiene') ||
    texto.includes('sabonete') ||
    texto.includes('shampoo') ||
    texto.includes('xampu') ||
    texto.includes('escova') ||
    texto.includes('pasta de dente') ||
    texto.includes('fralda') ||
    texto.includes('absorvente')||
    texto.includes('condicionador')
  ) {
    return 'Higiene';
  }

  if (
    texto.includes('acessórios') ||
    texto.includes('acessorios') ||
    texto.includes('acessorio') ||
    texto.includes('bolsa') ||
    texto.includes('mochila') ||
    texto.includes('oculos') ||
    texto.includes('óculos') ||
    texto.includes('relogio') ||
    texto.includes('cinto') ||
    texto.includes('brinco') ||
    texto.includes('colar')
  ) {
    return 'Acessórios';
  }

  return 'Outros';
}

export function obterCategoriaInfo(tipo: string) {
  const categoria = identificarCategoria(tipo);

  return categoriasDoacao[categoria];
}