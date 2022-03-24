# Popcorn
Site de pesquisa de recomendações sobre várias categorias (músicas, filmes, jogos e muito mais).

<img width="150" height="150" src="app/images/logo.png">



## Instalação
Para colocar o projeto a funcionar localmente na sua máquina basta:
1. Clonar o repositório ```git clone https://github.com/luispereira1999/popcorn.git```.
2. Utilizar um editor de código da sua preferência.


## Desenvolvimento
### Estrutura
As pastas e ficheiros que serão utilizados para o desenvolvimento do projeto estão estruturados da seguinte forma:

app/\
├── css/\
│     ├── main.css\
├── images/\
│     ├── 1.png\
│     ├── 2.png\
│     ├── 3.png\
│     ├── 4.png\
│     ├── logo.png\
├── js/\
│     ├── function.js\
│     ├── html-card.js\
│     ├── html-favorite.js\
│     ├── html-tag.js\
│     ├── main.js\
cypress/\
├── integration/\
│     ├── app.spec.js\
└── index.html

### Diretivas
Orientações e normas para o desenvolvimento do projeto:

**Geral**
- todo o código deve ser sintaticamente válido e estar corretamente indentado e comentado.
- todo o código deve ser escrito em inglês, apenas comentários escreva em português.
- todas as funcionalidades introduzidas devem conter testes automáticos.

**HTML**
- todas as tags e os atributos devem estar em letras minúsculas.
- para identificar elementos específicos não use id's, use somente classes.
- as categorias de um conjunto de elementos devem ser comentadas em letras maiúsculas (por exemplo: ```<!-- CABEÇALHO -->``` ou ```<!-- RODAPÉ -->```).

**CSS**
- os nomes das classes devem estar separados por ```-``` quando existe mais que uma palavra (por exemplo: em vez de ```mainWithSidebar``` use ```main-with-sidebar```).
- os nomes das classes devem começar pelo nome da categoria do seu conjunto de elementos (por exemplo: ), sempre que possível.
- as propriedades de cada classe/seletor devem estar por ordem alfabética.
- a organização das classes no ficheiros devem estar contidas dentro das suas respetivas categorias de conjunto de elementos.

**JS**
- os nomes das variáveis devem utilizar o camel case.
- as variáveis que armazenam um elemento HTML, devem respeitar a seguinte sintaxe: ```tipo de elemento``` + ```_``` + ```o que representa``` (por exemplo: ```div_favorites``` ou ```h3_title```).

**Ficheiros**
- devem conter uma descrição no início do ficheiro.


## Testes
Para a criação de testes automáticos usamos o Cypress ([v.5.3.0](https://www.cypress.io/)).\
Para criar os testes entre na pasta "cypress/integration" e abra o ficheiro "app.spec.js".


## Contribuições
Qualquer contribuição é sempre bem-vinda e agradecida (desde reportar erros até adicionar novas funcionalidades).\
Para poder contribuir em desenvolvimento, leia por favor as diretivas estabelecidas para o desenvolvimento do projeto descritas acima para que outros desenvolvedores possam seguir o mesmo padrão. Não se esqueça-se de escrever testes automatizados.


## Criadores
- Lara Ribeiro
- Luís Pereira
- Maria Francisca Costa


## Licença
Ao contribuir para este projeto, você concorda com as políticas da licença MIT.
