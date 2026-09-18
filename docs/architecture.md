# Arquitetura inicial

## Componentes

- **Frontend:** aplicação web central para atendentes e gestores.
- **Backend:** API e regras de negócio.
- **Database:** PostgreSQL hospedado no Supabase.
- **Auth:** Supabase Auth.
- **Realtime:** Supabase Realtime para atualização de tickets e mensagens.
- **WhatsApp:** adaptador para a WhatsApp Business Platform oficial.
- **Audit:** registro das ações relevantes do atendimento.

## Domínios principais

### Identidade e acesso
- Usuários
- Perfis
- Permissões
- Departamentos
- Status de disponibilidade

### Cadastro
- Contatos/pessoas
- Empresas
- Relação pessoa ↔ empresa

### Atendimento
- Tickets
- Filas
- Categorias
- Prioridades
- Status
- Responsável
- Transferências
- Mensagens

### Auditoria
- Eventos do ticket
- Alterações de responsável/departamento
- Alterações de status
- Registro de mensagens e ações relevantes

## Regra arquitetural importante

O WhatsApp permanece como canal essencial do negócio. Porém, a camada de domínio não deve depender diretamente da API do WhatsApp. A integração deve funcionar como um adaptador de canal, permitindo que o núcleo do atendimento permaneça estável.

## MVP

O MVP deve priorizar o fluxo completo:

**receber → criar ticket → encaminhar → assumir → conversar → transferir → resolver → consultar histórico**

AI, integrações contábeis, portal do cliente, gestão documental, SLA avançado e outros canais ficam para etapas posteriores.
