class Node {
  constructor(value) {
    this.value = value;
    this.leftNode = this.rightNode = null;
  }

  setLeftNode = (node) => (this.leftNode = node);
  setRightNode = (node) => (this.rightNode = node);
}

export default Node;
