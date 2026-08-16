import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    // Envoi de l'e-mail via Resend vers ton adresse Outlook
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'ndieme.wade@outlook.fr',
      subject: `Nouveau message de ${name} via le Portfolio`,
      replyTo: email,
      html: `
        <h2>Nouveau message depuis ton Portfolio</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l’envoi :', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l’envoi du message.' },
      { status: 500 }
    );
  }
}