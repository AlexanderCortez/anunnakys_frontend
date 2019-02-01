module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": 0,
        "react/no-deprecated": 0,
        "no-restricted-globals": ["error", "event", "fdescribe"],
        "import/prefer-default-export": 0,
        "camelcase": 0,
        "no-console": 0,
        "no-debugger": 0,
        "react/sort-comp": 0,
        "no-underscore-dangle": ["error", { "allow": ["_d"] }],
        "object-curly-newline": 0,
    },
    "plugins": ["flowtype"],
    "env": {
        "browser": true
    }
};