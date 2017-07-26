import yargs from 'yargs';

const args = yargs

.option('production', {
  boolean: true,
  default: false,
  describe: 'min all scripts'
})

.option('watch', {
  boolean: true, 
  default: false,
  describe: 'watch all files'
})

.option('sourcemaps', {
  describe: 'force the creation of sourcemap'
})

.option('port', {
  string: true,
  default: 8080,
  describe: 'server port'
})
.argv
export default args;
