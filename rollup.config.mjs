import { defineConfig } from 'rollup';
import { resolve } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';


const __dirname = dirname(fileURLToPath(import.meta.url));
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

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
    plugins: [
        commonjs(),
        nodeResolve({ extensions }),
        cleaner({
            targets: ['./es/'],
        }),
        swc(
            defineRollupSwcOption({
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: true
                    },
                    target: "es5",
                    loose: true,
                    transform: {
                        react: {
                            runtime: 'automatic',
                            useBuiltins: true,
                            development: false
                        }
                    }
                },
                exclude: ['.*\\.js$', '.*\\.map$'],
                env: {
                    targets: 'Chrome >= 48',
                    // mode: 'usage',
                    loose: true,
                    // coreJs: "3.26.1",
                    bugfixes: true,
                    externalHelpers: true,
                }
            })
        )
    ]
})
