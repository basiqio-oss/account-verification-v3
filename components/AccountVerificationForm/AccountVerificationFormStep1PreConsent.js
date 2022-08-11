import { useTernaryState } from '../../utils/useTernaryState';
import { Button } from '../Button';
import { AccountVerificationFormLearnMoreModal } from './AccountVerificationFormLearnMoreModal';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';
import { StepDescription } from './StepDescription';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { useState } from 'react';

export function AccountVerificationFormStep1PreConsent() {
  const { goToConsent } = useAccountVerificationForm()
  const [submitting, setSubmitting] = useState(false)
  // State for managing hiding/showing of the learn more model
  const [isLearnMoreModalOpen, openLearnMoreModal, closeLearnMoreModal] = useTernaryState(false);

  return (
    <div className="flex flex-col flex-grow space-y-8 sm:space-y-12">
      <div className="flex flex-col justify-center flex-grow space-y-8">
        <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-row justify-center sm:hidden">
          <img className="w-14 h-14 sm:w-24 sm:h-24" src="/product-logo-square.svg" alt="piper logo" />
        </div>
          {/* STEP HEADING */}
          {/* A short as possible heading to help the user quickly recognise the task at hand. */}
          <StepHeading>
              Let&rsquo;s connect your bank account
          </StepHeading>

          {/* STEP DESCRIPTION */}
          {/* PRODUCT-COPY: Value exchange, e.g. a paragraph that answers the question "Why should I connect my bank account?" 
          It's important to communicate the value exchange, i.e. what will the product be able to do once 
          the user has connected their bank. */}
          <StepDescription>
            We need to verify the details of the account from which to to track your spending.
          </StepDescription>
        </div>

        {/* PRE-CONSENT */}
        {/* This section aims to build trust. It's super important to clearly state valid and truthful arguments
        for why it's 100% secure to connect to their bank through the app. */}
        <ul role="list" className="rounded-lg">
          {/* Secure argument 1 */}
          <li className="flex sm:flex-row flex-col items-center px-4 py-3 rounded-lg sm:px-6 bg-gradient-to-tr from-primary-bold to-secondary-bold space-x-4">
            {/* Icon: shield-check (outline) */}
            <svg
              className="w-12 h-12 sm:w-10 sm:h-14 flex-no-shrink"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                className="fill-current text-white"
                d="m41.236 11.969.968-.251a1 1 0 0 0-1.019-.748l.05.998ZM24 5.889l.667-.746a1 1 0 0 0-1.334 0l.667.745Zm-17.236 6.08.05-1a1 1 0 0 0-1.018.749l.968.25ZM24 41.243l-.25.968a1 1 0 0 0 .5 0l-.25-.968ZM41.185 10.97c-.392.02-.787.03-1.185.03v2c.431 0 .86-.011 1.286-.033l-.1-1.997ZM40 11a22.91 22.91 0 0 1-15.333-5.857l-1.334 1.49A24.911 24.911 0 0 0 40 13v-2ZM23.333 5.143A22.91 22.91 0 0 1 8 11v2a24.91 24.91 0 0 0 16.667-6.365l-1.334-1.49ZM8 11c-.398 0-.793-.01-1.185-.03l-.101 1.998c.426.022.855.032 1.286.032v-2Zm-2.204.719A25.043 25.043 0 0 0 5 18h2c0-1.998.255-3.935.732-5.781l-1.936-.501ZM5 18c0 11.65 7.968 21.437 18.75 24.212l.5-1.937C14.328 37.722 7 28.715 7 18H5Zm19.25 24.212C35.031 39.437 43 29.65 43 18h-2c0 10.715-7.329 19.722-17.25 22.275l.5 1.937ZM43 18c0-2.168-.276-4.274-.796-6.282l-1.936.501c.477 1.846.732 3.783.732 5.78h2Z"
              />
              <path
                className="text-white stroke-current"
                d="m18 24 4 4 8-8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-grow font-medium leading-snug text-white text-sm sm:text-base">
              Bank grade 256-bit SSL encryption
            </div>
          </li>

          {/* Secure argument 2 */}
          <li className="flex items-center px-4 sm:py-6 py-3 sm:px-6 space-x-4 bg-primary-subtle-accent">
              {/* Icon: key (outline) */}
              <div className="sm:ml-4">
                <img src="/key.svg" alt="key" className="sm:h-5 h-6"/>
              </div>
              <div className="flex flex-grow text-sm text-primary-bold sm:!ml-8 !ml-0">
                We never save your bank login credentials in the app
              </div>
          </li>

          {/* Secure argument 3 */}
          <li className="flex items-center px-4 sm:py-6 py-3 sm:px-6 space-x-4 bg-primary-subtle-accent rounded-b-lg">
            {/* Icon: credit-card (outline) */}
            <div className="sm:ml-4">
                <img src="/wallet.svg" alt="key" className="sm:h-5 h-6"/>
              </div>
            <div className="flex flex-grow text-sm text-primary-bold sm:!ml-8 !ml-8 !pr-8">
              We cannot make transactions on your behalf
            </div>
          </li>
        </ul>

        {/* POWERED BY BASIQ API */}
        <p className="max-w-xs mx-auto text-xs leading-relaxed text-center sm:text-white">
          Powered by open data platform{' '}
          <a
            target="_blank"
            href="https://basiq.io"
            rel="noopener noreferrer"
            className="underline rounded outline-none text-primary-bold-darker hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent"
          >
            basiq.io
          </a>{' '}
          to securely connect your bank account.
        </p>

        {/* ACTIONS */}
        <div className="space-y-2 sm:w-64 w-full mx-auto">
          <Button variant="bold" block loading={submitting} disabled={submitting} onClick={(() => { goToConsent(); setSubmitting(true)})}>
            Continue
          </Button>
        </div>

        {/** LEARN MORE MODAL */}
        <AccountVerificationFormLearnMoreModal
          isOpen={isLearnMoreModalOpen}
          onClose={closeLearnMoreModal}
          onConfirm={(() => goToConsent())}
        />
      </div>
    </div>
  );
}
