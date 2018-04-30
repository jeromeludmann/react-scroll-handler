import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default [
  {
    input: 'src/ScrollHandler.tsx',
    external: ['react'],
    watch: {
      include: 'src/**'
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true
      })
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        globals: ['react']
      }
    ]
  }
]
