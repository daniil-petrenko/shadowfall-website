import gulp from 'gulp';
import browserSync from 'browser-sync';

// Config
import path from './config/path.js';
import app from './config/app.js';

//
import clear from './task/clear.js';
import html from './task/html.js';
import scss from './task/scss.js';
import js from './task/js.js';
import img from './task/img.js';
import {fontsConvert, fontsStyle} from './task/font.js';
import json from './task/json.js';



// // Webpack task
// import webpackConfig from './webpack.config.js';

// const webpackTask = () => {
//   return gulp.src(path.js.pathSrc) // Вхідний файл, якщо використовується webpack-stream
//     .pipe(webpack(webpackConfig))
//     .pipe(gulp.dest(path.js.pathDest)); // Директорія виходу
// }


// Server
const server = () => {
	browserSync.init({
		server: {
			baseDir: path.root
		}
	});
}

// Watcher
const watcher = () => {
	gulp.watch(path.html.watch, html).on('all', browserSync.reload);
	gulp.watch(path.scss.watch, scss).on('all', browserSync.reload);
	// gulp.watch(path.js.watch, webpackTask).on('all', browserSync.reload); // Використовуємо webpackTask
	gulp.watch(path.js.watch, js).on('all', browserSync.reload);
	gulp.watch(path.img.watch, img).on('all', browserSync.reload);
	// gulp.watch(path.font.watch, font).on('all', browserSync.reload);
	gulp.watch(path.json.watch, json).on('all', browserSync.reload);
}

const fonts = gulp.series(fontsConvert, fontsStyle);
const build = gulp.series(
	clear,
	fonts,
	gulp.parallel(html, scss, js, img, json), //webpackTask
);

const dev = gulp.series(
	build,
	gulp.parallel(watcher, server)
);

export { html };
export { scss };
// export { webpackTask as js };
export { js };
export { img };
export { watcher };
export { clear };
export { fontsConvert, fontsStyle };
export { json };

export default app.isProd
	? build
	: dev;

