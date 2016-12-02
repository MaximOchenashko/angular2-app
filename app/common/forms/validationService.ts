/**
 * @author iRevThis
 */

export class ValidationService {

    static config = {
        'required': 'Required',
        'invalidEmailAddress': 'Invalid email address',
        'invalidPassword': 'Invalid password. Password must be at least 5 characters long, and contain digit, lowercase and uppercase symbol',
        'equalPasswords': 'Passwords must be equal'
    };

    static validatorErrorMessage(code:string) {
        return ValidationService.config[code];
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return {'invalidEmailAddress': true};
        }
    }

    static passwordValidator(control) {
        if (control.value.match(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{5,20})\S/)) {
            return null;
        } else {
            return {'invalidPassword': true};
        }
    }

    static passwordsEqualValidator(control) {
        return null;
    }
}