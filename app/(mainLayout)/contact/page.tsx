export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-6 text-lg text-gray-300">
          إذا كان لديك أي أسئلة أو تحتاج مساعدة، تواصل معنا عبر النموذج أدناه.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              الاسم
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-white"
              placeholder="أدخل اسمك"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-white"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              الرسالة
            </label>
            <textarea
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-white"
              rows={5}
              placeholder="اكتب رسالتك هنا"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-violet-700 px-6 py-3 text-white hover:bg-violet-600"
          >
            إرسال
          </button>
        </form>
      </div>
    </div>
  );
}
