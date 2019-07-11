import typescript from 'rollup-plugin-typescript';
import tslint from "rollup-plugin-tslint";
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";

export default {
    input: "src/index.tsx",
    output: {
        file: "dist/main.js",
        format: "cjs"
    },
    external: [ 'react', 'prop-checks' ],
    plugins: [
        commonjs({
            namedExports: {
                'prop-checks': [ 'checkPropTypes' ]
              }
        }),
        tslint({}),
        typescript(),
        // uglify()
    ]
};








