import Navbar from "@/components/common/Navbar"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="relative">
          <Navbar />
          {children}
      </section>
    )
  }