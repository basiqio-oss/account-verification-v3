import { useEffect } from 'react';
import { useTernaryState } from '../../utils/useTernaryState';
import { ProgressBar } from '../ProgressBar';
import { AccountVerificationFormStep0SignUp } from './AccountVerificationFormStep0SignUp';
import { AccountVerificationFormStep1PreConsent } from './AccountVerificationFormStep1PreConsent';
import { AccountVerificationFormStep4SelectAccount } from './AccountVerificationFormStep4SelectAccount';
import { AccountVerificationFormStep5Summary } from './AccountVerificationFormStep5Summary';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { AccountVerificationFormCancellationModal } from './AccountVerificationFormCancellationModal';
import { AccountVerificationFormStep3LoadingSteps } from './AccountVerificationFormStep3LoadingSteps';

export const FORM_COMPONENTS = [
  AccountVerificationFormStep0SignUp,
  AccountVerificationFormStep1PreConsent,
  AccountVerificationFormStep3LoadingSteps,
  AccountVerificationFormStep4SelectAccount,
  AccountVerificationFormStep5Summary,
];

export function AccountVerificationForm() {
  const { currentStep, totalSteps, cancel, cancelling, goBack, goForward } = useAccountVerificationForm();
  const Component = FORM_COMPONENTS[currentStep];

  // State for managing hiding/showing of the cancellation model
  const [isCancellationModalOpen, openCancellationModal, closeCancellationModal] = useTernaryState(false);

  // When the user changes steps, scroll to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <>
      {/* PROGRESS BAR */}
      {/* Delightful indication of the progress the user has made, to be 
      displayed in conjunction with a Step Count */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <ProgressBar value={Math.round(((currentStep + 1) / totalSteps) * 100)} />
        {/* Fade to blend form content nicely when scrolling down the page */}
        <div className="block h-4 bg-gradient-to-b from-white" />
      </div>

      {/* STEP COUNT */}
      {/* Helps the user feel like they have an overview of their progress, 
      indicating how long it's going to take, and how many steps are left. */}
      <div className="absolute left-0 z-20 px-4 pt-8 leading-none sm:px-6 md:px-8 sm:pt-8 md:fixed space-y-2">
        <span className="text-xs sm:text-sm text-neutral-muted-darker">
          <span data-cy="current-step">{currentStep + 1}</span> of {totalSteps}
        </span>

        {/** Debugging navigation */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="text-xs sm:text-sm text-neutral-dim-darker space-x-2">
            <button onClick={goBack}>Prev</button>
            <button onClick={goForward}>Next</button>
          </div>
        )}
      </div>

      {/* FORM STEPS COMPONENT */}
      <div className="relative z-10 flex flex-col max-w-md px-4 pt-8 pb-8 mx-auto sm:px-6 sm:pt-16 sm:pb-16">
        <Component />
      </div>

      {/* CANCEL BANK CONNECTION */}
      {/* Important to not lock the user in. They should be able to regret 
      their decision to connect with a bank at any point. */}
      {/* Show Cancel button unless the user is on the first or last step */}
      {currentStep > 0 && currentStep !== totalSteps - 1 ? (
        <div className="absolute top-0 right-0 z-20 px-4 pt-8 leading-none sm:px-6 md:px-8 sm:pt-8 md:fixed">
          <button
            className="text-xs rounded outline-none sm:text-sm text-primary-bold-darker hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent"
            onClick={openCancellationModal}
          >
            Cancel
          </button>
        </div>
      ) : null}

      {/* BANK CONNECTION ILLUSTRATION */}
      {/* For purely decorative purposes, an illustrations brings some delight 
      to your application, subtly using the brand colours whilst not taking 
      all the attention from the user. */}
      <div className="fixed bottom-0 left-0 z-0 hidden w-full sm:block sm:p-6 md:p-8">
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1322 229">
          <path
            d="M1.86 188.088a11.025 11.025 0 0 0 10.834-1.95c3.794-3.256 4.984-8.62 5.952-13.587l2.864-14.69-5.995 4.22c-4.311 3.034-8.72 6.166-11.704 10.561-2.985 4.395-4.288 10.394-1.89 15.15"
            className="text-secondary-bold"
            fill="currentColor"
          />
          <path
            d="M2.372 205.874c-.607-4.518-1.23-9.094-.805-13.66.378-4.055 1.588-8.016 4.052-11.263a18.5 18.5 0 0 1 4.703-4.357c.47-.303.903.459.435.761a17.731 17.731 0 0 0-6.893 8.501c-1.5 3.902-1.742 8.155-1.483 12.3.156 2.507.488 4.997.822 7.484a.457.457 0 0 1-.301.541.433.433 0 0 1-.53-.307Z"
            className="text-primary-bold"
            fill="currentColor"
          />
          <path
            d="M8.216 197.88a8.205 8.205 0 0 0 7.196 3.796c3.643-.177 6.68-2.775 9.414-5.243l8.086-7.298-5.352-.262c-3.848-.188-7.796-.363-11.462.85-3.666 1.213-7.046 4.133-7.717 8.011"
            className="text-secondary-bold"
            fill="currentColor"
          />
          <path
            d="M.657 208.471c2.92-5.282 6.308-11.153 12.36-13.029a13.51 13.51 0 0 1 5.2-.549c.552.049.414.918-.137.87a12.605 12.605 0 0 0-8.297 2.244c-2.34 1.627-4.16 3.89-5.702 6.29-.945 1.47-1.79 3.002-2.637 4.532-.27.489-1.06.136-.787-.358Z"
            className="text-primary-bold"
            fill="currentColor"
          />
          <path
            d="M135.803 50.594a5.966 5.966 0 0 1-2.642 7.904 5.73 5.73 0 0 1-.882.348l-.988 20.843-8.563-6.401 2.251-18.812a5.943 5.943 0 0 1 3.091-6.584 5.72 5.72 0 0 1 7.733 2.702Z"
            className="text-neutral-muted"
            fill="currentColor"
          />
          <path
            d="m148.318 200.769 5.536-1.118-1.584-22.357-8.17 1.65 4.218 21.825Z"
            className="text-neutral-dim-darker"
            fill="currentColor"
          />
          <path
            d="m146.549 199.207 10.902-2.202a6.904 6.904 0 0 1 5.315 1.088 7.202 7.202 0 0 1 3.005 4.61l.045.231-17.849 3.605-1.418-7.332Z"
            className="text-neutral-muted"
            fill="currentColor"
          />
          <path
            d="M128.911 204.045h5.643l2.684-22.248h-8.328l.001 22.248Z"
            className="text-neutral-dim-darker"
            fill="currentColor"
          />
          <path
            d="m127.472 202.162 11.112-.001a6.963 6.963 0 0 1 5.008 2.12 7.273 7.273 0 0 1 2.074 5.119v.235l-18.194.001v-7.474Z"
            className="text-neutral-muted"
            fill="currentColor"
          />
          <path
            d="M52.386 156.307c-6.264-.003-11.339-5.195-11.336-11.598 0-1.543.303-3.072.892-4.499l1.67.722a9.819 9.819 0 0 0 5.08 12.757 9.339 9.339 0 0 0 7.225.073l.673 1.722a11.064 11.064 0 0 1-4.204.823Z"
            className="text-neutral-dim"
            fill="currentColor"
          />
          <path
            d="M69.842 156.076H55.786v-3.708l11.335-3.244 2.721 6.952Z"
            className="text-neutral-dim"
            fill="currentColor"
          />
          <path
            d="M64.854 152.368h37.18a7.795 7.795 0 0 1-7.708 7.879H72.562a7.794 7.794 0 0 1-7.708-7.879Z"
            className="text-neutral-dim"
            fill="currentColor"
          />
          <path
            d="M105.54 157.056H64.28a5.564 5.564 0 0 1 0-11.124h41.26a5.56 5.56 0 0 1 5.44 5.562 5.563 5.563 0 0 1-5.44 5.562Z"
            className="text-neutral-subtle"
            fill="currentColor"
          />
          <path
            d="m132.183 71.026-.079 3.746-.349 16.824a8.48 8.48 0 0 1-2.54 5.97 8.473 8.473 0 0 1-6.02 2.423 8.288 8.288 0 0 1-5.5-2.26L94.242 75.175a8.852 8.852 0 0 1 .594-13.41 8.43 8.43 0 0 1 11.492 1.03l15.489 17.814 1.488-11.194 8.878 1.611Z"
            className="text-neutral-subtle-darker"
            fill="currentColor"
          />
          <path
            d="m137.943 194.89-11.087 1.03-6.048-44.819c-19.936 3.428-38.743 4.526-55.01.379a10.516 10.516 0 0 1-7.52-12.701c.064-.263.137-.524.22-.781 1.947-5.94 5.377-12.305 9.392-18.837l26.71 9.788 1.009 4.121 28.49-3.686a10.502 10.502 0 0 1 10.436 5.338 10.504 10.504 0 0 1 1.252 3.924c.038.309.063.62.075.931l2.081 55.313Z"
            className="text-secondary-bold-darker"
            fill="currentColor"
          />
          <path
            d="m154.8 185.452-11.088 1.03-20.103-41.112c-19.936 3.429-38.743 4.527-55.01.38a10.514 10.514 0 0 1-7.52-12.702c.063-.263.136-.523.22-.781 1.947-5.939 5.377-12.304 9.392-18.837l30.994 2.608-3.275 11.302 28.49-3.687a10.52 10.52 0 0 1 7.773 2.198 10.504 10.504 0 0 1 3.915 7.064c.038.31.063.62.075.932l16.137 51.605Z"
            className="text-secondary-bold"
            fill="currentColor"
          />
          <path
            d="M102.558 53.547c7.515 0 13.607-6.228 13.607-13.91s-6.092-13.91-13.607-13.91c-7.516 0-13.608 6.228-13.608 13.91s6.092 13.91 13.608 13.91Z"
            className="text-neutral-dim-darker"
            fill="currentColor"
          />
          <path
            d="M118.096 62.524a1.092 1.092 0 0 0 .401 1.462c.364.045 8.914 5.56 9.158 4.928a1.047 1.047 0 0 0 .635-.52l13.761-25.756a1.087 1.087 0 0 0 .05-.925c.38-.665-9.486-3.21-9.823-3.409a1.036 1.036 0 0 0-1.219.506l-12.963 23.714Z"
            className="text-neutral-dim"
            fill="currentColor"
          />
          <path
            d="M140.075 42.094s-8.258-2.324-8.119-2.423c-.224-.01-.675-.332-.819 0l-12.256 22.59c-.527.492 8.136 4.514 8.209 4.753.685.431 12.785-24.37 13.158-24.497a.296.296 0 0 0-.173-.422Z"
            className="text-primary-bold"
            fill="currentColor"
          />
          <path
            d="M110.173 61.22c.122-.31.203-.635.239-.967a3.687 3.687 0 0 0-3.209-4.09l-6.327-.71a3.647 3.647 0 0 0-4.001 3.28 3.757 3.757 0 0 0 .564 2.425 16.707 16.707 0 0 0-14.146 11.704c-6.25 11.615-10.75 25.05-12.867 40.964l28.085 13.336 10.697-22.878 2.153-3.377c.419-.446.82-.891 1.2-1.344a29.787 29.787 0 0 0 5.257-8.463 22.247 22.247 0 0 0 1.534-6.95c.429-7.628-3.149-15.271-9.179-22.93Z"
            className="text-neutral-subtle-darker"
            fill="currentColor"
          />
          <path
            opacity=".2"
            d="M117.818 91.1a29.765 29.765 0 0 1-5.257 8.463c-.38.453-.781.898-1.2 1.344l-2.153 3.377c-7.934-5.947-14.363-29.363-14.363-29.363l8.953-1.742 14.02 17.92Z"
            className="text-neutral-dim-darker"
            fill="currentColor"
          />
          <path
            d="M123.238 54.846a5.982 5.982 0 0 0 2.02 8.094c.272.163.557.302.852.418l-.634 20.857 9.033-5.686-.783-18.934a5.965 5.965 0 0 0-2.569-6.814 5.71 5.71 0 0 0-7.919 2.065Z"
            className="text-neutral-dim-darker"
            fill="currentColor"
          />
          <path
            d="m124.682 76.342 9.934 1.413-.427 20.569a8.611 8.611 0 0 1-4.208 7.253 8.246 8.246 0 0 1-9.851-1.119L96.677 81.903a8.89 8.89 0 0 1-.655-12.21 8.432 8.432 0 0 1 12.082-.827c.232.207.452.427.66.658l15.486 17.813.432-10.995Z"
            className="text-neutral-subtle-darker"
            fill="currentColor"
          />
          <path
            d="M43.422 145.469a8.725 8.725 0 0 1-8.615-8.807V87.071a8.615 8.615 0 0 1 11.956-8.132 8.617 8.617 0 0 1 5.274 8.132v49.591a8.726 8.726 0 0 1-8.615 8.807Z"
            className="text-neutral-subtle"
            fill="currentColor"
          />
          <path
            d="M97.5 203.611H87.072v-45.397h-3.628v45.397H73.016a5.958 5.958 0 0 0-5.895 6.025h36.273a5.957 5.957 0 0 0-5.894-6.025Z"
            className="text-neutral-dim"
            fill="currentColor"
          />
          <path
            d="M114.391 23.875c-2.907-1.71-6.446-1.715-9.8-1.672l-7.291.093c-2.95.037-6.064.121-8.577 1.7-2.513 1.58-4.036 5.221-2.377 7.715-4.934-4.383-12.324-5.075-18.51-2.913-3.027 1.058-5.891 2.775-7.947 5.28-2.233 2.722-3.396 6.226-3.863 9.746-.468 3.52-.285 7.093-.102 10.64.115 2.23.368 4.746 2.085 6.127 1.584 1.275 3.906 1.082 5.745.24 3.208-1.469 5.426-4.547 7.084-7.716 1.658-3.168 2.922-6.575 4.986-9.483 2.064-2.909 5.179-5.341 8.694-5.383-2.39 3.466-2.827 8.505-.329 11.89 1.797 2.436 4.794 3.7 7.761 4.02 2.967.322 5.953-.188 8.895-.697 1.992-.344 4.334-.977 4.993-2.929.647-1.914-.739-3.847-1.332-5.779-1.145-3.729 1.203-8.185 4.879-9.26l-.299-.296c3.043.434 6.689.032 8.309-2.638 1.769-2.913-.096-6.975-3.004-8.685Z"
            className="text-primary-bold"
            fill="currentColor"
          />
          <g clipPath="url(#a)">
            <path
              d="M1201.13 139.042c0-9.914-8.07-33.442-18.03-33.442-9.95 0-18.03 23.528-18.03 33.442 0 4.765 1.9 9.334 5.28 12.703a18.084 18.084 0 0 0 12.75 5.262c4.78 0 9.37-1.893 12.75-5.262a17.936 17.936 0 0 0 5.28-12.703Z"
              className="text-secondary-bold-darker"
              fill="currentColor"
            />
            <path
              d="M1196.62 139.042c0-9.914-8.07-33.442-18.03-33.442-9.95 0-18.02 23.528-18.02 33.442 0 4.765 1.9 9.334 5.28 12.703a18.043 18.043 0 0 0 12.74 5.262c4.79 0 9.37-1.893 12.75-5.262a17.936 17.936 0 0 0 5.28-12.703Z"
              className="text-secondary-bold"
              fill="currentColor"
            />
            <path
              d="M1179.16 179.211c-.15 0-.29-.06-.4-.165a.547.547 0 0 1-.17-.397v-50.043c0-.149.06-.291.17-.397a.576.576 0 0 1 .4-.164c.15 0 .29.059.4.164.1.106.16.248.16.397v50.043a.58.58 0 0 1-.16.397.577.577 0 0 1-.4.165Z"
              className="text-primary-bold"
              fill="currentColor"
            />
            <path
              d="M1179.16 136.81a.55.55 0 0 1-.31-.095.505.505 0 0 1-.21-.252.455.455 0 0 1-.03-.324.53.53 0 0 1 .15-.287l7.37-7.342a.555.555 0 0 1 .79 0 .547.547 0 0 1 0 .793l-7.36 7.342a.648.648 0 0 1-.19.122.51.51 0 0 1-.21.043Z"
              className="text-primary-bold"
              fill="currentColor"
            />
            <path
              d="M1274.36 195.566h-46.19a4.823 4.823 0 0 1-3.39-1.399 4.793 4.793 0 0 1-1.4-3.373V4.973c0-1.265.51-2.478 1.4-3.373a4.819 4.819 0 0 1 3.39-1.399h46.19c1.27.002 2.49.505 3.39 1.4.89.894 1.4 2.107 1.4 3.372v185.821c0 1.265-.51 2.478-1.4 3.373a4.823 4.823 0 0 1-3.39 1.399Z"
              className="text-neutral-subtle-darker"
              fill="currentColor"
            />
            <path
              d="M1246.76 195.566h-46.2a4.818 4.818 0 0 1-3.38-1.399 4.751 4.751 0 0 1-1.4-3.373V4.973c0-1.265.5-2.478 1.4-3.373a4.813 4.813 0 0 1 3.38-1.399h46.2a4.795 4.795 0 0 1 4.79 4.772v185.821a4.803 4.803 0 0 1-1.41 3.373 4.8 4.8 0 0 1-3.38 1.399Z"
              className="text-neutral-subtle"
              fill="currentColor"
            />
            <path
              d="M1218.59 72.059h-10.7c-.38 0-.73-.148-1-.412-.26-.263-.41-.62-.41-.992v-16.28c0-.372.15-.729.41-.992.27-.263.62-.41 1-.411h10.7c.37 0 .73.148 1 .411.26.263.41.62.41.992v16.28c0 .373-.15.73-.41.992a1.44 1.44 0 0 1-1 .412ZM1239.43 72.059h-10.7c-.37 0-.73-.148-.99-.412-.27-.263-.42-.62-.42-.992v-16.28c0-.372.15-.729.42-.992.26-.263.62-.41.99-.411h10.7a1.405 1.405 0 0 1 1.41 1.403v16.28a1.405 1.405 0 0 1-1.41 1.403v.001ZM1218.59 101.813h-10.7a1.425 1.425 0 0 1-1-.412 1.413 1.413 0 0 1-.41-.992v-16.28c0-.372.15-.729.41-.992.27-.263.62-.411 1-.411h10.7c.37 0 .73.148 1 .411.26.263.41.62.41.992v16.28c0 .373-.15.729-.41.992-.27.263-.63.411-1 .412ZM1239.43 101.813h-10.7a1.402 1.402 0 0 1-.99-.412 1.382 1.382 0 0 1-.42-.992v-16.28c0-.372.15-.729.42-.992.26-.263.62-.411.99-.411h10.7a1.405 1.405 0 0 1 1.41 1.403v16.28c0 .373-.15.729-.41.992s-.62.411-1 .412ZM1218.59 131.567h-10.7a1.425 1.425 0 0 1-1-.412c-.26-.263-.41-.62-.41-.992v-16.28c0-.372.15-.729.41-.992.27-.263.62-.411 1-.412h10.7c.37.001.73.149 1 .412.26.263.41.62.41.992v16.28c0 .372-.15.729-.41.992-.27.263-.63.411-1 .412ZM1239.43 131.567h-10.7a1.402 1.402 0 0 1-.99-.412c-.27-.263-.42-.62-.42-.992v-16.28c0-.372.15-.729.42-.992.26-.263.62-.411.99-.412h10.7c.38.001.74.149 1 .412s.41.62.41.992v16.28c0 .372-.15.729-.41.992s-.62.411-1 .412ZM1218.59 161.321h-10.7a1.425 1.425 0 0 1-1-.412c-.26-.263-.41-.62-.41-.992v-16.28c0-.372.15-.729.41-.992.27-.263.62-.411 1-.412h10.7c.37.001.73.149 1 .412.26.263.41.62.41.992v16.28c0 .372-.15.729-.41.992-.27.263-.63.411-1 .412ZM1239.43 161.321h-10.7a1.402 1.402 0 0 1-.99-.412c-.27-.263-.42-.62-.42-.992v-16.28c0-.372.15-.729.42-.992.26-.263.62-.411.99-.412h10.7c.38.001.74.149 1 .412s.41.62.41.992v16.28c0 .372-.15.729-.41.992s-.62.411-1 .412Z"
              className="text-white"
              fill="currentColor"
            />
            <path
              d="M1321.2 160.994c0-12.035-9.88-40.594-22.06-40.594-12.18 0-22.05 28.559-22.05 40.594 0 5.783 2.32 11.33 6.46 15.419 4.13 4.089 9.74 6.387 15.59 6.387s11.46-2.298 15.6-6.387c4.13-4.089 6.46-9.636 6.46-15.419Z"
              className="text-secondary-bold-darker"
              fill="currentColor"
            />
            <path
              d="M1316.39 160.994c0-12.035-9.88-40.594-22.06-40.594-12.18 0-22.05 28.559-22.05 40.594 0 5.783 2.32 11.33 6.46 15.419 4.13 4.089 9.74 6.387 15.59 6.387s11.46-2.298 15.6-6.387c4.13-4.089 6.46-9.636 6.46-15.419Z"
              className="text-secondary-bold"
              fill="currentColor"
            />
            <path
              d="M1295.53 210a.864.864 0 0 1-.56-.2.647.647 0 0 1-.24-.485v-61.03c0-.182.09-.356.24-.484a.86.86 0 0 1 .56-.201c.22 0 .42.072.57.201.15.128.24.302.24.484v61.03c0 .182-.09.356-.24.485-.15.128-.35.2-.57.2Z"
              className="text-primary-bold"
              fill="currentColor"
            />
            <path
              d="M1295.42 158a.685.685 0 0 1-.63-.426.607.607 0 0 1-.04-.398.672.672 0 0 1 .18-.353l9.05-9.021c.13-.129.3-.202.49-.202a.685.685 0 0 1 .69.69c0 .183-.07.358-.2.487l-9.05 9.021a.677.677 0 0 1-.49.202ZM1221.35 23.895c.2-.132.44-.25.72-.342v2.174c-.28-.092-.52-.21-.72-.342-.47-.31-.56-.6-.56-.745 0-.146.09-.434.56-.745ZM1224.64 30.847v-2.174c.28.092.53.21.73.342.46.31.55.6.55.745 0 .146-.09.434-.55.745-.2.132-.45.25-.73.342Z"
              className="text-primary-bold"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1223.36 37.44c5.67 0 10.26-4.585 10.26-10.24s-4.59-10.24-10.26-10.24-10.27 4.585-10.27 10.24 4.6 10.24 10.27 10.24Zm1.28-16.64c0-.707-.57-1.28-1.28-1.28-.71 0-1.29.573-1.29 1.28v.118c-.79.15-1.53.438-2.15.847-.92.616-1.7 1.607-1.7 2.875s.78 2.26 1.7 2.875c.62.41 1.36.698 2.15.847v2.485c-.5-.163-.87-.406-1.08-.646a1.285 1.285 0 0 0-1.81-.128 1.287 1.287 0 0 0-.13 1.806c.72.83 1.82 1.376 3.02 1.603v.118c0 .707.58 1.28 1.29 1.28.71 0 1.28-.573 1.28-1.28v-.118c.8-.15 1.54-.438 2.15-.847.93-.616 1.7-1.607 1.7-2.875s-.77-2.26-1.7-2.875c-.61-.41-1.35-.698-2.15-.847v-2.485c.5.162.87.406 1.08.646.47.534 1.28.591 1.81.128.54-.464.59-1.272.13-1.806-.72-.83-1.81-1.377-3.02-1.603V20.8Z"
              className="text-primary-bold"
              fill="currentColor"
            />
          </g>
          <path
            d="M1138.92 140.47c-4.92-2.47-12-3.975-24.5-5.5-36-4.393-81.98-5.133-121.935-1.682-43.133 3.725-83.355 10.842-122.27 18.484-38.171 7.496-75.713 15.343-115.444 21.741-79.32 12.758-163.525 20.871-248.977 23.987-76.913 2.795-159.243 1.936-225.487-11.316-60.697-12.142-99.664-33.693-120.251-56.656-2.636-2.94-4.988-5.913-7.056-8.918-.603-.868 3.33-1.343 3.935-.473 16.745 24.097 51.755 47.455 110.935 61.61 64.007 15.31 147.559 17.141 225.644 14.754 86.397-2.667 171.749-10.472 252.253-23.067 40.758-6.376 79.171-14.295 118.083-21.985 38.057-7.522 77.197-14.65 119.15-18.725 38.31-3.722 77.92-5.254 115.92-2.254 28.03 2.213 34 4.269 38 5.5 4 1.231 6.5 2 5.5 3-1.06 1.061-2.53 1.829-3.5 1.5Z"
            className="text-neutral-subtle"
            fill="currentColor"
          />
          <defs>
            <clipPath id="a">
              <path className="text-white" fill="currentColor" transform="translate(1160)" d="M0 0h162v210H0z" />
            </clipPath>
          </defs>
        </svg>

        <div style={{position: "absolute", bottom: "10px", right: "left"}}>
          &#9888; <strong>This is a sample app.</strong> We have disabled connecting to live banks - you can connect to our sandbox institution Hooli using the test credentials found <a href="https://api.basiq.io/reference/connect">here</a>.
        </div>
      </div>

      {/* CANCELLATION MODAL */}
      <AccountVerificationFormCancellationModal
        isOpen={isCancellationModalOpen}
        onClose={closeCancellationModal}
        onConfirm={cancel}
        cancelling={cancelling}
      />
    </>
  );
}
