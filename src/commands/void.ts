import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'void',
  run: async (toolbox) => {
    const { print } = toolbox

    print.highlight('Welcome to Void CLI')
    print.info('void init   - Initialize default project')
    print.info('void create - Create a custom component')
  },
}

module.exports = command
