import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
        provider: 'v8',
        reporter: ['lcov', 'html'],
        include: [
            'services/**/*.js',
            'utils/jwt.js',
        ]
    },
    include: [
      "tests/**/*.js"
    ]
  },
});