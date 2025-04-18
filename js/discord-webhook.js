// Discord Webhook Integration
// This function will be called from script.js when the form is submitted
// It respects the cooldown period set in script.js
async function sendToDiscord(name, email, subject, message) {
    // Check if we're in cooldown period
    if (window.lastSubmissionTime && window.cooldownPeriod) {
        const currentTime = new Date().getTime();
        if (currentTime - window.lastSubmissionTime < window.cooldownPeriod) {
            console.log('In cooldown period, not sending to Discord');
            return false;
        }
    }
    // Discord webhook URL
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1362742791154831492/bnkcNoWry9eBMME58yFFbJ0HP_zv67yTpvdBqH0G_70a_H1AMig485GGXHEZ3u16IcrI';

    try {
        // Send the data to Discord webhook
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // Discord webhook format
                embeds: [{
                    title: `New Contact Form Submission: ${subject}`,
                    color: 0x7289DA, // Discord blue color
                    fields: [
                        {
                            name: 'Name',
                            value: name,
                            inline: true
                        },
                        {
                            name: 'Email',
                            value: email,
                            inline: true
                        },
                        {
                            name: 'Subject',
                            value: subject,
                            inline: false
                        },
                        {
                            name: 'Message',
                            value: message,
                            inline: false
                        }
                    ],
                    footer: {
                        text: `Sent from PlasmaGFX Website • ${new Date().toLocaleString()}`
                    }
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        console.log('Message sent to Discord successfully!');
        return true; // Success

    } catch (error) {
        console.error('Error sending message to Discord:', error);
        return false; // Error
    }
}

// Make the function available globally
window.sendToDiscord = sendToDiscord;
