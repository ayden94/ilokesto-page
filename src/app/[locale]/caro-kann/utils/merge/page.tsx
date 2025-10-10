import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import Warning from '@/ui/components/Warning'

import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.caroKann' })
  return { title: t('utils'), description: t('utils') }
}

export default async function Page() {
  const t = await getTranslations('caroKann.merge')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`export type Product = {
  id: string,
  name: string,
  price: number,
  imageUrl?: string,
  description?: string,
}

export const useCart = create<Array<Product>>([])

export const useUserProfile = create({
  email: "wpfekdml@me.com",
  name: "Ayden Blair",
  phoneNumber: "010-****-****",
  age: 30,
})`}</CodeBlock>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`export const useUserProfileAndCart = merge({ 
  cart: useCart,
  userProfile: useUserProfile
})`}</CodeBlock>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>
      <CodeBlock language="tsx">{`import { create } from 'caro-kann';
import { persist } from 'caro-kann/middleware';
import { merge } from 'caro-kann/utils';

// Desktop sidebar toggle state (using persist middleware)
// State persists after browser refresh to remember user preferences
const useDesktopSidebarToggle = create(
  persist(false, { local: "desktopSidebarToggle" })
);

// Mobile sidebar toggle state (no middleware)
// For mobile, it's common to maintain state only during the session
const useMobileSidebarToggle = create(false);

// Merge the two stores into one
const useSidebarToggle = merge({
  desktop: useDesktopSidebarToggle,  // persist middleware applied
  mobile: useMobileSidebarToggle     // no middleware
});`}</CodeBlock>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { adaptor } from 'caro-kann/utils';

function NavigationComponent() {
  const [sidebarState, setSidebarState] = useSidebarToggle(store => ({
    desktop: store.desktop ? 'Open' : 'Closed',
    mobile: store.mobile ? 'Open' : 'Closed'
  }));

  const toggleSidebar = (where: "desktop" | "mobile") => {
    setSidebarState(adaptor(prev => {
      prev[where] = !prev[where];
    }))
  };

  return (
    <nav>
      <button onClick={() => toggleSidebar("desktop")}>
        Desktop Sidebar: {sidebarState.desktop}
      </button>
      <button onClick={() => toggleSidebar("mobile")}>
        Mobile Sidebar: {sidebarState.mobile}
      </button>
    </nav>
  );
}`}</CodeBlock>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>
      <List.ul>
        {(['0', '1', '2'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>
      <Textline>{t.rich('6', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('7', codeFormatObject)}</Textline>

      <List.ul>
        {(['3', '4'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Textline>{t.rich('8', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { create, createStore } from 'caro-kann'; // Assuming functions are imported from caro-kann library
import { merge } from 'caro-kann/utils'
 
// --- Individual Store Definitions ---
// 1. Top-level (Root) store for user preferences
export const useUserPreferences = create({
  theme: 'light',
  language: 'en',
  source: 'Root Preferences Store',
});
 
// 2. Top-level (Root) store for notification settings
export const useNotificationSettings = create({
  emailEnabled: true,
  pushEnabled: true,
  source: 'Root Notifications Store',
});
 
// --- Specific Store Instances for Provider ---
// Store instance for User Preferences Provider
export const preferencesStoreForProvider = createStore({
  theme: 'dark',
  language: 'ko',
  source: 'Provider Preferences Instance',
});
 
// Store instance for Notification Settings Provider (for conceptual explanation, not used in this example)
export const notificationsStoreForProvider = createStore({
  emailEnabled: false,
  pushEnabled: false,
  source: 'Provider Notifications Instance',
});
 
 
// --- Merged Store Definitions ---
// Default behavior: all parts follow context (explicitly 'context' or omitted)
export const useMergedSettingsDefault = merge({
  prefs: useUserPreferences,      // Uses Provider's store if inside a Provider
  notifs: useNotificationSettings, // Uses Provider's store if inside a Provider (if that Provider exists)
}
// Omitting the getStoreFrom option defaults to 'context' behavior
// , { prefs: 'context', notifs: 'context' } // Specifying this is the same
);
 
// prefs follows Provider, notifs always references root
export const useMergedSettingsMixed = merge(
  {
    prefs: useUserPreferences,
    notifs: useNotificationSettings,
  },
  { // Second argument: getStoreFrom options
    prefs: 'context', // useUserPreferences part follows context
    notifs: 'root',   // useNotificationSettings part always references the top-level store
  }
);
 
// All parts always reference root
export const useMergedSettingsAllRoot = merge(
  {
    prefs: useUserPreferences,
    notifs: useNotificationSettings,
  },
  {
    prefs: 'root',
    notifs: 'root',
  }
);`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('9', codeFormatObject)}</Textline>

      <List.ol>
        {(['5', '6'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ol>

      <Warning>{t.rich('10', codeFormatObject)}</Warning>

      <Textline>{t.rich('11', codeFormatObject)}</Textline>

      <List.ul>
        {(['7', '8'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Textline>{t.rich('12', codeFormatObject)}</Textline>
    </>
  )
}
