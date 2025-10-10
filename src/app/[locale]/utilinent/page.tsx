import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('utilinent.introduce')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('description', codeFormatObject)}</Textline>

      <Heading.h2>{t('installation')}</Heading.h2>

      <Textline>{t('installationBody')}</Textline>

      <CodeBlock filename="install.sh" language="bash">
        {`npm install @ilokesto/utilinent
pnpm add @ilokesto/utilinent
yarn add @ilokesto/utilinent
bun add @ilokesto/utilinent`}
      </CodeBlock>

      <Heading.h2>{t('quickStart')}</Heading.h2>

      <Textline>{t('0')}</Textline>

      <CodeBlock language="tsx">{`import React, { useState, useEffect } from 'react';
  
const UserList = () => {
  const { data: users } = useQuery( ... )

  return (
    <div>
      <h2>User List</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        users.length > 0 ? (
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )
      )}
    </div>
  );
};
  
export default UserList;`}</CodeBlock>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import React, { useState, useEffect } from 'react';
import { Show, For } from '@ilokesto/utilinent';

const UserListAfter = () => {
  const { data: users } = useQuery( ... )

  return (
    <div>
      <h2>User List</h2>
      <Show when={!loading} fallback={<p>Loading users...</p>}>
        <For.ul each={users} fallback={<p>No users found.</p>}>
          {(user) => (
            <li key={user.id}>{user.name}</li>
          )}
        </For.ul>
      </Show>
    </div>
  );
};

export default UserListAfter;`}</CodeBlock>
    </>
  )
}
