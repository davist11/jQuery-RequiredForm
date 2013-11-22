/**
 * @name jQuery Required Form
 * @author Trevor Davis
 * @copyright (cc) Trevor Davis (http://www.viget.com)
 * @requires Modernizer with formvalidation
 *
 * Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
 */
;(function($, window, document, undefined) {

	var RequiredForm = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('requiredForm-options');
		this.$requiredInputs = this.$elem.find(':input[required]');
		this.$htmlBody = $('html, body');
	};

	RequiredForm.prototype = {
		defaults: {
			errorClass: 'error',
			errorText: 'Please fill out this field.',
			errorElement: 'em',
			inputErrorClass: 'input--error',
			scrollSpeed: 500
		},

		init: function() {
			//Merge options
			this.config = $.extend({}, this.defaults, this.options, this.metadata);

			// If it doesn't support HTML5 validation, let's do this
			if (!Modernizr.formvalidation) {
				this.bindEvents();
				this.createErrorElement();
			}

			return this;
		},

		bindEvents: function() {
			this.$elem.on('submit.requiredForm', this.checkFields.bind(this));
		},

		createErrorElement: function() {
			this.$errorEl = $('<' + this.config.errorElement + '/>', {
				'class': this.config.errorClass,
				text: this.config.errorText
			});
		},

		checkFields: function(e) {
			// Reset existing displayed errors
			this.hasError = false;
			this.$elem.find(this.config.errorElement + '.' + this.config.errorClass).remove();
			this.$elem.find(':input.' + this.config.inputErrorClass).removeClass(this.config.inputErrorClass);

			// Check each field
			this.$requiredInputs.each(this.checkField.bind(this));

			// Is there an error?
			if (this.hasError) {
				e.preventDefault();

				this.$htmlBody.animate({
					scrollTop: this.$elem.offset().top
				}, this.config.scrollSpeed);
			}
		},

		checkField: function(index) {
			var $field = this.$requiredInputs.eq(index);
			var fieldValue = $.trim($field.val());

			// Check if it's empty
			if (fieldValue === '') {
				this.hasError = true;

				$field.addClass(this.config.inputErrorClass).after(this.$errorEl.clone());
			}
		}
	};

	RequiredForm.defaults = RequiredForm.prototype.defaults;

	$.fn.requiredForm = function(options) {
		return this.each(function() {
			new RequiredForm(this, options).init();
		});
	};

})(jQuery, window , document);