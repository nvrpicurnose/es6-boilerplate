import { get } from 'lodash'

import testAsset from './assets/test.json'
import testScript from './utils/test'

console.log(get(testScript, 'test')) // hello world!
console.log(get(testAsset, 'test')) // testing 123!
