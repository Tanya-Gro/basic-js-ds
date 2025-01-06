const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(data = null) {
    this.head = data;
  }
  root() {
    return this.head;
  }

  add(data) {
    const addNode = function(node, data) {
      if (!node) return new Node(data);
      if(node.data === data) return node;
      if(data < node.data) node.left = addNode(node.left, data);
      else node.right = addNode(node.right, data);
      return node;
    }
    this.head = addNode(this.head, data);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    const findNode = function (node, data) {
      if (!node) return null;
      if(node.data === data) return node;
      if(data < node.data) return findNode(node.left, data);
      else return findNode(node.right, data);
    }
    return findNode(this.head, data);
  }

  remove(data) {
    const removeNode = function (node, data) {
      if (!node) return null;
      if(data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if(data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else if(!node.left && !node.right) return null;
      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }
      let minFromRight = node.right;
      while(minFromRight.left)
        minFromRight = minFromRight.left;
      node.data = minFromRight.data;
      node.right = removeNode(node.right, node.data);
      return node;
    }
    this.head = removeNode(this.head, data);
  }

  min() {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }

  max() {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }
}

module.exports = {
  BinarySearchTree
};