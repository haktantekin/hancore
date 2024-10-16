import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

const createConfig = (input, output, format) => ({
  input,
  output: {
    file: output,
    format: format,
    name: format === 'umd' ? 'Hancore' : undefined,
    globals: {
      react: 'React', // Global variable for React in UMD builds
      'react-dom': 'ReactDOM' // Global variable for ReactDOM in UMD builds
    },
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: path.dirname(output),
      rootDir: './src',
      exclude: ['**/*.test.ts', '**/*.test.tsx'] // Exclude test files from the build
    }),
    babel({
      exclude: ['node_modules/**', '*.d.ts'], // Ignore node_modules and declaration files
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Handle these file types
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      babelHelpers: 'bundled' // Use bundled babel helpers
    }),
    resolve(), // Helps rollup locate modules in node_modules
    commonjs(), // Convert CommonJS modules to ES6
    format === 'umd' && terser(), // Minify UMD build
  ],
  external: ['react', 'react-dom'], // Specify React and ReactDOM as external dependencies
});

export default [
  createConfig('src/index.ts', 'lib/index.js', 'cjs'), // CommonJS output
  createConfig('src/index.ts', 'es/index.js', 'es'), // ES module output
  createConfig('src/index.ts', 'dist/hancore.min.js', 'umd') // UMD output
];
