# Autenticação

## Request
```CURL
curl 'https://api.seufisio.com.br/oauth/token' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'Referer: https://app.seufisio.com.br/' \
  -H 'SetFisio;' \
  -H 'sec-ch-ua: "Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'x-version-app: 22' \
  -H 'acesso: web-desktop' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Content-Type: application/json' \
  --data-raw '{"username":"fisiopriscilasavoia@gmail.com","password":"Deuteronomio28","grant_type":"password","client_id":2,"client_secret":"OQI3t4amUsJyN4RgLyyy9ablTwX647gty5jvBZKA","scope":"*"}'
```
## Response
```JSON
{
    "token_type": "Bearer",
    "expires_in": 345600,
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMmFmYmY5NWZkOTdjNDg3NTFhZDZmZGFkZjgzNDA3YjhhYTQyOWUwY2I4ZmQwOWYwYWVlYTZkM2JkODE0OGI1ZWVjMGM2M2ZiNjk5ZWIxNjgiLCJpYXQiOjE3NzAzMDQzMTcuMTEzMjg4LCJuYmYiOjE3NzAzMDQzMTcuMTEzMjksImV4cCI6MTc3MDY0OTkxNy4wOTI3MDYsInN1YiI6IjIxNzE0Iiwic2NvcGVzIjpbIioiXX0.w0OkPhfA9biP2nkoWVwmEP2VS7WharH4W1dT44zNKTzBsf2R1QqYlx2iehYRhp0eOpT4K9shPqxlcx5uoUELd5NYchpxXolTZTE4gI8g0C9VDnpOZT9DfXk_oRiU_MaxbrgUrNc5NQzgEH5J0J9BoSOs0VwHCxiAiBkFO2Zgh1F3FmKfmfjaUgf_Bben-IfG-_4e8zvfVBkIzJz2e7B0wFlrgBErDhpYsQSohPAmlFohC4KnA0KB241zlriYZiowSQ0-KQlFyaaCaDLMyQjmJyfeSjlZ7tWIrecua8Il41X2crgkZpIrALLapJxU2DdoQ_U_BxBUl01zx9w8BRu7uisAa-wQnjC2GCWkWEiySJ41Ds7MhxWXZ-pfjpGjkdcvQtC4Nw4rl6JdsvZFJcd0yQMUZsT_c6b1VP6bCRO2JS0VFukCB4B7XR6eFwfbNQ2vKzNgQ6puF7fEPB_n5N2Lj5k2QSM_Iup975qNNxJ3eANMVKMbAMp_qjpit5-bj4Ja9vB1saimsNrKMay5z64JKsRX_ohNtV2_bf6a6Zfd86r7d_fs2_P9fo1IE-CWrWCYxn_PbltdfRrJde9L1p1EjLNOyVsNn2r-vNYnBgqBcNlHd4oN0o8dIN_H4t9XG6Lr1o5raHJdiDCltmKervFeLnuvOvi068_fLwbFSPmvRm8",
    "refresh_token": "def502006b74c90d5368e221cee1354c5a7d1a1af21cc30fa9b28609558e87712502fbedd3f2fea5a4f0733aa0976d14b18e794f3873e6a6c55e2452d390da2c6b1303b9d4d52599ba9780372997bf7e2017b459db489734e742d7476efb5d7d7cce835ec444caedce8bf3360815788d21d534d30d8ec09bd2b17ca830b5e2486f9c560cf223322ac5f28489a6373f6707f1e76f8cf17de5ccfcefbb052ec3e4a1514bec70a95211625a8eb3ab99061e22652aa6a71f5278be1704cc39f63779df4a2969a96365c9b4c70276a9df222c357ac842b992ee941f1ad5470e563067b47cb0b7d9f8affa2efc4878cd58dc8ea642e02e2ad4b8315244b0e4a8781f1fe6d250a1e78d837569a33d32376ca930e1841acfc50a4b0cefd9d4e7f3109aa2d278c22dcec4d109aa4542c24797b9a6951a59ad339c8adddb1f46dbd34319baf70218244f7e16442b9ad5df8fb300a6dcbed480bc4995909a5abd9afeb07b3bec339e04f18ae4736cf8"
}
```

# Aniversariante

