import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { RadioGroup } from '@headlessui/react';
import { formatCurrency } from '../../utils/formatCurrency';
import { maskAccountNumber } from '../../utils/maskAccountNumber';
import { Button } from '../Button';
import { ErrorScene } from '../ErrorScene';
import { ErrorMessage } from '../ErrorMessage';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';
import { StepDescription } from './StepDescription';

export function AccountVerificationFormStep4SelectAccount() {
  const { goToStep, goForward, accountVerificationFormState, updateAccountVerificationFormState } =
    useAccountVerificationForm();
  const { user, selectedInstitution } = accountVerificationFormState;

  const [selectedAccount, setSelectedAccount] = useState();
  const [validationError, setValidationError] = useState(false);

  const { data, error, loading, refetch } = useAccountsData({
    userId: user?.id,
    institutionId: selectedInstitution?.id,
  });

  const errorOrNoData = error || !data || data.length === 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedAccount) {
      updateAccountVerificationFormState({ selectedAccount });
      goForward();
    } else {
      setValidationError(true);
      window.scrollTo(0, 0);
    }
  }

  if (!user || !selectedInstitution) return null;

  return (
    <div className="flex flex-col flex-grow space-y-8 sm:space-y-12">
      {/* STEP LOGO */}
      {/* To help the user keep context of what product they're using, */}
      {/* and what bank they're about to connect to. */}
      <StepLogo src={selectedInstitution.logo.links.square} alt={`Logo of ${selectedInstitution.name}`} />

      <div className="flex flex-col space-y-8">
        {/* STEP HEADING */}
        {/* PRODUCT-COPY: A short as possible heading to help the user quickly recognise the task at hand. */}
        <div className="space-y-3 sm:space-y-4">
          <StepHeading>
            Select your daily <br />
            spending account
          </StepHeading>

          {/* STEP DESCRIPTION */}
          {/* PRODUCT-COPY: Depending on what account features your product supports. */}
          {(loading || !errorOrNoData) && (
            <StepDescription>
              Please select which account to track - this app typically works best if you use your daily spending. 
            </StepDescription>
          )}
        </div>

        {/* ACCOUNTS RADIO GROUP */}
        {loading ? (
          <AccountsLoadingSkeleton />
        ) : errorOrNoData ? (
          <ErrorScene
            title="Failed to load accounts"
            message="Something went wrong whilst loading the list of accounts. If the problem persists, please contact support."
            actionOnClick={refetch}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {validationError && (
              <ErrorMessage message="Please select an account that allows direct debits, or connect to a different bank." />
            )}
            <RadioGroup value={selectedAccount} onChange={setSelectedAccount}>
              <RadioGroup.Label className="sr-only">Select account</RadioGroup.Label>
              <div className="space-y-3">
                {data.map((acc, idx) => {
                  return (
                    <RadioGroup.Option
                      key={idx}
                      value={acc}
                      className={`rounded-lg outline-none focus:border-primary-bold focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent`}
                      data-cy={`account-${acc.accountNo}`}
                    >
                      {({ checked }) => (
                        <div
                          className={`relative rounded-lg p-3 flex 
                              'bg-white cursor-pointer border border-neutral-dim active:bg-primary-subtle-darker transition-colors'
                          ${checked && 'bg-primary-subtle border-primary-bold'}`}
                        >
                          <div className="flex flex-grow space-x-3">
                              <span
                                className={`flex items-center justify-center w-6 h-6 rounded-full bg-white border-2  ${
                                  checked ? 'border-primary-bold' : 'border-neutral-dim-darker'
                                }`}
                              >
                                {checked && <span className={`w-2 h-2 rounded-full bg-primary-bold`} />}
                              </span>

                            <div className="flex-grow space-y-2">
                              <RadioGroup.Label as="p" className="font-medium">
                                {acc.name}
                              </RadioGroup.Label>
                              <span className="text-xs text-neutral-muted-darker">
                                {maskAccountNumber(acc.accountNo)}
                              </span>
                              <dl className="text-xs grid grid-cols-2 gap-y-0.5 text-neutral-muted-darker">
                                <dt className="flex-1">Available:</dt>
                                <dd className="font-medium text-right text-black">
                                  {formatCurrency(acc.availableFunds)}
                                </dd>
                                <dt className="flex-1">Balance:</dt>
                                <dd className="text-right">{formatCurrency(acc.balance)}</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      )}
                    </RadioGroup.Option>
                  );
                })}
              </div>
            </RadioGroup>
            {/* Actions */}
            <div className="space-y-2">
              <Button type="submit" block>
                Finish
              </Button>
              <Button type="button" variant="subtle" block onClick={() => goToStep(2)}>
                Connect to a different bank
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// RETRIEVE ACCOUNTS
// Custom react hook for managing our fetch request to retrieves a list of accounts for the current user
// The code for this API route can be found in `pages/api/accounts`
function useAccountsData({ userId, institutionId }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const fetchAccounts = useCallback(() => {
    axios
      .get('/api/accounts', { params: { userId, institutionId } })
      .then(res => {
        setData(res.data);
        setError(undefined);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [institutionId, userId]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchAccounts();
  }, [fetchAccounts]);

  return { data, loading, error, refetch };
}

// ACCOUNTS LOADING SKELETON
// Keeps the user visually occupied whilst loading,
// making the experience seem quicker than it might be.
const skeletonItems = [...new Array(5).keys()];
function AccountsLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {skeletonItems.map(i => (
        <div key={i} className="flex p-3 bg-white border rounded-lg border-neutral-subtle-darker animate-pulse">
          <div className="flex space-x-3">
            <span className="w-6 h-6 border-2 rounded-full border-neutral-subtle-darker" />
            <div className="flex-grow space-y-2">
              <div className="w-48 h-6 rounded bg-neutral-subtle-darker" />
              <div className="w-32 h-4 rounded bg-neutral-subtle-darker" />
              <div className="grid gap-y-0.5">
                <div className="h-4" />
                <div className="h-4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
