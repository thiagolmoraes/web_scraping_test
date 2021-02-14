# WEB SCRAPING

Robô desenvolvido para buscar informações de preços de quartos de um hotel.

#### Ferramentas Utilizadas

 - ExpressJS
 - Puppeter
 - Jest
 - Supertests 
 - Eslint

 
#### Como instalar

Instalação é bem simples, rodando esses comandos abaixo você já estará rodando a aplicação:

````
yarn install
yarn start
````

Você também pode executar essa aplicação em um container apenas executando o docker-compose.

```
docker-compose up -d
```

### Como usar

Você utiliza o endereço o seguinte endereço para fazer a buscar: 

`POST: http://localhost:3000/api/buscar`

Agora usamos ferramentas como cURL, Postman ou Insomnia, para realizar um teste:

Entrada de dados: 

````
{
    "checkin":"01032021",
    "checkout":"02032021"
}
````
cURL:

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"checkin":"01032021","checkout":"02032021"}' \
  http://localhost:3000/api/buscar

Resposta: 

````
[
  {
    "quarto":"Standard","img":[...],"descricao":"Ideal para relaxar... ","preco":"R$ 703,00"
  },
  {
    "quarto":"Luxo","img":[...],"descricao":"Confortavelmente decorado... ","preco":"R$ 750,50"
  },
  {
    "quarto":"Luxo Superior","img":[...],"descricao":"Exclusividade e requinte... ","preco":"R$ 845,50"
  },
  {
    "quarto":"Master","img":[...],"descricao":"São 6 quartos luxuosos...","preco":"R$ 988,00"
  }
]
````

