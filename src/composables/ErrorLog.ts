export default function ErrorLog(
  className: string,
  functionName: string,
  lineNumber: number,
  message: string
) {
  return `[${className}_${functionName} ${lineNumber}]${message}`
}
