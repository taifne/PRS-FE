// app/admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-full mx-auto bg-white shadow-lg rounded-2xl p-8">
        {children}
      </div>
    </div>
  );
}
