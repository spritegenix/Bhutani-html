$(function () {
  // Handle form 1
  $('#contact-form').submit(function (e) {
    e.preventDefault();
    handleFormSubmission($(this), '#contact-button', '.ajax-response');
  });

  function handleFormSubmission(form, buttonSelector, responseSelector) {
    var formData = form.serialize();
    $(buttonSelector).text('Sending...');
    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: formData,
    })
      .done(function (response) {
        $(responseSelector)
          .removeClass('error')
          .addClass('success')
          .text(response);
        form.find('input, textarea').val('');
        $(buttonSelector).text('Sent!');
        setTimeout(() => $(buttonSelector).text('Send Message'), 3000);
      })
      .fail(function (data) {
        $(responseSelector).removeClass('success').addClass('error');
        const message =
          data.responseText ||
          'Oops! An error occurred and your message could not be sent.';
        $(responseSelector).text(message);
        setTimeout(() => $(buttonSelector).text('Send Message'), 3000);
      });
  }
});
