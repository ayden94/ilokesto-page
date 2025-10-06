import { codeFormatter } from '@/shared/utils/code'
import { Heading } from '@/ui/components/Heading'
import Table from '@/ui/components/Table'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('sicilian.tutorials')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Table>
        <Table.head>
          <Table.row>
            <Table.headCell>구분</Table.headCell>
            <Table.headCell className="text-center">form 존재</Table.headCell>
            <Table.headCell className="text-center">input 구성</Table.headCell>
            <Table.headCell>예시 상황</Table.headCell>
          </Table.row>
        </Table.head>

        <Table.body>
          <Table.row>
            <Table.cell className="font-semibold">Static Form</Table.cell>
            <Table.cell className="text-center">정적</Table.cell>
            <Table.cell className="text-center">정적</Table.cell>
            <Table.cell>로그인, 회원가입 등 고정된 입력 필드를 가진 form</Table.cell>
          </Table.row>

          <Table.row>
            <Table.cell className="font-semibold">Dynamic Form</Table.cell>
            <Table.cell className="text-center">동적</Table.cell>
            <Table.cell className="text-center">정적</Table.cell>
            <Table.cell>댓글에 ‘답글 달기’를 눌렀을 때 해당 댓글 아래에 나타나는 대댓글 form</Table.cell>
          </Table.row>

          <Table.row>
            <Table.cell className="font-semibold">Custom Form</Table.cell>
            <Table.cell className="text-center">정적</Table.cell>
            <Table.cell className="text-center">동적</Table.cell>
            <Table.cell>사용자가 “+ 항목 추가” 버튼을 눌러 할 일을 자유롭게 추가할 수 있는 할 일 목록 form</Table.cell>
          </Table.row>
        </Table.body>
      </Table>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>
    </>
  )
}
