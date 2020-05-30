import { mergeResolvers } from 'merge-graphql-schemas'
import { IResolvers } from 'graphql-tools'

import operator from './operator'

const resolvers: Array<IResolvers> = [operator]

export default mergeResolvers(resolvers)
