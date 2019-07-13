	//функция для формирования и скачивания файла
	function download(data, filename, type) {
	    var file = new Blob([data], {type: type});
	    if (window.navigator.msSaveOrOpenBlob) // IE10+
	        window.navigator.msSaveOrOpenBlob(file, filename);
	    else { // Другие
	        let a = document.createElement("a"),
	        	url = URL.createObjectURL(file);
	        a.href = url;
	        a.download = filename;
	        document.body.appendChild(a);
	        a.click();
	        setTimeout(function() {
	            document.body.removeChild(a);
	            window.URL.revokeObjectURL(url);  
	        }, 0); 
	    }
	}	

//Главная функция 
function commentsStrip(object){
	var RE_BLOCKS = new RegExp([
	  /\/(\*)[^*]*\*+(?:[^*\/][^*]*\*+)*\//.source,           // $1: многострочный коммент
	  /\/(\/)[^\n]*$/.source,                                 // $2 однострочный коммент
	  /"(?:[^"\\]*|\\[\S\s])*"|'(?:[^'\\]*|\\[\S\s])*'|`(?:[^`\\]*|\\[\S\s])*`/.source,
	  /(?:[$\w\)\]]|\+\+|--)\s*\/(?![*\/])/.source,           // - оператор деления
	  /\/(?=[^*\/])[^[/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[/\\]*)*?\/[gim]*/.source
	  ].join('|'),                                            // - РЕГУЛЯРКА
	  'gm'  
	);

	//проверка на поддержку браузером FILE API
	if (window.File && window.FileReader && window.Blob) {
		var content = ''; //переменная для записи содержимого файла
		var file = object.files[0]; // первый элемент массива файлов
		var reader = new FileReader();
		//при успешном прогружении файла записать содержимое в переменную
		reader.onload = function(){
			content = reader.result;
			//удалить комментарии
			let a = content.replace(RE_BLOCKS, function (match, mlc, slc) {
   												return mlc ? ' ' :         // многострочный коммент (пробел)
           										slc ? '' :          // одно/многострочный
           										match;             
  			});
			//Вернуть функцию для скачивания готового документа
			return(download(a, file.name, file.type));
		}
		//считать как простой текст
		reader.readAsText(file);
	}else{
		alert("Нужные File API не поддерживаются вашим браузером!");
	}
}


