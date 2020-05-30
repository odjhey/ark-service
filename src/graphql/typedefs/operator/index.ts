import { gql } from 'apollo-server'

const typeDefs = gql`
  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String!
    endCursor: String!
  }

  type Operator implements Node {
    id: ID!
    name: String
    avatar: Image
    portrait: Image
    faction: Faction
    rarity: String
    profession: String
    phases: [Phase]
  }

  type Faction {
    logo: Image
  }

  type OperatorEdge {
    node: Operator
    cursor: String!
  }

  type OperatorConnection {
    pageInfo: PageInfo!
    edges: [OperatorEdge]
  }

  type Phase {
    phaseId: String
    cost: [Cost]
    skills: [Skill]
  }

  type Cost {
    costId: String
    count: Int
    type: String
    avatar: Image
  }

  type Skill {
    skillId: String
    name: String
    description: String
    avatar: Image
  }

  type Image {
    url: String
  }

  type Public {
    operators(
      first: Int
      after: String
      last: Int
      before: String
    ): OperatorConnection
  }

  type Query {
    public: Public
  }

  type Query {
    pageRequestOperators(
      first: Int
      after: String
      last: Int
      before: String
    ): OperatorConnection
  }
`

export default typeDefs
