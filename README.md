# React Ports & Adapters

This repository showcase a very simple but scalable example of Ports & Adapters architecture in React.
Also known as Hexagonal Architecture.

This structure allows :
- To test the business logic without any dependency on the framework
- To swap dependencies on the fly and use fake dependencies for local development & testing
- To keep as much code as possible away from React itself
- To test the React components with unit tests

# Todo

- Test the Pages themselves
- Introduce a real back-end like Firebase