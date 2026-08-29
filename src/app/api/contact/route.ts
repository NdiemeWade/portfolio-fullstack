import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 })
    }

    // Envoi du mail vers ta boîte Outlook
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'ndieme.wade@outlook.fr',
      subject: `Nouveau message de ${name} via le Portfolio`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #2C1820;">
          <h2 style="color: #C86D7D;">Nouveau message depuis ton Portfolio</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #F0D3CE; margin: 20px 0;" />
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-wrap; background-color: #FAF3F0; padding: 15px; rounded: 8px;">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur d\'envoi email :', error)
    return NextResponse.json({ error: 'Échec de l\'envoi du message.' }, { status: 500 })
  }
}