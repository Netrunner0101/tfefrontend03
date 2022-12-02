import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';


export function unique( checkValue:[], value:string ) : ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null =>{

    const val = form.get(value)?.value;

    if(!val){
      return { missing : true };
    }

    if(checkValue.find(val)){
      const err = {uniqueValue:true};
      form.get(value)?.setErrors(err);
      return err;
    }else {
      const uniqueValError = form.get(value)?.hasError('unique');
      if(uniqueValError){
        delete form.get(value)?.errors?.['uniqueErro'];
        form.get(value)?.updateValueAndValidity();
      }
    }
    return null;
  }
}
