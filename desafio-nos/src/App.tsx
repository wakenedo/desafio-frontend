import React, { useState } from 'react';
import Tree, { TreeNodeProps } from 'react-d3-tree';

interface Node {
  name: string;
  children?: Node[];
}

const initialData: Node = {
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

const App: React.FC = () => {
  const [data, setData] = useState(initialData);

  const addNewNodeOnSameLevel = (nodeName: string, addPlusPlus: boolean) => {
    if (nodeName === 'Start') return; // Disable adding nodes to "Start"

    const parentNodes = getAllNodesWithSameLevel(nodeName, data);
    parentNodes.forEach((parentNode: any) => {
      const newNodeName = `${parentNode.name}.${parentNode.children.length + 1}`;
      const newNode = { name: newNodeName, children: [] };
      parentNode.children.push(newNode);

      if (addPlusPlus) {
        const plusPlusNodeName = `${newNodeName}++`;
        const plusPlusNode = { name: plusPlusNodeName, children: [] };
        newNode.children.push(plusPlusNode);
      }
    });
    setData({ ...data });
  };

  const getAllNodesWithSameLevel = (nodeName: string, node: any): any[] => {
    let result: any[] = [];
    if (node.name === nodeName) {
      result.push(node);
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach((child: any) => {
        result = result.concat(getAllNodesWithSameLevel(nodeName, child));
      });
    }
    return result;
  };

  const addNewNodeAtRootLevel = () => {
    const newNodeName = `Node.${data.children.length - 1}`;
    const newNode = { name: newNodeName, children: [] };
    data.children.splice(data.children.length - 1, 0, newNode);
    setData({ ...data });
  };

  const renderCustomNode = ({ nodeDatum }: TreeNodeProps) => {
    if (nodeDatum.name === 'Else') {
      return (
        <foreignObject width="100" height="100" x="-50" y="-50">
          <button
            style={{ backgroundColor: 'blue', color: 'white', width: '100%', height: '100%' }}
          >
            {nodeDatum.name}
          </button>
        </foreignObject>
      );
    }
    if (nodeDatum.name === 'Start') {
      return (
        <foreignObject width="100" height="100" x="-50" y="-50">
          <button
            style={{ backgroundColor: 'blue', color: 'white', width: '100%', height: '100%' }}
          >
            {nodeDatum.name}
          </button>
        </foreignObject>
      );
    }

    if (nodeDatum.name === '+') {
      return (
        <foreignObject width="100" height="100" x="-50" y="-50">
          <button
            onClick={addNewNodeAtRootLevel}
            style={{ backgroundColor: 'yellow', width: '100%', height: '100%' }}
          >
            +
          </button>
        </foreignObject>
      );
    }

    return (
      <foreignObject width="100" height="100" x="-50" y="-50">
        <button
          onClick={() => addNewNodeOnSameLevel(nodeDatum.name, false)}
          style={{ backgroundColor: 'purple', color: 'white', width: '100%', height: '100%' }}
        >
          {nodeDatum.name}
        </button>
        <button
          onClick={() => addNewNodeOnSameLevel(nodeDatum.name, true)}
          style={{ backgroundColor: 'yellow', marginRight: '10px' }}
        >
          {nodeDatum.name}++
        </button>
      </foreignObject>
    );
  };

  const renderTreeNode = (node: Node) => {
    return (
      <div>
        {node.name !== 'Start' && ( // Only render buttons for generated nodes
          <React.Fragment>
            <button
              onClick={() => addNewNodeOnSameLevel(node.name, false)}
              style={{ backgroundColor: 'green', marginRight: '10px' }}
            >
              Add Node to {node.name}
            </button>
            <button
              onClick={() => addNewNodeOnSameLevel(node.name, true)}
              style={{ backgroundColor: 'yellow', marginRight: '10px' }}
            >
              Add Node++ to {node.name}'s branch
            </button>
          </React.Fragment>
        )}
        {node.children && node.children.length > 0 && (
          <div style={{ marginLeft: '20px' }}>
            {node.children.map((childNode) => renderTree([childNode]))}
          </div>
        )}
      </div>
    );
  };

  const renderTree = (nodes: Node[]) => {
    return nodes.map((node: Node) => (
      <React.Fragment key={`node-${node.name}`}>
        {renderTreeNode(node)}
      </React.Fragment>
    ));
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Tree
        data={data}
        orientation="horizontal"
        collapsible={true}
        translate={{ x: 300, y: 100 }}
        nodeSize={{ x: 200, y: 100 }}
        renderCustomNodeElement={renderCustomNode}
      />
      <div>{renderTree(data.children || [])}</div>
    </div>
  );
};

export default App;
