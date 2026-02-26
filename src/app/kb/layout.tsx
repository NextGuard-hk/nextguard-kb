import KBAuthWrapper from '@/components/KBAuthWrapper'

export default function KBLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <KBAuthWrapper>
      {children}
    </KBAuthWrapper>
  )
}
