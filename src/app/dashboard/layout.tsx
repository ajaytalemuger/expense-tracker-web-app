import Navbar from "@/components/Navbar"

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