## Request
```CURL
curl 'https://api.seufisio.com.br/api/dashboard/aniversariantes' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMmFmYmY5NWZkOTdjNDg3NTFhZDZmZGFkZjgzNDA3YjhhYTQyOWUwY2I4ZmQwOWYwYWVlYTZkM2JkODE0OGI1ZWVjMGM2M2ZiNjk5ZWIxNjgiLCJpYXQiOjE3NzAzMDQzMTcuMTEzMjg4LCJuYmYiOjE3NzAzMDQzMTcuMTEzMjksImV4cCI6MTc3MDY0OTkxNy4wOTI3MDYsInN1YiI6IjIxNzE0Iiwic2NvcGVzIjpbIioiXX0.w0OkPhfA9biP2nkoWVwmEP2VS7WharH4W1dT44zNKTzBsf2R1QqYlx2iehYRhp0eOpT4K9shPqxlcx5uoUELd5NYchpxXolTZTE4gI8g0C9VDnpOZT9DfXk_oRiU_MaxbrgUrNc5NQzgEH5J0J9BoSOs0VwHCxiAiBkFO2Zgh1F3FmKfmfjaUgf_Bben-IfG-_4e8zvfVBkIzJz2e7B0wFlrgBErDhpYsQSohPAmlFohC4KnA0KB241zlriYZiowSQ0-KQlFyaaCaDLMyQjmJyfeSjlZ7tWIrecua8Il41X2crgkZpIrALLapJxU2DdoQ_U_BxBUl01zx9w8BRu7uisAa-wQnjC2GCWkWEiySJ41Ds7MhxWXZ-pfjpGjkdcvQtC4Nw4rl6JdsvZFJcd0yQMUZsT_c6b1VP6bCRO2JS0VFukCB4B7XR6eFwfbNQ2vKzNgQ6puF7fEPB_n5N2Lj5k2QSM_Iup975qNNxJ3eANMVKMbAMp_qjpit5-bj4Ja9vB1saimsNrKMay5z64JKsRX_ohNtV2_bf6a6Zfd86r7d_fs2_P9fo1IE-CWrWCYxn_PbltdfRrJde9L1p1EjLNOyVsNn2r-vNYnBgqBcNlHd4oN0o8dIN_H4t9XG6Lr1o5raHJdiDCltmKervFeLnuvOvi068_fLwbFSPmvRm8' \
  -H 'Referer: https://app.seufisio.com.br/' \
  -H 'SetFisio: 9208' \
  -H 'sec-ch-ua: "Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'x-version-app: 22' \
  -H 'acesso: web-desktop' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36' \
  -H 'Accept: application/json, text/plain, */*'
```
## Response
```JSON
{
    "hoje": {
        "clientes": [
            {
                "id": 152,
                "nome": "Luam Samuel Valdir Assis Ferreira",
                "data_nascimento": "1997-02-05",
                "telefone": null,
                "data_envio_whatsapp_aniversario": null,
                "foto": null,
                "url_avatar": ""
            }
        ],
        "cliente_desde": [],
        "usuarios": []
    },
    "amanha": {
        "clientes": [],
        "cliente_desde": [],
        "usuarios": []
    },
    "depois_amanha": {
        "clientes": [],
        "cliente_desde": [],
        "usuarios": []
    }
```

# Contratos Ativos

