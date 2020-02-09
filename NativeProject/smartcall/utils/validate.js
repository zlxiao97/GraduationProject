export function validateName(name){
    var isValidate = false;
    const reg = /\W/g;
    isValidate = !reg.test(name);
    return isValidate;
}