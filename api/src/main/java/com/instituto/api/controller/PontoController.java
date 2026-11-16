package com.instituto.api.controller;

import com.instituto.api.dto.PontoResponseDTO;
import org.springframework.http.ResponseEntity;
import com.instituto.api.dto.PontoRequestDTO;
import com.instituto.api.service.PontoService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.RequestParam;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/pontos")
@CrossOrigin(origins = "*")
public class PontoController {

    private final PontoService service;

    public PontoController(PontoService service) {
        this.service = service;
    }

    @GetMapping
    public List<PontoResponseDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public PontoResponseDTO buscarPorId(@PathVariable UUID id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PontoResponseDTO cadastrar(
            @Valid @RequestBody PontoRequestDTO dto) {
        return service.cadastrar(dto);
    }

    @PutMapping("/{id}")
    public PontoResponseDTO editar(
            @PathVariable UUID id,
            @Valid @RequestBody PontoRequestDTO dto) {
        return service.editar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable UUID id) {
        service.excluir(id);
    }

    @GetMapping("/filtro")
    public ResponseEntity<Page<PontoResponseDTO>> filtrar(
            @RequestParam(required = false) String filtro,
            @PageableDefault(
                    size = 10,
                    sort = "nome",
                    direction = Sort.Direction.ASC
            ) Pageable pageable
    ) {
        return ResponseEntity.ok(service.filtrar(filtro, pageable));
    }
}