## Request
```CURL
curl 'https://api.seufisio.com.br/api/relatorio/cliente/fixos?page=1&rowsPerPage=100&descending=true&filterWhere\[situacao\]=2&filterWhere\[opcao_pacote_servico\]=ambos&filterWhere\[pacotes_pausados\]=0' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: pt-BR,pt;q=0.9' \
  -H 'acesso: web-desktop' \
  -H 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMmFmYmY5NWZkOTdjNDg3NTFhZDZmZGFkZjgzNDA3YjhhYTQyOWUwY2I4ZmQwOWYwYWVlYTZkM2JkODE0OGI1ZWVjMGM2M2ZiNjk5ZWIxNjgiLCJpYXQiOjE3NzAzMDQzMTcuMTEzMjg4LCJuYmYiOjE3NzAzMDQzMTcuMTEzMjksImV4cCI6MTc3MDY0OTkxNy4wOTI3MDYsInN1YiI6IjIxNzE0Iiwic2NvcGVzIjpbIioiXX0.w0OkPhfA9biP2nkoWVwmEP2VS7WharH4W1dT44zNKTzBsf2R1QqYlx2iehYRhp0eOpT4K9shPqxlcx5uoUELd5NYchpxXolTZTE4gI8g0C9VDnpOZT9DfXk_oRiU_MaxbrgUrNc5NQzgEH5J0J9BoSOs0VwHCxiAiBkFO2Zgh1F3FmKfmfjaUgf_Bben-IfG-_4e8zvfVBkIzJz2e7B0wFlrgBErDhpYsQSohPAmlFohC4KnA0KB241zlriYZiowSQ0-KQlFyaaCaDLMyQjmJyfeSjlZ7tWIrecua8Il41X2crgkZpIrALLapJxU2DdoQ_U_BxBUl01zx9w8BRu7uisAa-wQnjC2GCWkWEiySJ41Ds7MhxWXZ-pfjpGjkdcvQtC4Nw4rl6JdsvZFJcd0yQMUZsT_c6b1VP6bCRO2JS0VFukCB4B7XR6eFwfbNQ2vKzNgQ6puF7fEPB_n5N2Lj5k2QSM_Iup975qNNxJ3eANMVKMbAMp_qjpit5-bj4Ja9vB1saimsNrKMay5z64JKsRX_ohNtV2_bf6a6Zfd86r7d_fs2_P9fo1IE-CWrWCYxn_PbltdfRrJde9L1p1EjLNOyVsNn2r-vNYnBgqBcNlHd4oN0o8dIN_H4t9XG6Lr1o5raHJdiDCltmKervFeLnuvOvi068_fLwbFSPmvRm8' \
  -H 'origin: https://app.seufisio.com.br' \
  -H 'priority: u=1, i' \
  -H 'referer: https://app.seufisio.com.br/' \
  -H 'sec-ch-ua: "Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'setfisio: 9208' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36' \
  -H 'x-requested-with: XMLHttpRequest' \
  -H 'x-version-app: 22'
```
## Response
```JSON
{
    "current_page": 1,
    "data": [
        {
            "id": 145,
            "nome": "Adriana Lima de Oliveira",
            "sexo": 0,
            "telefone": "(11) 99554-8154",
            "email": "adriana.lima6@icloud.com",
            "situacao": 2,
            "pacote_fixo_recorrente": 0,
            "plano": "Pilates 2x na Semana",
            "tipo": "S.R",
            "procedencia": null,
            "data_inicio_plano": "2026-01-13",
            "cobranca_automatica": 0,
            "nota_fiscal_automatica": 0,
            "data_fim_plano": "2026-07-12",
            "periodicidade": "Semestral",
            "horarios_programados": "<div>Ter\u00e7a \u00e0s 15:00 com Priscila Graciele Assis Ferreira Savoia na sala Sala 01,&nbsp; <\/div><div>Quinta \u00e0s 15:00 com Priscila Graciele Assis Ferreira Savoia na sala Sala 01",
            "valor_total": 335
        },
        {
            "id": 87,
            "nome": "Aline Cristina de Oliveira Antunes",
            "sexo": 0,
            "telefone": "(11) 99627-3917",
            "email": "alineenila31@yahoo.com.br",
            "situacao": 2,
            "pacote_fixo_recorrente": 0,
            "plano": "Pilates 1x na Semana",
            "tipo": "S.R",
            "procedencia": null,
            "data_inicio_plano": "2025-08-12",
            "cobranca_automatica": 0,
            "nota_fiscal_automatica": 0,
            "data_fim_plano": "2026-08-11",
            "periodicidade": "Semestral",
            "horarios_programados": "<div>Ter\u00e7a \u00e0s 19:00 com Priscila Graciele Assis Ferreira Savoia na sala Sala 01",
            "valor_total": 200
        },
        {
            "id": 132,
            "nome": "Amanda Aparecida de Oliveira Fernandes",
            "sexo": 0,
            "telefone": "(11) 96416-3452",
            "email": null,
            "situacao": 2,
            "pacote_fixo_recorrente": 0,
            "plano": "Pilates 1x na Semana",
            "tipo": "P.F",
            "procedencia": null,
            "data_inicio_plano": "2025-09-26",
            "cobranca_automatica": 0,
            "nota_fiscal_automatica": 0,
            "data_fim_plano": "2026-03-25",
            "periodicidade": "Semestral",
            "horarios_programados": "<div>Sexta \u00e0s 17:00 com Priscila Graciele Assis Ferreira Savoia na sala Sala 01",
            "valor_total": 200
        }
    ],
    "first_page_url": "https:\/\/api.seufisio.com.br\/api\/relatorio\/cliente\/fixos?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "https:\/\/api.seufisio.com.br\/api\/relatorio\/cliente\/fixos?page=1",
    "links": [
        {
            "url": null,
            "label": "\u00ab Anterior",
            "page": null,
            "active": false
        },
        {
            "url": "https:\/\/api.seufisio.com.br\/api\/relatorio\/cliente\/fixos?page=1",
            "label": "1",
            "page": 1,
            "active": true
        },
        {
            "url": null,
            "label": "Pr\u00f3ximo \u00bb",
            "page": null,
            "active": false
        }
    ],
    "next_page_url": null,
    "path": "https:\/\/api.seufisio.com.br\/api\/relatorio\/cliente\/fixos",
    "per_page": 100,
    "prev_page_url": null,
    "to": 40,
    "total": 40
}
```

