export interface Node {
  name: string;
  children?: Node[] | any;
  collapsed?: boolean | any;
  immutable?: boolean;
}

export interface TreeNodeProps {
  node: Node;
  data: any; // Replace 'any' with the actual type of your data
  setData: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the actual type of your data
}