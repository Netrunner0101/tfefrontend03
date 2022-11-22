import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

/*
export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const start = control.get('outbout_date');
  const end = control.get('arrival_date');
  console.log("Date validators for Delivery called");
  return start?.value !== null && end?.value !== null && start?.value < end?.value
    ? null :{ dateValid:true };
}
*/

export function dateLessThan( firstDateField:string,secondDateField:string) : ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null =>{

    const firstDateValue = form.get(firstDateField)?.value;
    const secondDateValue = form.get(secondDateField)?.value;

    if(!firstDateValue || !secondDateValue){
      return { missing : true };
    }

    const firstDate = new Date(firstDateValue);
    const secondDate = new Date(secondDateValue );

    if(firstDate.getDate() > secondDate.getDate() ){
      const err = {dateLessThan:true};
      form.get(firstDateField)?.setErrors(err);
      return err;
    }else {
      const dateLessError = form.get(firstDateField)?.hasError('dateLessThan');
      if(dateLessError){
        delete form.get(firstDateField)?.errors?.['dateLessThan'];
        form.get(firstDateField)?.updateValueAndValidity();
      }
    }
    return null;
  }

}
