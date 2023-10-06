import { GluegunToolbox } from 'gluegun'
import { fileNameRegex } from '../lib/utils'

module.exports = {
  name: 'create',
  description: 'Create e custom component',
  run: async (toolbox: GluegunToolbox) => {
    const {
      template: { generate },
      parameters,
      prompt,
      print,
    } = toolbox

    let componentType = parameters.first

    if (!componentType) {
      const { component } = await prompt.ask([
        {
          type: 'select',
          name: 'component',
          message: 'Select a component:',
          choices: ['Section', 'Header', 'Footer', 'Form'],
        },
      ])
      componentType = component
    }

    /* Section */
    if (componentType.match(/section/gi)) {
      let name = parameters.second

      if (!name || !name.match(fileNameRegex)) {
        const { sectionName } = await prompt.ask([
          {
            name: 'sectionName',
            type: 'input',
            message: 'Section name:',
            validate: (value) => !!value.match(fileNameRegex),
          },
        ])
        name = sectionName
      }

      const capitlizedName = name
        .split('')
        .map((letter, i) =>
          i === 0 ? letter.toUpperCase() : letter.toLowerCase()
        )
        .join('')

      try {
        await generate({
          template: 'section.ts.ejs',
          target: `src/components/sections/${capitlizedName}-Section.tsx`,
          props: { name: capitlizedName },
        })
        print.success(`${capitlizedName}-Section.tsx created successfully`)
      } catch (error) {
        print.error('An error occurred, component could not be created')
        print.muted(error)
      }
    }
  },
}
