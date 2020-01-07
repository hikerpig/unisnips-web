export const EXAMPLES = [
  {
    name: 'javascript',
    content: `
snippet fun "function(fun)"
function \${1:function_name}(\${2:argument}) {
}
endsnippet

snippet test_visual "visual" b
\${VISUAL}
endsnippet
    `,
  },
]
