import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import User from '@/lib/database/models/user.model';
const { Webhook } = require('@clerk/clerk-sdk-node');


import { connectToDatabase } from '@/lib/database';

export async function POST(req: Request) {
  try {
    const secret = process.env.CLERK_WEBHOOK_SECRET || '';
    const payload = await req.json();
    const headersList = headers();
    const signature = headersList.get('clerk-signature') || '';

    // Verify the webhook signature
    const webhook = new Webhook(secret);
    const event = webhook.verify(payload, signature);

    // Handle user created event
    if (event.type === 'user.created') {
      const { id, firstName, lastName, emailAddresses, profileImageUrl } = event.data;

      await connectToDatabase();

      // Add the new user to your database
      await User.create({
        clerkId: id,
        firstName,
        lastName,
        email: emailAddresses[0].emailAddress,
        photo: profileImageUrl,
        vote: false, // Initialize the vote column with false
      });
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error processing webhook:', error);

    return NextResponse.json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error occurred' 
    }, { status: 500 });
  }
}
