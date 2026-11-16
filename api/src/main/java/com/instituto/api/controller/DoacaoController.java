package com.instituto.api.controller;

import com.instituto.api.dto.DoacaoRequestDTO;
import com.instituto.api.dto.DoacaoResponseDTO;
import com.instituto.api.service.DoacaoService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doacoes")
@CrossOrigin(origins = "*")
public class DoacaoController {

    private final DoacaoService service;

    public DoacaoController(DoacaoService service) {
        this.service = service;
    }

    @GetMapping("/filtro")
    public Page<DoacaoResponseDTO> filtrar(
        @RequestParam(required = false) String filtro,
        @PageableDefault(
            size = 10,
            sort = "criadoEm",
            direction = Sort.Direction.DESC
        ) Pageable pageable
    ) {
        return service.filtrar(filtro, pageable);
    }

    @GetMapping("/{id}")
    public DoacaoResponseDTO buscarPorId(@PathVariable UUID id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DoacaoResponseDTO cadastrar(
        @Valid @RequestBody DoacaoRequestDTO dto
    ) {
        return service.cadastrar(dto);
    }

    @PutMapping("/{id}")
    public DoacaoResponseDTO editar(
        @PathVariable UUID id,
        @Valid @RequestBody DoacaoRequestDTO dto
    ) {
        return service.editar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable UUID id) {
        service.excluir(id);
    }
}
