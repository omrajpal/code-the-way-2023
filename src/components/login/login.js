import {
  Typography,
  Container,
  Button,
  TextField,
  Avatar,
} from '@mui/material';
import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';
import { CircularProgressOverlay } from '../circular-progress-overlay/circular-progress-overlay';
import { Layout } from '../layout/layout';
import { useAuthentication } from '../../contexts/authentication-context/authentication-context';
import { ForgotPasswordModal } from './forgot-password-modal';
import { LayoutError } from '../layout/layout-error/layout-error';
import { LayoutBackButton } from '../layout/layout-back-button/layout-back-button';

export function Login() {
  const navigate = useNavigate();

  const authentication = useAuthentication();
  const { signIn, isLoading } = authentication;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');

  const submitDisabled = !username || !password;
  const showErrorMessage = Boolean(errorMessage);

  const onSuccessCallback = () => navigate('/students');
  const onFailureCallback = (e) => {
    const message =
      e?.response?.data?.message || e?.message || 'An error occurred.';
    setErrorMessage(message);
  };

  const onSubmit = () => {
    signIn({
      onFailureCallback,
      onSuccessCallback,
      password,
      username,
    });
  };
  if (error)
    return (
      <React.Fragment>
        <LayoutError title="Error loading." label={error} />{' '}
        <Button onClick={navigate('/login')}> Back </Button>
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <CircularProgressOverlay active={isLoading} />
      <Layout scrollable={false} showBackButton={false}>
        <Container
          maxWidth="xs"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Avatar sx={{ mx: 'auto', mb: 2 }}>
            <LockIcon />
          </Avatar>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Login
          </Typography>
          {showErrorMessage && (
            <Typography sx={{ color: pink[500] }}>{errorMessage}</Typography>
          )}
          <TextField
            fullWidth
            label="Email"
            onChange={(event) => setUsername(event.target.value)}
            required
            sx={{ my: 1 }}
            type="email"
            value={username}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
            sx={{ my: 1 }}
            type="password"
            value={password}
            variant="outlined"
          />
          <ForgotPasswordModal onError={setError} />
          <Button
            disabled={submitDisabled}
            onClick={onSubmit}
            size="large"
            sx={{ mt: 2 }}
            variant="contained"
          >
            Login
          </Button>
        </Container>
      </Layout>
    </React.Fragment>
  );
}
