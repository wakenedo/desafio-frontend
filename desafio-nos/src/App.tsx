import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import './styles/customTree.module.css'
import { initialData } from './helpers/treeHelpers';


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
        renderCustomNodeElement={(props) => <CustomNode {...props} data={data} setData={setData} node={props.nodeDatum} />}
      />
      {/* Render the tree nodes using the TreeNode component */}
      <div>
        {data.children && data.children.length > 0 &&
          data.children.map((childNode: Node, childIndex: number) => (
            <TreeNode key={childIndex} node={childNode} data={data} setData={setData} />
          ))}
      </div>
    </div>
  );
};

export default App;
