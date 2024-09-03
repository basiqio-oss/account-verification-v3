import { useState, useMemo } from 'react';
import { useFormState } from 'react-use-form-state';
import ms from 'ms';
import { useTernaryState } from '../../utils/useTernaryState';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { PasswordField } from '../PasswordField';
import { CircularProgressBar } from '../CircularProgressBar';
import { ErrorMessage } from '../ErrorMessage';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { AccountVerificationFormResumeInBackgroundModal } from './AccountVerificationFormResumeInBackgroundModal';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';
import { StepDescription } from './StepDescription';

export function AccountVerificationFormStep3InstitutionLogin() {
  const { basiqConnection } = useAccountVerificationForm();

  if (basiqConnection.inProgress || basiqConnection.completed) {
    return <AccountVerificationFormStep3InstitutionLoginProgress />;
  }

  return <AccountVerificationFormStep3InstitutionLoginForm />;
}

function AccountVerificationFormStep3InstitutionLoginForm() {
  const { goBack, accountVerificationFormState, createBasiqConnection } = useAccountVerificationForm();
  const { selectedInstitution } = accountVerificationFormState;

  const [formState, { text }] = useFormState();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();

  const formFields = useMemo(() => {
    if (!selectedInstitution) return;
    return Object.keys(selectedInstitution)
      .filter(key => key.endsWith('Caption'))
      .map(key => {
        const id = key.replace('Caption', '');
        const label = selectedInstitution[key];
        const placeholder = selectedInstitution[key];
        return {
          field: {
            id,
            label,
            placeholder,
            ...text(id),
          },
          // We should always show a password field, except for the loginId field
          FieldComponent: id === 'loginId' ? TextField : PasswordField,
        };
      });
  }, [selectedInstitution, text]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createBasiqConnection({
        ...formState.values,
        institution: { id: selectedInstitution.id },
      });
      setSubmitting(false);
    } catch (error) {
      setError(error);
      setSubmitting(false);
    }
  }

  if (!selectedInstitution) return null;

  return (
    <div className="flex flex-col space-y-8 sm:space-y-12">
      {/* STEP LOGO */}
      {/* To help the user keep context of what product they're using, */}
      {/* and what bank they're about to connect to. */}
      <StepLogo src={selectedInstitution.logo.links.square} alt={`Logo of ${selectedInstitution.name}`} />

      <div className="flex flex-col space-y-8">
        <div className="space-y-3 sm:space-y-4">
          {/* STEP HEADING */}
          {/* A short as possible heading to help the user quickly recognise the task at hand. */}
          <StepHeading>{selectedInstitution.shortName}</StepHeading>

          {/* STEP DESCRIPTION */}
          <StepDescription>
            Safely connect to {selectedInstitution.name} using your {selectedInstitution.serviceName} credentials.
          </StepDescription>
        </div>

        {/* CREDENTIALS FORM */}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Error state */}
              {error && <ErrorMessage message={error.message} />}

              {formFields.map(({ FieldComponent, field }) => (
                <div key={field.id} className="space-y-2">
                  <FieldComponent {...field} disabled={submitting} />
                  {/* Forgot password */}
                  {field.id === 'password' && selectedInstitution.forgottenPasswordUrl && (
                    <a
                      href={selectedInstitution.forgottenPasswordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs underline rounded outline-none text-primary-bold-darker hover:text-opacity-90 active:text-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
              ))}

              {/* Actions */}
              <div className="space-y-2">
                <Button type="submit" loading={submitting} variant="bold" block>
                  Connect
                </Button>
                <Button type="button" disabled={submitting} variant="subtle" block onClick={goBack}>
                  Pick another bank
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function AccountVerificationFormStep3InstitutionLoginProgress() {
  // State for managing hiding/showing of the resume in background modal
  const [isResumeModalOpen, openResumeModal, closeResumeModal] = useTernaryState(false);
  const { goForward, accountVerificationFormState, basiqConnection } = useAccountVerificationForm();

  const { selectedInstitution } = accountVerificationFormState;
  if (!selectedInstitution) return null;

  const { error, progress, completed, stepNameInProgress, estimatedTime, estimatedTimeOver, reset } = basiqConnection;

  return (
    <div className="flex flex-col space-y-10 sm:space-y-12">
      <StepLogo src={selectedInstitution.logo.links.square} alt={`Logo of ${selectedInstitution.name}`} />

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
              <p className="text-sm sm:text-base text-neutral-muted-darker">
                {estimatedTimeOver
                  ? `It\u2019s taking a bit longer than expected`
                  : `Usually takes ${ms(estimatedTime, { long: true })}`}
              </p>
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
