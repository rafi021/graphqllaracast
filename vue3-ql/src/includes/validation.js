import { 
    Form as VeeForm,
    Field as VeeField, 
    defineRule,
    ErrorMessage, 
    configure 
} from "vee-validate";
import { required, min, max, email, alpha_spaces as alphaSpaces, min_value as minVal, max_value as maxVal,
confirmed, not_one_of as excluded } from "@vee-validate/rules";

export default{
    install(app){
        app.component("VeeForm", VeeForm);
        app.component("VeeField", VeeField);
        app.component("ErrorMessage", ErrorMessage);
        defineRule('required', required);
        defineRule('checkbox', required);
        defineRule('email', email);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('alpha_spaces', alphaSpaces);
        defineRule('min_value', minVal);
        defineRule('max_value', maxVal);
        defineRule('passwords_mismatch', confirmed);
        defineRule('excluded', excluded);

        configure({
            generateMessage: (ctx) =>{
                const messages = {
                    required: `The field ${ctx.field} is required.`,
                    min: `The field ${ctx.field} is too short.`,
                    max: `The field ${ctx.field} is too long.`,
                    alpha_spaces: `The field ${ctx.field} may only contain alaphabetical characters and spaces.`,
                    email: `The field ${ctx.field} must be a valid email.`,
                    min_value: `The field ${ctx.field} is too low.`,
                    max_value: `The field ${ctx.field} is too high.`,
                    excluded: `You are now allowed to use this value for the field ${ctx.field}`,
                    passwords_mismatch: ` The Passwords don't match`,
                    checkbox: 'You must accept the Terms of Service'
                };

                const message = messages[ctx.rule.name] 
                ? messages[ctx.rule.name] 
                : `The field ${ctx.field} is invalid`;

                return message;
            },
            validateOnBlur: true,
            validateOnChange: true,
            validateOnInput: false,
            validateOnModelUpdate: true
        })
    }
}