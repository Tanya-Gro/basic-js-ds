const { NotImplementedError } = require('../lib/errors');
// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor (value, parent = null) {
    this.left = null;
    this.right = null;
    this.data = value;
    this.parent = parent;
  }
}

class BinarySearchTree {
  constructor () {
    this.base = null;
  }

  root() {
    return this.base;
  }

  add( data ) {
    if (!this.base) {
      this.base = new Node(data);
      return;
    }
    
    let node = this.base;

    while (node) {
      if (node.data === data) {
        return;
      }
      if (data < node.data ) {
        if (!node.left) {
          node.left = new Node(data, node);
          return;
        }
        node = node.left;
      } else {
        if (!node.right) {
          node.right = new Node(data, node);
          return;
        }
        node = node.right;
      }
    }
  }

  find( data ) {
    let node = this.base;

    while (node) {
      if (node.data === data) {
        return node;
      }

      node = data < node.data ? node.left : node.right;
    }

    return null;
  }

  has( data ) {
    return !!this.find(data);
  }

  remove( data ) {
    const node = this.find (data);

    if (!node) {
      return;
    }

    if (!node.left && !node.right) {
      this._replaceNodeInParent(node, null)
      return;
    }

    if (!node.right) {
      this._replaceNodeInParent(node, node.left)
      return;
    }

    if (!node.left) {
      this._replaceNodeInParent(node, node.right)
      return;
    }

    let incomer = node.right;

    while (incomer.left) {
      incomer = incomer.left;
    }

    const value = incomer.data;
    this.remove(incomer.data)
    node.data = value;
  }

  _replaceNodeInParent (node, newNode) {
    if (node.parent) {
      if (node.parent.left === node) {
        node.parent.left = newNode;
      } else {
        node.parent.right = newNode;
      }
    } else {
      this.base = newNode;
    }

    if (newNode) {
      newNode.parent = node.parent;
    }
  }

  min() {
    if (!this.base) {
      return null;
    }

    let node = this.base;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.base) {
      return null;
    }
  
    let node = this.base;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};