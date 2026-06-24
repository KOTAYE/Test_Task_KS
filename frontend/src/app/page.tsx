'use client';

import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Center,
  Container,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconPlus, IconTrain } from '@tabler/icons-react';
import { TrainTable } from '@/components/train-table';
import { TrainFormModal } from '@/components/train-form-modal';
import { api, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useTrains } from '@/lib/use-trains';
import { Train } from '@/lib/types';

export default function HomePage() {
  const { user } = useAuth();
  const { trains, loading, error, reload } = useTrains();
  const [modalOpened, setModalOpened] = useState(false);
  const [editingTrain, setEditingTrain] = useState<Train | null>(null);

  const canCreate = Boolean(user); // USER or ADMIN can add trains
  const canModify = user?.role === 'ADMIN'; // only ADMIN can edit or delete

  const openCreate = () => {
    setEditingTrain(null);
    setModalOpened(true);
  };

  const openEdit = (train: Train) => {
    setEditingTrain(train);
    setModalOpened(true);
  };

  const confirmDelete = (train: Train) => {
    modals.openConfirmModal({
      title: 'Delete train',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete train{' '}
          <strong>{train.trainNumber}</strong> ({train.departureStation} →{' '}
          {train.arrivalStation})? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => void handleDelete(train),
    });
  };

  const handleDelete = async (train: Train) => {
    try {
      await api.trains.remove(train.id);
      notifications.show({ color: 'teal', message: 'Train deleted' });
      await reload();
    } catch (err) {
      notifications.show({
        color: 'red',
        title: 'Could not delete train',
        message:
          err instanceof ApiError
            ? err.message
            : 'Unexpected error, please try again',
      });
    }
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-end">
          <div>
            <Title order={1}>Train Schedule</Title>
            <Text c="dimmed" mt={4}>
              Browse upcoming departures and arrivals.
            </Text>
          </div>
          {canCreate && (
            <Button leftSection={<IconPlus size={18} />} onClick={openCreate}>
              Add train
            </Button>
          )}
        </Group>

        {error && (
          <Alert
            color="red"
            icon={<IconAlertCircle size={18} />}
            title="Failed to load"
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <Center py="xl">
            <Loader />
          </Center>
        ) : trains.length === 0 && !error ? (
          <Card withBorder p="xl" radius="md">
            <Center>
              <Stack align="center" gap="xs">
                <IconTrain size={40} style={{ opacity: 0.4 }} />
                <Text fw={600}>No trains scheduled yet</Text>
                <Text c="dimmed" size="sm">
                  {canCreate
                    ? 'Add the first train to get started.'
                    : 'The schedule is currently empty.'}
                </Text>
              </Stack>
            </Center>
          </Card>
        ) : (
          <Card withBorder radius="md" p={0}>
            <Group justify="space-between" p="md">
              <Text fw={600}>{trains.length} trains</Text>
              {!user && (
                <Text size="sm" c="dimmed">
                  Log in to manage the schedule
                </Text>
              )}
            </Group>
            <TrainTable
              trains={trains}
              canEdit={canModify}
              canDelete={canModify}
              onEdit={openEdit}
              onDelete={confirmDelete}
            />
          </Card>
        )}
      </Stack>

      <TrainFormModal
        opened={modalOpened}
        train={editingTrain}
        onClose={() => setModalOpened(false)}
        onSuccess={reload}
      />
    </Container>
  );
}
