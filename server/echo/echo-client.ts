import { config } from '@vue-email/compiler';
import { Echo } from '@novu/echo';

// Initialize the vueEmail with configuration
const vueEmail = config('templates', {
    verbose: false,
    options: {
    },
})

export const echo = new Echo({
    // The API key for the Novu API
    apiKey: process.env.NOVU_API_KEY,
    
    devModeBypassAuthentication: true, // Note: Set this to false in production
});

echo.workflow('hello-world', async ({ step, payload }) => {
    await step.email(
        'send-email',
        async () => {
            const template = await vueEmail.render('sample-email.vue', {
                props: payload,
            });
            return {
                subject: `You have a new invitation from: ${payload.username}.`,
                body: template.html,
            }
        });
},
    {
        payloadSchema: {
            // Always `object`
            type: 'object',
            // Specify the properties to validate. Supports deep nesting.
            properties: {
                        username: { type: "string" },
                        invitedByEmail: { type: "string" },
                        inviteLink: { type: "string" },
                        inviteFromIp: { type: "string" },
                        inviteFromLocation: { type: "string" }
            },
            // Used to enforce full type strictness, with no rogue properties.
            additionalProperties: false,
            // The `as const` is important to let Typescript know that this
            // type won't change, enabling strong typing on `inputs` via type
            // inference of the provided JSON Schema.
        } as const,
    },
);
