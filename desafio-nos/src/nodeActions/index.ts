import { Node } from '../types';
import { findFatherNode, getAllNodesWithSameLevel, setCollapsedState } from '../helpers/treeHelpers';

export const deleteNode = (
  nodeName: string,
  nodeDatum: Node,
  data: Node,
  setData: React.Dispatch<React.SetStateAction<Node>>
) => {
  const updatedData = { ...data };
  const fatherNode = findFatherNode(nodeName, updatedData);
  if (fatherNode) {
    const targetNodeIndex = fatherNode.children.findIndex((child) => child.name === nodeName);
    if (targetNodeIndex !== -1) {
      fatherNode.children.splice(targetNodeIndex, 1);
      if (fatherNode.children.length === 0) {
        deleteNode(fatherNode.name, nodeDatum, updatedData, setData);
      }
    }
  }
  setData(updatedData);
};


export const addNewNodeOnSameLevel = (nodeName: string, addPlusPlus: boolean, data: Node, setData: React.Dispatch<React.SetStateAction<Node>>) => {
  if (nodeName === 'Start') return;

  const parentNodes = getAllNodesWithSameLevel(nodeName, data);

  parentNodes.forEach((parentNode: Node) => {
    const newNodeIndex = parentNode.children?.length;
    const newNodeName = `${nodeName} ${newNodeIndex}`;
    const fatherNodeName = `${newNodeName}FatherNode`;

    const fatherNode: Node = {
      name: fatherNodeName,
      children: [],
      collapsed: true,
    };
    const newNode: Node = {
      name: newNodeName,
      children: [],
      collapsed: true,
    };

    fatherNode.children?.push(newNode);
    parentNode.children?.push(fatherNode);

    if (addPlusPlus) {
      const plusPlusNodeName = `${newNodeName}++`;
      const plusPlusNode: Node = {
        name: plusPlusNodeName,
        children: [],
        collapsed: true,
      };
      newNode.children?.push(plusPlusNode);
    }
  });

  setData({ ...data });
};

export const addNewNodeAtRootLevel = (data: Node, setData: React.Dispatch<React.SetStateAction<Node>>) => {
  const newNodeName = `Node.${data.children.length - 1}`;
  const fatherNodeName = `${newNodeName}FatherNode`;
  const fatherNode: Node = { name: fatherNodeName, children: [], collapsed: true };
  const pointerNodeName = `${newNodeName}++`;
  const pointerNode: Node = { name: pointerNodeName, children: [], collapsed: true };
  const newNode: Node = {
    name: newNodeName,
    children: [pointerNode],
    collapsed: true,
  };

  fatherNode.children?.push(newNode);
  data.children?.unshift(fatherNode);

  setData({ ...data });
};

export const toggleNode = (node: Node, data: Node, setData: React.Dispatch<React.SetStateAction<Node>>) => {
  node.collapsed = !node.collapsed;
  if (node.children && node.children.length > 0) {
    node.children.forEach((childNode) => {
      setCollapsedState(childNode, node.collapsed);
    });
  }
  setData({ ...data });
};
