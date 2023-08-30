import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ModalAddRoom from "./ModalAddRoom";
import ModalDeleteRoom from "./ModalDeleteRoom";
import ModalUpdateRoom from "./ModalUpdateRoom";
import ModalAddUser from "./ModalAddUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";

export default function Modal(props) {
  const { open, setOpen, name, dataRoom, inforUser, fetchDataUser } = props;
  const cancelButtonRef = useRef(null);

  const DataModalRoom = () => {
    if (name === "add-room") {
      return <ModalAddRoom open={open} setOpen={setOpen} dataRoom={dataRoom} />;
    } else if (name === "delete-room") {
      return (
        <ModalDeleteRoom open={open} setOpen={setOpen} dataRoom={dataRoom} />
      );
    } else if (name === "update-room") {
      return <ModalUpdateRoom open={open} setOpen={setOpen} />;
    }
  };

  const DataModalUser = () => {
    if (name === "add-user") {
      return (
        <ModalAddUser
          open={open}
          setOpen={setOpen}
          fetchDataUser={fetchDataUser}
        />
      );
    } else if (name === "delete-user") {
      return (
        <ModalDeleteUser
          setOpen={setOpen}
          inforUser={inforUser}
          fetchDataUser={fetchDataUser}
        />
      );
    } else if (name === "update-user") {
      return (
        <ModalUpdateUser
          open={open}
          setOpen={setOpen}
          inforUser={inforUser}
          fetchDataUser={fetchDataUser}
        />
      );
    }
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
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
                  {DataModalRoom()}
                  {DataModalUser()}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
