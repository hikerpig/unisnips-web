import { SnippetSourceItem } from 'src/store/type'

const HONZA_REPO_DIR = 'https://raw.githubusercontent.com/honza/vim-snippets/master/UltiSnips'

export const VIM_SNIPPETS_EXAMPLES = [
  'javascript-node',
  'python',
  'django',
  'html',
  'css',
  'rust',
  'markdown',
  'robot',
].map((name) => {
  return {
    name: `vim-snippets/${name}.snippets`,
    remoteUrl: `${HONZA_REPO_DIR}/${name}.snippets`,
  } as Partial<SnippetSourceItem>
})

export const EXAMPLES = [
  {
    name: 'Intro',
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
