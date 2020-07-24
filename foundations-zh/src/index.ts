export interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}

// 这里用Array存放可能的stacktrace格式
// 实际情况里可能直接存成CONST然后根据浏览器的类型调用对应的会比较好
const PATTERNS = [
  /^(at)\s(?<function>(.*)\s)?(?<path>[^\s]+\.\w+):(?<line>\d+):(?<col>\d+)$/, 
  /^((?<function>.+)@)?(?<path>[^\s]+\.\w+):(?<line>\d+):(?<col>\d+)$/,
]


export function parseError(err: Error): ErrorMessage {
  const parsedErrorLog = {
    message: err.message,
    stack: [] as any
  }
  if (err.stack) {
    err.stack.split('\n').forEach((row) => {
      let match = null;
      for (let i=0; i<PATTERNS.length; i++) {
        match = PATTERNS[i].exec(row.trim());
        if(match) {
          break;
        }
      }
      // 根据要求仅有带文件路径的trace需要被添加进上报记录里
      if (match) {
        const groups = match.groups;
        if (groups) {
          const stackItem = {
            line: Number(groups.line) || 0,
            column: Number(groups.col) || 0,
            filename: groups.path || ''
          };
          parsedErrorLog.stack.push(stackItem);
        }
      }
    })
  }
  return parsedErrorLog;
}
