---
title: 'Quando usar Geração Estática v.s. Renderização do Lado do Servidor'
date: '2021-08-09'
---

Recomendamos usar **Geração Estática** (com e sem dados) sempre que possível, porque sua página pode ser compilada uma vez e servida por CDN, o que é muito mais rápido do que ter um servidor renderizando a página em cada requisição.

Você pode usar Geração Estática para muitos tipos de página, incluindo:

- Páginas de marketing
- Postagens em blogs
- Listagens de produto em e-commerces
- Ajuda e documentação

Você deve se perguntar: "Posso pré-renderizar esta página **antes** de uma requisição?" Se a resposta for sim, então você deve escolhar Geração Estática.

Por outro lado, Geração Estática não é uma boa ideia se você não pode pré-renderizar uma página antes de uma requisição. Talvez sua página mostre dados atualizados com frequência, e o conteúdo da página muda em cada requisição.

Nesse caso, você pode usar **Renderização do Lado do Servidor**. Será mais lento, mas a página pré-renderizda estará sempre atualizada. Ou você pode abandonar a pré-renderização e usar JavaScript do lado do cliente para popular os dados.
