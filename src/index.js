/**
 * This file is a bit of a mess. If you're looking at it as a reference for how to write a preset,
 * I'd recommend looking only at `function preset(){}` and ignoring the rest, unless your new preset
 * really needs to work on babel-core < 6.13.x, which is unlikely.
 */

/**
 * This preset was originally an object, before function-based configurable presets were introduced.
 * For backward-compatibility with anything that may have been loading this preset and expecting
 * it to be a simple Babel config object, we maintain the old config here.
 */
module.exports = preset({});

// For backward compatibility with babel-core < v6.13.x, we use the 'buildPreset' property
// of the preset object for the preset creation function.
Object.defineProperty(module.exports, 'buildPreset', {
  configurable: true,
  writable: true,
  // We make this non-enumerable so old versions of babel-core won't see it as an unknown property,
  // while allowing new versions to see it as a preset builder function.
  enumerable: false,
  value: preset,
});

function preset(context, opts) {
  const env = require('@babel/preset-env');

  return () => ({
    presets: [env],
    plugins: [require('./node-require.js')].filter(Boolean),
  });
}
