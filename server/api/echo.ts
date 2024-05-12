import { serve } from "@novu/echo/nuxt";
import { echo } from "../echo/echo-client";

export default defineEventHandler(serve({ client: echo }));