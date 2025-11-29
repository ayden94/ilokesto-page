import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.grunfeld.guides' })

  return {
    title: t('scenario'),
    description: t('scenario'),
  }
}

export default async function Page() {
  const t = await getTranslations('grunfeld.guides.scenario')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// 로그인 시나리오 정의
const loginScenario = grunfeld.scenario("login", {
  showLoginForm: () => {
    grunfeld.add(() => ({
      element: <LoginForm />,
      position: "center",
    }));
  },

  showLoading: () => {
    grunfeld.remove(); // 이전 단계 정리
    grunfeld.add(() => ({
      element: "Loading...",
      position: "center",
    }));
  },

  showSuccess: () => {
    grunfeld.remove();
    grunfeld.add(() => ({
      element: "로그인 성공!",
      position: "top-right",
    }));
  },
});

// 사용법 - 동적 메서드 접근
await loginScenario.showLoginForm(); // 특정 단계 실행
await loginScenario.showLoading();
await loginScenario.showSuccess();`}</CodeBlock>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// 분리된 시나리오 정의
const advancedScenario = grunfeld.scenario(
  "user-management",
  // 제어 로직 (factory)
  (cliche) => ({
    processUser: async (user) => {
      if (user.isPremium) {
        await cliche.showPremiumContent();
      } else {
        await cliche.showBasicContent();
      }
      await cliche.logActivity();
    },
  }),
  // 실제 구현 (implementation)
  {
    showPremiumContent: () => {
      grunfeld.add(() => "프리미엄 콘텐츠");
    },
    showBasicContent: () => {
      grunfeld.add(() => "기본 콘텐츠");
    },
    logActivity: () => {
      console.log("사용자 활동 기록됨");
    },
  }
);

// 사용법
await advancedScenario.processUser({ isPremium: true });`}</CodeBlock>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// 매개변수를 받는 시나리오 정의
const userScenario = grunfeld.scenario("user-flow", {
  welcomeUser: ({ userName, userType }) => {
    grunfeld.add(() => ({
      element: \`\${userName}님 (\${userType}) 환영합니다!\`,
      position: "center",
    }));
  },

  showDashboard: ({ permissions = [] }) => {
    grunfeld.add(() => ({
      element: \`대시보드 (권한: \${permissions.join(", ")})\`,
      position: "center",
    }));
  },
});

// 개별 단계에 매개변수 전달 (동적 메서드 접근)
await userScenario.welcomeUser({
  userName: "홍길동",
  userType: "관리자",
});

await userScenario.showDashboard({
  permissions: ["read", "write", "admin"],
});`}</CodeBlock>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('6', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const registrationScenario = grunfeld.scenario("registration", {
  getUserName: async () => {
    const name = await grunfeld.add<string>((removeWith) => ({
      element: (
        <div>
          <h3>이름을 입력하세요</h3>
          <input
            type="text"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                removeWith(e.target.value);
              }
            }}
          />
        </div>
      ),
      position: "center",
    }));

    console.log("입력받은 이름:", name);
    return name;
  },

  confirmData: async () => {
    const confirmed = await grunfeld.add<boolean>((removeWith) => ({
      element: (
        <div>
          <p>정보가 맞습니까?</p>
          <button onClick={() => removeWith(true)}>확인</button>
          <button onClick={() => removeWith(false)}>취소</button>
        </div>
      ),
      position: "center",
    }));

    if (!confirmed) {
      throw new Error("사용자가 취소했습니다");
    }
  },
});`}</CodeBlock>

      <Heading.h2>{t('subtitle6')}</Heading.h2>

      <Textline>{t.rich('8', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1', '2', '3', '4'] as const).map((num) => (
          <List.item key={num}>{t.rich(`apiList.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>
    </>
  )
}
