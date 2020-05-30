require('dotenv').config()

import express from 'express'
import charTable from './data/character_table.json'
import skillTable from './data/skill_table.json'
import itemTable from './data/item_table.json'
import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from './graphql'

const { PORT, HOST } = process.env
//const HOST_W_PORT = 'http://' + HOST + ':' + PORT + '/'
const HOST_W_PORT = HOST + ':' + PORT + '/'
console.log('host_w_port', HOST_W_PORT)

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context: (session) => {
    const characters = Object.keys(charTable).map((key) => {
      return { id: key, data: charTable[key] }
    })

    const charsSimple = characters
      .reverse()
      .filter((c) => {
        if (c.data.profession === 'TRAP' || c.data.profession === 'TOKEN') {
          return false
        }
        return true
      })
      .map((c, idx) => {
        return {
          idx: idx,
          id: c.id,
          name: c.data.name,
          rarity: c.data.rarity,
          profession: c.data.profession,
          avatar: { url: HOST_W_PORT + 'assets/avatars/' + c.id + '.png' },
          portrait: {
            url: HOST_W_PORT + 'assets/portraits/' + c.id + '_1.png',
          },
          faction: {
            logo: {
              url:
                HOST_W_PORT + 'assets/factions/' + c.data.displayLogo + '.png',
            },
          },
          phases: c.data.phases.map((phase, phaseIdx) => {
            return {
              phaseId: 'E' + phaseIdx,
              cost: phase.evolveCost?.map((cost) => {
                const item = itemTable.items[cost.id]
                return {
                  costId: cost.id,
                  count: cost.count,
                  type: cost.type,
                  avatar: {
                    url: HOST_W_PORT + 'assets/items/' + item.iconId + '.png',
                  },
                }
              }),
              skills: c.data.skills
                .filter((skill) => {
                  return phaseIdx >= skill.unlockCond.phase
                })
                .map((skill) => {
                  return skillTable[skill.skillId]?.levels.map(
                    (skillLevel, idx) => {
                      return {
                        skillId: skill.skillId,
                        avatar: {
                          url:
                            HOST_W_PORT +
                            'assets/skills/skill_icon_' +
                            skill.skillId +
                            '.png',
                        },
                        name: skillLevel.name,
                        description: skillLevel.description,
                      }
                    },
                  )[0]
                }),
            }
          }),
        }
      })

    return {
      operators: charsSimple,
    }
  },
})

const app = express()
app.use('/assets', express.static('public'))

server.applyMiddleware({ app })

app.listen(PORT || 3000, () => {
  console.log(`listening to ${PORT || 3000}`)
})
