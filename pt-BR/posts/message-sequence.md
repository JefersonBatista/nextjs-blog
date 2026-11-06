---
title: 'Abstraindo uma sequência de mensagens em Go'
date: '2026-11-06'
---

Imagine que precisamos abstrair uma sequência de mensagens usando a linguagem Go.
Definimos uma mensagem como sendo qualquer coisa que possa ser representada em um _array_ de _bytes_ ou em uma _string_.
Dessa forma, utilizamos o conceito de interface de Go como um contrato.

```go
// public interface with public methods
type Message interface {
	Bytes() []byte
	String() string
}
```

E definimos uma sequência de mensagens como sendo algo que responde com uma mensagem sempre que solicitado.

```go
// public interface with public methods
type Sequence interface {
	Next() Message
}
```

Pensando que as mensagens geradas possam ser filtradas segundo algum critério, ou transformadas por alguma operação,
definimos tipos para as funções que realizam essas ações.

```go
// private function types
type condition func(m Message) bool
type transformation func(m Message) Message
```

Implementamos um tipo estrutura, que contenha uma sequência e uma condição, então satisfazemos o contrato de uma sequência para esse novo tipo criado.

```go
// private struct
type filter struct {
	Sequence
	condition
}

func (filter filter) Next() (next Message) {
	next = filter.Sequence.Next()
	for !filter.condition(next) {
		next = filter.Sequence.Next()
	}
	return
}
```

Mas a estrutura privada que criamos não vai servir, a não ser que criemos uma função pública, recebendo uma sequência e um critério de filtragem, que retorna a sequência com as mensagens filtradas.

```go
// public function
func Filter(sequence Sequence, condition condition) Sequence {
	return filter{sequence, condition}
}
```

Finalmente, fazemos o mesmo para implementar sequências de mensagens fruto da transformação de outras sequências.

```go
type transform struct {
	Sequence
	transformation
}

func (transform transform) Next() Message {
	next := transform.Sequence.Next()
	return transform.transformation(next)
}

func Transform(sequence Sequence, transformation transformation) Sequence {
	return transform{sequence, transformation}
}
```
