// Copyright (c) 2015 - 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import test from 'tape-catch';
import {ScenegraphNode} from '@luma.gl/core';
import {Matrix4, Vector3} from 'math.gl';

const PROPS = {
  display: true,
  position: new Vector3(1, 1, 1),
  rotation: new Vector3(2, 2, 2),
  scale: new Vector3(3, 3, 3),
  matrix: new Matrix4().scale(4)
};

test('ScenegraphNode#constructor', t => {
  const sgNode = new ScenegraphNode(PROPS);
  t.ok(sgNode instanceof ScenegraphNode, 'should construct the object');
  for (const key in PROPS) {
    t.deepEqual(sgNode.props[key], PROPS[key], `prop: ${key} should get set on the object.props`);
    t.deepEqual(sgNode[key], PROPS[key], `prop: ${key} should get set on the object`);
  }
  t.end();
});

test('ScenegraphNode#delete', t => {
  const sgNode = new ScenegraphNode();
  t.doesNotThrow(() => sgNode.delete(), 'delete should work');

  t.end();
});

test('ScenegraphNode#setProps', t => {
  const sgNode = new ScenegraphNode();
  sgNode.setProps(PROPS);
  for (const key in PROPS) {
    t.deepEqual(sgNode.props[key], PROPS[key], `prop: ${key} should get set on the object.props`);
    t.deepEqual(sgNode[key], PROPS[key], `prop: ${key} should get set on the object`);
  }
  t.end();
});

test('ScenegraphNode#toString', t => {
  const sgNode = new ScenegraphNode();
  t.doesNotThrow(() => sgNode.toString(), 'delete should work');

  t.end();
});

test('ScenegraphNode#setMatrix', t => {
  const sgNode = new ScenegraphNode();
  const matrix = new Matrix4().scale(1.5);

  sgNode.setMatrix(matrix);
  t.deepEqual(sgNode.matrix, matrix, 'should copy the matrix');

  sgNode.setMatrix(matrix, false);
  t.equal(sgNode.matrix, matrix, 'should asign the matrix');

  t.end();
});

test('ScenegraphNode#setMatrixComponents', t => {
  const sgNode = new ScenegraphNode();
  const position = new Vector3(1, 1, 1);
  const rotation = new Vector3(2, 2, 2);
  const scale = new Vector3(3, 3, 3);

  sgNode.setMatrixComponents({update: false});
  t.deepEqual(sgNode.matrix, new Matrix4(), 'should not update the matrix');

  sgNode.setMatrixComponents({position, rotation, scale});
  t.deepEqual(
    sgNode.matrix,
    new Matrix4()
      .translate(position)
      .rotateXYZ(rotation)
      .scale(scale),
    'should update the matrix'
  );

  t.end();
});

test('ScenegraphNode#update', t => {
  const sgNode = new ScenegraphNode();
  const position = new Vector3(1, 1, 1);
  const rotation = new Vector3(2, 2, 2);
  const scale = new Vector3(3, 3, 3);

  sgNode.update();
  t.deepEqual(sgNode.matrix, new Matrix4(), 'should update the matrix');

  sgNode.update({position, rotation, scale});
  t.deepEqual(
    sgNode.matrix,
    new Matrix4()
      .translate(position)
      .rotateXYZ(rotation)
      .scale(scale),
    'should update the matrix'
  );

  t.end();
});

test('ScenegraphNode#construction', t => {
  const grandChild = new ScenegraphNode();
  const child1 = new ScenegraphNode({children: [grandChild]});
  const child2 = new ScenegraphNode();
  const groupNode = new ScenegraphNode({children: [child1, child2]});

  t.ok(child1 instanceof ScenegraphNode, 'construction with array is successful');
  t.ok(groupNode instanceof ScenegraphNode, 'construction with object is successful');

  t.end();
});

test('ScenegraphNode#add', t => {
  const child1 = new ScenegraphNode();
  const child2 = new ScenegraphNode();
  const child3 = new ScenegraphNode();
  const groupNode = new ScenegraphNode();

  groupNode.add([child1, [child2, child3]]);

  t.ok(groupNode.children.length === 3, 'add: should unpack nested arrays');
  t.end();
});

test('ScenegraphNode#remove', t => {
  const child1 = new ScenegraphNode();
  const child2 = new ScenegraphNode();
  const child3 = new ScenegraphNode();
  const groupNode = new ScenegraphNode();

  groupNode.add([child1, child2]);

  groupNode.remove(child3);
  t.ok(groupNode.children.length === 2, 'remove: should ignore non child node');

  groupNode.remove(child2);
  t.ok(groupNode.children.length === 1, 'remove: should remove child');
  t.end();
});

test('ScenegraphNode#removeAll', t => {
  const child1 = new ScenegraphNode();
  const child2 = new ScenegraphNode();
  const child3 = new ScenegraphNode();
  const groupNode = new ScenegraphNode();
  groupNode.add([child1, child2, child3]);

  groupNode.removeAll();

  t.ok(groupNode.children.length === 0, 'removeAll: should remove all');
  t.end();
});

test('ScenegraphNode#delete', t => {
  const grandChild = new ScenegraphNode();
  const child1 = new ScenegraphNode({children: [grandChild]});
  const child2 = new ScenegraphNode();
  const groupNode = new ScenegraphNode({children: [child1, child2]});

  groupNode.delete();

  t.ok(groupNode.children.length === 0, 'delete: should remove all');
  t.ok(child1.children.length === 0, 'delete: should delete children');
  t.end();
});

test('ScenegraphNode#compileMatrices', t => {
  const modelMatrices = {};
  const matrix = new Matrix4().identity().scale(2);

  function visitor(child) {
    modelMatrices[child.id] = child.worldMatrix;
  }

  const childSNode = new ScenegraphNode({id: 'childSNode'});
  const grandChildSNode = new ScenegraphNode({id: 'grandChildSNode'});
  const child1 = new ScenegraphNode({id: 'child-1', matrix, children: [grandChildSNode]});
  const groupNode = new ScenegraphNode({id: 'parent', matrix, children: [child1, childSNode]});

  groupNode.compileMatrices();

  groupNode.traverse(visitor);

  t.deepEqual(modelMatrices[childSNode.id], matrix, 'should update child matrix');
  t.deepEqual(
    modelMatrices[grandChildSNode.id],
    new Matrix4().identity().scale(4),
    'should update grand child matrix'
  );

  t.end();
});
