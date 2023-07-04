/*
 * @Description:
 * @Author: alien
 * @FilePath: /ts-gear/src/content/projectIndex.ts
 * @Date: 2023-06-15 10:34:32
 * @LastEditors: alien
 * @LastEditTime: 2023-07-04 16:21:31
 */
import { config } from '../constant'

/** use a index.ts file to export all */
export const projectIndex = (mode: any) => {
  if (mode === 'object') {
    return ["import * as all from './request'", "export * from './definition'", 'export default all'].join(config.EOL)
  }
  return ["export * from './request'", "export * from './definition'"].join(config.EOL)
}
