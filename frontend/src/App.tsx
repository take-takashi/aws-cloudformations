import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Authenticator initialState="signIn"
        formFields={{
          signIn: {
            username: {
              label: "ユーザー名",
              placeholder: "ユーザー名を入力してください"
            },
            password: {
              label: "パスワード",
              placeholder: "パスワードを入力してください"
            },
          },
        }}
      >
        {({ signOut, user }) => (
          <main>
            {/* 認証済みユーザー向けのUIをここに配置 */}
            <h2>{user?.username} さん、ようこそ</h2>
            <button onClick={signOut}>サインアウト</button>
          </main>
        )}
      </Authenticator>
    </>
  )
}

export default App
