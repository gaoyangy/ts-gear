import { getGlobal } from '../projectGlobalVariable'
import { IProject } from '../interface'

export const importAllDefinition = (project: IProject) => {
  const { requestRefSet } = getGlobal(project)
  const refSet = new Set<string>()
  Array.from(requestRefSet).forEach(name => {
    name
      .split(/<|>|,/)
      .filter(Boolean)
      .forEach(n => {
        refSet.add(n)
      })
  })
  const importNames = Array.from(refSet)
  return `import { ${importNames.join(',')} } from './definition'`
}
