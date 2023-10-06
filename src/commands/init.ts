import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'init',
  description: 'Initialize default project config',
  run: async (toolbox: GluegunToolbox) => {
    const {
      template: { generate },
      filesystem: { file, remove, exists },
      prompt,
      print,
    } = toolbox

    if (!exists('next.config.js') || !exists('next-env.d.ts')) {
      /* Checks if it's being executed in a Next project
       * TODO: Check through dependency list
       *
       * "dependencies": {
       *   "react": "^18",
       *   "react-dom": "^18",
       *   "next": "13.5.4"
       * },
       */
      print.error('Please start a Next project first')
      return
    }

    try {
      if (!(await prompt.confirm('Continue the initialization?', false))) return

      /* Remove default files */
      const filesToRemove = [
        'src/app/favicon.ico',
        'public/next.svg',
        'public/vercel.svg',
      ]

      filesToRemove.forEach((file) => remove(file))

      /* Creates default css file */
      file('src/app/globals.css', {
        content: `@tailwind base; 
@tailwind components;
@tailwind utilities;

body {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}`,
      })

      /* Creates default components */
      await generate({
        template: 'container.ts.ejs',
        target: `src/components/Container.tsx`,
      })

      await generate({
        template: 'void-logo.ts.ejs',
        target: `src/components/Void-Logo.tsx`,
      })

      print.success(`Default project set`)
    } catch (error) {
      print.error('An error occurred, project could not be initialized')
      print.muted(error)
    }
  },
}
