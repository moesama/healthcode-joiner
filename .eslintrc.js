module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint/eslint-plugin",
        "eslint-plugin-react",
        "eslint-plugin-import",
    ],
    extends: [
        "alloy",
        "alloy/react",
        "alloy/typescript"
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        quotes: "error",
        semi: "error",
        "@typescript-eslint/no-namespace":"off",
        "max-params": "off",
        "guard-for-in": "off",
        "spaced-comment": "off",
        "object-curly-spacing": ["error", "always"],
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/no-invalid-void-type": "off",
    }
};