/* eslint-disable no-console */
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';

// Initialise OpenTelemetry when this module is imported.
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318/v1/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Fire-and-forget startup
;(async () => {
  try {
    await sdk.start();
    console.log('✅ OpenTelemetry started');
  } catch (err: unknown) {
    console.error('OTel init error', err);
  }
})();
