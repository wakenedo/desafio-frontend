import React, { useState } from 'react';
import Tree, { TreeNodeProps } from 'react-d3-tree';
import styles from './styles/customTree.module.css'

interface Node {
  name: string;
  children?: Node[];
  collapsed?: boolean;
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
  const [data, setData] = useState<Node>(initialData);

  const addNewNodeOnSameLevel = (nodeName: string, addPlusPlus: boolean) => {
    if (nodeName === 'Start') return;

    const parentNodes = getAllNodesWithSameLevel(nodeName, data);

    parentNodes.forEach((parentNode: Node) => {
      const newNodeIndex = parentNode.children.length;
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

      fatherNode.children.push(newNode);
      parentNode.children.push(fatherNode);

      if (addPlusPlus) {
        const plusPlusNodeName = `${newNodeName}++`;
        const plusPlusNode: Node = {
          name: plusPlusNodeName,
          children: [],
          collapsed: true,
        };
        newNode.children.push(plusPlusNode);
      }
    });

    setData({ ...data });
  };

  const getAllNodesWithSameLevel = (nodeName: string, node: Node): Node[] => {
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

  const addNewNodeAtRootLevel = () => {
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

    fatherNode.children.push(newNode);
    data.children.unshift(fatherNode);

    setData({ ...data });
  };

  const toggleNode = (node: Node) => {
    node.collapsed = !node.collapsed;
    if (node.children && node.children.length > 0) {
      node.children.forEach((childNode) => {
        setCollapsedState(childNode, node.collapsed);
      });
    }
    setData({ ...data });
  };

  const setCollapsedState = (node: Node, collapsed: boolean) => {
    node.collapsed = collapsed;

    if (node.children && node.children.length > 0) {
      node.children.forEach((childNode) => setCollapsedState(childNode, collapsed));
    }
  };

  const renderCustomNode = ({ nodeDatum, toggleNode }: TreeNodeProps) => {
    const fatherNodeStyle = {
      backgroundColor: '#dde2fff8',
      color: '#4a5387f8',
      width: '30%',
      height: '30%',
      borderRadius: '50%',
      margin: '35px 35px',
      border: '0px solid',
    };

    const defaultNodeStyle = {
      backgroundColor: '#3773ff',
      color: '#7d7d7d7d',
      width: '50%',
      height: '50%',
      borderRadius: '50%',
      margin: '30px 30px',
    };

    const iconStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };

    if (nodeDatum.name === '+') {
      return (
        <foreignObject width="100" height="100" x="" y="-15">
          <button
            onClick={() => addNewNodeAtRootLevel()}
            style={{
              backgroundColor: 'transparent',
              width: '30%',
              height: '30%',
              borderRadius: '50%',
              borderStyle: 'dashed',
              borderColor: '#7b7b7b',
              color: '#7b7b7b',
            }}
          >
            <div style={{ fontSize: '22px' }}>+</div>
          </button>
        </foreignObject>
      );
    }
    if (nodeDatum.name === 'Start') {
      return (
        <foreignObject width="100" height="100" x="-25" y="-25">
          <div
            style={{
              backgroundColor: '#2a53b1',
              color: 'white',
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              margin: '0px',
            }}
          >
            <div style={{ fontSize: '17px', textAlign: 'center', textTransform: 'uppercase', paddingTop: '18px', fontWeight: 'bold' }}>Start</div>
          </div>
        </foreignObject>
      );
    }
    if (nodeDatum.name === 'Else') {
      return (
        <foreignObject width="100" height="100" x="-25" y="-25">
          <div
            style={{
              backgroundColor: '#2a53b1',
              color: 'white',
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              margin: '0px',
            }}
          >
            <div style={{ fontSize: '17px', textAlign: 'center', textTransform: 'uppercase', paddingTop: '18px', fontWeight: 'bold' }}>Else</div>
          </div>
        </foreignObject>
      );
    }

    if (nodeDatum.name.endsWith('++')) {
      const parentNodeName = nodeDatum.name.slice(0, -2);
      const parentNode = getAllNodesWithSameLevel(parentNodeName, data)[0];
      const nodeIndex = parentNode.children.findIndex((child: Node) => child.name === nodeDatum.name);

      return (
        <foreignObject width="100" height="100" x="" y="-15">
          <button
            onClick={() => addNewNodeOnSameLevel(parentNodeName, true)}
            style={{
              backgroundColor: 'transparent',
              width: '30%',
              height: '30%',
              borderRadius: '50%',
              borderStyle: 'dashed',
              borderColor: '#7b7b7b',
              color: '#7b7b7b',
            }}
          >
            <div style={{ fontSize: '22px' }}>
              {nodeIndex === parentNode.children.length - 1 ? '+' : '+'}
            </div>
          </button>
        </foreignObject>
      );
    }

    const isFatherNode = nodeDatum.name.includes('FatherNode');
    const collapsedIcon = nodeDatum.collapsed ? '>' : '<';

    return (
      <g>
        {isFatherNode && (
          <foreignObject width="100" height="100" x="-50" y="-50">
            <button
              onClick={() => toggleNode(nodeDatum)}
              style={fatherNodeStyle}
              className={nodeDatum.collapsed ? 'collapsed' : ''}
            >
              <div>
                <div style={{ paddingTop: '25px', textAlign: 'center', display: 'none' }}>
                  {nodeDatum.name}
                </div>
                {nodeDatum.collapsed ? (
                  <span className="icon" style={iconStyle}>
                    {collapsedIcon}
                  </span>
                ) : null}
              </div>
            </button>
          </foreignObject>
        )}

        {!isFatherNode && (
          <foreignObject width="100" height="100" x="-50" y="-50">
            <div style={{ padding: '10px', margin: '10px', backgroundColor: '#f3f3f3f3', position: 'absolute', boxShadow: '0 0 3px' }}>
              <div style={{ textAlign: 'center', fontSize: '8px' }}>{nodeDatum.name}</div>
            </div>
            <div style={defaultNodeStyle}>
              <div style={{ width: '100%', height: '100%' }}>
                <img style={{
                  width: '18px', margin: '13px 19px'
                }} src="https://i.ibb.co/Dwrkr0j/Group-251.png" alt="" />
              </div>
            </div>
          </foreignObject>
        )}
      </g>
    );
  };

