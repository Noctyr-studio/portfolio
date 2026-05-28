
export default function Contact() {
  return (
    <section id="Contact" className="scroll-mt-10 mx-auto max-w-6xl px-4 py-14">
      
      <h2 className="text-2xl font-bold">Contact</h2>

      <p className="mt-2 text-white/70">
        Have an idea or proposal? Let’s talk.
      </p>

      <form
        className="mt-6 grid gap-4 md:max-w-xl"
        action="https://formspree.io/f/mkozrdlr"
        method="POST"
      >
        
        {/* NOMBRE */}
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-indigo-400"
          />
        </div>

        {/* EMAIL */}
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-indigo-400"
          />
        </div>

        {/* MENSAJE */}
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="msg">Message</label>
          <textarea
            id="msg"
            name="msg"
            rows="5"
            required
            placeholder="Tell me about your project"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-indigo-400"
          ></textarea>
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
        >
          Send
        </button>

      </form>
    </section>
  );
}