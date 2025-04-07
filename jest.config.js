module.exports = {
    roots: ['<rootDir>/src'], // o ['<rootDir>/tests'] si los tienes afuera
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '.*\\.test\\.ts$', // busca archivos que terminan en .test.ts
    moduleFileExtensions: ['ts', 'js'],
  };