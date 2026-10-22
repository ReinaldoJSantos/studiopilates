# Studio Essence Pilates

Landing page responsiva para apresentar o Studio Essence Pilates, suas aulas e planos, e facilitar o contato de novos alunos pelo WhatsApp.

## Funcionalidades

- Apresentação do estúdio, benefícios do Pilates, modalidades, planos, galeria de fotos e perguntas frequentes.
- Navegação adaptada para dispositivos móveis.
- Filtros de modalidades, detalhes em janela modal e galeria com visualização ampliada.
- Formulário de pré-agendamento que prepara uma mensagem com os dados informados e abre uma conversa no WhatsApp.
- Links de contato e informações do estúdio centralizados em uma configuração.
- Animações de entrada com suporte à preferência por movimento reduzido.

## Tecnologias

- HTML, CSS e JavaScript (ES modules), sem etapa de compilação.
- Tailwind CSS via CDN e estilos adicionais em `assets/css/styles.css`.
- Lucide para os ícones e Google Fonts para as fontes tipográficas.
- Imagens carregadas do Unsplash.

As bibliotecas e imagens externas precisam de conexão com a internet para serem carregadas.

## Executar localmente

Como o JavaScript usa módulos ES, abra a página por meio de um servidor HTTP local em vez de abrir `index.html` diretamente como arquivo.

Com Python instalado:

```bash
python -m http.server 8000
```

Depois, acesse [http://localhost:8000](http://localhost:8000) no navegador. Encerre o servidor com `Ctrl+C`.

Também é possível usar qualquer servidor local de arquivos estáticos.

## Personalizar os dados

Edite `assets/js/studio-config.js` para atualizar as informações exibidas e os destinos de contato:

- `name`: nome do estúdio.
- `phone` e `whatsappNumber`: telefone exibido e número usado nos links do WhatsApp. `whatsappNumber` deve conter apenas o código do país, DDD e número.
- `email`, `address`, `city` e `openingHours`: dados de contato e funcionamento.
- `instagram` e `instagramUrl`: perfil do Instagram.
- `defaultWhatsAppMsg`: mensagem inicial do botão flutuante de WhatsApp.

Textos da página, modalidades, planos, perguntas frequentes e imagens estão em `index.html`. A identidade visual complementar está em `assets/css/styles.css` e `assets/js/tailwind-config.js`.

## Publicação

O projeto é estático: publique o conteúdo deste repositório em qualquer serviço de hospedagem de sites estáticos, mantendo a estrutura de arquivos. O ponto de entrada é `index.html`.

## Estrutura

```text
.
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       ├── studio-config.js
│       └── tailwind-config.js
└── README.md
```
