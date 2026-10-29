'use client'

/**
 * LanguageSelector — dropdown to pick a supported language
 */

const LANGUAGES = [
  { id: 71, name: 'Python',     defaultCode: 'print("Hello, World!")' },
  { id: 63, name: 'JavaScript', defaultCode: 'console.log("Hello, World!")' },
  { id: 62, name: 'Java',       defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
  { id: 54, name: 'C++',        defaultCode: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
  { id: 50, name: 'C',          defaultCode: '#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
]

export { LANGUAGES }

export default function LanguageSelector({ selected, onChange }) {
  return (
    <select
      value={selected}
      onChange={e => onChange(parseInt(e.target.value))}
      className="px-3 py-1.5 text-sm bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
    >
      {LANGUAGES.map(lang => (
        <option key={lang.id} value={lang.id}>{lang.name}</option>
      ))}
    </select>
  )
}
