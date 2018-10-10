jQuery(document).ready(function(){

	Joomla.submitbutton = function(task)
	{
		if (task == 'fields.delete')
		{
			if (confirm(Joomla.JText._('COM_TJFIELD_CONFIRM_DELETE_FIELD')) == false)
			{
				return false;
			}

			if (confirm(Joomla.JText._('COM_TJFIELD_CONFIRM_DELETE_REFRENCE_DATA')) == false)
			{
				return false;
			}
		}
		Joomla.submitform(task);

		return true;
	}

	/* This function deletes tjfield file via ajax */
	deleteFile = function(filePath, fieldId, valueId, subformFileFieldId, isSubformField, client)
	{
		if (!filePath)
		{
			return;
		}

		if(!confirm(Joomla.JText._('COM_TJFIELDS_FILE_DELETE_CONFIRM')))
		{
			return;
		}

		jQuery.ajax({
			url: Joomla.getOptions('system.paths').base + "/index.php?option=com_tjfields&task=fields.deleteFile&format=json",
			type: 'POST',
			data:{
							filePath: filePath,
							valueId: valueId,
							subformFileFieldId:subformFileFieldId,
							isSubformField:isSubformField,
							client:client
			},
			cache: false,
			dataType: "json",
			success: function (result) {
				alert(result.message);
				if (result.data) {
					var element = jQuery("input[fileFieldId='" + fieldId + "']");
					element.val('');
					element.next().remove('div.control-group');
				}
			}
		});
	}

    /*Required fields valiadtion*/
    document.formvalidator.setHandler('min100', function(value) {
        value = value.trim();
        if (value.trim().length < 100) {
            return false;
        }
        return true;
    });

    document.formvalidator.setHandler('min200', function(value) {
        value = value.trim();
        if (value.trim().length < 200) {
            return false;
        }
        return true;
    });

    document.formvalidator.setHandler('min250', function(value) {
        value = value.trim();
        if (value.trim().length < 250) {
            return false;
        }
        return true;
    });

    document.formvalidator.setHandler('min300', function(value) {
        value = value.trim();
        if (value.trim().length < 300) {
            return false;
        }
        return true;
    });

    document.formvalidator.setHandler('blank-space', function(value) {
        if (value.trim() == '') {
            return false;
        }
        return true;
    });
    document.formvalidator.setHandler('numeric', function(value) {
        if (Number(value) <= 0) {
            return false;
        }
        return true;
    });

    document.formvalidator.setHandler('filetype', function(value, element) {

        let file_accept = element[0].accept;
        let accept_array = file_accept.split(",");
        let uploadedfile = element[0].files[0];

        /* Get uploaded file name */
        let filename = uploadedfile.name;

        /* extension of file*/
        let ext = '.' + filename.split('.').pop().toLowerCase();

        // Converting to bytes
        let uploadSize = element[0].size * 1048576;
        let filesize = element[0].files[0].size;

        if(uploadSize < filesize)
        {
        	alert(Joomla.JText._('COM_TJFIELDS_FILE_ERROR_MAX_SIZE'));

        	return false;
        }

        if(accept_array.indexOf(ext) === -1)
        {
           return false;
        }

        return true;
    });
    document.formvalidator.setHandler('url', function(value) {
        let regex = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&#\/%?=~_|!:,.;]*[-a-z0-9+&#\/%=~_|]/i;
        return regex.test(value);
    });

    /* It restrict the user for manual input in datepicker field */
    jQuery(document).delegate('.calendar-textfield-class', 'focusin', function(event) {
       event.preventDefault();
       jQuery(this).parent().siblings(':eq(0)').show();
    });

    jQuery(document).delegate('.calendar-textfield-class', 'keydown contextmenu', function(event) {
			return false;
    });

    /* Code for number field validation */
    document.formvalidator.setHandler('check_number_field', function(value, element) {
        let enteredValue = parseFloat(value);
        let maxValue = parseFloat(element[0].max);
        let minValue = parseFloat(element[0].min);

        if (!isNaN(maxValue) || !isNaN(minValue)) {
            if (maxValue < enteredValue || minValue > enteredValue) {
                alert(Joomla.JText._('COM_TJUCM_FIELDS_VALIDATION_ERROR_NUMBER'));
                return false;
            }
            return true;
        }
        return false;
    });
});
