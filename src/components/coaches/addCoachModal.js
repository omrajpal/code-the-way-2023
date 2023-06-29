import { flattenDeep } from 'lodash';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Stack, TextField, Typography } from '@mui/material';
import { Phone } from '@mui/icons-material';
import GenericModal from './modal-component';
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
        presence: { allowEmpty: false, message: 'is required' },
      },
      lastName: {
        presence: { allowEmpty: false, message: 'is required' },
      },
      email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: { message: 'is not valid' },
      },
      phone: {},
      password: {
        presence: { allowEmpty: false, message: 'is required' },
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
    }
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
              type="text"
            />
            <TextField
              fullWidth
              onChange={(event) => setLastName(event.target.value)}
              label="Last Name"
              value={lastName}
              type="text"
            />
            <TextField
              fullWidth
              onChange={(event) => setEmail(event.target.value)}
              label="Email"
              value={email}
              type="email"
            />
            <TextField
              fullWidth
              onChange={(event) => setPhone(event.target.value)}
              label="Phone Number"
              value={phone}
              type="text"
            />
            <TextField
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
              value={password}
              type="password"
            />
            <TextField
              fullWidth
              onChange={(event) => setConfirmPassword(event.target.value)}
              label="Confirm Password"
              value={confirmPassword}
              type="password"
            />
          </Stack>
        </Grid>
        {messages.length > 0 && (
          <Grid item xs={9}>
            {messages.map((message, index) => (
              <Typography key={index.id} variant="body2" color="error">
                {message}
              </Typography>
            ))}
          </Grid>
        )}
      </Grid>
    </GenericModal>
  );
}
