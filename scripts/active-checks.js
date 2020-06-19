(($) => {
  // eslint-disable-next-line space-before-function-paren
  $('.list-group-item').each(function () {
    const widget = $(this);
    const $checkbox = $('<input type="checkbox" class="hidden" />');
    const color = widget.data('color') ? widget.data('color') : 'primary';
    const style = widget.data('style') === 'button' ? 'btn-' : 'list-group-item-';
    const settings = {
      on: { icon: 'fa fa-check-square' },
      off: { icon: 'far fa-square' },
    };

    widget.css('cursor', 'pointer');
    widget.append($checkbox);

    // Actions
    function updateDisplay() {
      const isChecked = $checkbox.is(':checked');

      // Set the button's state
      widget.data('state', isChecked ? 'on' : 'off');

      // Set the button's icon
      widget
        .find('.state-icon')
        .removeClass()
        .addClass(`state-icon ${settings[widget.data('state')].icon}`);

      // Update the button's color
      if (isChecked) {
        widget.addClass(`${style + color} active`);
      } else {
        widget.removeClass(`${style + color} active`);
      }
    }

    // Event Handlers
    widget.on('click', () => {
      $checkbox.prop('checked', !$checkbox.is(':checked'));
      $checkbox.triggerHandler('change');
      updateDisplay();
    });
    $checkbox.on('change', () => {
      updateDisplay();
    });

    // Initialization
    function init() {
      if (widget.data('checked') === true) {
        $checkbox.prop('checked', !$checkbox.is(':checked'));
      }
      updateDisplay();

      // Inject the icon if applicable
      if (widget.find('.state-icon').length === 0) {
        widget.prepend(
          `<span class="state-icon ${
            settings[widget.data('state')].icon}"></span>`,
        );
      }
    }
    init();
  });

  $('#get-checked-data').on('click', (event) => {
    event.preventDefault();
    const checkedItems = {};
    let counter = 0;
    $('#check-list-box li.active').each((idx, li) => {
      checkedItems[counter] = $(li).text();
      counter += 1;
    });
    $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
  });
})(jQuery);