function generateCode(length: any) {
  let code = '';
  let schema = '0123456789';

  for (let i = 0; i < length; i++) {
    code += schema.charAt(Math.floor(Math.random() * schema.length));
  }

  return Number(code);
}
export default generateCode;
