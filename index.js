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
    this.arr = this.removeDuplicatesAndSort(arr);
    this.root = this.buildTree(this.arr);
  }

  removeDuplicatesAndSort(arr) {
    return [...new Set(arr.sort((a, b) => a - b))];
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);

    const root = new Node(arr[mid]);

    root.setLeftNode(this.buildTree(arr, start, mid - 1));
    root.setRightNode(this.buildTree(arr, mid + 1, end));

    return root;
  }

  insert(value, root = this.root) {
    if (!root) return new Node(value);
    if (value < root.value) root.setLeftNode(this.insert(value, root.leftNode));
    if (value > root.value)
      root.setRightNode(this.insert(value, root.rightNode));

    return root;
  }

  delete(value, root = this.root) {
    if (!root) return root;

    if (value < root.value) root.setLeftNode(this.delete(value, root.leftNode));
    if (value > root.value)
      root.setRightNode(this.delete(value, root.rightNode));
    else {
      if (!root.leftNode) return root.rightNode;
      if (!root.rightNode) return root.leftNode;

      root.value = this.minValue(root.rightNode);

      root.rightNode = this.delete(root.value, root.rightNode);
    }
    return root;
  }

  minValue(root) {
    let min = root.value;
    while (root.leftNode) {
      min = root.leftNode.value;
      root = root.leftNode;
    }
    return min;
  }

  find(value, root = this.root) {
    if (!root) return null;
    if (root.value === value) return root;
    if (value < root.value) return this.find(value, root.leftNode);
    if (value > root.value) return this.find(value, root.rightNode);
  }

  levelOrderIterative(
    callback,
    root = this.root,
    queue = [],
    visitedNodes = []
  ) {
    queue.push(root);

    while (queue.length) {
      if (queue[0].leftNode) queue.push(queue[0].leftNode);
      if (queue[0].rightNode) queue.push(queue[0].rightNode);

      visitedNodes.push(queue[0].value);
      if (callback) callback(queue[0]);
      queue.shift();
    }

    if (!callback) return visitedNodes;
  }

  levelOrderRecursive(
    callback,
    root = this.root,
    queue = [],
    visitedNodes = []
  ) {
    if (!root) return;

    visitedNodes.push(root.value);

    queue.push(root.leftNode);
    queue.push(root.rightNode);

    while (queue.length) {
      const currentNode = queue[0];
      if (callback) callback(currentNode);
      queue.shift();
      this.levelOrderRecursive(callback, currentNode, queue, visitedNodes);
    }

    if (!callback) return visitedNodes;
  }

  inorder(root = this.root, visitedNodes = []) {
    if (!root) return;
    this.inorder(root.leftNode, visitedNodes);
    visitedNodes.push(root.value);
    this.inorder(root.rightNode, visitedNodes);

    return visitedNodes;
  }

  preorder(root = this.root, visitedNodes = []) {
    if (!root) return;
    visitedNodes.push(root.value);
    this.preorder(root.leftNode, visitedNodes);
    this.preorder(root.rightNode, visitedNodes);

    return visitedNodes;
  }

  postorder(root = this.root, visitedNodes = []) {
    if (!root) return;
    this.postorder(root.leftNode, visitedNodes);
    this.postorder(root.rightNode, visitedNodes);
    visitedNodes.push(root.value);

    return visitedNodes;
  }

  height(root = this.root) {
    if (!root) return -1;

    let leftNodeHeight = this.height(root.leftNode);
    let rightNodeHeight = this.height(root.rightNode);

    return leftNodeHeight > rightNodeHeight
      ? leftNodeHeight + 1
      : rightNodeHeight + 1;
  }

  depth(node, root = this.root) {
    if (!root) return -1;
    let dist = -1;

    if (
      root.value === node.value ||
      (dist = this.depth(node, root.leftNode) >= 0) ||
      (dist = this.depth(node, root.rightNode)) >= 0
    )
      return dist + 1;
    return dist;
  }
}

const arr = [1, 7, 7, 4, 23, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
// tree.insert(1000);
// tree.delete(8);
// console.log(tree.find(8));
// console.log(tree.levelOrder());
// console.log(tree.levelOrderIterative());
// console.log(tree.levelOrderRecursive());
// console.log(tree.inorder());
// console.log(tree.preorder());
// console.log(tree.postorder());
const node = tree.find(324);
// console.log(tree.height(node));
console.log(tree.depth(node));

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
