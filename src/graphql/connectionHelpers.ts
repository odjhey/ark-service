//EdgesToReturn(allEdges, before, after, first, last)
const edgesToReturn = (allEdges, before?, after?, first?, last?) => {
  if (first && last) {
    throw new Error('Arguments first and last cannot be used together.')
  }

  //Let edges be the result of calling ApplyCursorsToEdges(allEdges, before, after).
  let edges = [...applyCursorsToEdges(allEdges, before, after)]

  //If first is set:
  if (first) {
    //If first is less than 0:
    //Throw an error.
    if (first < 0) {
      throw new Error('Argument first cannot be negative.')
    }
    //If edges has length greater than than first:
    //Slice edges to be of length first by removing edges from the end of edges.
    if (edges.length > first) {
      edges = [...edges.slice(0, first)]
    }
  }

  //If last is set:
  if (last) {
    //If last is less than 0:
    //Throw an error.
    if (last < 0) {
      throw new Error('Argument last cannot be negative.')
    }
    //If edges has length greater than than last:
    //Slice edges to be of length last by removing edges from the start of edges.
    if (edges.length > last) {
      edges = [...edges.slice(edges.length - last)]
    }
  }
  //Return edges.
  return edges
}

//ApplyCursorsToEdges(allEdges, before, after)
const applyCursorsToEdges = (allEdges, before, after) => {
  //Initialize edges to be allEdges.
  let edges = allEdges

  //If after is set:
  if (after) {
    //Let afterEdge be the edge in edges whose cursor is equal to the after argument.
    const afterEdgeIdx = edges.findIndex((e) => {
      return e.cursor === after
    })
    //If afterEdge exists:
    //Remove all elements of edges before and including afterEdge.
    if (afterEdgeIdx !== -1) {
      edges = [...edges.slice(afterEdgeIdx + 1)]
    }
  }

  //If before is set:
  if (before) {
    //Let beforeEdge be the edge in edges whose cursor is equal to the before argument.
    const beforeEdgeIdx = edges.findIndex((e) => {
      return e.cursor === before
    })

    //If beforeEdge exists:
    //Remove all elements of edges after and including beforeEdge.
    if (beforeEdgeIdx !== -1) {
      edges = [...edges.slice(0, beforeEdgeIdx)]
    }
  }

  //Return edges.
  return edges
}

//HasPreviousPage(allEdges, before, after, first, last)
const hasPreviousPage = (allEdges, before?, after?, first?, last?) => {
  //If last is set:
  //Let edges be the result of calling ApplyCursorsToEdges(allEdges, before, after).
  //If edges contains more than last elements return true, otherwise false.
  if (last) {
    const edges = [...applyCursorsToEdges(allEdges, before, after)]
    if (edges.length > last) {
      return true
    }
  }

  //If after is set:
  //If the server can efficiently determine that elements exist prior to after, return true.
  if (after) {
    return true //????
  }

  //Return false.
  return false
}

//HasNextPage(allEdges, before, after, first, last)
const hasNextPage = (allEdges, before?, after?, first?, last?) => {
  //If first is set:
  //Let edges be the result of calling ApplyCursorsToEdges(allEdges, before, after).
  //If edges contains more than first elements return true, otherwise false.
  if (first) {
    const edges = [...applyCursorsToEdges(allEdges, before, after)]
    if (edges.length > first) {
      return true
    } else {
      return false
    }
  }

  //If before is set:
  //If the server can efficiently determine that elements exist following before, return true.
  if (before) {
    return true //???
  }

  //Return false.
  return false
}

export { edgesToReturn, hasPreviousPage, hasNextPage }
