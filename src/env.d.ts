/// <reference path="../.astro/types.d.ts" />

// Tracking: solo dataLayer con eventi propri, niente pixel.
interface Window {
  dataLayer?: Record<string, unknown>[];
}
