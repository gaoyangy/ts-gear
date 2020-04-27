import { Options } from 'prettier'

import { IProject, fetchRequester, axiosRequester } from 'ts-gear'

const prettierConfig: Options = {
  semi: false,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'all',
  jsxBracketSameLine: false,
}

const projects: IProject[] = [
  {
    name: 'pet',
    dest: './service',
    source: '../fixture/pet.json',
    requester: fetchRequester(),
    prettierConfig,
    // source: 'http://petstore.swagger.io/v2/swagger.json',
  },
  {
    name: 'projectE',
    dest: './service',
    source: '../fixture/projectE.json',
    keepGeneric: true,
    requester: axiosRequester(),
    prettierConfig,
  },
]

export default projects
