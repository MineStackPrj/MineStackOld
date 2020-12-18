module.exports = {
  root: true,
  env : {
    node: true
  },
  'globals': {},
  extends  : [
    'eslint:recommended'
  ],
  plugins      : ['jest'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'array-bracket-spacing': ['error', 'never', { 'singleValue': false }],
    'object-curly-spacing' : ['error', 'always'],
    'comma-dangle'         : ['error','never'],
    'comma-style'          : ['error', 'last'],
    'key-spacing'          : ['error', {
      'beforeColon': false,
      'afterColon' : true,
      'align'      : 'colon'
    }],
    'no-console'                                      : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger'                                     : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'node/no-extraneous-import'                       : 'off',
    quotes                                            : [2, 'single'],
    indent                                            : [2, 2],
    'semi'                                            : ['error', 'always'],
    'semi-spacing'                                    : ['error', { 'after': true, 'before': false }],
    'semi-style'                                      : ['error', 'last'],
    'no-extra-semi'                                   : 'error',
    'no-unexpected-multiline'                         : 'error',
    'no-unreachable'                                  : 'error',
    'computed-property-spacing'                       : 2,
    'sort-imports'                                    : 'off',
    '@typescript-eslint/no-inferrable-types'          : 'off',
    '@typescript-eslint/no-explicit-any'              : 'off',
    '@typescript-eslint/ban-ts-ignore'                : 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true
      }
    ],
    '@typescript-eslint/member-ordering'              : 'error',
    '@typescript-eslint/no-unused-vars'               : ['error', { varsIgnorePattern: 'React|.*Page' }],
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/array-type'                   : [
      'error',
      {
        default : 'array',
        readonly: 'array'
      }
    ],
    '@typescript-eslint/interface-name-prefix': [
      'error',
      {
        prefixWithI          : 'always',
        allowUnderscorePrefix: true
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format  : ['PascalCase']
      },
      {
        selector: 'class',
        format  : ['PascalCase']
      },
      {
        selector: 'enum',
        format  : ['PascalCase']
      },
      {
        selector: 'enumMember',
        format  : ['PascalCase', 'UPPER_CASE']
      },
      {
        selector: 'typeAlias',
        format  : ['PascalCase']
      },
      {
        selector: 'function',
        format  : ['camelCase', 'PascalCase']
      },
      {
        selector: 'method',
        format  : ['camelCase']
      },
      {
        selector: 'variable',
        format  : ['camelCase', 'PascalCase']
      },
      {
        selector: 'parameterProperty',
        format  : ['camelCase']
      },
      {
        selector         : 'property',
        format           : ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'parameter',
        format  : ['camelCase']
      },
      {
        selector: 'typeParameter',
        format  : ['PascalCase'],
        prefix  : ['T', 'U', 'K', 'P', 'E']
      }
    ]
  },
  overrides: [
    {
      files: '*.js',
      rules: {
        '@typescript-eslint/no-inferrable-types'          : 'off',
        '@typescript-eslint/no-explicit-any'              : 'off',
        '@typescript-eslint/ban-ts-ignore'                : 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/member-ordering'              : 'off',
        '@typescript-eslint/no-unused-vars'               : 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/array-type'                   : 'off',
        '@typescript-eslint/interface-name-prefix'        : 'off',
        '@typescript-eslint/naming-convention'            : 'off'
      }
    },
    {
      files: '*.spec.ts',
      env  : {
        jest: true
      }
    },
    {
      files: '*.ts',
      rules: {
        'no-restricted-syntax': [
          'error',
          'TSEnumDeclaration',
          {
            selector: 'ForInStatement',
            message :
              'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
          },
          {
            selector: 'ForOfStatement',
            message :
              'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.'
          },
          {
            selector: 'LabeledStatement',
            message : 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
          },
          {
            selector: 'WithStatement',
            message : '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
          }
        ],
        'node/no-unpublished-import': 'off'
      }
    }
  ]
};
