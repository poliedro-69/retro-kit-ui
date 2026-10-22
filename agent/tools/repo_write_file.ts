import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { defineTool } from 'eve/tools'
import { assertWritable } from '../lib/repo'

export default defineTool({
  description:
    'Create or overwrite a text file in the repository with the complete new content. Read the file first when it already exists and preserve unrelated code. Generated files (dist, registry output) must be regenerated with repo_run_check, not edited.',
  inputSchema: {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'File path relative to the repository root.' },
      content: { type: 'string', description: 'Complete file content.' },
    },
    required: ['path', 'content'],
    additionalProperties: false,
  },
  async execute(input) {
    const filePath = String(input.path)
    const absolute = assertWritable(filePath)
    await mkdir(path.dirname(absolute), { recursive: true })
    await writeFile(absolute, String(input.content), 'utf8')
    return { path: filePath, bytes: Buffer.byteLength(String(input.content)) }
  },
})
