import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'SvelteReact',
		file: 'dist/svelte-react.min.js'
	},
	plugins: [
		replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' ),
			preventAssignment: true
    }),
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte', 'react', 'react-dom']
		}),
		commonjs(),
		typescript({
			sourceMap: true,
			inlineSources: !production
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	]
};
