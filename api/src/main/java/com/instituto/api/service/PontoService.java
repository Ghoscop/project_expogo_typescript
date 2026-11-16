package com.instituto.api.service;

import com.instituto.api.dto.PontoRequestDTO;
import com.instituto.api.dto.PontoResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.instituto.api.entity.Ponto;
import com.instituto.api.repository.PontoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class PontoService {

    private final PontoRepository repository;

    public PontoService(PontoRepository repository) {
        this.repository = repository;
    }

    public List<PontoResponseDTO> listar() {
        return repository.findAll()
                .stream()
                .map(PontoResponseDTO::fromEntity)
                .toList();
    }

    public PontoResponseDTO buscarPorId(UUID id) {
        Ponto ponto = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ponto não encontrado"
                ));

        return PontoResponseDTO.fromEntity(ponto);
    }

    public PontoResponseDTO cadastrar(PontoRequestDTO dto) {
        Ponto ponto = new Ponto();

        preencherPonto(ponto, dto);

        return PontoResponseDTO.fromEntity(repository.save(ponto));
    }

public Page<PontoResponseDTO> filtrar(String filtro, Pageable pageable) {
    return repository.buscarPorFiltro(filtro, pageable)
            .map(PontoResponseDTO::fromEntity);
}

    public PontoResponseDTO editar(UUID id, PontoRequestDTO dto) {
        Ponto ponto = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ponto não encontrado"
                ));

        preencherPonto(ponto, dto);

        return PontoResponseDTO.fromEntity(repository.save(ponto));
    }

    public void excluir(UUID id) {
        Ponto ponto = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ponto não encontrado"
                ));

        repository.delete(ponto);
    }

    private void preencherPonto(Ponto ponto, PontoRequestDTO dto) {
        ponto.setNome(dto.nome());
        ponto.setEndereco(dto.endereco());
        ponto.setBairro(dto.bairro());
        ponto.setHorario(dto.horario());
        ponto.setTipo(dto.tipo());
        ponto.setImagem(dto.imagem());
    }
}
