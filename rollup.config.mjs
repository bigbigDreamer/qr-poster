import { defineConfig } from 'rollup';
import { resolve } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';

import pkg from './package.json' assert { type: "json" };


const __dirname = dirname(fileURLToPath(import.meta.url));
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = [...(Object.keys(pkg.devDependencies) || []), ...(Object.keys(pkg.dependencies) || []), "react/jsx-runtime"]

process.env.NODE_ENV = 'production';

export default defineConfig({
    makeAbsoluteExternalsRelative: true,
    preserveEntrySignatures: 'strict',
    input: resolve(__dirname, './src/index.ts'),
    output: {
        esModule: true,
        format: 'esm',
        dir: 'es',
        generatedCode: {
            reservedNamesAsProps: false
        },
        interop: 'compat',
        systemNullSetters: false
    },
    external,
    plugins: [
        commonjs(),
        nodeResolve({ extensions }),
        cleaner({
            targets: ['./es/'],
        }),
        swc(
            defineRollupSwcOption({
                jsc: {
                    loose: true,
                    externalHelpers: true,
                    parser: {
                        syntax: 'typescript',
                        tsx: true,
                    },
                    transform: {
                        react: {
                            runtime: 'automatic',
                            useBuiltins: true,
                            development: false,
                        },
                    },
                    target: 'es2015',
                },
                exclude: ['.*\\.js$', '.*\\.map$', 'example'],
                env: {
                    // targets: 'Chrome >= 48',
                    // mode: 'usage',
                    loose: true,
                    // coreJs: "3.26.1",
                    bugfixes: true,
                }
            })
        )
    ]
})
