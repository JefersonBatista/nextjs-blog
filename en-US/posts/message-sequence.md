---
title: 'Abstracting a message sequence in Go'
date: '2026-11-06'
---

Imagine we need to abstract a message sequence using the language Go.
We define a message as anything that can be represented as a byte array or as a string.
This way, we use the concept of interface of Go as a contract.

```go
type Message interface { // public interface with public methods
	Bytes() []byte
	String() string
}
```

And we define a message sequence as being something that responds with a message always it is requested.

```go
type Sequence interface { // public interface with public methods
	Next() Message
}
```

Thinking the generated messages can be filtered according to some criterion, or transformed by some operation, we define types for the functions that realize these actions.

```go
// private types
type condition func(m Message) bool
type transformation func(m Message) Message
```

We implement a struct type, containing a sequence and a condition, so we satisfy the contract of a sequence for this new created type.

```go
type filter struct { // private struct
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

But the private struct we created won't serve, unless we create a public function, receiving a sequence and a filtering criterion that returns the sequence with the filtered messages.

```go
func Filter(sequence Sequence, condition condition) Sequence { // public function
	return filter{sequence, condition}
}
```

Finally, we do the same to implement message sequences resulting from the transformation of other sequences.

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
