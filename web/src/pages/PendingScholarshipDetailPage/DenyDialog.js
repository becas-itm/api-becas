import React from 'react';
import Textarea from 'ui/components/Textarea';
import Button, { COLOR } from 'ui/components/Button';
import Dialog, { Title, Actions } from 'ui/components/Dialog';

import { useDeny } from './useScholarship';

export function DenyDialog({ scholarshipId, onCancel, onDeny }) {
  const cancelButtonRef = React.useRef(null);

  const [reason, setReason] = React.useState('');
  const onChange = event => setReason(event.target.value);

  const { deny, isDenying } = useDeny(scholarshipId);

  const handleSubmit = async event => {
    event.preventDefault();
    deny(reason).then(onDeny);
  };

  return (
    <Dialog
      isOpen
      onDismiss={isDenying ? () => {} : onCancel}
      initialFocusRef={cancelButtonRef}
      aria-labelledby="deny-scholarship"
      className="w-full max-w-sm"
    >
      <form onSubmit={handleSubmit}>
        <Title id="deny-scholarship">Razón de rechazo</Title>
        <Textarea
          value={reason}
          onChange={onChange}
          readOnly={isDenying}
          placeholder="Placeholder"
          rows="2"
        />
        <Actions>
          <Button
            onClick={onCancel}
            ref={cancelButtonRef}
            color={COLOR.secondary}
            disabled={isDenying}
          >
            Cancelar
          </Button>
          <Button
            isLoading={isDenying}
            type="submit"
            color={COLOR.danger}
            className="ml-3"
          >
            Rechazar
          </Button>
        </Actions>
      </form>
    </Dialog>
  );
}
