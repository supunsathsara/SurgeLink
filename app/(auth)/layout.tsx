import { Suspense } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
        </div>
      <div className="hidden bg-foreground lg:flex lg:flex-col lg:items-center lg:justify-center text-background p-8">
        <h1 className="text-2xl font-bold mb-2">Surge SE Internship</h1>
        <p className="text-lg mb-1">January 2025</p>
        <p className="text-lg">Savindu Supun Sathsara</p>
      </div>
    </div>
  );
}