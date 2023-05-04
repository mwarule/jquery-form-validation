var validator;

// document ready
$(function () {
    customValidations()
    initValidator()
    toggleTabs(0)
    populateStates();
});

showModal = () => {
    cancel()
    $("#modal").css('display', 'block');
    $("body").addClass("modal-open");
}

hideModal = () => {
    $("#modal").css('display', 'none');
    $("body").removeClass("modal-open");
}

toggleTabs = (index) => {
    validator.resetForm()
    cancel()
    $('.-account-container .tab-item').removeClass('active');
    $('.-account-container .tab-item').eq(index).addClass('active');
    if (index === 0) {
        $('#companyAccount').parent().show()
        $('#salesRepName').parent().show()
        $('#contractorLicenseNumber').parent().hide()
    } else {
        $('#companyAccount').parent().hide()
        $('#salesRepName').parent().hide()
        $('#contractorLicenseNumber').parent().show()
    }
}

populateStates = () => {
    $.getJSON('./public/states.json', function (states) {
        $.each(states, function (index, value) {
            $("#state").append('<option value="' + value.abbreviation + '">' + value.name + '</option>');
        });
    })
}

customValidations = () => {
    $.validator.addMethod('customMobileValidation', function (value, element) {
        return this.optional(element) || /^\d{3}-\d{3}-\d{4}$/.test(value);
    }, "Invalid phone number, please try again");
}

initValidator = () => {
    validator = $('#form').validate({
        rules: {
            companyAccount: 'required',
            companyName: 'required',
            salesRepName: 'required',
            contractorLicenseNumber: 'required',
            mobile: {
                required: true,
                customMobileValidation: true
            }
        },
        messages: {
            email: {
                email: "Invalid email, please try again"
            }
        },
        submitHandler: function (form) {
            submitForm(form)
        }
    });
}

submitForm = (form) => {
    showModal()
}

cancel = () => {
    $('#form')[0].reset();
    validator.resetForm();
}

isNumberKey = (evt) => {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

mobileFormat = () => {
    // mobile formatter
    let inputValue = $('#mobile').val();
    if (inputValue.length > 9) {
        inputValue = String(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    } else {
        inputValue = String(inputValue.replace(/(\d{3})(?=\d)/g, '$1-'));
    }
    $('#mobile').val(inputValue);
}