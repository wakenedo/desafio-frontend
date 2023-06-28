import { Node } from "../types";

export const findFatherNode = (nodeName: string, node: Node): Node | null => {
  if (node.children && node.children.length > 0) {
    const targetNode = node.children.find((child: Node) => child.name === nodeName);
    if (targetNode) {
      return node;
    }
    for (let i = 0; i < node.children.length; i++) {
      const result = findFatherNode(nodeName, node.children[i]);
      if (result) {
        return result;
      }
    }
  }
  return null;
};



export const getAllNodesWithSameLevel = (nodeName: string, node: Node): Node[] => {
  let result: Node[] = [];
  if (node.name === nodeName) {
    result.push(node);
  }
  if (node.children && node.children.length > 0) {
    node.children.forEach((child: Node) => {
      result = result.concat(getAllNodesWithSameLevel(nodeName, child));
    });
  }
  return result;
};

export const setCollapsedState = (node: Node, collapsed: boolean) => {
  node.collapsed = collapsed;

  if (node.children && node.children.length > 0) {
    node.children.forEach((childNode: Node) => setCollapsedState(childNode, collapsed));
  }
};

export const initialData: Node = {
  name: 'Start',
  children: [
    {
      name: '+',
    },
    {
      name: 'Else',
      immutable: true,
    },
  ],
};
