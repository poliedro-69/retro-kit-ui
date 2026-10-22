import { defineTool } from 'eve/tools'
import { runCommand, resolveInsideRepo } from '../lib/repo'

export default defineTool({
  description:
    'Search the repository with a regular expression (git grep). Use it to find an equivalent component, registry entries or exports before editing.',
  inputSchema: {
    type: 'object',
    properties: {
      pattern: { type: 'string', description: 'Extended regular expression.' },
      directory: { type: 'string', description: 'Optional directory to limit the search.' },
    },
    required: ['pattern'],
    additionalProperties: false,
  },
  async execute(input) {
    const directory = typeof input.directory === 'string' && input.directory ? input.directory : '.'
    resolveInsideRepo(directory)
    const result = await runCommand('git', [
      'grep',
      '-n',
      '-I',
      '-E',
      '--untracked',
      '-e',
      String(input.pattern),
      '--',
      directory,
    ])
    return { matches: result.output.split('\n').filter(Boolean).slice(0, 120) }
  },
})
