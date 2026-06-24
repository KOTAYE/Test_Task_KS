'use client';

import {
  Alert,
  Card,
  Center,
  Container,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconAlertCircle, IconTrain } from '@tabler/icons-react';
import { TrainTable } from '@/components/train-table';
import { useTrains } from '@/lib/use-trains';

export default function HomePage() {
  const { trains, loading, error } = useTrains();

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={1}>Train Schedule</Title>
          <Text c="dimmed" mt={4}>
            Browse upcoming departures and arrivals.
          </Text>
        </div>

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
                  The schedule is currently empty.
                </Text>
              </Stack>
            </Center>
          </Card>
        ) : (
          <Card withBorder radius="md" p={0}>
            <Group justify="space-between" p="md">
              <Text fw={600}>{trains.length} trains</Text>
            </Group>
            <TrainTable trains={trains} />
          </Card>
        )}
      </Stack>
    </Container>
  );
}
