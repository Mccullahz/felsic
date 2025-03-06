package components

import (
	"bytes"
	"fmt"
	"regexp"
	"strings"
)

// convert SOME of markdown text to HTML. will build out further as needed.
func ConvertMarkdownToHTML(markdown string) string {
	var buffer bytes.Buffer
	lines := strings.Split(markdown, "\n")
	inList := false

	for _, line := range lines {
		trimmed := strings.TrimSpace(line)
		if len(trimmed) == 0 {
			if inList {
				buffer.WriteString("</ul>\n")
				inList = false
			}
			continue
		}
		// for headers
		if strings.HasPrefix(trimmed, "#") {
			level := 0
			for i := 0; i < len(trimmed) && trimmed[i] == '#'; i++ {
				level++
			}
			content := strings.TrimSpace(trimmed[level:])
			buffer.WriteString(fmt.Sprintf("<h%d>%s</h%d>\n", level, content, level))
			continue
		}
		// for lists
		if strings.HasPrefix(trimmed, "- ") {
			if !inList {
				buffer.WriteString("<ul>\n")
				inList = true
			}
			content := strings.TrimSpace(trimmed[2:])
			content = processBold(content)
			buffer.WriteString(fmt.Sprintf("  <li>%s</li>\n", content))
			continue
		}

		if inList {
			buffer.WriteString("</ul>\n")
			inList = false
		}

		processed := processBold(trimmed)
		buffer.WriteString(fmt.Sprintf("<p>%s</p>\n", processed))
	}

	if inList {
		buffer.WriteString("</ul>\n")
	}

	return buffer.String()
}

// find instances of ** ** and wraps them in <strong> tags.
func processBold(input string) string {
	boldRegex := regexp.MustCompile(`\*\*(.*?)\*\*`)
	return boldRegex.ReplaceAllString(input, "<strong>$1</strong>")
}

// expand to other functions as needed. should be good enough for testing purposes now.
