import { useTernaryState } from '../../utils/useTernaryState';
import { Button } from '../Button';
import { AccountVerificationFormLearnMoreModal } from './AccountVerificationFormLearnMoreModal';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';
import { StepDescription } from './StepDescription';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';

export function AccountVerificationFormStep1PreConsent() {
  const { goToConsent } = useAccountVerificationForm()

  // State for managing hiding/showing of the learn more model
  const [isLearnMoreModalOpen, openLearnMoreModal, closeLearnMoreModal] = useTernaryState(false);

  return (
    <div className="flex flex-col flex-grow space-y-8 sm:space-y-12">
      {/* STEP LOGO */}
      {/* To help the user keep context of what product they're using, */}
      {/* and what bank they're about to connect to. */}
      <StepLogo src="/product-logo-square.svg" alt="Piper logo" />

      <div className="flex flex-col justify-center flex-grow space-y-8">
        <div className="space-y-3 sm:space-y-4">
          {/* STEP HEADING */}
          {/* A short as possible heading to help the user quickly recognise the task at hand. */}
          <StepHeading>
            Let&rsquo;s connect your
            {/* FYI: The hard-coded linebreak (<br>) is purely for decorative purposes.
            Only suitable if the text doesn't wrap in small devices (320px viewport width e.g.) */}
            <br />
            bank account
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
        <ul role="list" className="rounded-lg bg-neutral-subtle">
          {/* Secure argument 1 */}
          <li className="flex items-center px-4 py-3 rounded-lg sm:px-6 bg-gradient-to-tr from-primary-bold to-secondary-bold space-x-4">
            <div className="flex flex-grow font-medium leading-snug text-white">
              Bank grade 256-bit <br />
              SSL encryption
            </div>

            {/* Icon: shield-check (outline) */}
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14 flex-no-shrink"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                className="fill-current text-secondary-bold-lighter"
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
          </li>

          {/* Secure argument 2 */}
          <li className="flex items-center px-4 pt-3 sm:px-6">
            <div className="flex items-center flex-grow pb-3 border-b border-neutral-dim">
              <div className="flex flex-grow text-sm">
                We never save your bank <br />
                login credentials in the app
              </div>

              {/* Icon: key (outline) */}
              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14">
                <svg
                  className="w-8 h-8 sm:w-9 sm:h-9 flex-no-shrink"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M20 9.333A2.667 2.667 0 0 1 22.667 12M28 12a8 8 0 0 1-10.324 7.657l-3.01 3.01H12v2.666H9.333V28h-4A1.333 1.333 0 0 1 4 26.667v-3.448c0-.354.14-.693.39-.943l7.953-7.952A8 8 0 1 1 28 12Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="url(#gradient1)"
                  />
                  <defs>
                    <linearGradient
                      id="gradient1"
                      x1="4"
                      y1="25.3333"
                      x2="22.0923"
                      y2="2.07176"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="var(--color-primary-bold)" />
                      <stop offset="1" stopColor="var(--color-secondary-bold)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </li>

          {/* Secure argument 3 */}
          <li className="flex items-center px-4 py-3 sm:px-6 space-x-4">
            <div className="flex flex-grow text-sm">
              We cannot make <br />
              transactions on your behalf
            </div>

            {/* Icon: credit-card (outline) */}
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14">
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 flex-no-shrink"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M4 13.333h24M9.333 20h1.334M16 20h1.333M8 25.333h16a4 4 0 0 0 4-4V10.667a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v10.666a4 4 0 0 0 4 4Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="url(#gradient2)"
                />
                <defs>
                  <linearGradient
                    id="gradient2"
                    x1="4"
                    y1="25.3333"
                    x2="22.0923"
                    y2="2.07176"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--color-primary-bold)" />
                    <stop offset="1" stopColor="var(--color-secondary-bold)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </li>
        </ul>

        {/* POWERED BY BASIQ API */}
        <p className="max-w-xs mx-auto text-xs leading-relaxed text-center text-neutral-muted-darker">
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
        <div className="space-y-2">
          <Button variant="bold" block onClick={(() => goToConsent())}>
            Continue
          </Button>

          <Button variant="subtle" block onClick={openLearnMoreModal}>
            Learn more
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
