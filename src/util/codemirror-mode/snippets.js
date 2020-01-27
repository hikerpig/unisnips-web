/**
 * A CodeMirror simple mode declaration
 */
import CodeMirror from 'codemirror'
import 'codemirror/addon/mode/simple'

CodeMirror.defineSimpleMode('snippets', {
  start: [
    {regex: /(^snippet)(\s+)([\w\d_]+)(\s+)(["'].*["'])(\s+)?(\w+)?/, sol: true, token: ['keyword', null, 'variable', null, 'string', null, 'builtin'] },
    {regex: /^endsnippet/, sol: true, token: 'keyword'},
    {regex: /(\$\{\d+)(\/.*\/.*\/\w*)(\})/, token: ['atom', 'type', 'atom']}, // transform
    {regex: /(\$\d+)/, token: 'atom'}, // mirror
    {regex: /\$\{VISUAL\}/, token: ['builtin']},
    {regex: /\$\{(\d+):?.*\}/, token: ['atom']}, // tabstop
    {regex: /(`!p?\s.*`)/, token: 'variable-3'},
    {regex: /(`!js\s.*`)/, token: 'variable-3'},
    {regex: /^#(.*)/, token: ['comment']},
  ],
})