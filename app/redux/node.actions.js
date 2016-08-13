<<<<<<< HEAD
import { getAllSquares, getNodesFromNeighbours, getSquareId, deleteNode } from '../core/NodeFunctions';
=======
import { getAllSquares, getNodesFromNeighbours, submitData } from '../core/NodeFunctions';
>>>>>>> 05c74c0fe30672e667d89bdb684d0a1e123a7af3

export const REQ_SAVE_NODE = 'SAVE_NODE';
export const REC_SAVE_NODE = 'SAVE_NODE';
export const SAVE_NEIGHBOUR_NODES = 'SAVE_NEIGHBOUR_NODES';
export const DELETE_NODE = 'DELETE_NODE';

export function reqSaveNode() {
  return {
    type: REQ_SAVE_NODE,
  };
}

export function recSaveNode() {
  return {
    type: REC_SAVE_NODE,
  };
}

function deleteNodeRec() {
  return {
    type: DELETE_NODE,
  };
}

function saveNeighbourNodes(nodes) {
  return {
    type: SAVE_NEIGHBOUR_NODES,
    nodes,
  };
}

export function removeNode(nodeCoords) {
  return (dispatch) =>
    deleteNode(nodeCoords)
    .then(() => dispatch(deleteNodeRec()))
    .catch((e) => console.error(e));
}

export function saveNode(nodeObj) {
  return dispatch => {
    dispatch(reqSaveNode());
    submitData(nodeObj)
      .then(() => dispatch(recSaveNode()))
      .catch(e => console.error(e));
  };
}
export function getNodes(location) {
  const sqrs = getAllSquares(location);
  return dispatch =>
   getNodesFromNeighbours(sqrs)
      .then((nodes) => dispatch(saveNeighbourNodes(nodes)))
      .catch(e => console.error(e));
}
