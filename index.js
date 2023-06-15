import Tree from './Tree.js';

function createNumberArray() {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(randomNumber(100));
  }
  return arr;
}

function randomNumber(upperLimit) {
  return Math.floor(Math.random() * upperLimit);
}

function testTree(arr) {
  const tree = new Tree(arr);
  console.log(`Is tree balanced: ${tree.isBalanced()}`);
  console.log(`levelOrder: ${tree.levelOrderRecursive()}`);
  console.log(`preorder: ${tree.preorder()}`);
  console.log(`inorder: ${tree.inorder()}`);
  console.log(`postorder: ${tree.postorder()}`);
  tree.insert(101);
  console.log(`Added 101`);
  tree.insert(201);
  console.log(`Added 201`);
  tree.insert(301);
  console.log(`Added 301`);
  console.log(`Is tree balanced: ${tree.isBalanced()}`);
  console.log('Rebalancing the tree');
  tree.rebalance();
  console.log(`Is tree balanced: ${tree.isBalanced()}`);
  console.log(`levelOrder: ${tree.levelOrderRecursive()}`);
  console.log(`preorder: ${tree.preorder()}`);
  console.log(`inorder: ${tree.inorder()}`);
  console.log(`postorder: ${tree.postorder()}`);

  prettyPrint(tree.root);
}

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

const arr = createNumberArray();
testTree(arr);
