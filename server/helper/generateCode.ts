function generateCode(length: number) {
  let code = '';
  let schema = '0123456789';

  for (let i = 0; i < length; i++) {
    code += schema.charAt(Math.floor(Math.random() * schema.length));
  }

  return code;
}
export default generateCode;
