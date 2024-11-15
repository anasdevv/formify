'use server';

import prisma from '@/lib/prisma';
import { formSchema, FormSchemaType } from '@/schemas/form';
import { currentUser } from '@clerk/nextjs/server';
import invariant from 'tiny-invariant';

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });
  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;
  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;
  return { visits, submissions, submissionRate, bounceRate };
}

export async function AddForm(data: FormSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error('Not valid');
  }
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  const form = await prisma.form.create({
    data: {
      name: data.name,
      description: data.desciption,
      userId: user.id,
    },
    select: {
      id: true,
    },
  });
  if (!form) {
    throw new Error('Something went wrong');
  }
  return form.id;
}

export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  console.log('id ss', id);
  console.log('on server');
  invariant(!!id, 'Invalid form id. Please dont mess with URL.');

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}
