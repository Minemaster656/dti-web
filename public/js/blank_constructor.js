$(document).ready(function() {
    $('#download-btn').click(function() {
      var data = {};
  
      $('.field textarea').each(function() {
        var textareaId = $(this).attr('id');
        var textareaValue = $(this).val();
  
        if (textareaValue.match(/^[0-9]+([,.][0-9]+)?$/)) {
          textareaValue = parseFloat(textareaValue.replace(',', '.'));
        }
  
        data[textareaId] = textareaValue;
      });
  
      var jsonData = JSON.stringify(data, null, 2);
      var blob = new Blob([jsonData], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
  
      var a = document.createElement('a');
      a.href = url;
      a.download = 'blank.json';
      a.click();
    });
  
    $('#upload-btn').click(function() {
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
  
      input.onchange = function(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
  
        reader.onload = function() {
          try {
            var jsonData = JSON.parse(reader.result);
  
            $('.field').each(function() {
              var textareaId = $(this).find('textarea').attr('id');
  
              if (jsonData.hasOwnProperty(textareaId)) {
                var textareaValue = jsonData[textareaId];
  
                if (textareaId === 'age') {
                  textareaValue = textareaValue.toString().replace('.', ',');
                } else if (textareaId === 'id' && !textareaValue.endsWith('$temp')) {
                  $(this).find('textarea').val(textareaValue);
                } else {
                  $(this).find('textarea').val(textareaValue);
                }
              }
            });
          } catch (error) {
            console.log('Invalid JSON file');
          }
        };
  
        reader.readAsText(file);
      };
  
      input.click();
    });
  
    $('.field textarea').on('input', function() {
      var pattern = new RegExp($(this).attr('pattern'), 'g');
      var value = $(this).val();
  
      if (pattern.test(value)) {
        $(this).removeClass('invalid');
        $(this).siblings('.error').hide();
      } else {
        $(this).addClass('invalid');
        $(this).siblings('.error').show();
      }
    });
  });