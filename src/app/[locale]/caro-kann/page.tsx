import Link from 'next/link'

export default function CaroKannPage() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="not-prose mb-8">
        <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
          Introduce the caro-kann
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-6">caro-kann</h1>

      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        간결하고 예측 가능한 전역 상태 관리 라이브러리 — 작은 러닝 커브로도 대규모 애플리케이션의 상태를 안정적이고 성능
        좋게 관리할 수 있습니다.
      </p>

      <h2>Quick Start</h2>

      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <code>{`npm install caro-kann`}</code>
      </pre>

      <h2>Basic Example</h2>

      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <code>{`import { createStore } from 'caro-kann'

const useCountStore = createStore({
  count: 0,
  increment: () => (state) => ({ count: state.count + 1 }),
  decrement: () => (state) => ({ count: state.count - 1 }),
})

function Counter() {
  const { count, increment, decrement } = useCountStore()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}`}</code>
      </pre>

      <h2>Features</h2>

      <ul>
        <li>
          <strong>State Management</strong> - 직관적인 전역 상태 관리
        </li>
        <li>
          <strong>React Integration</strong> - React hooks와 완벽 호환
        </li>
        <li>
          <strong>Global State</strong> - 컴포넌트 간 상태 공유
        </li>
        <li>
          <strong>Middleware Support</strong> - 확장 가능한 미들웨어 시스템
        </li>
        <li>
          <strong>Persistence</strong> - 상태 영속화 지원
        </li>
        <li>
          <strong>Derived State</strong> - 계산된 상태 값
        </li>
        <li>
          <strong>ReadOnly Mode</strong> - 읽기 전용 상태 접근
        </li>
        <li>
          <strong>Mergeable Store</strong> - 스토어 병합 기능
        </li>
      </ul>

      <h2>Next Steps</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">📚 Guides</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">스토어 생성부터 고급 사용법까지 단계별 가이드</p>
          <Link
            href="/caro-kann/guides/create-store"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Create a store →
          </Link>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🛠 Utils</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">유용한 유틸리티 함수들</p>
          <Link href="/caro-kann/utils/adaptor" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
            Adaptor →
          </Link>
        </div>
      </div>
    </div>
  )
}
