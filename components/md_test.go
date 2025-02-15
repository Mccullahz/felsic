package components

import (
	"strings"
	"testing"
)

func TestConvertMarkdownToHTML(t *testing.T) {
	input := `
### Header 1
     ## Header 2
          **Bold**
- text
- another **bold** text item
Normal paragraph with **bold** words.
`
	// NOTE: The expected output here is based on how converter processes the input.
	expected := `<h3>Header 1</h3>
<h2>Header 2</h2>
<p><strong>Bold</strong></p>
<ul>
  <li>text</li>
  <li>another <strong>bold</strong> text item</li>
</ul>
<p>Normal paragraph with <strong>bold</strong> words.</p>
`

	output := ConvertMarkdownToHTML(input)
	norm := func(s string) string {
		return strings.TrimSpace(s)
	}

	if norm(output) != norm(expected) {
		t.Errorf("Expected:\n%s\nGot:\n%s", expected, output)
	}
}
