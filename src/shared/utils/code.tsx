export function codeFormatter() {
  return {
    cd: (chunk: React.ReactNode) => <code className="code">{chunk}</code>,
    br: () => <br />,
    b: (chunk: React.ReactNode) => <b className="font-bold">{chunk}</b>,
  }
}
