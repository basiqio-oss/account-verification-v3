import { useEffect } from 'react';
import { useTernaryState } from '../../utils/useTernaryState';
import { Button } from '../Button';
import { CircularProgressBar } from '../CircularProgressBar';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { AccountVerificationFormResumeInBackgroundModal } from './AccountVerificationFormResumeInBackgroundModal';

export function AccountVerificationFormStep3LoadingSteps() {

  // State for managing hiding/showing of the resume in background modal
  const [isResumeModalOpen, openResumeModal, closeResumeModal] = useTernaryState(false);

  const { basiqConnection, goForward } = useAccountVerificationForm();
  const { error, progress, completed, stepNameInProgress, reset, setJobId } = basiqConnection;

  useEffect(() => {
    const newJobId = new URLSearchParams(window.location.search).get("jobId");
    setJobId(newJobId);
  }, [])

  return (
    <div className="flex flex-col space-y-10 sm:space-y-12">
      <div className="flex flex-col items-center text-center space-y-8">
        <CircularProgressBar value={progress} error={error} />
    
        {error ? (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{error?.name}</h2>
              <p className="text-sm sm:text-base text-neutral-muted-darker">{error?.message}</p>
            </div>
            <Button block onClick={reset}>
              Try again
            </Button>
          </div>
        ) : completed ? (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">Connected 🎉</h3>
              <p className="text-sm sm:text-base text-neutral-muted-darker">One last step to go...</p>
            </div>
            <Button block onClick={goForward}>
              Continue
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{STEP_NAME_MAP[stepNameInProgress]}</h2>
            </div>
            <Button block variant="subtle" onClick={openResumeModal}>
              Resume in background
            </Button>
          </div>
        )}
      </div>
      <AccountVerificationFormResumeInBackgroundModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />
    </div>
  );
}

const STEP_NAME_MAP = {
  'verify-credentials': 'Verifying credentials...',
  'retrieve-accounts': 'Retrieving accounts...',
};
