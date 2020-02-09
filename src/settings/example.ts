export const EXAMPLES = [
  {
    name: 'intro',
    content: `snippet with_default "with default value" b
function \${1:name} {
  \${2://body}
}
endsnippet

snippet test_visual "visual"
return \${VISUAL}
endsnippet

snippet test_shell "shell code"
should print date: \`! date\`
endsnippet

# js block is not supported in UltiSnips
snippet test_js "javascript code"
should print date: \`!js new Date()\`
endsnippet

snippet nested "nested tabstop"
\${0:outer and \${1:inner}}
endsnippet

snippet script_inside_tabstop "js script inside tabstop"
\${1:\`!js new Date()\`}
endsnippet

snippet tabstop_transformation "import vue component"
import \${1/(.*)\\/([\\w]*)\\.vue/$2/g} from '\${1}'
endsnippet
    `,
  },
]
