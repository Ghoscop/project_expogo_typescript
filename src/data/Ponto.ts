export type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  dias: string;
  horario: string;
  recebe: string;
  distribui: string;
  imagem: string;
};

export const pontos: Ponto[] = [
  {
    id: '1',
    nome: 'Casa da criança - Centro',
    endereco: 'Rua 4, nº 250, Setor Central, Goiânia - GO',
    dias: 'Segunda a sexta',
    horario: '08:00 às 17:00',
    recebe: 'Alimentos, roupas e produtos de higiene',
    distribui:
      'Alimentos, roupas, brinquedos, produtos de higiene e acessórios',
    imagem:
      'https://s2.glbimg.com/2f13BtoR1eBdIBkceWHediQyPCo=/1200x630/filters:max_age(3600)/s03.video.glbimg.com/deo/vi/66/21/3342166',
  },

  {
    id: '2',
    nome: 'Hope - Campinas',
    endereco: 'Avenida Anhanguera, nº 1850, Campinas, Goiânia - GO',
    dias: 'Terça e quinta',
    horario: '09:00 às 16:00',
    recebe: 'Alimentos, roupas e produtos de higiene',
    distribui:
      'Alimentos, roupas, brinquedos, produtos de higiene e acessórios',
    imagem:
      'https://hope.org.br/wp-content/uploads/2026/01/Visita-a-Casa-Hope-Fotos-de-Edson-Lopes-Jr.-SECOM-Prefeitura-de-Sao-Paulo-4.jpg',
  },

  {
    id: '3',
    nome: 'Sesan - Setor Oeste',
    endereco: 'Rua 15, nº 780, Setor Oeste, Goiânia - GO',
    dias: 'Segunda, quarta e sexta',
    horario: '08:30 às 17:30',
    recebe: 'Alimentos, roupas e produtos de higiene',
    distribui:
      'Alimentos, roupas, brinquedos, produtos de higiene e acessórios',
    imagem:
      'https://static.ndmais.com.br/2024/08/conta-de-agua-sesan.jpg',
  },

  {
    id: '4',
    nome: 'Ponto São Francisco - Jardim América',
    endereco: 'Avenida T-9, nº 1200, Jardim América, Goiânia - GO',
    dias: 'Segunda a sábado',
    horario: '09:00 às 18:00',
    recebe: 'Alimentos, roupas e produtos de higiene',
    distribui:
      'Alimentos, roupas, brinquedos, produtos de higiene e acessórios',
    imagem:
      'https://portalcorreio.com.br/portalcorreio/storage/2022/01/1eb654d0615a9474154e7fce87136a67.jpeg',
  },

  {
    id: '5',
    nome: 'Ponto Mão Amiga - Vila Nova',
    endereco: 'Rua 208, nº 420, Vila Nova, Goiânia - GO',
    dias: 'Quarta e sábado',
    horario: '08:00 às 14:00',
    recebe: 'Alimentos, roupas e produtos de higiene',
    distribui:
      'Alimentos, roupas, brinquedos, produtos de higiene e acessórios',
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkKLbXBGaAH97Z0Dv4U65WsqsJnacem3PjtNCpvX5IGrUvuRVyQw0Gv5M&s=10',
  },

  {
    id: '6',
    nome: 'Instituição da doação - Setor Bueno',
    endereco: 'Avenida T-4, nº 900, Setor Bueno, Goiânia - GO',
    dias: 'Terça a sexta',
    horario: '10:00 às 18:00',
    recebe: 'Alimentos, roupas e produtos de higiene',
    distribui:
      'Alimentos, roupas, brinquedos, produtos de higiene e acessórios',
    imagem:
      'https://doeagora.org.br/wp-content/uploads/2025/11/acoes_das_creches_Abrinq-115-scaled.jpg',
  },

  {
    id: '7',
    nome: 'Policia Militar - Jardim Novo Mundo',
    endereco: 'Avenida New York, nº 500, Jardim Novo Mundo, Goiânia - GO',
    dias: 'Segunda e quinta',
    horario: '08:00 às 16:00',
    recebe: 'Alimentos, roupas e produtos de higiene',
    distribui:
      'Alimentos, roupas, brinquedos, produtos de higiene e acessórios',
    imagem:
      'https://anoticiaonline.com.br/site/wp-content/uploads/2021/07/c2.jpg',
  },

  {
    id: '8',
    nome: 'Casa de apoio amor fraterno - Setor Leste',
    endereco: 'Rua 227, nº 310, Setor Leste Universitário, Goiânia - GO',
    dias: 'Sexta e sábado',
    horario: '09:00 às 15:00',
    recebe: 'Alimentos, roupas e produtos de higiene',
    distribui:
      'Alimentos, roupas, brinquedos, produtos de higiene e acessórios',
    imagem:
      'https://casaamorfraterno.org/wp-content/uploads/2023/10/foto-bazar-casa-de-apoio-amor-fraterno.jpg',
  },
];