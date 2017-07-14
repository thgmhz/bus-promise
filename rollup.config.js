import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/index.js',
  moduleName: 'bus',
  format: 'umd',
  dest: 'build/browser/bus-promise.min.js',
  plugins: [
    nodeResolve({
      browser: true
    }),
    commonjs(),
    babel({
      babelrc: false,
      presets: [
        [
          'es2015',
          {
            modules: false
          }
        ]
      ],
      plugins: ['external-helpers']
    }),
    uglify(),
    filesize()
  ]
}
