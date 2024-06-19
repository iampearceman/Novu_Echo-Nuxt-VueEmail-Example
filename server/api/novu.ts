import { serve } from "@novu/framework/nuxt";
import { client, emailWorkflow } from "../novu/workflows";

export default defineEventHandler(serve({ client, workflows: [emailWorkflow] }));