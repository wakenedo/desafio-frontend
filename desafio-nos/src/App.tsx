import React, { useState } from 'react';
import Tree, { TreeNodeProps } from 'react-d3-tree';
import styles from './styles/customTree.module.css'
import { getAllNodesWithSameLevel, initialData } from './helpers/treeHelpers';
import { deleteNode, addNewNodeOnSameLevel, addNewNodeAtRootLevel, toggleNode } from './nodeActions';
import CustomLink from './components/CustomLink';

import { Node } from './types';
import TreeNode from './components/TreeNode';
import CustomNode from './components/CustomNode';

const App: React.FC = () => {
  const [data, setData] = useState<Node>(initialData);
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Tree
        data={data}
        translate={{ x: 200, y: 200 }}

        collapsible={true}
        renderCustomNodeElement={(props) => <CustomNode {...props} data={data} setData={setData} />}
        renderCustomLinkElement={CustomLink}
        className={styles['rd3t-link']}
      />
      {/* Render the tree nodes using the TreeNode component */}
      <div>
        {data.children && data.children.length > 0 &&
          data.children.map((childNode, childIndex) => (
            <TreeNode key={childIndex} node={childNode} data={data} setData={setData} />
          ))}
      </div>
    </div>
  );
};

export default App;
