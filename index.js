class Node {
  constructor(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }

  setLeftNode = (node) => (this.leftNode = node);
  setRightNode = (node) => (this.rightNode = node);
}

class Tree {
  constructor(arr) {
    this.arr = this.removeDuplicates(arr);
    this.root = this.buildTree(this.sortArray(this.arr));
  }

  removeDuplicates = (arr) => [...new Set(arr)];
  sortArray = (arr) => arr.sort((a, b) => a - b);

  buildTree = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);

    const root = new Node(arr[mid]);

    root.setLeftNode(this.buildTree(arr, start, mid - 1));
    root.setRightNode(this.buildTree(arr, mid + 1, end));

    // console.log(root);
    return root;
  };
}

const arr = [1, 7, 7, 4, 23, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);

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
