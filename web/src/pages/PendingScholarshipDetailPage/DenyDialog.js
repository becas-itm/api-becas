import React from 'react';
import useFetch from 'use-http';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import Textarea from 'ui/components/Textarea';
import { Button, KIND } from 'ui/components/Button';

export function DenyDialog({ scholarshipId, onCancel, onDeny }) {
  const cancelButtonRef = React.useRef(null);

  const [reason, setReason] = React.useState('');
  const onChange = event => setReason(event.target.value);

  const url = `/api/publishing/scholarships/${scholarshipId}/deny/`;
  const [request, response] = useFetch(url);
  const isLoading = request.loading;

  const handleSubmit = async event => {
    event.preventDefault();
    await request.post({ reason });
    if (response.ok) {
      onDeny();
    }
  };

  return (
    <DialogOverlay
      isOpen
      onDismiss={isLoading ? () => {} : onCancel}
      className="fixed inset-0 overflow-auto p-4"
      style={{ background: 'hsla(0, 0%, 0%, .5)' }}
      initialFocusRef={cancelButtonRef}
    >
      <DialogContent
        aria-labelledby="deny-scholarship"
        className="pt-6 pb-3 px-6 mx-auto max-w-sm rounded bg-white"
        style={{
          marginTop: '15vh',
          boxShadow:
            '0 12px 17px 2px rgba(0, 0, 0, .14), 0 5px 22px 4px rgba(0, 0, 0, .12), 0 7px 8px -4px rgba(0, 0, 0, .2)',
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1
            id="deny-scholarship"
            className="text-xl pb-3 text-base font-semibold"
          >
            Razón de rechazo
          </h1>

          <Textarea
            value={reason}
            onChange={onChange}
            readOnly={isLoading}
            placeholder="Placeholder"
            rows="2"
          />

          <div className="flex justify-end mt-3">
            <Button
              onClick={onCancel}
              ref={cancelButtonRef}
              kind={KIND.secondary}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              isLoading={isLoading}
              type="submit"
              kind={KIND.danger}
              className="ml-3"
            >
              Rechazar
            </Button>
          </div>
        </form>
      </DialogContent>
    </DialogOverlay>
  );
}
