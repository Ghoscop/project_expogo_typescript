package com.instituto.api.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.instituto.api.entity.Ponto;
import com.instituto.api.repository.PontoRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner carregarPontos(PontoRepository repository) {
        return args -> {
            Set<String> nomesExistentes = new HashSet<>();

            repository.findAll().forEach(p ->
                    nomesExistentes.add(p.getNome())
            );

            List<Ponto> pontos = List.of(
                    criar(
                            "Casa da criança - Centro",
                            "Rua 4, nº 250, Setor Central, Goiânia - GO",
                            "Setor Central",
                            "Segunda a sexta",
                            "08:00 às 17:00",
                            "coleta",
                            "https://s2.glbimg.com/2f13BtoR1eBdIBkceWHediQyPCo=/1200x630/filters:max_age(3600)/s03.video.glbimg.com/deo/vi/66/21/3342166"
                    ),
                    criar(
                            "Hope - Campinas",
                            "Avenida Anhanguera, nº 1850, Campinas, Goiânia - GO",
                            "Campinas",
                            "Terça e quinta",
                            "09:00 às 16:00",
                            "coleta",
                            "https://hope.org.br/wp-content/uploads/2026/01/Visita-a-Casa-Hope-Fotos-de-Edson-Lopes-Jr.-SECOM-Prefeitura-de-Sao-Paulo-4.jpg"
                    ),
                    criar(
                            "Sesan - Setor Oeste",
                            "Rua 15, nº 780, Setor Oeste, Goiânia - GO",
                            "Setor Oeste",
                            "Segunda, quarta e sexta",
                            "08:30 às 17:30",
                            "coleta",
                            "https://static.ndmais.com.br/2024/08/conta-de-agua-sesan.jpg"
                    ),
                    criar(
                            "Ponto São Francisco - Jardim América",
                            "Avenida T-9, nº 1200, Jardim América, Goiânia - GO",
                            "Jardim América",
                            "Segunda a sábado",
                            "09:00 às 18:00",
                            "coleta",
                            "https://portalcorreio.com.br/portalcorreio/storage/2022/01/1eb654d0615a9474154e7fce87136a67.jpeg"
                    ),
                    criar(
                            "Ponto Mão Amiga - Vila Nova",
                            "Rua 208, nº 420, Vila Nova, Goiânia - GO",
                            "Vila Nova",
                            "Quarta e sábado",
                            "08:00 às 14:00",
                            "coleta",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkKLbXBGaAH97Z0Dv4U65WsqsJnacem3PjtNCpvX5IGrUvuRVyQw0Gv5M&s=10"
                    ),
                    criar(
                            "Instituição da doação - Setor Bueno",
                            "Avenida T-4, nº 900, Setor Bueno, Goiânia - GO",
                            "Setor Bueno",
                            "Terça a sexta",
                            "10:00 às 18:00",
                            "coleta",
                            "https://doeagora.org.br/wp-content/uploads/2025/11/acoes_das_creches_Abrinq-115-scaled.jpg"
                    ),
                    criar(
                            "Policia Militar - Jardim Novo Mundo",
                            "Avenida New York, nº 500, Jardim Novo Mundo, Goiânia - GO",
                            "Jardim Novo Mundo",
                            "Segunda e quinta",
                            "08:00 às 16:00",
                            "coleta",
                            "https://anoticiaonline.com.br/site/wp-content/uploads/2021/07/c2.jpg"
                    ),
                    criar(
                            "Casa de apoio amor fraterno - Setor Leste",
                            "Rua 227, nº 310, Setor Leste Universitário, Goiânia - GO",
                            "Setor Leste Universitário",
                            "Sexta e sábado",
                            "09:00 às 15:00",
                            "coleta",
                            "https://casaamorfraterno.org/wp-content/uploads/2023/10/foto-bazar-casa-de-apoio-amor-fraterno.jpg"
                    ),

                    criar("Ponto Solidário - Campinas", "Endereço demonstrativo, Campinas, Goiânia - GO", "Campinas", "Segunda a sexta", "08:00 às 17:00", "distribuição", null),
                    criar("Ponto Esperança - Setor Bueno", "Endereço demonstrativo, Setor Bueno, Goiânia - GO", "Setor Bueno", "Segunda a sexta", "08:00 às 17:00", "distribuição", null),
                    criar("Ponto Vida - Jardim América", "Endereço demonstrativo, Jardim América, Goiânia - GO", "Jardim América", "Segunda a sexta", "08:00 às 17:00", "distribuição", null),
                    criar("Ponto União - Vila Nova", "Endereço demonstrativo, Vila Nova, Goiânia - GO", "Vila Nova", "Segunda a sexta", "08:00 às 17:00", "distribuição", null),
                    criar("Ponto Cidadania - Setor Oeste", "Endereço demonstrativo, Setor Oeste, Goiânia - GO", "Setor Oeste", "Segunda a sexta", "08:00 às 17:00", "distribuição", null),
                    criar("Ponto Solidariedade - Setor Sul", "Endereço demonstrativo, Setor Sul, Goiânia - GO", "Setor Sul", "Segunda a sexta", "08:00 às 17:00", "coleta", null),
                    criar("Ponto Acolher - Jardim Goiás", "Endereço demonstrativo, Jardim Goiás, Goiânia - GO", "Jardim Goiás", "Segunda a sexta", "08:00 às 17:00", "distribuição", null),
                    criar("Ponto Fraterno - Setor Pedro Ludovico", "Endereço demonstrativo, Setor Pedro Ludovico, Goiânia - GO", "Setor Pedro Ludovico", "Segunda a sexta", "08:00 às 17:00", "coleta", null),
                    criar("Ponto Recomeço - Setor Leste Universitário", "Endereço demonstrativo, Setor Leste Universitário, Goiânia - GO", "Setor Leste Universitário", "Segunda a sexta", "08:00 às 17:00", "distribuição", null),
                    criar("Ponto do Bem - Parque Amazônia", "Endereço demonstrativo, Parque Amazônia, Goiânia - GO", "Parque Amazônia", "Segunda a sexta", "08:00 às 17:00", "coleta", null),
                    criar("Ponto Compartilhar - Setor Fama", "Endereço demonstrativo, Setor Fama, Goiânia - GO", "Setor Fama", "Segunda a sexta", "08:00 às 17:00", "distribuição", null),
                    criar("Ponto Generosidade - Novo Mundo", "Endereço demonstrativo, Novo Mundo, Goiânia - GO", "Novo Mundo", "Segunda a sexta", "08:00 às 17:00", "coleta", null),
                    criar("Ponto Amparo - Jardim Novo Mundo", "Endereço demonstrativo, Jardim Novo Mundo, Goiânia - GO", "Jardim Novo Mundo", "Segunda a sexta", "08:00 às 17:00", "distribuição", null),
                    criar("Ponto Caminhos - Setor Jaó", "Endereço demonstrativo, Setor Jaó, Goiânia - GO", "Setor Jaó", "Segunda a sexta", "08:00 às 17:00", "coleta", null),
                    criar("Ponto Solidário - Urias Magalhães", "Endereço demonstrativo, Urias Magalhães, Goiânia - GO", "Urias Magalhães", "Segunda a sexta", "08:00 às 17:00", "distribuição", null),
                    criar("Ponto Ação Social - Goiânia 2", "Endereço demonstrativo, Goiânia 2, Goiânia - GO", "Goiânia 2", "Segunda a sexta", "08:00 às 17:00", "coleta", null),
                    criar("Ponto Partilha - Setor Coimbra", "Endereço demonstrativo, Setor Coimbra, Goiânia - GO", "Setor Coimbra", "Segunda a sexta", "08:00 às 17:00", "distribuição", null)
            );

            List<Ponto> novosPontos = pontos.stream()
                    .filter(p -> !nomesExistentes.contains(p.getNome()))
                    .toList();

            repository.saveAll(novosPontos);
        };
    }

    private Ponto criar(
            String nome,
            String endereco,
            String bairro,
            String dias,
            String horario,
            String tipo,
            String imagem
    ) {
        Ponto ponto = new Ponto();

        ponto.setNome(nome);
        ponto.setEndereco(endereco);
        ponto.setBairro(bairro);
        ponto.setHorario(dias + " - " + horario);
        ponto.setTipo(tipo);
        ponto.setImagem(imagem);

        return ponto;
    }
}