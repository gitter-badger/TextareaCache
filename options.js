window.onload = () => {

	var showUpdatedMessage = (status) => {
		if (status == 'success')
			document.querySelector('.response').innerHTML = 'Your change has been saved.';
		else {
			document.querySelector('.response').innerHTML = 'There is something wrong, please report to developer.';
		}
		setTimeout( () => {
			document.querySelector('.response').innerHTML = '';
		}, 3000);
	};

	browser.runtime.sendMessage({
		behavior: 'set_options'
	}).then( res => {
		var {setting} = res;
		for (var key in setting) {
			var dom = document.querySelector('#' + key);
			switch(dom.type){
				case 'checkbox':
					if (setting[key]) dom.checked = true;
					break;
				default:
					break;
			}
		}
	});

	document.querySelector('#debug').addEventListener('change', e => {
		var isDebug = e.currentTarget.checked;

		browser.runtime.sendMessage({
			behavior: 'set_options',
			key: 'debug',
			val: isDebug
		}).then( () => {
			showUpdatedMessage('success');
		});
	});
};