  const renderCustomLink = ({ source, target, path, linkDatum }: any) => {
    const linkStyles = {
      stroke: linkDatum.target.data.collapsed ? 'red' : '#999',
      strokeWidth: 2,
      fill: 'none',
      strokeDasharray: linkDatum.target.data.collapsed ? '2 2' : '5 5',
      projection: 'diagonal', // Add the projection property here
    };

    return (
      <g>
        <path d={path({ source, target })} style={linkStyles} />
      </g>
    );
  };



  const renderTreeNode = (node: Node, index: number) => {
    const isCollapsed = node.collapsed || false;

    return (
      <div key={index}>
        {node.name !== 'Start' && (
          <React.Fragment>
            <button
              onClick={() => addNewNodeOnSameLevel(node.name, false)}
              style={{ backgroundColor: 'green', marginRight: '10px' }}
            >
              Add Node to {node.name}
            </button>
            <button onClick={() => toggleNode(node)}>
              {isCollapsed ? 'Expand' : 'Collapse'}
            </button>
          </React.Fragment>
        )}
        {!isCollapsed && node.children && node.children.length > 0 && (
          <div style={{ marginLeft: '20px' }}>
            {node.children.map((childNode, childIndex) => (
              <div key={childIndex} style={{ display: isCollapsed ? 'none' : 'block' }}>
                {renderTreeNode(childNode, childIndex)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Tree
        data={data}
        translate={{ x: 200, y: 200 }}
        collapsible={true}
        renderCustomNodeElement={(props) => renderCustomNode(props)}
        renderCustomLinkElement={(props) => renderCustomLink(props)}
        className={styles['rd3t-link']}
      />
    </div>
  );
};

export default App;
