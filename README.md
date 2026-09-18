# Central de Atendimento — Contabilidade

Sistema interno de atendimento e operações para escritório contábil.

## Fluxo principal

WhatsApp → Bot → Ticket → Departamento → Atendente → Conversa → Resolução → Histórico

## Objetivo

Centralizar os atendimentos recebidos pelo WhatsApp em uma aplicação web com usuários, departamentos, tickets, filas, conversas, histórico e permissões.

## Stack inicial

- Next.js + TypeScript
- PostgreSQL / Supabase
- Supabase Auth
- Supabase Realtime
- Tailwind CSS
- GitHub
- WhatsApp Business Platform (integração oficial)

## Princípios do projeto

1. WhatsApp é o canal central de entrada e atendimento.
2. A regra de negócio deve ficar separada da integração específica do WhatsApp.
3. O sistema deve ser simples de operar e evoluir por etapas.
4. Histórico e auditoria são parte do núcleo do sistema.
5. Recursos avançados ficam fora do MVP até que a operação básica esteja validada.

## Próximos marcos

1. Arquitetura e estrutura inicial
2. Banco de dados e autenticação
3. Usuários, departamentos e permissões
4. Clientes e empresas
5. Tickets
6. Central de atendimento
7. Conversas e tempo real
8. Simulador de WhatsApp
9. Bot
10. WhatsApp oficial
11. Testes
12. Produção
