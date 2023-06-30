import { flattenDeep } from 'lodash';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Stack, TextField, Typography } from '@mui/material';
import GenericModal from '../shared/generic-modal';
import { addCoachHandler } from './coachHandlers';

export function AddCoachModal() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  const validator = validate(
    { firstName, lastName, email, phone, password, confirmPassword },
    {
      firstName: {
        presence: { allowEmpty: false, message: '' },
      },
      lastName: {
        presence: { allowEmpty: false },
      },
      email: {
        presence: { allowEmpty: false },
      },
      phone: {},
      password: {
        presence: { allowEmpty: false },
        format: {
          pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*',
          message:
            'must contain at least one number, one lowercase letter, one uppercase letter, and one special character',
        },
        length: {
          minimum: 12,
          message: 'must be at least 12 characters',
        },
      },
      confirmPassword: {
        presence: { allowEmpty: false, message: 'is required' },
        equality: 'password',
      },
    },
    { fullMessages: false }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const submitAction = () => {
    addCoachHandler(
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    );
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setConfirmPassword('');
    setPassword('');
  };

  const cancelAction = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setConfirmPassword('');
    setPassword('');
  };

  const actionButtonDisabled = Boolean(messages.length);

  return (
    <GenericModal
      openModal={<AddIcon />}
      modalHeadingTitle="Add a Coach"
      modalMessage="Fill out the fields below to add a coach."
      actionButtonTitle="Create"
      cancelButtonTitle="Cancel"
      actionButtonDisabled={actionButtonDisabled}
      actionButtonColor="submit"
      onActionButtonClick={submitAction}
      onCancelButtonClick={cancelAction}
      onIconButtonClick={cancelAction}
    >
      <Grid container justifyContent="center">
        <Grid item xs={9}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              onChange={(event) => setFirstName(event.target.value)}
              label="First Name"
              value={firstName}
              errorText={firstName.length < 1 ? 'Enter First Name' : ' '}
              error={firstName.length < 1}
              required
              type="text"
            />
            <TextField
              fullWidth
              onChange={(event) => setLastName(event.target.value)}
              label="Last Name"
              value={lastName}
              errorText={lastName.length < 1 ? 'Enter Last Name' : ' '}
              error={lastName.length < 1}
              required
              type="text"
            />
            <TextField
              fullWidth
              onChange={(event) => setEmail(event.target.value)}
              label="Email"
              value={email}
              error={!email.includes('@')}
              errorText={!email.includes('@') ? 'Must contain an @ sign.' : ' '}
              required
              type="email"
            />
            <TextField
              fullWidth
              onChange={(event) => setPhone(event.target.value)}
              label="Phone Number"
              value={phone}
              required
              error={phone.length < 1}
              errorText={phone.length < 1 ? 'Enter Phone Number' : ' '}
              type="text"
            />
            <TextField
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
              value={password}
              error={password.length < 1}
              errorText={password.length < 1}
              required
              type="password"
            />
            <TextField
              fullWidth
              onChange={(event) => setConfirmPassword(event.target.value)}
              label="Confirm Password"
              value={confirmPassword}
              error={confirmPassword !== password || confirmPassword.length < 1}
              errorText={
                confirmPassword !== password ? 'Passwords must match.' : ' '
              }
              required
              type="password"
            />
          </Stack>
        </Grid>
      </Grid>
    </GenericModal>
  );
}
