/* eslint-disable import/no-anonymous-default-export */
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

const createConfig = (input, output) => ({
  input,
  output,
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: path.dirname(output.file),
    }),
    babel({
      exclude: ['node_modules/**', '*.d.ts'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      babelHelpers: 'bundled'
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
  external: ['react', 'react-dom'],
});

export default [
  createConfig('src/Index.ts', { file: 'dist/index.js', format: 'cjs' }),
  createConfig('src/Index.ts', { file: 'dist/index.esm.js', format: 'esm' }),
  createConfig('src/elements/Index.ts', { file: 'dist/elements/index.js', format: 'esm' }),
];