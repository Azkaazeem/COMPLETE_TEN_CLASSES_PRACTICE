import { Link } from 'react-router-dom'

const NotFound = () => (
  <section className="flex min-h-screen items-center justify-center bg-[#0b0c0f] px-4 py-10 font-sans text-white">
    <div className="w-full max-w-[460px] text-center">
      <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-lg bg-[#ffc414] text-3xl font-black text-black">
        404
      </div>
      <h1 className="text-3xl font-black sm:text-4xl">Page not found</h1>
      <p className="mt-3 text-sm leading-6 text-[#aeb3bf]">
        The page you are trying to open does not exist, or you do not have permission to view it.
      </p>
      <Link
        to="/"
        className="mt-7 inline-flex h-11 items-center rounded-md bg-[#ffc414] px-5 text-sm font-black text-black transition hover:bg-[#ffd24a]"
      >
        Go Home
      </Link>
    </div>
  </section>
)

export default NotFound
