import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function NavManage() {
  return (
    <div className="z-10 text-gray-200 dark:bg-gray-900">
      <nav className="text-lg flex items-center max-w-full p-6 lg:px-8" aria-label="Global">
        <NavLink className="w-1/5 text-center font-semibold" to="/">
          MANAGEROOM
        </NavLink>

        <div className="w-3/5 flex">
          <NavLink to="/manage/room-register" className="mr-10 font-semibold leading-6">
            Đăng Ký Phòng Dạy
          </NavLink>
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="flex items-center justify-evenly font-semibold leading-6">
                Quản Lý
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-200" aria-hidden="true" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2 py-1 w-52 origin-top-right rounded-md dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/manage/manage-room"
                        className={classNames(
                          active ? 'dark:bg-gray-900 text-gray-200' : 'text-gray-200',
                          'block px-4 my-2 py-3 text-sm'
                        )}
                      >
                        Quản lý phòng học
                      </NavLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/manage/manage-user"
                        className={classNames(
                          active ? 'dark:bg-gray-900 text-gray-200' : 'text-gray-200',
                          'block px-4 my-2 py-3 text-sm'
                        )}
                      >
                        Quản lý giảng viên
                      </NavLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/manage/manage-subject"
                        className={classNames(
                          active ? 'dark:bg-gray-900 text-gray-200' : 'text-gray-200',
                          'block px-4 my-2 py-3 text-sm'
                        )}
                      >
                        Quản lý môn học
                      </NavLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/manage/manage-session"
                        className={classNames(
                          active ? 'dark:bg-gray-900 text-gray-200' : 'text-gray-200',
                          'block px-4 my-2 py-3 text-sm'
                        )}
                      >
                        Quản lý ca học
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <Menu as="div" className="w-1/5 relative">
          <div className="flex items-center justify-center">
            <Menu.Button className="flex items-center justify-evenly font-semibold leading-6">
              Tài Khoản
              <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-200" aria-hidden="true" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-32 z-10 mt-2 py-1 w-48 origin-top-right rounded-md dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="/profile"
                      className={classNames(
                        active ? 'dark:bg-gray-900 text-gray-200' : 'text-gray-200',
                        'block px-4 my-2 py-3 text-sm'
                      )}
                    >
                      Hồ sơ
                    </NavLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="/"
                      className={classNames(
                        active ? 'dark:bg-gray-900 text-gray-200' : 'text-gray-200',
                        'block px-4 my-2 py-3 text-sm'
                      )}
                    >
                      Đăng xuất
                    </NavLink>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </nav>
    </div>
  )
}
