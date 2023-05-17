import './globals.css'

export const metadata = {
  title: 'Expense Tracker App',
  description: 'Expense Tracker Web App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-montserrat bg-[#f5f8fc]">{children}</body>
    </html>
  )
}
