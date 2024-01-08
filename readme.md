
# FinAPI - Financeira



## Requisitos

 - Deve ser possivel criar uma conta
 - Deve ser possivel buscar o extrato bancario do cliente
 - Deve ser possivel realizar um deposito
 - Deve ser possivel realizar um saque
 - Deve ser possivel buscar o extrato bancario do cliente por data
 - Deve ser possivel obter dados da conta do cliente
 - Deve ser possivel deletar uma conta

## Regras de negócio


 - Não deve ser possível cadastrar uma conta com CPF já existente
 - Não deve ser possível fazer depósito em uma conta não existente
 - Não deve ser possível buscar extrato em uma conta não existente
 - Não deve ser possível fazer saque em uma conta não existente
 - Não deve ser possível excluir uma conta que não existe
 - Não deve ser possível fazer saque quando o saldo for insuficiente