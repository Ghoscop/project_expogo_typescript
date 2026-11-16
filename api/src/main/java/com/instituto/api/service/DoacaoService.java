package com.instituto.api.service;

import com.instituto.api.dto.DoacaoRequestDTO;
import com.instituto.api.dto.DoacaoResponseDTO;
import com.instituto.api.entity.Doacao;
import com.instituto.api.repository.DoacaoRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class DoacaoService {

    private final DoacaoRepository repository;

    public DoacaoService(DoacaoRepository repository) {
        this.repository = repository;
    }

    public DoacaoResponseDTO buscarPorId(UUID id) {
        Doacao doacao = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Doação não encontrada"
            ));

        return DoacaoResponseDTO.fromEntity(doacao);
    }

    public DoacaoResponseDTO cadastrar(DoacaoRequestDTO dto) {
        Doacao doacao = new Doacao();

        preencherDados(doacao, dto);
        doacao.setCriadoEm(LocalDateTime.now());

        Doacao salva = repository.save(doacao);

        return DoacaoResponseDTO.fromEntity(salva);
    }

    public Page<DoacaoResponseDTO> filtrar(
        String filtro,
        Pageable pageable
    ) {
        return repository.buscarPorFiltro(filtro, pageable)
            .map(DoacaoResponseDTO::fromEntity);
    }

    public DoacaoResponseDTO editar(UUID id, DoacaoRequestDTO dto) {
        Doacao doacao = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Doação não encontrada"
            ));

        preencherDados(doacao, dto);

        Doacao atualizada = repository.save(doacao);

        return DoacaoResponseDTO.fromEntity(atualizada);
    }

    public void excluir(UUID id) {
        Doacao doacao = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Doação não encontrada"
            ));

        repository.delete(doacao);
    }

    private void preencherDados(
        Doacao doacao,
        DoacaoRequestDTO dto
    ) {
        doacao.setTipoItem(dto.tipoItem());
        doacao.setQuantidade(dto.quantidade());
        doacao.setPontoDestino(dto.pontoDestino());
        doacao.setPontoId(dto.pontoId());
        doacao.setPontoNome(dto.pontoNome());
        doacao.setNomeDoador(dto.nomeDoador());
        doacao.setObservacao(dto.observacao());
    }
}
