// Discord Webhook Integration
document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form
    const contactForm = document.getElementById('contactForm');

    // Discord webhook URL
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1362742791154831492/bnkcNoWry9eBMME58yFFbJ0HP_zv67yTpvdBqH0G_70a_H1AMig485GGXHEZ3u16IcrI';

    if (contactForm) {
        // Store the original form submission handler
        const originalSubmitHandler = contactForm.onsubmit;

        // Override the form submission
        contactForm.addEventListener('submit', async function(e) {
            // Prevent the default form submission
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Log form submission to console
            console.log('Form submitted:', { name, email, subject, message });

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

                // Create and show notification popup
                const notification = document.createElement('div');
                notification.className = 'notification-popup';
                notification.innerHTML = `
                    <div class="notification-close"><i class="fas fa-times"></i></div>
                    <div class="notification-title">Message Sent!</div>
                    <p class="notification-message">Thank you for your message! Your inquiry has been sent to our team and we will get back to you within 24 hours.</p>
                `;

                // Add to the DOM
                document.body.appendChild(notification);

                // Add close functionality
                const closeBtn = notification.querySelector('.notification-close');
                closeBtn.addEventListener('click', function() {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        notification.remove();
                    }, 500);
                });

                // Show the notification with a slight delay
                setTimeout(() => {
                    notification.classList.add('show');
                }, 100);

                // Auto-hide after 5 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        notification.remove();
                    }, 500);
                }, 5000);

                // Reset form
                contactForm.reset();

            } catch (error) {
                console.error('Error sending message to Discord:', error);

                // Show error notification
                const errorNotification = document.createElement('div');
                errorNotification.className = 'notification-popup error';
                errorNotification.innerHTML = `
                    <div class="notification-close"><i class="fas fa-times"></i></div>
                    <div class="notification-title">Error!</div>
                    <p class="notification-message">There was a problem sending your message. Please try again later or contact us directly.</p>
                `;

                // Add to the DOM
                document.body.appendChild(errorNotification);

                // Add close functionality
                const closeBtn = errorNotification.querySelector('.notification-close');
                closeBtn.addEventListener('click', function() {
                    errorNotification.classList.remove('show');
                    setTimeout(() => {
                        errorNotification.remove();
                    }, 500);
                });

                // Show the notification with a slight delay
                setTimeout(() => {
                    errorNotification.classList.add('show');
                }, 100);

                // Auto-hide after 5 seconds
                setTimeout(() => {
                    errorNotification.classList.remove('show');
                    setTimeout(() => {
                        errorNotification.remove();
                    }, 500);
                }, 5000);
            }
        });
    }
});
