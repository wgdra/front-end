import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ModalAddRoom from './ModalAddRoom'
import ModalDeleteRoom from './ModalDeleteRoom'
import ModalAddUser from './ModalAddUser'
import ModalDeleteUser from './ModalDeleteUser'
import ModalAddSubject from './ModalAddSubject'
import ModalDeleteSubject from './ModalDeleteSubject'
import ModalAddTimeTable from './ModalAddTimeTable'
import ModalAddSession from './ModalAddSession'
import ModalDeleteSession from './ModalDeleteSession'

export default function Modal(props) {
  const {
    open,
    setOpen,
    btnName,
    dataRoom,
    dataSubject,
    dataSession,
    inforUser,
    fetchListRoom,
    fetchDataUser,
    fetchDataSubject,
    fetchDataSession,
    setIsShowData,
    subjectUser,
    dataForm,
    fetchDataTable,
  } = props
  const cancelButtonRef = useRef(null)

  const DataModal = () => {
    switch (btnName) {
      case 'add-room':
        return <ModalAddRoom setOpen={setOpen} fetchListRoom={fetchListRoom} />
      case 'delete-room':
        return (
          <ModalDeleteRoom
            setIsShowData={setIsShowData}
            setOpen={setOpen}
            dataRoom={dataRoom}
            fetchListRoom={fetchListRoom}
          />
        )
      case 'add-user':
        return (
          <ModalAddUser setOpen={setOpen} fetchDataUser={fetchDataUser} subjectUser={subjectUser} />
        )
      case 'delete-user':
        return (
          <ModalDeleteUser
            setOpen={setOpen}
            inforUser={inforUser}
            fetchDataUser={fetchDataUser}
            setIsShowData={setIsShowData}
          />
        )
      case 'add-subject':
        return (
          <ModalAddSubject
            setOpen={setOpen}
            dataSubject={dataSubject}
            fetchDataSubject={fetchDataSubject}
          />
        )
      case 'delete-subject':
        return (
          <ModalDeleteSubject
            setOpen={setOpen}
            setIsShowData={setIsShowData}
            dataSubject={dataSubject}
            fetchDataSubject={fetchDataSubject}
          />
        )
      case 'add-session':
        return (
          <ModalAddSession
            setOpen={setOpen}
            dataSession={dataSession}
            fetchDataSession={fetchDataSession}
          />
        )
      case 'delete-session':
        return (
          <ModalDeleteSession
            setOpen={setOpen}
            setIsShowData={setIsShowData}
            dataSession={dataSession}
            fetchDataSession={fetchDataSession}
          />
        )
      case 'add-timeTable':
        return (
          <ModalAddTimeTable
            setOpen={setOpen}
            dataForm={dataForm}
            fetchDataTable={fetchDataTable}
          />
        )
      default:
        return
    }
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative p-5 w-80 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  {DataModal()}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
