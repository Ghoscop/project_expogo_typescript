package com.instituto.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.instituto.api.entity.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PontoRepository extends JpaRepository<Ponto, UUID> {

    @Query("""
    SELECT p FROM Ponto p
    WHERE :filtro IS NULL
       OR TRIM(:filtro) = ''
       OR LOWER(p.nome) LIKE LOWER(CONCAT('%', :filtro, '%'))
       OR LOWER(p.bairro) LIKE LOWER(CONCAT('%', :filtro, '%'))
""")
Page<Ponto> buscarPorFiltro(
        @Param("filtro") String filtro,
        Pageable pageable
);

}
