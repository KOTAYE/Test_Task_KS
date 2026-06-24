'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Anchor,
  Button,
  Card,
  Center,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

type Mode = 'login' | 'register';

interface AuthFormProps {
  mode: Mode;
}

const COPY: Record<Mode, { title: string; cta: string; switchText: string; switchHref: string; switchLabel: string }> = {
  login: {
    title: 'Welcome back',
    cta: 'Log in',
    switchText: "Don't have an account?",
    switchHref: '/register',
    switchLabel: 'Sign up',
  },
  register: {
    title: 'Create an account',
    cta: 'Sign up',
    switchText: 'Already have an account?',
    switchHref: '/login',
    switchLabel: 'Log in',
  },
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const copy = COPY[mode];

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : 'Enter a valid email address',
      password: (value) =>
        mode === 'register' && value.length < 6
          ? 'Password must be at least 6 characters'
          : value.length === 0
            ? 'Password is required'
            : null,
    },
  });

  const handleSubmit = form.onSubmit(async ({ email, password }) => {
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      notifications.show({
        color: 'teal',
        message:
          mode === 'login' ? 'Logged in successfully' : 'Account created',
      });
      router.push('/');
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Authentication failed',
        message:
          error instanceof ApiError
            ? error.message
            : 'Unexpected error, please try again',
      });
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <Center mih="calc(100vh - 64px)" px="md">
      <Card withBorder shadow="sm" radius="md" p="xl" w={420} maw="100%">
        <Stack gap="lg">
          <div>
            <Title order={2}>{copy.title}</Title>
            <Text c="dimmed" size="sm" mt={4}>
              Train Schedule account
            </Text>
          </div>

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="you@example.com"
                withAsterisk
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                withAsterisk
                {...form.getInputProps('password')}
              />
              <Button type="submit" loading={submitting} fullWidth mt="xs">
                {copy.cta}
              </Button>
            </Stack>
          </form>

          <Text size="sm" ta="center" c="dimmed">
            {copy.switchText}{' '}
            <Anchor component={Link} href={copy.switchHref}>
              {copy.switchLabel}
            </Anchor>
          </Text>
        </Stack>
      </Card>
    </Center>
  );
}
