---
title: 'Duas formas de pré-renderização'
date: '2021-08-09'
---

O Next.js tem duas formas de pré-renderização: **Geração Estática** e **Renderização do lado do servidor**. A diferença está em **quando** é gerado o HTML para uma página.

- **Geração Estática** é o método de pré-renderização que gera HTML em **tempo de compilação**. O HTML pré-renderizado é então _reusado_ em cada requisição.
- **Renderização do lado do servidor** é o método de pré-renderização que gera HTML em **cada requisição**.

É importante ressaltar que o Next.js deixa você **escolher** qual forma de pré-renderização usar para cada página. Você pode criar um aplicativo "híbrido" em Next.js usando Geração Estática para a maioria das páginas e renderização do lado do servidor para as outras.
