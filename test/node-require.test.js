const preset = require('../src');
const babel = require('@babel/core');

it('replaces commented node-require require functions with window.cep_node.require', () => {
  const example = `
    // node-require
    const fs = require("fs")
  `;

  const { code } = babel.transform(example, { presets: [preset] });
  expect(code).toMatchSnapshot();
});

it('doesnt replace normal requires', () => {
  const example = `
    const fs = require("fs")
  `;

  const { code } = babel.transform(example, { presets: [preset] });
  expect(code).toMatchSnapshot();
});

it('non naive example', () => {
  const example = `
    const path = require("path")

    // node-require
    const fs = require("fs")

    // node-require
    const os = require("os")

    require("babel-preset")

    const util = require("util")

    // node-require
    const crypto = require("crypto")
  `;

  const { code } = babel.transform(example, { presets: [preset] });
  expect(code).toMatchSnapshot();
});
