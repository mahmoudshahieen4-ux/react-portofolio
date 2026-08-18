import { fetchProducts } from "../app/lib/data";

// لاحظ إننا ضفنا كلمة async هنا
export default async function DashboardHome() {
  // السحر هنا: بنستنى البيانات تيجي مباشرة من غير useEffect!
  const products = await fetchProducts();

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#bba8fd] mb-8">
          إدارة المخزون
        </h1>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg">
          <table className="w-full text-right">
            <thead className="bg-neutral-950 border-b border-neutral-800 text-[#bba8fd]">
              <tr>
                <th className="p-4 font-semibold">كود المنتج</th>
                <th className="p-4 font-semibold">اسم المنتج</th>
                <th className="p-4 font-semibold">الكمية</th>
                <th className="p-4 font-semibold">السعر</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-800">
              {/* استخدمنا المتغير الجديد products اللي جاي من السيرفر */}
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-neutral-800/50 transition-colors"
                >
                  <td className="p-4 text-gray-500">#{product.id}</td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.stock > 0
                          ? "bg-neutral-800 text-gray-300"
                          : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {product.stock > 0 ? product.stock : "نفذت الكمية"}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
