import gulp from 'gulp';

// Config
import path from '../config/path.js';
import app from '../config/app.js';

// Plagins
import fs from 'fs';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const fontsConvert = () => {
  return gulp.src(path.font.src, { encoding: false })
	.pipe(plumber({
	    errorHandler: notify.onError(error => ({
	    title: 'Font',
	    message: error.message
	  }))
	}))
	.pipe(newer(path.font.dest))
	.pipe(fonter(app.fonter))
	.pipe(gulp.dest(path.font.dest))
	.pipe(ttf2woff2())
	.pipe(gulp.dest(path.font.dest))
}


export const fontsStyle = (cb) => {
    const source_folder = path.srcFolder;
    const fontsFile = `${source_folder}/scss/fonts/_fonts.scss`;

    // Перевірка і створення директорії, якщо вона не існує
    if (!fs.existsSync(`${source_folder}/scss/fonts`)) {
        fs.mkdirSync(`${source_folder}/scss/fonts`, { recursive: true });
    }

    // Перевірка і створення файлу fonts.scss, якщо він не існує
    if (!fs.existsSync(fontsFile)) {
        fs.writeFileSync(fontsFile, '');
    }

    // Зчитування вмісту файлу
    let file_content = fs.readFileSync(fontsFile, 'utf8');

    // Перевірка на порожній вміст
    if (file_content.trim() === '') {
        fs.readdir(path.font.dest, (err, items) => {
            if (err) {
                console.error('Error reading fonts directory:', err);
                cb(err);
                return;
            }

            let c_fontname;

            gutil.log('Масив:', items);
            items.forEach(item => {
                gutil.log('elem:', item);
                const fontname = item.split('.')[0];

                if (c_fontname !== fontname) {
                    fs.appendFileSync(fontsFile, `@include font("${fontname}", "${fontname}", "400", "normal");\r\n`);
                    c_fontname = fontname;
                }
            });

            cb(); // Виклик колбека для сигналізації про завершення
        });
    } else {
        cb(); // Виклик колбека для сигналізації про завершення
    }
};




// export const fontsStyle = (params) => {
// 	const source_folder = path.srcFolder;
// 	let file_content = fs.readFileSync(source_folder + '/scss/_fonts.scss');
// 	if (file_content == '') {
// 		fs.writeFile(source_folder + '/scss/_fonts.scss', '', cb);
// 		return fs.readdir(path.build.fonts, function (err, items) {
// 			if (items) {
// 				let c_fontname;
// 				for (var i = 0; i < items.length; i++) {
// 					let fontname = items[i].split('.');
// 					fontname = fontname[0];
// 					if (c_fontname != fontname) {
// 						fs.appendFile(source_folder + '/scss/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
// 					}
// 					c_fontname = fontname;
// 				}
// 			}
// 		})
// 	}
// }
// function cb() { }


// export const fontsStyle = () => {
// 	let fontsFile = `${path.srcFolder}/scss/fonts.scss`;
// 	fs.readdir(path.font.dest, function(err, fontsFiles) {
// 		if (fontsFiles) {
// 			if (!fs.existsSync(fontsFile)) {
// 				fs.writeFile(fontsFile, '', cb);
// 				let newFileOnly;
// 				for (var i = 0; i < fontsFiles.length; i++) {
// 					let fontFileName = fontsFiles[i].split('.')[0];
// 					if (newFileOnly !== fontFileName) {
// 						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
// 						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
// 						if (fontWeight.toLowerCase() === 'thin') {
// 							fontWeight = 100;
// 						} else if (fontWeight.toLowerCase() === 'extralight') {
// 							fontWeight = 200;
// 						} else if (fontWeight.toLowerCase() === 'light') {
// 							fontWeight = 300;
// 						} else if (fontWeight.toLowerCase() === 'medium') {
// 							fontWeight = 500;
// 						} else if (fontWeight.toLowerCase() === 'semibold') {
// 							fontWeight = 600;
// 						} else if (fontWeight.toLowerCase() === 'bold') {
// 							fontWeight = 700;
// 						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
// 							fontWeight = 800;
// 						} else if (fontWeight.toLowerCase() === 'black') {
// 							fontWeight = 900;
// 						} else {
// 							fontWeight = 400;
// 						}
// 						fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff") format("woff"), url("../fonts/${fontFileName}.woff2") format("woff2");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
// 						newFileOnly	= fontFileName;

// 					}
// 				}
// 			} else {
// 				console.log('Файл fonts.scss вже існує');
// 			}
// 		}
// 	});
// 	return gulp.src(path.srcFolder);
// 	function cb() { }
// }

// `@font-face {
						// 			font-family: ${fontName};
						// 			font-display: swap;
						// 			src: url("../fonts/${fontFileName}.woff") format("woff"), url("../fonts/${fontFileName}.woff2") format("woff2");
						// 			font-weight: ${fontWeight};
						// 			font-style: normal;
						// 		}\r\n`