import '../../global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="flex h-screen w-screen flex-col items-center justify-center bg-green-800">
          <div className="h-full w-full md:h-3/4 md:w-1/2">
            <div className='bg-white rounded-2xl p-6'>
              <div className="p-12">{children}</div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
