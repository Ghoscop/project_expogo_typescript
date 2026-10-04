## Roteiro de demonstração

1. Abrir o aplicativo.
2. Acessar um ponto de apoio.
3. Registrar uma doação.
4. Acessar "Minhas doações".
5. Conferir o resumo por tipo.
6. Utilizar a busca por tipo.
7. Abrir uma doação.
8. Editar os dados.
9. Conferir a atualização no resumo.
10. Excluir a doação.
11. Confirmar que ela foi removida.
12. Fechar e abrir novamente o aplicativo.
13. Conferir a persistência dos dados.
14. Conferir a aba de perfil

## Decisão técnica

Foi feito com AsyncStorage para armazenar as doações localmente nos dispositivo. O armazenamento local permite manter o histórico das doações mesmo após o fechamento do aplicativo, sem necessidade de um servidor ou banco de dados externo.

## Ideias Futuras

1. Implementar criação de perfil
2. Fazer a parte de notificações funcionar
3. Criar Pontos caso tenha permissão ao invés de ser fixo
4. Fazer banco de dados Online
