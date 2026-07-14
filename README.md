# ⚡ Pokémon Pokédex com Detalhes (Dribbble Design)

Este é um projeto de uma **Pokédex responsiva** e interativa construída utilizando **HTML5, CSS3 estruturado e JavaScript Moderno (ES6+)**, integrada diretamente com a [PokeAPI](https://pokeapi.co/).

O layout foi inspirado em um dos conceitos mais populares e elegantes do **Dribbble**, trazendo uma interface fluida dividida em duas áreas principais: o topo dinâmico com o tipo dominante do Pokémon e uma folha inferior arredondada estilo *dashboard* que apresenta abas de navegação (**About** e **Base Stats**).

---

## 🎨 Visual do Projeto

O design adapta-se perfeitamente de dispositivos móveis a desktops:
*   **Grid de Listagem:** Cards minimalistas organizados por cores dinâmicas para cada tipo dominante de Pokémon.
*   **Overlay Deslizante (Modal):** Ao clicar em qualquer Pokémon, um modal com animação *slide-up* é aberto revelando detalhes avançados.
*   **Abas Interativas (Tabs):**
    *   **About:** Informações físicas como altura, peso (com as conversões corretas para metros e kg) e habilidades.
    *   **Base Stats:** Barras horizontais de status de combate coloridas de acordo com o elemento do Pokémon, incluindo cálculo automático do valor Total.

---

## 🛠️ Tecnologias Utilizadas

*   **HTML5** – Estrutura semântica e acessível.
*   **CSS3** – Flexbox, Grid Layout, variáveis nativas para colorização temática e animações fluidas (`@keyframes`).
*   **JavaScript (ES6+)** – Requisições assíncronas utilizando `fetch`, mapeamento e renderização dinâmica (`map`, `reduce`, `Template Literals`) e gerenciamento de estado local (cache).
*   **PokeAPI** – Fonte oficial de consumo de dados dos Pokémon.

---

## 📁 Estrutura do Projeto

```text
├── assets/
│   ├── css/
│   │   ├── global.css       # Estilos globais e reset
│   │   └── pokedex.css      # Estilização da listagem e do card de detalhes (Dribbble)
│   └── js/
│       ├── pokemon-model.js # Classe de modelagem de dados do Pokémon
│       ├── poke-api.js      # Integração e mapeamento dos endpoints da PokeAPI
│       └── main.js          # Controle de eventos da lista, paginação e modal
├── index.html               # Página única da aplicação
└── README.md                # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/seu-usuario/pokedex-detalhes.git
   ```

2. **Entre na pasta do projeto:**
   ```bash
   cd pokedex-detalhes
   ```

3. **Inicie um servidor local:**
   Como o JavaScript realiza requisições dinâmicas e módulos podem ser utilizados, é ideal rodar o projeto por meio de um servidor local.
   * *Se você utiliza o VS Code*, instale a extensão **Live Server**, clique com o botão direito no `index.html` e selecione **"Open with Live Server"**.
   * *Ou pelo terminal usando Python:*
     ```bash
     python -m http.server 8000
     ```
     Depois, acesse `http://localhost:8000` no seu navegador.

---

## 🧠 Detalhes de Implementação

### 1. Modelo de Dados (`pokemon-model.js`)
Para suportar o layout complexo de abas, estendemos o modelo padrão do Pokémon para mapear as novas propriedades físicas e os status de combate obtidos diretamente do JSON original da PokeAPI.

### 2. Otimização de Performance (Cache local)
Para evitar requisições redundantes de rede toda vez que o usuário clicar em um Pokémon para ver seus detalhes, o arquivo `main.js` armazena os dados dos Pokémons carregados em um vetor em memória (`pokemonsCache`). Assim, a abertura do modal de detalhes é **instantânea e consome zero banda adicional**.

### 3. Interface Limpa e Dinâmica
A cor das barras de status e do cabeçalho do modal ajusta-se automaticamente baseando-se no tipo do Pokémon atual (fogo recebe tom avermelhado, grama recebe tom verde pastel, etc.), respeitando a identidade visual do mockup original.

---

## 📝 Licença
Este projeto é de uso livre para fins educacionais e portfólios pessoais. Sinta-se à vontade para expandi-lo!
