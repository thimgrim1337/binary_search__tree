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

  find = (value, root = this.root) => {
    if (root === null) return null;
    if (root.value === value) return root;
    if (value < root.value) return this.find(value, root.leftNode);
    if (value > root.value) return this.find(value, root.rightNode);
  };

  getValues = (root = this.root, values = []) => {
    if (root === null) return;

    values.push(root.value);
    this.getValues(root.leftNode, values);
    this.getValues(root.rightNode, values);

    return values;
  };

  levelOrder = (func) => {
    if (func === undefined) return this.getValues();

    return func;
  };

  levelOrderIterative = (root = this.root, queue = [], visitedNodes = []) => {
    queue.push(root);

    while (queue.length) {
      if (queue[0].leftNode) queue.push(queue[0].leftNode);
      if (queue[0].rightNode) queue.push(queue[0].rightNode);

      visitedNodes.push(queue.shift().value);
    }

    return visitedNodes;
  };

  levelOrderRecursive = (root = this.root, queue = [], visitedNodes = []) => {
    if (root === null) return;

    visitedNodes.push(root.value);

    queue.push(root.leftNode);
    queue.push(root.rightNode);

    while (queue.length) {
      const currentNode = queue[0];
      queue.shift();
      this.levelOrderRecursive(currentNode, queue, visitedNodes);
    }

    return visitedNodes;
  };

  height = (root = this.root) => {
    if (root === null) return 0;

    const leftNodeHeight = this.height(root.leftNode);
    const rightNodeHeight = this.height(root.rightNode);

    if (leftNodeHeight > rightNodeHeight) return leftNodeHeight + 1;
    else return rightNodeHeight + 1;
  };

  getCurrentTreeLevel = (root, level) => {
    if (root === null) return;
    if (level === 1) return root.value;
    if (level > 1) {
      this.getCurrentTreeLevel(root.leftNode, level - 1);
      this.getCurrentTreeLevel(root.rightNode, level - 1);
    }
  };
}

const arr = [1, 7, 7, 4, 23, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
tree.insert(1000);
// tree.delete(8);
// console.log(tree.find(8));
// console.log(tree.getTreeHeight());
// console.log(tree.levelOrder());
// console.log(tree.levelOrder(tree.levelOrderIterative()));
// console.log(tree.levelOrder(tree.levelOrderRecursive()));

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

// prettyPrint(tree.root);
