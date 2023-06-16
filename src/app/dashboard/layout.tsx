import Navbar from "@/components/Navbar"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className="font-montserrat bg-[#f5f8fc]">
            <Navbar />
            {children}
        </body>
      </html>
    )
  }