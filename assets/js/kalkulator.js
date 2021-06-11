$(() => {
	/* global var */
	var masuk = $('#masuk'), keluar = $('#keluar'), light = true;

	/* main function */
	const mtk = (x) => {
		// filter input & append value
		masuk.val(masuk.val().replace(/[A-Za-z]+/, '')+x);

		// auto equal(?)
		try {
			masuk.val() ? keluar.val(eval(masuk.val())) : keluar.val('');
		} catch(SyntaxError) {
			return;
		}
	}

	/* delete function */
	const del = (all) => {
		masuk.val(all ? '' : masuk.val().slice(0, -1));
		mtk('');
	}

	/* theming */
	const mode = () => {
		// selected tag
		const all = ['body', '#masuk', '#keluar', '#tombol'];

		if(light) {
			// dark theme
			light = false;
			all.forEach((x) => {
				$(x).attr('mode', 'dark');
			});
			localStorage.setItem('tema', 'dark');
		} else {
			// light theme
			light = true;
			all.forEach((x) => {
				$(x).removeAttr('mode');
			});
			localStorage.removeItem('tema');
		}
	};

	/* set theme onload */
	if(localStorage.getItem('tema') === 'dark') {
		light = true;
		mode();
	}

	/* all about button */
	const buttons = ['C', 'Del', '^', '÷', 7, 8, 9, '×', 4, 5, 6, '-', 1, 2, 3, '+', '(', 0, '.', ')', '='];
	var count = 0;
	buttons.forEach((button) => {
		if(button == 'C') {
			func = 'del';
			val = 'true';
		} else if(button == 'Del') {
			func = 'del';
			val = 'false';
		} else if(button == '=') {
			func = 'eval';
			val = '$("#masuk").val($("#keluar").val())';
		} else if(button == '^') {
			func = 'mtk';
			val = '**';
		} else if(button == '÷') {
			func = 'mtk';
			val = '/';
		} else if(button == '×') {
			func = 'mtk';
			val = '*';
		} else {
			func = 'mtk';
			val = button;
		}
		$('#tombol').append(`<button data-func='${func}' data-val='${val}'>${button}</button>`);
		count++;
		if(count == 4) {
			$('#tombol').append('<br>');
			count = 0;
		}
	});

	/* event click for button */
	$('#tombol').on('click', 'button', function() {
		const data = $(this).data();
		eval(data.func)(data.val);
	});

	/* theme button */
	$('#header').click(function() {
		mode();
	});
})