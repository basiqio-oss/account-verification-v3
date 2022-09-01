import React,{ useState, Fragment } from 'react'
import { Modal,ModalTitle } from '../../components/Modal'
import { Dialog, Transition } from '@headlessui/react'

export function TransactionInfo({isOpen,onClose}) {
  return (
    <div>
      <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            <Dialog.Title>Complete your order</Dialog.Title>

            {/* ... */}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>





        {/* <Modal isOpen={isOpen} onClose={onClose}  >
            <ModalTitle>
                <div>test</div>
            </ModalTitle>
        </Modal> */}
    </div>
  )
}
