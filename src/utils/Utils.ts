class Utils {
  static transformBodyToCode = (body: string[]): string => {
    let code = "";
  
    body.forEach((line: string) => {
      code += line;
    });
  
    return code;
  };
}

export default Utils;
