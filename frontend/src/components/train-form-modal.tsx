'use client';

import { useEffect, useState } from 'react';
import { Button, Group, Modal, Select, Stack, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { api, ApiError } from '@/lib/api';
import { STATION_OPTIONS } from '@/lib/stations';
import { Train } from '@/lib/types';

interface TrainFormModalProps {
  opened: boolean;
  train: Train | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  trainNumber: string;
  departureStation: string;
  arrivalStation: string;
  departureTime: string;
  arrivalTime: string;
}

const PICKER_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const emptyValues: FormValues = {
  trainNumber: '',
  departureStation: '',
  arrivalStation: '',
  departureTime: '',
  arrivalTime: '',
};

export function TrainFormModal({
  opened,
  train,
  onClose,
  onSuccess,
}: TrainFormModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const isEdit = Boolean(train);

  const form = useForm<FormValues>({
    initialValues: emptyValues,
    validate: {
      trainNumber: (value) =>
        value.trim().length === 0 ? 'Train number is required' : null,
      departureStation: (value) =>
        value ? null : 'Select a departure station',
      arrivalStation: (value, values) => {
        if (!value) return 'Select an arrival station';
        if (value === values.departureStation)
          return 'Stations must be different';
        return null;
      },
      departureTime: (value) => (value ? null : 'Pick a departure time'),
      arrivalTime: (value, values) => {
        if (!value) return 'Pick an arrival time';
        if (
          values.departureTime &&
          !dayjs(value).isAfter(dayjs(values.departureTime))
        ) {
          return 'Arrival must be after departure';
        }
        return null;
      },
    },
  });

  // Reset the form whenever the modal opens (for create or edit).
  useEffect(() => {
    if (!opened) return;
    if (train) {
      form.setValues({
        trainNumber: train.trainNumber,
        departureStation: train.departureStation,
        arrivalStation: train.arrivalStation,
        departureTime: dayjs(train.departureTime).format(PICKER_FORMAT),
        arrivalTime: dayjs(train.arrivalTime).format(PICKER_FORMAT),
      });
    } else {
      form.setValues(emptyValues);
    }
    form.resetDirty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, train]);

  const handleSubmit = form.onSubmit(async (values) => {
    setSubmitting(true);
    const payload = {
      trainNumber: values.trainNumber.trim(),
      departureStation: values.departureStation,
      arrivalStation: values.arrivalStation,
      departureTime: dayjs(values.departureTime).toISOString(),
      arrivalTime: dayjs(values.arrivalTime).toISOString(),
    };

    try {
      if (train) {
        await api.trains.update(train.id, payload);
      } else {
        await api.trains.create(payload);
      }
      notifications.show({
        color: 'teal',
        message: isEdit ? 'Train updated' : 'Train created',
      });
      onSuccess();
      onClose();
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Could not save train',
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
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? 'Edit train' : 'Add train'}
      centered
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Train number"
            placeholder="IC-001"
            withAsterisk
            {...form.getInputProps('trainNumber')}
          />
          <Group grow align="flex-start">
            <Select
              label="From"
              placeholder="Departure"
              withAsterisk
              data={STATION_OPTIONS}
              searchable
              {...form.getInputProps('departureStation')}
            />
            <Select
              label="To"
              placeholder="Arrival"
              withAsterisk
              data={STATION_OPTIONS}
              searchable
              {...form.getInputProps('arrivalStation')}
            />
          </Group>
          <DateTimePicker
            label="Departure time"
            placeholder="Pick date and time"
            withAsterisk
            valueFormat="DD MMM YYYY HH:mm"
            {...form.getInputProps('departureTime')}
          />
          <DateTimePicker
            label="Arrival time"
            placeholder="Pick date and time"
            withAsterisk
            valueFormat="DD MMM YYYY HH:mm"
            {...form.getInputProps('arrivalTime')}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {isEdit ? 'Save changes' : 'Create train'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