# Faturas

## Request
```
curl 'https://api.seufisio.com.br/api/conta-receber?page=1&rowsPerPage=50&sortBy=data_vencimento&descending=false&filter=&filterWhere\[pago\]=0&filterWhere\[filtroData\]=data_vencimento&filterWhere\[sortBy\]=data_vencimento&filterWhere\[orderBy\]=asc' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: pt-BR,pt;q=0.9' \
  -H 'acesso: web-desktop' \
  -H 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMmFmYmY5NWZkOTdjNDg3NTFhZDZmZGFkZjgzNDA3YjhhYTQyOWUwY2I4ZmQwOWYwYWVlYTZkM2JkODE0OGI1ZWVjMGM2M2ZiNjk5ZWIxNjgiLCJpYXQiOjE3NzAzMDQzMTcuMTEzMjg4LCJuYmYiOjE3NzAzMDQzMTcuMTEzMjksImV4cCI6MTc3MDY0OTkxNy4wOTI3MDYsInN1YiI6IjIxNzE0Iiwic2NvcGVzIjpbIioiXX0.w0OkPhfA9biP2nkoWVwmEP2VS7WharH4W1dT44zNKTzBsf2R1QqYlx2iehYRhp0eOpT4K9shPqxlcx5uoUELd5NYchpxXolTZTE4gI8g0C9VDnpOZT9DfXk_oRiU_MaxbrgUrNc5NQzgEH5J0J9BoSOs0VwHCxiAiBkFO2Zgh1F3FmKfmfjaUgf_Bben-IfG-_4e8zvfVBkIzJz2e7B0wFlrgBErDhpYsQSohPAmlFohC4KnA0KB241zlriYZiowSQ0-KQlFyaaCaDLMyQjmJyfeSjlZ7tWIrecua8Il41X2crgkZpIrALLapJxU2DdoQ_U_BxBUl01zx9w8BRu7uisAa-wQnjC2GCWkWEiySJ41Ds7MhxWXZ-pfjpGjkdcvQtC4Nw4rl6JdsvZFJcd0yQMUZsT_c6b1VP6bCRO2JS0VFukCB4B7XR6eFwfbNQ2vKzNgQ6puF7fEPB_n5N2Lj5k2QSM_Iup975qNNxJ3eANMVKMbAMp_qjpit5-bj4Ja9vB1saimsNrKMay5z64JKsRX_ohNtV2_bf6a6Zfd86r7d_fs2_P9fo1IE-CWrWCYxn_PbltdfRrJde9L1p1EjLNOyVsNn2r-vNYnBgqBcNlHd4oN0o8dIN_H4t9XG6Lr1o5raHJdiDCltmKervFeLnuvOvi068_fLwbFSPmvRm8' \
  -H 'origin: https://app.seufisio.com.br' \
  -H 'priority: u=1, i' \
  -H 'referer: https://app.seufisio.com.br/' \
  -H 'sec-ch-ua: "Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'setfisio: 9208' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36' \
  -H 'x-requested-with: XMLHttpRequest' \
  -H 'x-version-app: 22'
```
## Response
```json
{
    "valor_total": 11325.5,
    "current_page": 1,
    "data": [
        {
            "id": 103,
            "titulo": "Ref. servi\u00e7o 20 ciclo: 16\/09\/2025",
            "descricao": null,
            "valor": 480,
            "cliente_id": 71,
            "produto_id": null,
            "atendimento_id": null,
            "pago": 0,
            "data_lancamento": "2025-08-26 05:52:28",
            "data_pagamento": null,
            "data_recebimento": null,
            "data_vencimento": "2025-09-16",
            "profissional_id": null,
            "forma_pagamento_id": null,
            "pacote_id": null,
            "venda_id": null,
            "pacote_fixo_id": null,
            "cobranca_convenio": 0,
            "recibo_gerado": 0,
            "nfe_gerado": 0,
            "user_id": null,
            "created_at": "2025-08-26T08:52:28.000000Z",
            "updated_at": "2025-08-26T08:52:28.000000Z",
            "gateway_pagamento": "juno",
            "id_cobranca_juno": null,
            "id_pagamento_juno": null,
            "aguardando_estorno": false,
            "valor_cobranca_juno": null,
            "dados_cobranca": null,
            "centro_custo_id": 1,
            "atendimento_pacote_id": null,
            "atendimento_combo_id": null,
            "nota_fiscal_id": null,
            "nota_fiscal_status": null,
            "servico_ciclo_id": 79,
            "id_parcelamento_gateway": null,
            "cobranca_recorrente_automatica": false,
            "falha_cobrar_via_cartao": true,
            "easypay_key": null,
            "easypay_forma_pagamento": null,
            "moloni_id": null,
            "moloni_data_emissao": null,
            "nota_fiscal_data_emissao": null,
            "nota_fiscal_numero": null,
            "moloni_fatura_cancelada": false,
            "produtos_servicos_vinculados": "Pilates 3x na Semana",
            "codigo_autorizacao_transacao": null,
            "email_confirmacao_pagamento_enviado": null,
            "gateway_data_antecipacao": null,
            "retencao_valor_base": null,
            "retencao_valor_pis": null,
            "retencao_valor_cofins": null,
            "retencao_valor_csll": null,
            "retencao_valor_ir": null,
            "valor_bruto": 480,
            "cliente": {
                "id": 71,
                "nome": "Adriana Colatrelli de Abreu",
                "email": "dricolatrelli@gmail.com",
                "cpf": "164.076.778-90",
                "telefone": "(11) 99465-5521",
                "telefone_ddi": "BR",
                "url_avatar": ""
            },
            "forma_pagamento": null,
            "cliente_dado_cobranca": {
                "cliente_id": 71,
                "nome": "Adriana Colatrelli de Abreu",
                "cpf": "164.076.778-90",
                "data_nascimento": "1971-01-07",
                "email": "dricolatrelli@gmail.com",
                "forma_pagamento": "avista",
                "boleto": true,
                "cartao": false,
                "created_at": "2025-06-27T22:33:34.000000Z",
                "updated_at": "2025-06-30T13:48:13.000000Z",
                "tipo_pessoa": "PF",
                "telefone_ddi": null,
                "telefone": null,
                "asaas_customer_id": null,
                "asaas_notify": false,
                "retem_iss": false,
                "simples_nacional": true,
                "metodo_pagamento": "BOLETO"
            },
            "centro_custo": {
                "id": 1,
                "nome": "Pilates"
            }
        },
        {
            "id": 281,
            "titulo": "Ref. servi\u00e7o 35 ciclo: 09\/12\/2025",
            "descricao": null,
            "valor": 167.5,
            "cliente_id": 89,
            "produto_id": null,
            "atendimento_id": null,
            "pago": 0,
            "data_lancamento": "2025-11-18 05:37:11",
            "data_pagamento": null,
            "data_recebimento": null,
            "data_vencimento": "2025-12-20",
            "profissional_id": null,
            "forma_pagamento_id": null,
            "pacote_id": null,
            "venda_id": null,
            "pacote_fixo_id": null,
            "cobranca_convenio": 0,
            "recibo_gerado": 0,
            "nfe_gerado": 0,
            "user_id": null,
            "created_at": "2025-11-18T08:37:11.000000Z",
            "updated_at": "2025-11-18T08:37:11.000000Z",
            "gateway_pagamento": "juno",
            "id_cobranca_juno": null,
            "id_pagamento_juno": null,
            "aguardando_estorno": false,
            "valor_cobranca_juno": null,
            "dados_cobranca": null,
            "centro_custo_id": 1,
            "atendimento_pacote_id": null,
            "atendimento_combo_id": null,
            "nota_fiscal_id": null,
            "nota_fiscal_status": null,
            "servico_ciclo_id": 190,
            "id_parcelamento_gateway": null,
            "cobranca_recorrente_automatica": false,
            "falha_cobrar_via_cartao": true,
            "easypay_key": null,
            "easypay_forma_pagamento": null,
            "moloni_id": null,
            "moloni_data_emissao": null,
            "nota_fiscal_data_emissao": null,
            "nota_fiscal_numero": null,
            "moloni_fatura_cancelada": false,
            "produtos_servicos_vinculados": "Pilates 1x na Semana",
            "codigo_autorizacao_transacao": null,
            "email_confirmacao_pagamento_enviado": null,
            "gateway_data_antecipacao": null,
            "retencao_valor_base": null,
            "retencao_valor_pis": null,
            "retencao_valor_cofins": null,
            "retencao_valor_csll": null,
            "retencao_valor_ir": null,
            "valor_bruto": 167.5,
            "cliente": {
                "id": 89,
                "nome": "Marilia Gabriela Assis Ferreira Siqueira Paulino",
                "email": "gabriela.siqueira.grazy@gmail.com",
                "cpf": "414.029.988-64",
                "telefone": "(11) 98656-6325",
                "telefone_ddi": "BR",
                "url_avatar": ""
            },
            "forma_pagamento": null,
            "cliente_dado_cobranca": {
                "cliente_id": 89,
                "nome": "Mar\u00edlia Gabriela Ferreira Siqueira Paulino",
                "cpf": "441.402.998-86",
                "data_nascimento": "1990-09-06",
                "email": "gabriela.siqueira.grazy@gmail.com",
                "forma_pagamento": "avista",
                "boleto": true,
                "cartao": false,
                "created_at": "2025-08-06T01:22:11.000000Z",
                "updated_at": "2025-09-23T17:43:18.000000Z",
                "tipo_pessoa": "PF",
                "telefone_ddi": null,
                "telefone": null,
                "asaas_customer_id": "cus_000136224082",
                "asaas_notify": false,
                "retem_iss": false,
                "simples_nacional": true,
                "metodo_pagamento": "BOLETO"
            },
            "centro_custo": {
                "id": 1,
                "nome": "Pilates"
            }
        },
        {
            "id": 370,
            "titulo": "Ref. servi\u00e7o 22 ciclo: 08\/02\/2026",
            "descricao": null,
            "valor": 200,
            "cliente_id": 73,
            "produto_id": null,
            "atendimento_id": null,
            "pago": 0,
            "data_lancamento": "2026-01-18 05:41:35",
            "data_pagamento": null,
            "data_recebimento": null,
            "data_vencimento": "2026-03-05",
            "profissional_id": null,
            "forma_pagamento_id": null,
            "pacote_id": null,
            "venda_id": null,
            "pacote_fixo_id": null,
            "cobranca_convenio": 0,
            "recibo_gerado": 0,
            "nfe_gerado": 0,
            "user_id": null,
            "created_at": "2026-01-18T08:41:35.000000Z",
            "updated_at": "2026-01-18T08:41:35.000000Z",
            "gateway_pagamento": "juno",
            "id_cobranca_juno": null,
            "id_pagamento_juno": null,
            "aguardando_estorno": false,
            "valor_cobranca_juno": null,
            "dados_cobranca": null,
            "centro_custo_id": 1,
            "atendimento_pacote_id": null,
            "atendimento_combo_id": null,
            "nota_fiscal_id": null,
            "nota_fiscal_status": null,
            "servico_ciclo_id": 265,
            "id_parcelamento_gateway": null,
            "cobranca_recorrente_automatica": false,
            "falha_cobrar_via_cartao": false,
            "easypay_key": null,
            "easypay_forma_pagamento": null,
            "moloni_id": null,
            "moloni_data_emissao": null,
            "nota_fiscal_data_emissao": null,
            "nota_fiscal_numero": null,
            "moloni_fatura_cancelada": false,
            "produtos_servicos_vinculados": "Pilates 1x na Semana",
            "codigo_autorizacao_transacao": null,
            "email_confirmacao_pagamento_enviado": null,
            "gateway_data_antecipacao": null,
            "retencao_valor_base": null,
            "retencao_valor_pis": null,
            "retencao_valor_cofins": null,
            "retencao_valor_csll": null,
            "retencao_valor_ir": null,
            "valor_bruto": 200,
            "cliente": {
                "id": 73,
                "nome": "Gabriela Brayner Costa",
                "email": "brayner.gabi@hotmail.com",
                "cpf": "429.319.868-79",
                "telefone": "(11) 97390-0940",
                "telefone_ddi": "BR",
                "url_avatar": ""
            },
            "forma_pagamento": null,
            "cliente_dado_cobranca": {
                "cliente_id": 73,
                "nome": "Gabriela Brayner Costa",
                "cpf": "429.319.868-79",
                "data_nascimento": "1993-05-31",
                "email": "brayner.gabi@hotmail.com",
                "forma_pagamento": "avista",
                "boleto": false,
                "cartao": false,
                "created_at": "2025-07-04T13:07:42.000000Z",
                "updated_at": "2025-07-04T15:48:31.000000Z",
                "tipo_pessoa": "PF",
                "telefone_ddi": null,
                "telefone": null,
                "asaas_customer_id": "cus_000124904458",
                "asaas_notify": false,
                "retem_iss": false,
                "simples_nacional": true,
                "metodo_pagamento": "BOLETO"
            },
            "centro_custo": {
                "id": 1,
                "nome": "Pilates"
            }
        }
    ],
    "first_page_url": "https:\/\/api.seufisio.com.br\/api\/conta-receber?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "https:\/\/api.seufisio.com.br\/api\/conta-receber?page=1",
    "links": [
        {
            "url": null,
            "label": "\u00ab Anterior",
            "page": null,
            "active": false
        },
        {
            "url": "https:\/\/api.seufisio.com.br\/api\/conta-receber?page=1",
            "label": "1",
            "page": 1,
            "active": true
        },
        {
            "url": null,
            "label": "Pr\u00f3ximo \u00bb",
            "page": null,
            "active": false
        }
    ],
    "next_page_url": null,
    "path": "https:\/\/api.seufisio.com.br\/api\/conta-receber",
    "per_page": 50,
    "prev_page_url": null,
    "to": 41,
    "total": 41
}
```

