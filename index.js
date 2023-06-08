class Node {
  constructor(value) {
    this.value = value;
    this.leftNode = this.rightNode = null;
  }

  setLeftNode = (node) => (this.leftNode = node);
  setRightNode = (node) => (this.rightNode = node);
}

class Tree {
  constructor(arr) {
    if (arr === undefined) return null;
    this.arr = this.sortArray(this.removeDuplicates(arr));
    this.root = this.buildTree(this.arr);
  }

  removeDuplicates = (arr) => [...new Set(arr)];
  sortArray = (arr) => arr.sort((a, b) => a - b);

  buildTree = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);

    const root = new Node(arr[mid]);

    root.setLeftNode(this.buildTree(arr, start, mid - 1));
    root.setRightNode(this.buildTree(arr, mid + 1, end));

    return root;
  };

  insert = (value, root = this.root) => {
    if (root === null) return (root = new Node(value));
    if (value < root.value) root.setLeftNode(this.insert(value, root.leftNode));
    if (value > root.value)
      root.setRightNode(this.insert(value, root.rightNode));
    return root;
  };

  delete = (value, root = this.root) => {
    if (root === null) return root;

    if (value < root.value) root.setLeftNode(this.delete(value, root.leftNode));
    if (value > root.value)
      root.setRightNode(this.delete(value, root.rightNode));
    else {
      if (root.leftNode === null) return root.rightNode;
      if (root.rightNode === null) return root.leftNode;

      root.value = this.minValue(root.rightNode);

      root.rightNode = this.delete(root.value, root.rightNode);
    }
    return root;
  };

  minValue = (root) => {
    let min = root.value;
    while (root.leftNode !== null) {
      min = root.leftNode.value;
      root = root.leftNode;
    }
    return min;
  };
}

const arr = [1, 7, 7, 4, 23, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
tree.insert(1000);
tree.delete(6345);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(tree.root);
