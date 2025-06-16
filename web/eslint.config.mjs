import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

const eslintConfig = [
    ...compat.config({
        extends: ["next/core-web-vitals", "next/typescript"],
        rules: {
            "quotes": [
                "error",
                "double"
            ],
            "jsx-quotes": [
                "error",
                "prefer-double"
            ],
            "semi": [
                "error",
                "always"
            ],
            "comma-dangle": [
                "error",
                "never"
            ],
            "eol-last": [
                "error",
                "always"
            ],
            "no-trailing-spaces": [
                "error"
            ],
            "react/jsx-first-prop-new-line": [
                "error",
                "multiline"
            ],
            "react/jsx-max-props-per-line": [
                "error",
                {
                    "maximum": 1,
                    "when": "multiline"
                }
            ],
            "react/jsx-closing-tag-location": [
                "error",
                "line-aligned"
            ],
            "react/jsx-closing-bracket-location": [
                "error",
                {
                    "nonEmpty": "line-aligned",
                    "selfClosing": "line-aligned"
                }
            ],
            "react/jsx-tag-spacing": [
                "error",
                {
                    "beforeSelfClosing": "always",
                    "closingSlash": "never"
                }
            ],
            "indent": [
                "error",
                4,
                {
                    "SwitchCase": 1
                }
            ]
        }
    })
];

export default eslintConfig;
