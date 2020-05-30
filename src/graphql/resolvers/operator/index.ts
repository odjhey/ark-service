import {
  edgesToReturn,
  hasNextPage,
  hasPreviousPage,
} from './../../connectionHelpers'

const getOperators = (operators, args) => {
  const ops = operators.map((op) => {
    return {
      id: op.id,
      cursor: op.id,
      name: op.name,
      rarity: op.rarity,
      profession: op.profession,
      faction: {
        logo: {
          url: op.faction.logo.url,
        },
      },
      avatar: {
        url: op.avatar.url,
      },
      portrait: op.portrait,
      phases: op.phases.map((phase) => {
        return {
          phaseId: phase.phaseId,
          cost: phase.cost,
          skills: phase.skills.map((skill) => {
            if (skill) {
              return {
                skillId: skill.skillId,
                name: skill.name,
                description: skill.description,
                avatar: {
                  url: skill.avatar?.url,
                },
              }
            } else {
              return null
            }
          }),
        }
      }),
    }
  })
  return { args: args, data: ops }
}

const operatorResolvers = {
  Public: {
    operators: (parent, args, { operators }, info) => {
      return getOperators(operators, args)
    },
  },
  OperatorConnection: {
    pageInfo: (parent, args, context, info) => {
      const { first, after, last, before } = parent.args
      const edges = edgesToReturn(parent.data, before, after, first, last)
      return {
        hasNextPage: hasNextPage(parent.data, before, after, first, last),
        hasPreviousPage: hasPreviousPage(
          parent.data,
          before,
          after,
          first,
          last,
        ),
        startCursor: edges[0].cursor,
        endCursor: edges[edges.length - 1].cursor,
      }
    },
    edges: (parent) => {
      const { first, after, last, before } = parent.args
      const edges = edgesToReturn(parent.data, before, after, first, last).map(
        (p) => ({
          cursor: p.cursor,
          node: p,
        }),
      )
      return edges
    },
  },
  Query: {
    public: (parent, args, { operators }, info) => {
      return { args: args }
    },
    pageRequestOperators: (parent, args, { operators }, info) => {
      return getOperators(operators, args)
    },
  },
}

export default operatorResolvers
