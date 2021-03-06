$(function() {

	// Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.form-message');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		setTimeout(function() {
			if (
				[...$('.form-group')]
					.filter(function(formGroup) {
						return formGroup.classList.contains('has-error') ||
						formGroup.classList.contains('has-danger');
					}).length === 0
			) {
				// Serialize the form data.
				var formData = $(form).serialize();

				// Submit the form using AJAX.
				$.ajax({
					type: 'POST',
					url: $(form).attr('action'),
					data: formData
				})
				.done(function() {
					// Make sure that the formMessages div has the 'success' class.
					$(formMessages).removeClass('error');
					$(formMessages).addClass('success');

					// Set the message text.
					$(formMessages).text('Thanks! We will get in touch soon.');

					// Clear the form.
					$('#contact-form input,#contact-form textarea').val('');
				})
				.fail(function() {
					// Make sure that the formMessages div has the 'error' class.
					$(formMessages).removeClass('success');
					$(formMessages).addClass('error');

					// Set the message text.
					$(formMessages).text('Oops! An error occured and your message could not be sent.');
				});
			}
		}, 100);
	});

});
