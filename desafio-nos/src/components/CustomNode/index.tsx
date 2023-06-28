import React from 'react';

import { Node, TreeNodeProps } from '../../types';
import { getAllNodesWithSameLevel } from '../../helpers/treeHelpers';
import { addNewNodeAtRootLevel, addNewNodeOnSameLevel, deleteNode } from '../../nodeActions';

interface CustomNodeProps extends TreeNodeProps {
  nodeDatum: any
  toggleNode: (nodeDatum: any) => void;
  data: Node; // The data prop
  setData: React.Dispatch<React.SetStateAction<Node>>; // The setData prop
}

const CustomNode: React.FC<CustomNodeProps> = ({ nodeDatum, toggleNode, data, setData }) => {
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

  if (nodeDatum.name === '+') {
    return (
      <foreignObject width="100" height="100" x="" y="-15">
        <button
          onClick={() => addNewNodeAtRootLevel(data, setData)} // Updated onClick handler
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
            width: '50%',
            height: '50%',
            borderRadius: '50%',
            margin: '0px',
          }}
        >
          <div style={{ fontSize: '14px', textAlign: 'center', textTransform: 'uppercase', paddingTop: '15px', fontWeight: 'bold' }}>Start</div>
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
            width: '50%',
            height: '50%',
            borderRadius: '50%',
            margin: '0px',
          }}
        >
          <div style={{ fontSize: '14px', textAlign: 'center', textTransform: 'uppercase', paddingTop: '15px', fontWeight: 'bold' }}>Else</div>
        </div>
      </foreignObject>
    );
  }



  if (nodeDatum.name.endsWith('++')) {
    const parentNodeName = nodeDatum.name.slice(0, -2);
    const parentNode = getAllNodesWithSameLevel(parentNodeName, data)[0];
    const nodeIndex = parentNode.children?.findIndex((child: Node) => child.name === nodeDatum.name);

    return (
      <foreignObject width="100" height="100" x="" y="-15">
        <button
          onClick={() => addNewNodeOnSameLevel(parentNodeName, true, data, setData)}
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
                <span className="icon" style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}>
                  {collapsedIcon}
                </span>
              ) : null}
            </div>
          </button>
        </foreignObject>
      )}

      {!isFatherNode && (
        <foreignObject width="100" height="100" x="-50" y="-50">
          <div style={{ padding: '5px 8px', margin: '10px 12px', backgroundColor: '#f3f3f3f3', position: 'absolute', boxShadow: '0 0 3px' }}>
            <div style={{ textAlign: 'center', fontSize: '9px', color: '#494949' }}>{nodeDatum.name}</div>
          </div>
          <div style={defaultNodeStyle}>
            <div style={{ width: '100%', height: '100%' }}>
              <img style={{
                width: '18px', margin: '13px 19px'
              }} src="https://i.ibb.co/Dwrkr0j/Group-251.png" alt="" />
              {!isFatherNode && nodeDatum.children && nodeDatum.children.length === 1 ? (
                <button
                  onClick={() => deleteNode(nodeDatum.name, nodeDatum, data, setData)} // Call deleteNode function on button click
                  style={{ cursor: 'pointer', background: 'transparent', border: '0px', width: '20%', height: '20%', position: 'absolute', fontSize: '12px', margin: '-6px 35px' }}
                >
                  <img style={{ width: '15px' }} src="https://i.ibb.co/BfYJTBz/Group-252.png" alt="" />
                </button>
              ) : null}
            </div>


          </div>
        </foreignObject>
      )}
    </g >
  );
};


export default CustomNode;