export const EXAMPLES = [
  {
    name: 'javascript',
    content: `
snippet fun "function(fun)"
function \${1:function_name}(\${2:argument}) {
}
endsnippet

snippet prom "Promise"
new Promise((resolve, reject) => {
})
endsnippet
    `,
  },
]
