import {
  hasPreviousPage,
  hasNextPage,
  edgesToReturn,
} from './../../src/graphql/connectionHelpers'

const givenAllEdges = [
  {
    cursor: '1',
    name: 'Amiya',
    role: 'Caster',
  },
  {
    cursor: '2',
    name: 'Chen',
    role: 'Guard',
  },
  {
    cursor: '3',
    name: 'Blaze',
    role: 'AOE Guard',
  },
  {
    cursor: '4',
    name: 'Ethan',
    role: 'CC',
  },
  {
    cursor: '5',
    name: 'Breeze',
    role: 'Medic',
  },
  {
    cursor: '6',
    name: 'Saria',
    role: 'Healing Tank',
  },
  {
    cursor: '7',
    name: 'Panda',
    role: 'Pusher',
  },
]

describe('must follow the graphql relay connection spec', () => {
  it('should return all if no cursor and no pagination', () => {
    const edges = edgesToReturn(givenAllEdges)
    expect(edges).toEqual(givenAllEdges)
  })
  it('should get first after breeze', () => {
    const edges = edgesToReturn(givenAllEdges, null, '5', 1, null)
    expect(edges).toEqual([
      {
        cursor: '6',
        name: 'Saria',
        role: 'Healing Tank',
      },
    ])
  })
  it('should get first 2 after Ethan', () => {
    const edges = edgesToReturn(givenAllEdges, null, '4', 2, null)
    expect(edges).toEqual([
      {
        cursor: '5',
        name: 'Breeze',
        role: 'Medic',
      },
      {
        cursor: '6',
        name: 'Saria',
        role: 'Healing Tank',
      },
    ])
  })
  it('should get last 3 after Ethan', () => {
    const edges = edgesToReturn(givenAllEdges, null, '4', null, 2)
    expect(edges).toEqual([
      {
        cursor: '6',
        name: 'Saria',
        role: 'Healing Tank',
      },
      {
        cursor: '7',
        name: 'Panda',
        role: 'Pusher',
      },
    ])
  })
  it('should error when supplied with a negative first', () => {
    expect(() => {
      edgesToReturn(givenAllEdges, null, null, -1, null)
    }).toThrow('Argument first cannot be negative.')
  })
  //  it('should error when supplied with a first longer than total length', () => {
  //    expect(() => {
  //      edgesToReturn(givenAllEdges, null, null, 999, null)
  //    }).toThrow('Object length is greater than requested length.')
  //  })
  it('should return first 3', () => {
    const edges = edgesToReturn(givenAllEdges, null, null, 3, null)
    expect(edges).toEqual([
      {
        cursor: '1',
        name: 'Amiya',
        role: 'Caster',
      },
      {
        cursor: '2',
        name: 'Chen',
        role: 'Guard',
      },
      {
        cursor: '3',
        name: 'Blaze',
        role: 'AOE Guard',
      },
    ])
  })
  it('should throw when first and last argument are used together', () => {
    expect(() => {
      edgesToReturn(givenAllEdges, null, null, 3, 1)
    }).toThrow('Arguments first and last cannot be used together.')
  })
  it('should error when supplied with a negative last', () => {
    expect(() => {
      edgesToReturn(givenAllEdges, null, null, null, -1)
    }).toThrow('Argument last cannot be negative.')
  })
  it('should return last 2', () => {
    const edges = edgesToReturn(givenAllEdges, null, null, null, 2)
    expect(edges).toEqual([
      {
        cursor: '6',
        name: 'Saria',
        role: 'Healing Tank',
      },
      {
        cursor: '7',
        name: 'Panda',
        role: 'Pusher',
      },
    ])
  })
  it('should return last 3', () => {
    const edges = edgesToReturn(givenAllEdges, null, null, null, 3)
    expect(edges).toEqual([
      {
        cursor: '5',
        name: 'Breeze',
        role: 'Medic',
      },
      {
        cursor: '6',
        name: 'Saria',
        role: 'Healing Tank',
      },
      {
        cursor: '7',
        name: 'Panda',
        role: 'Pusher',
      },
    ])
  })
  it('should return after breeze', () => {
    const edges = edgesToReturn(givenAllEdges, null, '5', null, null)
    expect(edges).toEqual([
      {
        cursor: '6',
        name: 'Saria',
        role: 'Healing Tank',
      },
      {
        cursor: '7',
        name: 'Panda',
        role: 'Pusher',
      },
    ])
  })
  it('should return before breeze', () => {
    const edges = edgesToReturn(givenAllEdges, '5', null, null, null)
    expect(edges).toEqual([
      {
        cursor: '1',
        name: 'Amiya',
        role: 'Caster',
      },
      {
        cursor: '2',
        name: 'Chen',
        role: 'Guard',
      },
      {
        cursor: '3',
        name: 'Blaze',
        role: 'AOE Guard',
      },
      {
        cursor: '4',
        name: 'Ethan',
        role: 'CC',
      },
    ])
  })
})

describe('pageInfo tests', () => {
  it('should yield yes cause has next page after first 6 ', () => {
    expect(hasNextPage(givenAllEdges, null, null, 6)).toBe(true)
  })
  it('should yield yes cause has next page after breeze  ', () => {
    expect(hasNextPage(givenAllEdges, null, '5', 1)).toBe(true)
  })
  it('should yield no cause no next page after last 1', () => {
    expect(hasNextPage(givenAllEdges, null, null, null, 1)).toBe(false)
  })
  it('should yield no cause has no next page', () => {
    expect(hasNextPage(givenAllEdges, null, null, 9)).toBe(false)
  })
  it('should yield no cause no previous page', () => {
    expect(hasPreviousPage(givenAllEdges, null, null, null, 8)).toBe(false)
  })
  it('should yield yes cause has previous page', () => {
    expect(hasPreviousPage(givenAllEdges, null, null, null, 1)).toBe(true)
  })
})
