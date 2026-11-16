package com.instituto.api.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "doacoes")
public class Doacao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String tipoItem;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false)
    private String pontoDestino;

    private String pontoId;

    private String pontoNome;

    private String nomeDoador;

    @Column(length = 1000)
    private String observacao;

    @Column(nullable = false, updatable = false)
    private LocalDateTime criadoEm;

    public Doacao() {
    }

    public Doacao(UUID id, String tipoItem, Integer quantidade,
                  String pontoDestino, String pontoId, String pontoNome,
                  String nomeDoador, String observacao,
                  LocalDateTime criadoEm) {
        this.id = id;
        this.tipoItem = tipoItem;
        this.quantidade = quantidade;
        this.pontoDestino = pontoDestino;
        this.pontoId = pontoId;
        this.pontoNome = pontoNome;
        this.nomeDoador = nomeDoador;
        this.observacao = observacao;
        this.criadoEm = criadoEm;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTipoItem() {
        return tipoItem;
    }

    public void setTipoItem(String tipoItem) {
        this.tipoItem = tipoItem;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getPontoDestino() {
        return pontoDestino;
    }

    public void setPontoDestino(String pontoDestino) {
        this.pontoDestino = pontoDestino;
    }

    public String getPontoId() {
        return pontoId;
    }

    public void setPontoId(String pontoId) {
        this.pontoId = pontoId;
    }

    public String getPontoNome() {
        return pontoNome;
    }

    public void setPontoNome(String pontoNome) {
        this.pontoNome = pontoNome;
    }

    public String getNomeDoador() {
        return nomeDoador;
    }

    public void setNomeDoador(String nomeDoador) {
        this.nomeDoador = nomeDoador;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }
}
