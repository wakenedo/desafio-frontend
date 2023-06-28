import React from 'react';
import { addNewNodeOnSameLevel, toggleNode } from '../../nodeActions';
import { Node, TreeNodeProps } from '../../types';



const TreeNode: React.FC<TreeNodeProps> = ({ node, data, setData }) => {
  const isCollapsed = node.collapsed || false;

  const handleAddNode = () => {
    addNewNodeOnSameLevel(node.name, false, data, setData);
  };

  const handleToggleNode = () => {
    toggleNode(node, data, setData);
  };

  return (
    <div>
      {node.name !== 'Start' && (
        <React.Fragment>
          <button onClick={handleAddNode} style={{ backgroundColor: 'green', marginRight: '10px' }}>
            Add Node to {node.name}
          </button>
          <button onClick={handleToggleNode}>{isCollapsed ? 'Expand' : 'Collapse'}</button>
        </React.Fragment>
      )}
      {!isCollapsed && node.children && node.children.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {node.children.map((childNode, childIndex) => (
            <div key={childIndex} style={{ display: isCollapsed ? 'none' : 'block' }}>
              <TreeNode node={childNode} data={data} setData={setData} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
