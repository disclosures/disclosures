import { defineConfig } from 'tsup';

export default defineConfig([
	// Main entry (ESM, CJS, IIFE)
	{
		entry: ['src/index.ts'],
		format: ['esm', 'cjs', 'iife'],
		globalName: 'Disclosures',
		dts: true,
		clean: true,
		sourcemap: true,
	},
	// Auto-init entry (ESM, CJS)
	{
		entry: ['src/auto-init.ts'],
		format: ['esm', 'cjs'],
		dts: true,
		sourcemap: true,
	},
]);
