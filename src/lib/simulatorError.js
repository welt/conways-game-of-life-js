export default class SimulatorError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "Simulator Error";
  }
}
