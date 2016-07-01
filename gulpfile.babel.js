import gulp from 'gulp'
import watch from 'gulp-watch'
import babel from 'gulp-babel'
import { concat, map } from 'lodash'

const copyFile = (name, src, dest) => {
  const task = { build: `build:${name}`, watch: `watch:${name}` }
  const copy = () => gulp.src(src).pipe(gulp.dest(dest))

  gulp.task(task.build, copy)
  gulp.task(task.watch, () => watch(src, copy))

  return task
}

const buildES6 = (name, src, dest) => {
  const task = { build: `build:${name}`, watch: `watch:${name}` }
  const build = () => gulp.src(src)
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest(dest))

  gulp.task(task.build, build)
  gulp.task(task.watch, () => watch(src, build))

  return task
}

const buildMap = {
  index: { src: 'src/index.js', dest: 'dist' },
  server: { src: 'src/server.js', dest: 'dist' },
  utils: { src: 'src/utils/*.js', dest: 'dist/utils' }
}

const copyMap = {
  assets: { src: 'src/assets/**/*', dest: 'dist/assets' }
}

const buildES6Tasks = map(buildMap, ({ src, dest }, key) => buildES6(key, src, dest))
const copyTasks = map(copyMap, ({ src, dest }, key) => copyFile(key, src, dest))

const tasks = concat(buildES6Tasks, copyTasks)
const buildTasks = tasks.map(({ build }) => build)
const watchTasks = tasks.map(({ watch }) => watch)

gulp.task('build', buildTasks)
gulp.task('watch', watchTasks)
