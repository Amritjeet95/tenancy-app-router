import { redirect } from 'next/navigation';
import './createRecord.css'
import { db } from '@/app/db'
import {routeTo} from '@/routes';
import CreateRecordForm from "@/app/components/create-record-form/CreateRecordForm";

export default function CreateRecordPage() {

  async function createRecord(formData: FormData){
    'use server';
  // server components will not make it to the browser and they have benefits and downsides
  // Benefits:
  // 1. Faster load times
  // 2. Better SEO
  // 3. Can use async/await, no need to use useEffect

  // Downsides:
  // 1. Cannot access events
  // 2. Cannot use hooks like useState, useEffect, etc.

  // Mark it is a server action

  // Get the data from the form and validate it
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  // Create a new record in the database
  const createdRecord = await db.tenancyRecord.create({
    data: {
      name: name,
      email: email
    }
  })
  console.log('createdRecord', createdRecord);

  redirect(routeTo.home());

  }

  return <div className="formWrapper">

    <CreateRecordForm createRecord={createRecord} />
  </div>
}