# Eventos

## Request
```CURL
curl 'https://api.seufisio.com.br/api/eventos?start=1769990400&end=1770422400&is_minha_agenda=0' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'acesso: web-desktop' \
  -H 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNDU5NzIyMTVmNzU0YTMwMDU2NDRjNDBhYjYyMjI0NDRkM2QwZDdlMWM4ZmNiMTIxMjZlNWNlNTA0NzU1NWQ3YzQyYzM5MWFhOGY4YmZhYzIiLCJpYXQiOjE3NzAxMzczMzYuOTQxMDc0LCJuYmYiOjE3NzAxMzczMzYuOTQxMDc2LCJleHAiOjE3NzA0ODI5MzYuOTI3ODA3LCJzdWIiOiIyMTcxNCIsInNjb3BlcyI6W119.SGlpEkDkCm0FaZyyuNAVmTF_WNV4SBUFzRxjGBxg7qGoBnlpAljl6Spqbd3_aZrgz5YXzj2eihtVz76-4jxxo0qEkDNh3SPm4JepkfT8gtS0p2Ws297fp_ytQmiNe84SBJbyw_efT4SKxUZecn9LZx5UQt1rkzqq57CBlaAOz25uelV-8X9CHw3lVlW1GEVlMtm2N7WfbQM66jRKB3xunzwsAqp1wnQWHOa0Al_ZlW133NTij94ZtFMxa78BQl5xvTb54uAUjGI7_JhBKHF5igpSsXwg4UT076GG5TLUXsDfv-GoZe6CPRWlt7ny4xjHLZVSaEyppPRV28B9flcKAsrOCrX4AnmfuJmkoN7aqEwswAkLlXUIjjHvzHvuqHZWvsgMjTMDywJjY-e0rCHVRg7q0hjttr_N2sF8kmKWTTlae6l4VCqKIwIVg3UWXgpwvcPbPpXWN--WMfGAAdyJcxj8dXgW6QKqPCUVYFI2iChVIceAvutrOrMJmlX5BilpZD8f1Pq_8W9bmSWxhChWRJJ2idYVfp-06F9TF_fSNP3SlmXgcY8AA3NCwP9lm_0JULE5bmQmZ8_HveWkN7W0FtgxTrP3ef_drUW8gg_7SmA4kt9w34gQpMEi6dFHgNHrlj-iIzBG5nCgI1CyjdpvdoUr30o8RT_tybfKwodOkg0' \
  -H 'origin: https://app.seufisio.com.br' \
  -H 'priority: u=1, i' \
  -H 'referer: https://app.seufisio.com.br/' \
  -H 'sec-ch-ua: "Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'setfisio: 9208' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36' \
  -H 'x-requested-with: XMLHttpRequest' \
  -H 'x-version-app: 22'
```
## Response
```json
{
    "events": [
        {
            "id": 1487,
            "status_id": 5,
            "isAtendimento": 1,
            "isFeriado": 0,
            "title": "Mariana Costa Martins",
            "cliente_id": 101,
            "start": "2026-02-02 19:00:00",
            "end": "2026-02-02 19:50:00",
            "color": "#e57373",
            "sala_color": "#e47603",
            "sala_nome": "Sala 01",
            "sala_id": 1,
            "prontuario_finalizado": 0,
            "aula_experimental": 0,
            "whatsapp_enviado": 0,
            "confirmado": 0,
            "desmarcado": 0,
            "profissional_nome": "Priscila Graciele Assis Ferreira Savoia",
            "profissional_id": 1,
            "tipo_atendimento_nome": "Totalpass",
            "prontuario_vazio": 1,
            "editable": 1,
            "durationEditable": 0,
            "conta_receber": null,
            "conta_status": null,
            "pendencia_financeira": 0,
            "aniversario": 0,
            "atendimento_remarcado": null,
            "atendimento_remarcacao": null,
            "qtd_lembretes": 0,
            "is_atendimento_pacote": 4,
            "is_atendimento_pacote_fixo": null,
            "servico_ciclo_id": null,
            "agendamento_online": 0,
            "atendimento_combo_id": null
        },
        {
            "id": 1821,
            "status_id": 5,
            "isAtendimento": 1,
            "isFeriado": 0,
            "title": "Fab\u00edola Moura Crema",
            "cliente_id": 113,
            "start": "2026-02-02 18:00:00",
            "end": "2026-02-02 18:50:00",
            "color": "#e57373",
            "sala_color": "#e47603",
            "sala_nome": "Sala 01",
            "sala_id": 1,
            "prontuario_finalizado": 0,
            "aula_experimental": 0,
            "whatsapp_enviado": 0,
            "confirmado": 0,
            "desmarcado": 0,
            "profissional_nome": "Priscila Graciele Assis Ferreira Savoia",
            "profissional_id": 1,
            "tipo_atendimento_nome": "Aula Avulsa",
            "prontuario_vazio": 1,
            "editable": 1,
            "durationEditable": 0,
            "conta_receber": null,
            "conta_status": null,
            "pendencia_financeira": 0,
            "aniversario": 0,
            "atendimento_remarcado": null,
            "atendimento_remarcacao": null,
            "qtd_lembretes": 0,
            "is_atendimento_pacote": 7,
            "is_atendimento_pacote_fixo": null,
            "servico_ciclo_id": null,
            "agendamento_online": 0,
            "atendimento_combo_id": null
        }
    ]
}
```