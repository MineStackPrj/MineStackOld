module.exports = {
  'root': true,
  'env' : {
    'node': true,
    'es6' : true
  },
  'globals': {},
  'extends': [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'react-app',
    'react-app/jest'
  ],
  'plugins'      : ['node', 'jest'],
  'parserOptions': {
    'ecmaVersion': 2020
  },
  'rules': {
    'prettier/prettier'    : 'off',
    'max-len'              : ['error', { 'code': 140, 'ignoreStrings': true, 'ignoreTemplateLiterals': true, 'ignoreRegExpLiterals': true, 'ignoreComments': true }],
    'array-bracket-spacing': ['error', 'never', { singleValue: false, arraysInArrays: false, objectsInArrays: false }],
    'object-curly-spacing' : ['error', 'always', { objectsInObjects: false }],
    'comma-dangle'         : ['error', 'never'],
    'comma-style'          : ['error', 'last'],
    'key-spacing'          : [
      'error',
      {
        'beforeColon': false,
        'afterColon' : true,
        'align'      : 'colon'
      }
    ],
    'keyword-spacing'            : ['error', { 'before': true, 'after': true, 'overrides': { 'if': { 'after': false }, 'for': { 'after': false }, 'while': { 'after': false }, 'switch': { 'after': false }}}],
    'space-before-function-paren': ['error', { 'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always' }],
    'node/no-extraneous-import'  : 'off',
    'no-console'                 : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger'                : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes'                     : ['error', 'single'],
    'indent'                     : ['error', 2],
    'semi'                       : ['error', 'always'],
    'semi-spacing'               : ['error', { 'before': false, 'after': true }],
    'comma-spacing'              : ['error', { 'before': false, 'after': true }],
    'semi-style'                 : ['error', 'last'],
    'no-extra-semi'              : 'error',
    'space-infix-ops'            : 'error',
    'no-unexpected-multiline'    : 'error',
    'no-unreachable'             : 'error',
    'template-curly-spacing'     : ['error', 'never'],
    'space-before-blocks'        : ['error', 'always'],
    'computed-property-spacing'  : 'error',
    'no-var'                     : 'error',
    'one-var'                    : ['error', 'never'],
    'no-unsafe-finally'          : 'error',
    'no-throw-literal'           : 'error',
    'eqeqeq'                     : ['error', 'always'],
    'curly'                      : ['error', 'all'],
    'brace-style'                : ['error', '1tbs'],
    'eol-last'                   : ['error', 'always'],
    'no-multiple-empty-lines'    : ['error', { max: 1 }],
    'no-nested-ternary'          : 'error',
    'block-spacing'              : ['error', 'always'],
    'block-scoped-var'           : 'error',
    'rest-spread-spacing'        : 'error',
    'no-case-declarations'       : 'error',
    'constructor-super'          : 'error',
    'no-return-await'            : 'error',
    'new-parens'                 : 'error',
    'prefer-const'               : 'error',
    'no-duplicate-case'          : 'error',
    'use-isnan'                  : 'error',
    'guard-for-in'               : 'error',
    'no-multi-spaces'            : 'error',
    'no-native-reassign'         : 'error',
    'no-new-func'                : 'error',
    'no-new-wrappers'            : 'error',
    'no-fallthrough'             : 'error',
    'accessor-pairs'             : 'error',
    'no-implicit-coercion'       : 'error',
    'no-loop-func'               : 'error',
    'no-invalid-this'            : 'error',
    'no-alert'                   : 'error',
    'no-floating-decimal'        : 'error',
    'no-new'                     : 'error',
    'no-caller'                  : 'error',
    'no-constant-condition'      : 'error',
    'radix'                      : 'error',
    'no-octal-escape'            : 'error',
    'no-octal'                   : 'error',
    'spaced-comment'             : 'error',
    'lines-around-comment'       : [
      'error',
      {
        beforeBlockComment: true,
        afterBlockComment : false,
        beforeLineComment : true,
        afterLineComment  : false,
        allowClassStart   : false
      }
    ],
    'require-jsdoc': ['error', {
      'require': {
        'FunctionDeclaration'    : true,
        'MethodDefinition'       : true,
        'ClassDeclaration'       : false,
        'ArrowFunctionExpression': false,
        'FunctionExpression'     : false
      }
    }],
    'multiline-comment-style'                          : ['error', 'starred-block'],
    'complexity'                                       : ['error', { 'max': 20 }],
    'dot-location'                                     : ['error', 'property'],
    'no-redeclare'                                     : 'error',
    'yoda'                                             : ['error', 'never', { exceptRange: true }],
    'sort-imports'                                     : 'off',
    'import/no-default-export'                         : 'error',
    '@typescript-eslint/no-inferrable-types'           : 'off',
    '@typescript-eslint/no-empty-function'             : 'off',
    '@typescript-eslint/no-explicit-any'               : 'off',
    '@typescript-eslint/ban-ts-ignore'                 : 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/triple-slash-reference'        : ['error'],
    '@typescript-eslint/no-namespace'                  : ['error', {
      'allowDeclarations': true
    }],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        'allowExpressions': true
      }
    ],
    '@typescript-eslint/no-redeclare'           : 'error',
    '@typescript-eslint/type-annotation-spacing': ['error', {
      'before'   : false,
      'after'    : true,
      'overrides': {
        'arrow': { 'before': true, 'after': true },
        'colon': { 'before': false, 'after': true }
      }
    }],
    '@typescript-eslint/member-ordering'                     : 'error',
    '@typescript-eslint/sort-type-union-intersection-members': 'error',
    '@typescript-eslint/no-unused-vars'                      : 'error',
    '@typescript-eslint/explicit-member-accessibility'       : 'error',
    '@typescript-eslint/ban-types'                           : ['error', {
      'types': {
        'String': {
          'message': 'Use string instead',
          'fixWith': 'string'
        },
        'Number': {
          'message': 'Use number instead',
          'fixWith': 'number'
        },
        'Object': {
          'message': 'Use object instead',
          'fixWith': 'object'
        },
        'Boolean': {
          'message': 'Use boolean instead',
          'fixWith': 'boolean'
        },
        'Array': {
          'message': 'Use [] instead',
          'fixWith': '[]'
        }
      }
    }],
    '@typescript-eslint/array-type': [
      'error',
      {
        'default' : 'array',
        'readonly': 'array'
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format'  : ['PascalCase'],
        'custom'  : {
          'regex': '^I[A-Z]',
          'match': true
        }
      },
      {
        'selector': 'class',
        'format'  : ['PascalCase']
      },
      {
        'selector': 'typeAlias',
        'format'  : ['PascalCase']
      },
      {
        'selector': 'function',
        'format'  : ['camelCase']
      },
      {
        'selector': 'method',
        'format'  : ['camelCase']
      },
      {
        'selector': 'variable',
        'format'  : ['camelCase', 'PascalCase']
      },
      {
        'selector': 'parameterProperty',
        'format'  : ['camelCase']
      },
      {
        'selector'         : 'property',
        'format'           : ['camelCase', 'PascalCase'],
        'leadingUnderscore': 'allow'
      },
      {
        'selector': 'parameter',
        'format'  : ['camelCase']
      },
      {
        'selector': 'typeParameter',
        'format'  : ['PascalCase'],
        'prefix'  : ['T', 'U', 'K', 'P', 'E']
      }
    ]
  },
  'overrides': [
    {
      'files': '*.js',
      'rules': {
        '@typescript-eslint/no-inferrable-types'          : 'off',
        '@typescript-eslint/no-explicit-any'              : 'off',
        '@typescript-eslint/ban-ts-ignore'                : 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/member-ordering'              : 'off',
        '@typescript-eslint/no-unused-vars'               : 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/array-type'                   : 'off',
        '@typescript-eslint/interface-name-prefix'        : 'off',
        '@typescript-eslint/naming-convention'            : 'off',
        '@typescript-eslint/no-var-requires'              : 'off',
        'node/no-unpublished-import'                      : 'off',
        'node/no-unpublished-require'                     : 'off',
        'no-process-exit'                                 : 'off',
        'require-jsdoc'                                   : 'off'
      }
    },
    {
      'files': '*.(test|spec).ts',
      'env'  : {
        'jest': true
      },
      'rules': {
        '@typescript-eslint/ban-ts-comment': 'off',
        'jest/valid-title'                 : 'error',
        'jest/no-identical-title'          : 'error',
        'jest/consistent-test-it'          : ['error', { 'fn': 'it' }],
        'jest/no-conditional-expect'       : 'off'
      }
    },
    {

      // CDK用のルール
      'files': '*/environment/**/*.ts',
      'rules': {
        'no-new': 'off'
      }
    },
    {
      'files': '*.ts',
      'rules': {
        'no-restricted-syntax': [
          'error',
          'TSEnumDeclaration',
          {
            'selector': 'ForInStatement',
            'message' :
              'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
          },
          {
            'selector': 'ForOfStatement',
            'message' :
              'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.'
          },
          {
            'selector': 'LabeledStatement',
            'message' :
              'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
          },
          {
            'selector': 'WithStatement',
            'message' :
              '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
          }
        ],
        'node/no-unpublished-import': 'off'
      }
    },
    {
      'files': '*.tsx',
      'rules': {
        'no-process-env'          : 'error',
        'import/no-default-export': 'off',
        'no-restricted-syntax'    : [
          'error',
          'TSEnumDeclaration',
          {
            'selector': 'ForInStatement',
            'message' :
              'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
          },
          {
            'selector': 'ForOfStatement',
            'message' :
              'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.'
          },
          {
            'selector': 'LabeledStatement',
            'message' :
              'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
          },
          {
            'selector': 'WithStatement',
            'message' :
              '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
          }
        ],
        'jsx-quotes'                : ['error', 'prefer-double'],
        'node/no-unpublished-import': [
          'error',
          {
            'allowModules': ['@testing-library/react']
          }
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            'selector': 'interface',
            'format'  : ['PascalCase'],
            'custom'  : {
              'regex': '^I[A-Z]',
              'match': true
            }
          },
          {
            'selector': 'class',
            'format'  : ['PascalCase']
          },
          {
            'selector': 'typeAlias',
            'format'  : ['PascalCase']
          },
          {
            'selector': 'function',
            'format'  : ['camelCase', 'PascalCase']
          },
          {
            'selector': 'method',
            'format'  : ['camelCase']
          },
          {
            'selector': 'variable',
            'format'  : ['camelCase', 'PascalCase']
          },
          {
            'selector': 'parameterProperty',
            'format'  : ['camelCase']
          },
          {
            'selector'         : 'property',
            'format'           : ['camelCase', 'PascalCase'],
            'leadingUnderscore': 'allow'
          },
          {
            'selector': 'parameter',
            'format'  : ['camelCase']
          },
          {
            'selector': 'typeParameter',
            'format'  : ['PascalCase'],
            'prefix'  : ['T', 'U', 'K', 'P', 'E']
          }
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { 'varsIgnorePattern': 'React|.*Page' }
        ]
      }
    },
    {
      'files': '*.stories.tsx',
      'rules': {
        'import/no-default-export'  : 'off',
        'node/no-unpublished-import': 'off'
      }
    }
  ]
};
