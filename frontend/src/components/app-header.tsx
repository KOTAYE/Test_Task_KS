'use client';

import Link from 'next/link';
import {
  Badge,
  Box,
  Button,
  Container,
  Group,
  Text,
} from '@mantine/core';
import { IconLogout, IconTrain } from '@tabler/icons-react';
import { useAuth } from '@/lib/auth-context';

export function AppHeader() {
  const { user, logout, loading } = useAuth();

  return (
    <Box
      component="header"
      style={{
        borderBottom: '1px solid var(--mantine-color-default-border)',
        backgroundColor: 'var(--mantine-color-body)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Container size="lg" py="sm">
        <Group justify="space-between">
          <Link
            href="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Group gap="xs">
              <IconTrain size={28} color="var(--mantine-color-indigo-6)" />
              <Text fw={700} size="lg">
                Train Schedule
              </Text>
            </Group>
          </Link>

          {!loading &&
            (user ? (
              <Group gap="sm">
                <Group gap={6}>
                  <Text size="sm" c="dimmed" visibleFrom="xs">
                    {user.email}
                  </Text>
                  <Badge
                    color={user.role === 'ADMIN' ? 'grape' : 'indigo'}
                    variant="light"
                  >
                    {user.role}
                  </Badge>
                </Group>
                <Button
                  variant="default"
                  size="xs"
                  leftSection={<IconLogout size={16} />}
                  onClick={logout}
                >
                  Logout
                </Button>
              </Group>
            ) : (
              <Group gap="xs">
                <Button
                  component={Link}
                  href="/login"
                  variant="default"
                  size="xs"
                >
                  Log in
                </Button>
                <Button component={Link} href="/register" size="xs">
                  Sign up
                </Button>
              </Group>
            ))}
        </Group>
      </Container>
    </Box>
  );
}
