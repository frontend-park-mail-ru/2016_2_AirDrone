/**
 * Класс представляет собой view
 */
export default class View {
	/**
	 * Создаёт новую view
	 * @param {Object} [options={}] - Объект с параметрами
	 */
	constructor(options = {}) {
        this.setRouter(window.router);
		this.tagName = options.tagName || 'div';
        this._el = document.querySelector(options.element) || document.createElement(this.tagName);
        this.bodyClass = options.bodyClass;
        this.hide();
	}

	/**
	 * Инициализация параметров view (выполняется сразу после создания)
	 * Необходимо перепределять
	 * @param {Object} [options={}] - Объект с параметрами
	 */
	init(options = {}) {
		this.setAttrs(options.attrs);
	}

	/**
	 * Вызывается при приостановке работы view (при скрытии view или переходе на другую view)
	 * Необходимо переопределять своей логикой
	 * @param {Object} [options={}] - Объект с параметрами
	 */
	pause(options = {}) {
		this.hide();
	}

	/**
	 * Вызывается при начале или продолжении работы view (после того, как view была скрыта)
	 * Необходимо переопределять своей логикой
	 * @param {Object} [options={}] - Объект с параметрами
	 */
	resume(options = {}) {
        this.render();
		this.show();
	}

	/**
	 * Показывает view
	 * @param {Object} [options={}] - Объект с параметрами
	 */
	show(options = {}) {
		this._el.hidden = false;
        if (this.bodyClass) {
            document.body.classList.add(this.bodyClass);
        }
	}

	/**
	 * Скрывает view
	 * @param {Object} [options={}] - Объект с параметрами
	 */
	hide(options = {}) {
		this._el.hidden = true;
        if (this.bodyClass) {
            document.body.classList.remove(this.bodyClass);
        }
	}

	/**
	 * Рендерит view
	 * Необходимо переопределять
	 * @param {Object} [options={}] - Объект с параметрами
	 */
	render(options = {}) {

	}

	/**
	 * Вставляет текущую view в переданный элемент
	 * @param {HTMLElement} el - HTML-элемент, к которому добавляется элемент текущей view
	 */
	appendTo(el) {
		el.appendChild(this._el);
	}

	/**
	 * Удаляет элемент текущей view
	 */
	remove() {
		this._el && this._el.remove();
	}

	/**
	 * Заменяет элемент текущей view
	 * @param {HTMLElement} el - HTML-элемент, который становится элементом текущей view
	 */
	setElement(el) {
		this._el && this._el.remove();
		this._el = el;
	}

	/**
	 * Устанавливает текущей view набор атрибутов
	 * @param {Object} [attrs={}] - Объект с атрибутами, которые будут установлены у текущего элемента view
	 */
	setAttrs(attrs = {}) {
		Object.keys(attrs).forEach(name => {
			this._el.setAttribute(name, attrs[name]);
		})
	}

	/**
	 * Возвращает строку, содержашую текстовое представление текущей view
	 * @returns {string}
	 */
	toString() {
		return this._el.outerHTML;
	}

	/**
	 * Устанавливает текущей view роутер
	 * @param {Router} router - инстанс роутера
	 */
	setRouter(router) {
		this.router = router;
	}
}
