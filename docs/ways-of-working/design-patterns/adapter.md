# Adapters

## Context

Relying on the presented structure of an external services is dangerous. It is
likely to change over time and break the integration. Or it might be necessary
to switch it out with a completely different service later on.

## Decision

Adapters should be used to adapt the interface of an external service endpoint
to be compatible with another interface.

## Consequences

**Positive:** The adapter pattern allows us to decouple the integration from the
external service. This allows us to switch out the external service without
having to change the integration.
