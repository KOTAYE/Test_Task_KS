'use client';

import {
  ActionIcon,
  Badge,
  Group,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconArrowRight, IconPencil, IconTrash } from '@tabler/icons-react';
import { Train } from '@/lib/types';
import { formatDateTime, formatDuration } from '@/lib/format';

interface TrainTableProps {
  trains: Train[];
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: (train: Train) => void;
  onDelete?: (train: Train) => void;
}

export function TrainTable({
  trains,
  canEdit = false,
  canDelete = false,
  onEdit,
  onDelete,
}: TrainTableProps) {
  const showActions = canEdit || canDelete;

  return (
    <Table.ScrollContainer minWidth={760}>
      <Table striped highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Train №</Table.Th>
            <Table.Th>Direction</Table.Th>
            <Table.Th>Departure</Table.Th>
            <Table.Th>Arrival</Table.Th>
            <Table.Th>Station</Table.Th>
            {showActions && <Table.Th ta="right">Actions</Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {trains.map((train) => (
            <Table.Tr key={train.id}>
              <Table.Td>
                <Badge variant="light" size="lg">
                  {train.trainNumber}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group gap={6} wrap="nowrap">
                  <Text size="sm">{train.departureStation}</Text>
                  <IconArrowRight size={15} style={{ opacity: 0.5 }} />
                  <Text size="sm">{train.arrivalStation}</Text>
                </Group>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{formatDateTime(train.departureTime)}</Text>
                <Text size="xs" c="dimmed">
                  {formatDuration(train.departureTime, train.arrivalTime)} trip
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{formatDateTime(train.arrivalTime)}</Text>
              </Table.Td>
              <Table.Td>{train.departureStation}</Table.Td>
              {showActions && (
                <Table.Td>
                  <Group gap="xs" justify="flex-end" wrap="nowrap">
                    {canEdit && (
                      <Tooltip label="Edit">
                        <ActionIcon
                          variant="subtle"
                          color="indigo"
                          aria-label="Edit train"
                          onClick={() => onEdit?.(train)}
                        >
                          <IconPencil size={18} />
                        </ActionIcon>
                      </Tooltip>
                    )}
                    {canDelete && (
                      <Tooltip label="Delete">
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          aria-label="Delete train"
                          onClick={() => onDelete?.(train)}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </Group>
                </Table.Td>
              )}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
