import { FC } from 'react'
import useLockBodyScroll from 'react-use/lib/useLockBodyScroll'
import useToggle from 'react-use/lib/useToggle'
interface Link {
  label: string
  href: string
}

interface MenueProps {
  items: Array<Link & { nests?: Array<Link> }>
}

export const Menue: FC<MenueProps> = ({ items }) => {
  const [isOpen, toggle] = useToggle(false)
  useLockBodyScroll(isOpen)

  return (
    <div
      className={`${
        isOpen && 'h-screen bg-black w-screen opacity-60'
      } text-right p-5`}
    >
      <div className="relative">
        <button
          className="text-gray-50 w-5 h-5 relative focus:outline-none"
          onClick={toggle}
        >
          <div className="block w-5 absolute left-1/2 top-1/2  transform  -translate-x-1/2 -translate-y-1/2">
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                isOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-200  ease-in-out ${
                isOpen ? '-rotate-45' : 'translate-y-1.5'
              } `}
            />
          </div>
        </button>
      </div>
      <div
        className={`${!isOpen && 'scale-0'}
          font-heading transform transition duration-200 ease-in-out`}
      >
        {items.map(({ nests, label, href }) => (
          <div key={label} className="py-4 text-white">
            <a
              href={href}
              onClick={toggle}
              className="block py-2 text-xl hover:text-gray-300"
            >
              {label}
            </a>
            {nests?.map(({ label, href }) => (
              <a
                href={href}
                onClick={toggle}
                className="block py-2 text-lg hover:text-gray-300"
                key={label}
              >
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
