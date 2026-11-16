package com.instituto.api.dto;

import com.instituto.api.entity.Doacao;

import java.time.LocalDateTime;
import java.util.UUID;

public record DoacaoResponseDTO(
    UUID id,
    String tipoItem,
    Integer quantidade,
    String pontoDestino,
    String pontoId,
    String pontoNome,
    String nomeDoador,
    String observacao,
    LocalDateTime criadoEm
) {

    public static DoacaoResponseDTO fromEntity(Doacao doacao) {
        return new DoacaoResponseDTO(
            doacao.getId(),
            doacao.getTipoItem(),
            doacao.getQuantidade(),
            doacao.getPontoDestino(),
            doacao.getPontoId(),
            doacao.getPontoNome(),
            doacao.getNomeDoador(),
            doacao.getObservacao(),
            doacao.getCriadoEm()
        );
    }
}
