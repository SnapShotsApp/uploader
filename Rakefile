# rubocop:disable Metrics/LineLength

require 'rake/clean'

CLEAN << 'app/out'
CLEAN << 'dist'

CLOBBER << 'node_modules'
CLOBBER << 'app/node_modules'

ENV_VARS = {
  'NODE_ENV' => 'production'
}.freeze

file 'app/out/main.js' => FileList['app/package.json', 'src/main.development.js'] do
  sh ENV_VARS, 'node', '-r', 'babel-register',
     './node_modules/webpack/bin/webpack', '--config',
     'webpack/electron.js', '--progress', '--profile', '--colors'
end

file 'app/out/bundle.js' => FileList['src/*.js', 'src/**/*.js', 'package.json'] do
  sh ENV_VARS, 'node', '-r', 'babel-register',
     './node_modules/webpack/bin/webpack', '--config',
     'webpack/production.js', '--progress', '--profile', '--colors'
end

multitask compile: ['app/out/main.js', 'app/out/bundle.js']

task pack: :compile do
  sh './node_modules/.bin/build --dir'
end

task build: :compile do
  sh './node_modules/.bin/build -mwl'
end
task default: [:build]
