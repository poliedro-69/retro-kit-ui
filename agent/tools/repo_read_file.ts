import { readFile } from 'node:fs/promises'
import { defineTool } from 'eve/tools'
import { resolveInsideRepo } from '../lib/repo'

const MAX_CHARS = 40_000

export default defineTool({
  description:
    'Read a text file from the repository. Returns up to 40000 characters; use startLine and endLine to read a range of a larger file.',
  inputSchema: {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'File path relative to the repository root.' },
      startLine: { type: 'integer', minimum: 1 },
      endLine: { type: 'integer', minimum: 1 },
    },
    required: ['path'],
    additionalProperties: false,
  },
  async execute(input) {
    const filePath = String(input.path)
    const text = await readFile(resolveInsideRepo(filePath), 'utf8')
    const lines = text.split('\n')
    const start = typeof input.startLine === 'number' ? input.startLine : 1
    const end = typeof input.endLine === 'number' ? input.endLine : lines.length
    const slice = lines.slice(start - 1, end).join('\n')
    return {
      path: filePath,
      totalLines: lines.length,
      truncated: slice.length > MAX_CHARS,
      content: slice.slice(0, MAX_CHARS),
    }
  },
})
