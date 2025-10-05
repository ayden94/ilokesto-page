import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'

import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('caroKann.adaptor')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`interface UserProfile {
  id: number;
  username: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: {
      email: boolean;
      sms: boolean;
    };
  };
  activity: {
    postCount: number;
    lastLogin: string;
  };
}

export const useUserProfileStore = create<UserProfile>({
  id: 1,
  username: 'Alice',
  preferences: {
    theme: 'light',
    notifications: {
      email: true,
      sms: false,
    },
  },
  activity: {
    postCount: 10,
    lastLogin: new Date().toISOString(),
  },
});`}</CodeBlock>

      <CodeBlock language="tsx">{`function UserSettings() {
  const [userProfile, setUserProfile] = useUserProfileStore();

  const toggleEmailNotifications = () => {
    setUserProfile(prevUserProfile => ({
      ...prevUserProfile,
      preferences: {
        ...prevUserProfile.preferences,
        notifications: {
          ...prevUserProfile.preferences.notifications,
          email: !prevUserProfile.preferences.notifications.email,
        },
      },
    }));
  };

  const incrementPostCount = () => {
    setUserProfile(prevUserProfile => ({
      ...prevUserProfile,
      activity: {
        ...prevUserProfile.activity,
        postCount: prevUserProfile.activity.postCount + 1,
      },
    }));
  };

  const changeTheme = (newTheme: 'light' | 'dark') => {
    setUserProfile(prevUserProfile => ({
      ...prevUserProfile,
      preferences: {
        ...prevUserProfile.preferences,
        theme: newTheme,
      },
    }));
  };

  return (
    // ... 
  );
}`}</CodeBlock>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { adaptor } from 'caro-kann/utils'

function UserSettings() {
  const [userProfile, setUserProfile] = useUserProfileStore();

  const toggleEmailNotifications = () => {
    setUserProfile(
      adaptor(store => {
        store.preferences.notifications.email = !store.preferences.notifications.email;
      })
    );
  };

  const incrementPostCount = () => {
    setUserProfile(
      adaptor(store => {
        store.activity.postCount++;
      })
    );
  };

  const changeTheme = (newTheme: 'light' | 'dark') => {
    setUserProfile(
      adaptor(store => {
        store.preferences.theme = newTheme;
      })
    );
  };

  return (
    // ... 
  );
}`}</CodeBlock>
    </>
  )
}
